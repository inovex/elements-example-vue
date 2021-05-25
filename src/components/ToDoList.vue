<template>
  <div id="todo-list">
    <ino-input
        type="text"
        placeholder="What to do ..."
        :value="inputText"
        @valueChange="({detail}) => this.inputText = detail"
        v-on:keyup.enter="onAdd"
    >
      <ino-icon
          @clickEl="onAdd"
          ino-clickable
          ino-icon="add"
          slot="ino-icon-trailing"
      />
    </ino-input>
    <ino-list>
      <ino-list>
        <ino-list-item
            v-for="(todo, i) in uncheckedTodos" :key="i"
            :ino-text="todo.text">
          <ino-checkbox
              @checkedChange="onCheckedChange(todo)"
              slot="ino-leading"
          />
          <ino-tooltip
              slot="ino-trailing"
              ino-label="Remove item"
              ino-placement="right"
              :ino-for="`remove-unchecked-${i}`" />
          <ino-icon-button
              :id="`remove-unchecked-${i}`"
              slot="ino-trailing"
              ino-icon="remove"
              @click="removeTodo(todo)"
          />
        </ino-list-item>
      </ino-list>
      <ino-list-divider/>
      <ino-list>
        <ino-list-item
            v-for="(todo, i) in checkedTodos" :key="i"
            :ino-text="todo.text">
          <ino-checkbox
              checked="true"
              @checkedChange="onCheckedChange(todo)"
              slot="ino-leading"
          />
          <ino-tooltip
              slot="ino-trailing"
              ino-label="Remove item"
              ino-placement="right"
              :ino-for="`remove-checked-${i}`" />
          <ino-icon-button
              :id="`remove-checked-${i}`"
              slot="ino-trailing"
              ino-icon="remove"
              @click="removeTodo(todo)"
          />
        </ino-list-item>
      </ino-list>
    </ino-list>
    <div class="list-action-buttons">
      <ino-button
          :disabled="isResetButtonDisabled"
          ino-fill="outline"
          @click="resetToDoList">
        Reset ToDo list
      </ino-button>
      <ino-button @click="clearToDoList">Clear ToDo list</ino-button>
    </div>
  </div>
</template>

<script>
const initialToDoList = [{
  text: 'Go to the grocery store',
  checked: false
}, {
  text: 'Clean up desk',
  checked: false
}, {
  text: 'Fix bug',
  checked: true
}];

export default {
  name: "ToDoList",
  data() {
    return {
      todos: [],
      inputText: ''
    };
  },
  mounted() {
    this.resetToDoList();
  },
  computed: {
    uncheckedTodos() {
      return this.todos.filter((todo) => !todo.checked);
    },
    checkedTodos() {
      return this.todos.filter((todo) => todo.checked);
    },
    isResetButtonDisabled() {
      return JSON.stringify(this.todos) === JSON.stringify(initialToDoList)
    }
  },
  methods: {
    onAdd() {
      if (!this.inputText) {
        return;
      }

      this.todos.push({
        text: this.inputText,
        checked: false
      });
      this.inputText = '';
    },
    onCheckedChange(todo) {
      todo.checked = !todo.checked;
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    clearToDoList() {
      this.todos = [];
    },
    resetToDoList() {
      this.todos = JSON.parse(JSON.stringify(initialToDoList));
    }
  }
}
</script>

<style scoped>
.list-action-buttons {
  display: flex;
  justify-content: space-between;
}

ino-menu {
  position: absolute;
  z-index: 1000;
}
</style>
