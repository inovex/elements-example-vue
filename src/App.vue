<template>
  <div id="app">
    <ino-nav-drawer
        :ino-open="isNavOpen"
        ino-anchor="left"
        @openChange="() => this.isNavOpen = !this.isNavOpen"
    >
      <ino-list slot="content">
        <ino-nav-item ino-text="My Todo List" @click="changeTab(0)">
          <ino-icon ino-icon="menu" />
        </ino-nav-item>
        <ino-nav-item ino-text="My V-Card" @click="changeTab(1)">
          <ino-icon ino-icon="user" />
        </ino-nav-item>
        <ino-nav-item ino-text="Contact me" @click="changeTab(2)">
          <ino-icon ino-icon="onboarding" />
        </ino-nav-item>
        <ino-nav-item ino-text="Gallery" @click="changeTab(3)">
          <ino-icon ino-icon="camera" />
        </ino-nav-item>
      </ino-list>

      <main slot="app">
        <ino-tab-bar
            class="tab-bar"
            :ino-active-tab="currentTab"
            @activeTabChange="onTabChange"
        >
          <ino-tab
              ino-icon="menu"
              ino-label="My Todo List"
          />
          <ino-tab
              ino-icon="user"
              ino-label="My V-Card"
          />
          <ino-tab
              ino-icon="onboarding"
              ino-label="Contact me"
          />
          <ino-tab
              ino-icon="camera"
              ino-label="Gallery"
          />
        </ino-tab-bar>

        <ToDoList v-show="currentTab === 0" />
        <VCard v-show="currentTab === 1" />
        <ContactForm
            v-show="currentTab === 2"
            @submit="onContactFormSubmit"
        />
        <ImageGallery v-show="currentTab === 3" />
      </main>
    </ino-nav-drawer>

    <SampleDialog
        v-if="contractFormData"
        :title="contractFormData.title"
        :name="contractFormData.name"
        :birthday="contractFormData.birthday"
        :message="contractFormData.message"
        @close="() => this.contractFormData = undefined"
    />
    <ino-snackbar
        ino-message="
        Welcome to the elements example project for Vue.js.
        Have fun by exploring the element components :) For more information see:
        https://elements.inovex.de/dist/latest/storybook/?path=/story/docs-home--welcome"
        ino-alignment="center"
        ino-timeout="-1"
    >
    </ino-snackbar>
  </div>
</template>

<script>

import ToDoList from "./components/ToDoList";
import VCard from "./components/VCard";
import ContactForm from "./components/ContactForm";
import ImageGallery from "./components/ImageGallery";
import SampleDialog from "./components/SampleDialog";

export default {
  name: 'TestComponent',
  components: {ImageGallery, ContactForm, VCard, ToDoList, SampleDialog },
  data: () => ({
    currentTab: 0,
    contractFormData: undefined,
    isNavOpen: true
  }),
  methods: {
    onTabChange({detail}) {
      this.changeTab(detail);
    },
    changeTab(tabId) {
      this.currentTab = tabId;
    },
    onContactFormSubmit(data) {
      this.contractFormData = data;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Lato', Helvetica, Verdana, sans-serif;
  text-align: center;
}

.tab-bar {
  display: block;
  margin-bottom: 1rem;
}

main {
  margin: 2vh 7vw 5vh 3vw
}
</style>
