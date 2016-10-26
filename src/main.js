// main.js - Creating a bundle

// Load dependencies
window.Vue = require('vue');
require('vue-resource');

// Get the editor
const StorageAPI_Editor = require('./Index.vue');

// Launch a new Vue-instance with the editor
new Vue({
  el: '#app',
  render: (h) => h(StorageAPI_Editor)
});
