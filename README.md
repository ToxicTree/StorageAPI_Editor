# StorageAPI_Editor
Editor for StorageAPI

#### About
Experimental vue component & node-module that can be added to my VueInterface.

#### Install to folder
    git clone https://github.com/ToxicTree/StorageAPI_Editor.git
    cd StorageAPI_Editor
    npm install

#### Install to project
    npm install storageapi-editor
   
#### Use
    var Editor = require('../StorageAPI_Editor') // From cloned folder
    
    var Editor = require('storageapi-editor') // From installed npm-package
    
    new Vue({
        ...
        components: { ..., Editor, ... },
        ...
    })

#### Include in VueInterface/components.json
    exports.Editor = require('storageapi-editor')

#### Problems?
    Give up and copy contents of source, then paste it into a new file in project...

    I´m using laravel-elixir & laravel-elixir-vueify to bundle .vue files.
