var gulp = require('gulp');

/*
 * Using laravel-elixir to convert and bundle module.
 */

var elixir = require('laravel-elixir');

elixir(function(mix){

        mix
            .browserify('./src/index.js','./builds/StorageAPI_Editor.js');

})