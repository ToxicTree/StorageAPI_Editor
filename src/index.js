/**
 * Building the module:
 * $ gulp --production
 *
 * This will vueify the module and create a .js file
 * When that file is required, it will run the function below
 */

import EditorModule from './Index.vue'

module.exports = (function(){
    
    // Register component
    Vue.component('storageapi_editor',EditorModule);

})();
