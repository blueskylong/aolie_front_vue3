<template>
  <router-view></router-view>
</template>
<script lang="ts">
  import {Options, Vue} from 'vue-class-component'

  @Options({})
  export default class extends Vue {

  }
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;

  }

  #nav {
    padding: 30px;
    width: 100%;
    height: 100%;

    a {
      font-weight: bold;
      color: #73879C;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .navbar-nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
</style>
