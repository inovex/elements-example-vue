'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const icons_js = require('@inovex.de/elements/dist/collection/util/icons.js');
const index_esm_js = require('@inovex.de/elements/dist/inovex-elements/ino-icon/index.esm.js');
const vue = require('vue');
const loader = require('@inovex.de/elements/dist/loader');

const UPDATE_VALUE_EVENT = 'update:modelValue';
const MODEL_VALUE = 'modelValue';
const ROUTER_LINK_VALUE = 'routerLink';
const NAV_MANAGER = 'navManager';
const ROUTER_PROP_PREFIX = 'router';
/**
 * Starting in Vue 3.1.0, all properties are
 * added as keys to the props object, even if
 * they are not being used. In order to correctly
 * account for both value props and v-model props,
 * we need to check if the key exists for Vue <3.1.0
 * and then check if it is not undefined for Vue >= 3.1.0.
 * See https://github.com/vuejs/vue-next/issues/3889
 */
const EMPTY_PROP = Symbol();
const DEFAULT_EMPTY_PROP = { default: EMPTY_PROP };
const getComponentClasses = (classes) => {
    var _a;
    return ((_a = classes) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
};
const getElementClasses = (ref, componentClasses, defaultClasses = []) => {
    var _a;
    return [...Array.from(((_a = ref.value) === null || _a === void 0 ? void 0 : _a.classList) || []), ...defaultClasses]
        .filter((c, i, self) => !componentClasses.has(c) && self.indexOf(c) === i);
};
/**
* Create a callback to define a Vue component wrapper around a Web Component.
*
* @prop name - The component tag name (i.e. `ion-button`)
* @prop componentProps - An array of properties on the
* component. These usually match up with the @Prop definitions
* in each component's TSX file.
* @prop customElement - An option custom element instance to pass
* to customElements.define. Only set if `includeImportCustomElements: true` in your config.
* @prop modelProp - The prop that v-model binds to (i.e. value)
* @prop modelUpdateEvent - The event that is fired from your Web Component when the value changes (i.e. ionChange)
* @prop externalModelUpdateEvent - The external event to fire from your Vue component when modelUpdateEvent fires. This is used for ensuring that v-model references have been
* correctly updated when a user's event callback fires.
*/
const defineContainer = (name, customElement, componentProps = [], modelProp, modelUpdateEvent, externalModelUpdateEvent) => {
    /**
    * Create a Vue component wrapper around a Web Component.
    * Note: The `props` here are not all properties on a component.
    * They refer to whatever properties are set on an instance of a component.
    */
    if (customElement !== undefined &&
        typeof customElements !== 'undefined' &&
        !customElements.get(name)) {
        customElements.define(name, customElement);
    }
    const Container = vue.defineComponent((props, { attrs, slots, emit }) => {
        var _a;
        let modelPropValue = props[modelProp];
        const containerRef = vue.ref();
        const classes = new Set(getComponentClasses(attrs.class));
        const onVnodeBeforeMount = (vnode) => {
            // Add a listener to tell Vue to update the v-model
            if (vnode.el) {
                const eventsNames = Array.isArray(modelUpdateEvent) ? modelUpdateEvent : [modelUpdateEvent];
                eventsNames.forEach((eventName) => {
                    vnode.el.addEventListener(eventName.toLowerCase(), (e) => {
                        modelPropValue = (e === null || e === void 0 ? void 0 : e.target)[modelProp];
                        emit(UPDATE_VALUE_EVENT, modelPropValue);
                        /**
                         * We need to emit the change event here
                         * rather than on the web component to ensure
                         * that any v-model bindings have been updated.
                         * Otherwise, the developer will listen on the
                         * native web component, but the v-model will
                         * not have been updated yet.
                         */
                        if (externalModelUpdateEvent) {
                            emit(externalModelUpdateEvent, e);
                        }
                    });
                });
            }
        };
        const currentInstance = vue.getCurrentInstance();
        const hasRouter = (_a = currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.appContext) === null || _a === void 0 ? void 0 : _a.provides[NAV_MANAGER];
        const navManager = hasRouter ? vue.inject(NAV_MANAGER) : undefined;
        const handleRouterLink = (ev) => {
            const { routerLink } = props;
            if (routerLink === EMPTY_PROP)
                return;
            if (navManager !== undefined) {
                let navigationPayload = { event: ev };
                for (const key in props) {
                    const value = props[key];
                    // eslint-disable-next-line no-prototype-builtins
                    if (props.hasOwnProperty(key) && key.startsWith(ROUTER_PROP_PREFIX) && value !== EMPTY_PROP) {
                        navigationPayload[key] = value;
                    }
                }
                navManager.navigate(navigationPayload);
            }
            else {
                console.warn('Tried to navigate, but no router was found. Make sure you have mounted Vue Router.');
            }
        };
        return () => {
            modelPropValue = props[modelProp];
            getComponentClasses(attrs.class).forEach(value => {
                classes.add(value);
            });
            const oldClick = props.onClick;
            const handleClick = (ev) => {
                if (oldClick !== undefined) {
                    oldClick(ev);
                }
                if (!ev.defaultPrevented) {
                    handleRouterLink(ev);
                }
            };
            let propsToAdd = {
                ref: containerRef,
                class: getElementClasses(containerRef, classes),
                onClick: handleClick,
                onVnodeBeforeMount: (modelUpdateEvent) ? onVnodeBeforeMount : undefined
            };
            /**
             * We can use Object.entries here
             * to avoid the hasOwnProperty check,
             * but that would require 2 iterations
             * where as this only requires 1.
             */
            for (const key in props) {
                const value = props[key];
                // eslint-disable-next-line no-prototype-builtins
                if (props.hasOwnProperty(key) && value !== EMPTY_PROP) {
                    propsToAdd[key] = value;
                }
            }
            if (modelProp) {
                /**
                 * If form value property was set using v-model
                 * then we should use that value.
                 * Otherwise, check to see if form value property
                 * was set as a static value (i.e. no v-model).
                 */
                if (props[MODEL_VALUE] !== EMPTY_PROP) {
                    propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: props[MODEL_VALUE] });
                }
                else if (modelPropValue !== EMPTY_PROP) {
                    propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: modelPropValue });
                }
            }
            return vue.h(name, propsToAdd, slots.default && slots.default());
        };
    });
    Container.displayName = name;
    Container.props = {
        [ROUTER_LINK_VALUE]: DEFAULT_EMPTY_PROP
    };
    componentProps.forEach(componentProp => {
        Container.props[componentProp] = DEFAULT_EMPTY_PROP;
    });
    if (modelProp) {
        Container.props[MODEL_VALUE] = DEFAULT_EMPTY_PROP;
        Container.emits = [UPDATE_VALUE_EVENT, externalModelUpdateEvent];
    }
    return Container;
};

