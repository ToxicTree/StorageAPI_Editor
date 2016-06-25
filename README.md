# StorageAPI_Editor
Editor for StorageAPI

#### About
Experimental node-module that can be added to my VueInterface.

#### Install
    npm install storageapi-editor
    
#### Use
    var editor_component = require('storageapi-editor')
    
    new Vue({
        ...
        components: { ..., editor_component, ... },
        ...
    })

#### Include in VueInterface/components.json
    exports.Editor = require('storageapi-editor')
