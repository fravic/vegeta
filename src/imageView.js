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
            this.dom = $("#img_" + a.id);
            this.dom.hammer().on("drag", this.drag);
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
            var deg = prog * 40;
            var left = prog * 200;
            var top = prog * 100;
            this.dom.css({
                transform: "rotate(" + deg + "deg)",
                left: left + "px",
                top: top + "px",
            });
        },
    });
});
