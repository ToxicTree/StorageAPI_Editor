// module.js - Export the editor as a module

// Check dependencies
if (!window.Vue)
    window.Vue = require('vue');
require('vue-resource');

// Get the editor
const StorageAPI_Editor = require('./StorageAPI_Editor.vue');

// Export
module.exports = StorageAPI_Editor;
