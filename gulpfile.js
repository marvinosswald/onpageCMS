var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.config.js.browserify.transformers.push({
    name: 'browserify-css',
    options: {
        global: true
    }
});
elixir.config.js.browserify.transformers[0].options = {
    presets: ["es2016","es2015","react"],
    plugins: ["transform-class-properties"]
};
elixir(function(mix) {
    mix.browserify('opCMS.js');
});