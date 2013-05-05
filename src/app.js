$(function() {
    "use strict";
    window.App = Ember.Application.create();

    App.ApplicationController = Ember.Controller.extend({
        sources: ['designporn', 'earthporn'],

        init: function() {
            var images = this.getImagesForSource(this.sources[0]);
            images.forEach(function(thread) {
                var view = Ember.View.create({
                    templateName: 'thread'
                });
            });
        },
        
        getImagesForSource: function(source) {
            var URL = "HTTP://TODO PUT API URL HERE JSONP=TRUE"
            $.getJSON(URL, function(res) {
                console.log(res);
            });
            return ["4667225", "5314887"];
        },
    });
});
