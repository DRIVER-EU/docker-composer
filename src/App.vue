<template>
  <csapp></csapp>
</template>

<script>
import * as cs from "@csnext/cs-client";

export default {
  name: "app",
  components: {
    csapp: cs.csapp
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};

this.app = cs.AppState.Instance;
this.app.project = {
  title: "VAA FLEX",
  navigation: {
    style: "top"
  },
  left: {
    open: false,
    title: "Dashboards"
  },
  footer: {
    enabled: true,
    text: "Test footer"
  },
  dashboards: [
    {
      path: "/",
      manager: "single",
      title: "Home",
      widgets: [{ component: null }]
    }
  ]
};

this.app.Init();
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
