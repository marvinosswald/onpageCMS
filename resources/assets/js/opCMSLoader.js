var loader = {
    uri: 'opcms/js/opCMS.js',
    element: 'activateEditor',
    event: 'dblclick',
    load: function(){
        var newscript = document.createElement('script');
        newscript.type = 'text/javascript';
        newscript.async = true;
        newscript.src = this.uri;
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
    }
};

document.getElementById(loader.element).addEventListener(loader.event, function(e){
    e.preventDefault();
    loader.load();
}, false);