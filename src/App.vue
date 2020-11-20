<template>
  <div id="app">
    <h2>Simple To Do App</h2>
    <ino-button>Working</ino-button>
    <!-- The components below do not seem to be working, did the syntax change from v2 to v3? -->
    <ino-input
        ino-placeholder="What to do ..."
        :value="inputText"
        @valueChange="onValueChange($event.detail)"
        ino-type="text"
        ino-icon-trailing="true"
        v-on:keyup.enter="onAdd()"
    >
      <ino-icon ino-clickable @clickEl="onAdd()" ino-icon="add"></ino-icon>
    </ino-input>
    <ino-list>
      <ino-list>
        <ino-list-item v-for="todo in todos" :key="todo" :ino-text="todo">
          <ino-checkbox @checkedChange="onCheck(todo)"></ino-checkbox>
        </ino-list-item>
      </ino-list>
      <ino-list-divider></ino-list-divider>
      <ino-list>
        <ino-list-item v-for="todo in checkedTodos" :key="todo" :ino-text="todo">
          <ino-checkbox checked="true" @checkedChange="onUncheck(todo)"></ino-checkbox>
        </ino-list-item>
      </ino-list>
    </ino-list>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data() {
    return {
      todos: ['Go to the grocery store', 'Clean up desk'],
      checkedTodos: ['Fix bug'],
      inputText: ''
    };
  },
  methods: {
    onValueChange: function (text) {
      this.inputText = text;
    },
    onAdd: function () {
      this.todos = [...this.todos, this.inputText];
      this.inputText = '';
    },
    onCheck: function (checkedTodo) {
      this.todos = this.todos.filter(todo => todo !== checkedTodo);
      this.checkedTodos = [...this.checkedTodos, checkedTodo];

    },
    onUncheck: function (uncheckedTodo) {
      this.checkedTodos = this.checkedTodos.filter(todo => todo !== uncheckedTodo);
      this.todos = [...this.todos, uncheckedTodo];
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 10vw 30vw;
}

h2 {
  color: #003c7e;
}
</style>
