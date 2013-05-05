var app = app || {};

$(function($) {
    "use strict";

    app.ImageView = Backbone.View.extend({
        MAX_DRAG_X: 300,

        templateName: 'image',

        initialize: function(a) {
            _.bindAll(this);

            var template = Handlebars.compile($("#tmpl-image").html());
            $(".app").append(template({image: a.image, id: a.id}));

            $("#img_" + a.id).hammer().on("drag", this.drag);
        },

        drag: function(evt) {
            if (!evt.gesture) {
                return;
            }
            this.setDragProgress(evt.gesture.deltaX / this.MAX_DRAG_X);
            evt.stopPropagation();
            return false;
        },

        dragLeave: function() {
        },

        setDragProgress: function(prog) {
            prog = Math.min(Math.max(prog, 0), 1);
        },
    });
});