/* eslint-disable */
const InoAutocomplete = /*@__PURE__*/ defineContainer('ino-autocomplete', undefined, [
    'debounceTimeout',
    'noOptionsText',
    'optionSelected'
]);
const InoButton = /*@__PURE__*/ defineContainer('ino-button', undefined, [
    'autoFocus',
    'disabled',
    'name',
    'form',
    'type',
    'colorScheme',
    'edgeMirrored',
    'fill',
    'dense',
    'loading'
]);
const InoCard = /*@__PURE__*/ defineContainer('ino-card', undefined, [
    'selected',
    'disableElevation'
]);
const InoCarousel = /*@__PURE__*/ defineContainer('ino-carousel', undefined, [
    'value',
    'autoplay',
    'animated',
    'hideButtons',
    'infinite',
    'intermission',
    'reverse'
]);
const InoCarouselSlide = /*@__PURE__*/ defineContainer('ino-carousel-slide', undefined, [
    'src',
    'value'
]);
const InoCheckbox = /*@__PURE__*/ defineContainer('ino-checkbox', undefined, [
    'checked',
    'disabled',
    'name',
    'value',
    'selection',
    'indeterminate',
    'checkedChange'
], 'checked', 'v-checkedChange', 'checkedChange');
const InoChip = /*@__PURE__*/ defineContainer('ino-chip', undefined, [
    'colorScheme',
    'fill',
    'icon',
    'label',
    'value',
    'removable',
    'selectable',
    'selected',
    'removeChip'
]);
const InoChipSet = /*@__PURE__*/ defineContainer('ino-chip-set', undefined, [
    'type',
    'updateChipSet'
]);
const InoControlItem = /*@__PURE__*/ defineContainer('ino-control-item', undefined, [
    'role',
    'text',
    'secondaryText',
    'selected',
    'activated',
    'checked',
    'disabled',
    'name',
    'value',
    'indeterminate',
    'trailing',
    'checkedChange'
], 'checked', 'v-checkedChange', 'checkedChange');
const InoDatepicker = /*@__PURE__*/ defineContainer('ino-datepicker', undefined, [
    'autoFocus',
    'disabled',
    'name',
    'required',
    'showLabelHint',
    'value',
    'min',
    'max',
    'outline',
    'label',
    'helper',
    'helperPersistent',
    'helperValidation',
    'range',
    'dateFormat',
    'defaultDate',
    'defaultHour',
    'defaultMinute',
    'twelveHourTime',
    'type',
    'minuteStep',
    'hourStep',
    'valueChange'
], 'value', 'v-valueChange', 'valueChange');
const InoFab = /*@__PURE__*/ defineContainer('ino-fab', undefined, [
    'icon',
    'label',
    'extended',
    'edgePosition',
    'disabled',
    'mini',
    'tooltipPlacement'
]);
const InoFabSet = /*@__PURE__*/ defineContainer('ino-fab-set', undefined, [
    'dialDirection',
    'topBottomLocation',
    'leftRightLocation',
    'openDial'
]);
const InoFormRow = /*@__PURE__*/ defineContainer('ino-form-row', undefined, [
    'label',
    'mandatory'
]);
const InoHeader = /*@__PURE__*/ defineContainer('ino-header', undefined, [
    'text'
]);
const InoIconButton = /*@__PURE__*/ defineContainer('ino-icon-button', undefined, [
    'autoFocus',
    'disabled',
    'activated',
    'colorScheme',
    'filled',
    'icon',
    'type',
    'clickEl'
]);
const InoImg = /*@__PURE__*/ defineContainer('ino-img', undefined, [
    'alt',
    'decoding',
    'height',
    'sizes',
    'src',
    'srcset',
    'width',
    'usemap',
    'fallbackIcon',
    'imgListItem',
    'label',
    'ratioWidth',
    'ratioHeight',
    'rounded'
]);
const InoImgList = /*@__PURE__*/ defineContainer('ino-img-list', undefined, [
    'masonry',
    'encloseLabel'
]);
const InoInput = /*@__PURE__*/ defineContainer('ino-input', undefined, [
    'autocomplete',
    'autoFocus',
    'disabled',
    'min',
    'max',
    'maxlength',
    'step',
    'name',
    'pattern',
    'placeholder',
    'required',
    'size',
    'type',
    'value',
    'thousandsSeparator',
    'decimalPlaces',
    'unit',
    'showLabelHint',
    'outline',
    'label',
    'helper',
    'helperPersistent',
    'helperValidation',
    'helperCharacterCounter',
    'dataList',
    'error',
    'valueChange',
    'inoBlur',
    'inoFocus'
], 'value', 'v-valueChange', 'valueChange');
const InoInputFile = /*@__PURE__*/ defineContainer('ino-input-file', undefined, [
    'accept',
    'autoFocus',
    'disabled',
    'multiple',
    'name',
    'required',
    'label',
    'dragAndDrop',
    'dragAndDropText',
    'dragAndDropSecondaryText',
    'changeFile'
], 'value', 'v-changeFile', 'changeFile');
const InoLabel = /*@__PURE__*/ defineContainer('ino-label', undefined, [
    'outline',
    'text',
    'required',
    'showHint',
    'disabled'
]);
const InoList = /*@__PURE__*/ defineContainer('ino-list', undefined, [
    'dense',
    'twoLines',
    'avatar'
]);
const InoListDivider = /*@__PURE__*/ defineContainer('ino-list-divider', undefined, [
    'betweenLists',
    'padded',
    'inset'
]);
const InoListItem = /*@__PURE__*/ defineContainer('ino-list-item', undefined, [
    'text',
    'secondaryText',
    'selected',
    'activated',
    'disabled',
    'clickEl'
]);
const InoMenu = /*@__PURE__*/ defineContainer('ino-menu', undefined, [
    'placement'
]);
const InoNavItem = /*@__PURE__*/ defineContainer('ino-nav-item', undefined, [
    'text',
    'subText',
    'activated',
    'disabled'
]);
const InoOption = /*@__PURE__*/ defineContainer('ino-option', undefined, [
    'disabled',
    'selected',
    'value',
    'clickEl'
]);
const InoOptionGroup = /*@__PURE__*/ defineContainer('ino-option-group', undefined, [
    'label'
]);
const InoProgressBar = /*@__PURE__*/ defineContainer('ino-progress-bar', undefined, [
    'buffer',
    'indeterminate',
    'label',
    'reversed',
    'progress'
]);
const InoRadio = /*@__PURE__*/ defineContainer('ino-radio', undefined, [
    'checked',
    'disabled',
    'name',
    'value',
    'checkedChange'
], 'checked', 'v-checkedChange', 'checkedChange');
const InoRadioGroup = /*@__PURE__*/ defineContainer('ino-radio-group', undefined, [
    'value'
]);
const InoRange = /*@__PURE__*/ defineContainer('ino-range', undefined, [
    'disabled',
    'colorScheme',
    'discrete',
    'markers',
    'name',
    'min',
    'max',
    'value',
    'step',
    'valueChange'
], 'value', 'v-valueChange', 'valueChange');
const InoSegmentButton = /*@__PURE__*/ defineContainer('ino-segment-button', undefined, [
    'checked',
    'disabled',
    'dense',
    'name',
    'value',
    'checkedChange'
]);
const InoSegmentGroup = /*@__PURE__*/ defineContainer('ino-segment-group', undefined, [
    'name',
    'value'
]);
const InoSelect = /*@__PURE__*/ defineContainer('ino-select', undefined, [
    'disabled',
    'name',
    'required',
    'showLabelHint',
    'label',
    'outline',
    'value',
    'valueChange'
], 'value', 'v-valueChange', 'valueChange');
const InoSidebar = /*@__PURE__*/ defineContainer('ino-sidebar', undefined, [
    'alignRight',
    'open',
    'name',
    'openChange'
]);
const InoSpinner = /*@__PURE__*/ defineContainer('ino-spinner', undefined, [
    'type',
    'colorScheme',
    'modal',
    'height',
    'width'
]);
const InoSwitch = /*@__PURE__*/ defineContainer('ino-switch', undefined, [
    'checked',
    'disabled',
    'name',
    'colorScheme',
    'checkedChange'
], 'checked', 'v-checkedChange', 'checkedChange');
const InoTable = /*@__PURE__*/ defineContainer('ino-table', undefined);
const InoTableCell = /*@__PURE__*/ defineContainer('ino-table-cell', undefined, [
    'numeric'
]);
const InoTableRow = /*@__PURE__*/ defineContainer('ino-table-row', undefined, [
    'headerRow',
    'selected'
]);
const InoTextarea = /*@__PURE__*/ defineContainer('ino-textarea', undefined, [
    'autoFocus',
    'cols',
    'disabled',
    'maxlength',
    'minlength',
    'showCharacterCounter',
    'name',
    'placeholder',
    'required',
    'showLabelHint',
    'rows',
    'value',
    'outline',
    'autogrow',
    'label',
    'inoBlur',
    'valueChange'
], 'value', 'v-valueChange', 'valueChange');

