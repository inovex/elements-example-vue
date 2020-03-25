<template>
    <div>
        <ino-input
                :ino-placeholder="userPlaceholder"
                :value="userValue"
                @valueChange="onValueChange($event.detail)"
                ino-type="text"
                ino-icon-leading="true"
        >
            <ino-icon slot="ino-icon-leading" ino-icon="users"></ino-icon>
        </ino-input>
    </div>
</template>

<script>
    export default {
        name: 'TestComponent',
        data () {
            return {
                userValue: 'Freaky Fox',
                userPlaceholder: 'Username'
            };
        },
        methods: {
            onValueChange: function (newUsername) {
                this.userValue = newUsername
            }
        }
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
