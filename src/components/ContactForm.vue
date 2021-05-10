<template>
  <form id="contact-form" @submit="showFormData">
    <ino-radio-group :value="gender">
      <ino-radio value="m" @checkedChange="() => this.gender = 'm'">male</ino-radio>
      <ino-radio value="f" @checkedChange="() => this.gender = 'f'">female</ino-radio>
      <ino-radio value="o" @checkedChange="() => this.gender = 'o'">other</ino-radio>
    </ino-radio-group>
    <ino-select
        :ino-outline="outlineStyle"
        :value="selectedTitle"
        ino-label="Select your title"
        name="title"
        required
        @valueChange="({detail}) => this.selectedTitle = detail"
    >
      <ino-option v-for="(title, i) in availableTitles" :key="i" :value="title">
        {{ title }}
      </ino-option>
    </ino-select>
    <ino-input
        :ino-outline="outlineStyle"
        :value="name"
        autofocus
        name="firstname"
        placeholder="Enter your name"
        required
        type="text"
        @valueChange="({detail}) => this.name = detail"
    >
      <ino-icon
          slot="ino-icon-leading"
          ino-icon="user"/>
    </ino-input>
    <ino-datepicker
        :ino-outline="outlineStyle"
        :value="birthday"
        ino-helper="Select your birthday"
        ino-helper-persistent
        ino-helper-validation
        ino-label="Your birthday"
        ino-twelf-hour-time
        ino-type="date"
        name="birthday"
        required
        @valueChange="({detail}) => this.birthday = detail"
    />
    <ino-textarea
        :ino-outline="outlineStyle"
        :value="message"
        autogrow
        cols="100"
        ino-label="Your message"
        maxlength="500"
        name="message"
        placeholder="Type your message here"
        required
        rows="3"
        @valueChange="({detail}) => this.message = detail"
    />
    <div class="form-btn-bar">
      <ino-switch
          :checked="outlineStyle"
          name="outline-style"
          @click="() => this.outlineStyle = !this.outlineStyle">
        Use outline style
      </ino-switch>
      <ino-button type="submit">
        <ino-icon ino-icon="onboarding"/>
        Send message
        <ino-icon ino-icon="offboarding"/>
      </ino-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ContactForm",
  data: () => ({
    name: '',
    gender: 'm',
    birthday: '',
    message: '',
    outlineStyle: false,
    selectedTitle: null,
    availableTitles: ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Jr.'],
  }),
  methods: {
    showFormData(e) {
      e.stopImmediatePropagation();
      e.preventDefault();

      this.$emit('submit', {
        title: this.selectedTitle,
        name: this.name,
        birthday: this.birthday,
        message: this.message
      });
    }
  }
}
</script>

<style scoped>
#contact-form > * {
  margin: .5rem .5rem 1.5rem .5rem;
}

.form-btn-bar {
  display: flex;
  justify-content: space-between;
}
</style>
