# StorageAPI_Editor
Editor for [StorageAPI](https://github.com/ToxicTree/StorageAPI)

#### About
Experimental vue component & node-module.

#### Install to folder
    git clone https://github.com/ToxicTree/StorageAPI_Editor.git
    cd StorageAPI_Editor
    npm install

#### Install to project
    npm install storageapi-editor --save
   
#### Use
    var Editor = require('../StorageAPI_Editor') // From cloned repo folder
    
    var Editor = require('storageapi-editor') // From installed npm-package
    
    new Vue({
        ...
        components: { ..., Editor, ... },
        ...
    })

#### Include in VueInterface/components.json
    exports.Editor = require('storageapi-editor')

#### Problems?
I was having alot of problems when trying to require this from node_modules and from repo-folder using the same browserify-setup.
    
If you are using gulp, browserify & laravel-elixir to bundle your project:
    
make sure that you don´t require laravel-elixir-vueify in your .gulpfile and add vueify to your package.json instead:
    
    "dependencies": {
        "gulp": "^3.9.1",
        "laravel-elixir": "5.0.0",
        "laravel-elixir-vueify": "^1.0.3",
        "storageapi-editor": "^1.0.0"
    },
    "browserify": {
        "transform": [
            [
                "babelify", { "presets": ["es2015"] }
            ],
            [
                "vueify",
                {}
            ]
        ]
    }

See [VueInterface](https://github.com/ToxicTree/VueInterface) for a example.