const needsKebabCase = (version) => !['3.0.0', '3.0.1', '3.0.2', '3.0.3', '3.0.4', '3.0.5'].includes(version);

/**
 * We need to make sure that the web component fires an event
 * that will not conflict with the user's @ionChange binding,
 * otherwise the binding's callback will fire before any
 * v-model values have been updated.
 */
const toLowerCase = (eventName) => eventName.toLowerCase();
const toKebabCase = (eventName) => eventName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
/**
 * Vue 3.0.6 fixed a bug where events on custom elements
 * were always converted to lower case, so "ionRefresh"
 * became "ionRefresh". We need to account for the old
 * issue as well as the new behavior where "ionRefresh"
 * is converted to "ion-refresh".
 * See https://github.com/vuejs/vue-next/pull/2847
 */
const getHelperFunctions = (needsKebabCase = true) => {
    const conversionFn = (needsKebabCase) ? toKebabCase : toLowerCase;
    return {
        ael: (el, eventName, cb, opts) => el.addEventListener(conversionFn(eventName), cb, opts),
        rel: (el, eventName, cb, opts) => el.removeEventListener(conversionFn(eventName), cb, opts),
        ce: (eventName, opts) => new CustomEvent(conversionFn(eventName), opts)
    };
};
const ElementsVue = {
    async install(app) {
        if (typeof window !== 'undefined') {
            const { ael, rel, ce } = getHelperFunctions(needsKebabCase(app.version));
            await loader.applyPolyfills();
            await loader.defineCustomElements(window, {
                exclude: ['ino-tabs'],
                ce,
                ael,
                rel
            });
        }
    }
};

