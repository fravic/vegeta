$(function() {
    "use strict";

    window.App = window.App ? window.App : Ember.Application.create();

    App.ImageView = Ember.View.extend({
        templateName: 'image',

        drag: function() {
            console.log("drag");
            return false;
        }
    });
});
