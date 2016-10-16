# StorageAPI_Editor
Editor for [StorageAPI](https://github.com/ToxicTree/StorageAPI)

#### About
Experimental Vue-component & node-module.

#### Install to project
    $ npm install storageapi-editor --save

#### Use (Register global component with pre-built bundle)
    // Get dependencies
    window.$ = require('jquery');
    window.Vue = require('vue');
    
    // Require component from installed npm-package (this will register it)
    require('storageapi-editor');

    // You can then use the component in any Vue-instance
    new Vue({
        el: '#app',
        template: "<div><storageapi_editor></storageapi_editor></div>"
    })

#### Use (Require component directly and build together with your app)
    new Vue({
        ...
        components: {
            ...
            'editor' : require('storageapi-editor/src/Index.vue'),
            ...
        },
        ...
        template: "<editor></editor>",
        ...
    });


#### Include component in [VueInterface](https://github.com/ToxicTree/VueInterface)
    //components.json
    exports.storageapi_editor = require('storageapi-editor/src/Index.vue')