// @ts-ignore
icons_js.addIcons(index_esm_js.ICON_PATHS);

exports.ElementsVue = ElementsVue;
exports.InoAutocomplete = InoAutocomplete;
exports.InoButton = InoButton;
exports.InoCard = InoCard;
exports.InoCarousel = InoCarousel;
exports.InoCarouselSlide = InoCarouselSlide;
exports.InoCheckbox = InoCheckbox;
exports.InoChip = InoChip;
exports.InoChipSet = InoChipSet;
exports.InoControlItem = InoControlItem;
exports.InoDatepicker = InoDatepicker;
exports.InoFab = InoFab;
exports.InoFabSet = InoFabSet;
exports.InoFormRow = InoFormRow;
exports.InoHeader = InoHeader;
exports.InoIconButton = InoIconButton;
exports.InoImg = InoImg;
exports.InoImgList = InoImgList;
exports.InoInput = InoInput;
exports.InoInputFile = InoInputFile;
exports.InoLabel = InoLabel;
exports.InoList = InoList;
exports.InoListDivider = InoListDivider;
exports.InoListItem = InoListItem;
exports.InoMenu = InoMenu;
exports.InoNavItem = InoNavItem;
exports.InoOption = InoOption;
exports.InoOptionGroup = InoOptionGroup;
exports.InoProgressBar = InoProgressBar;
exports.InoRadio = InoRadio;
exports.InoRadioGroup = InoRadioGroup;
exports.InoRange = InoRange;
exports.InoSegmentButton = InoSegmentButton;
exports.InoSegmentGroup = InoSegmentGroup;
exports.InoSelect = InoSelect;
exports.InoSidebar = InoSidebar;
exports.InoSpinner = InoSpinner;
exports.InoSwitch = InoSwitch;
exports.InoTable = InoTable;
exports.InoTableCell = InoTableCell;
exports.InoTableRow = InoTableRow;
exports.InoTextarea = InoTextarea;
//# sourceMappingURL=index.js.map
