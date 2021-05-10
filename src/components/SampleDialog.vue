<template>
  <ino-dialog ino-open="true" ino-permanent="false">
    <div slot="header">
      {{ title }} {{ name }}
    </div>
    <div>
      {{ message }}
    </div>
    <div slot="footer">
      <ino-fab
          ino-label="Close"
          ino-mini
          ino-tooltip-placement="right"
          ino-edge-position="none"
          @click="() => this.$emit('close')"
      >
        <ino-icon ino-icon="add" slot="ino-icon-leading" />
      </ino-fab>
    </div>
  </ino-dialog>
</template>

<script>

const dummyText =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ' +
    'At vero eos et accusam et justo duo dolores et ea rebum.';

export default {
  name: "SampleDialog",
  props: {
    title: {
      type: String,
      default: () =>  'Mr.'
    },
    name: {
      type: String,
      default: () => 'Robot'
    },
    birthday: {
      type: String,
      default: () => '0001-01-01'
    },
    message: {
      type: String,
      default: () => dummyText
    }
  }
}
</script>
