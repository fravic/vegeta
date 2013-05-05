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
            $(".image", this.dom).hammer().on("drag", this.drag);
            $(".dropbox-icon", this.dom).hide();
            $(".garbage-icon", this.dom).hide();
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
            prog = Math.min(Math.max(prog, -1), 1);
            var deg = prog * 40;
            var left = prog * 400;
            var top = Math.abs(prog) * 100;
            var opacity = 1 - prog/1.5;
            $(".image", this.dom).css({
                transform: "rotate(" + deg + "deg)",
                left: left + "px",
                top: top + "px",
                opacity: opacity,
            });

            var db = $(".dropbox-icon", this.dom);
            var gb = $(".garbage-icon", this.dom);
            if (prog > 0) {
                var dbLeft = 50 + prog * 100;
                db.show();
                gb.hide();
                db.css({opacity: prog, left: dbLeft});
            } else {
                var gbRight = 50 + Math.abs(prog) * 100;
                gb.show();
                db.hide();
                gb.css({opacity: Math.abs(prog), right: gbRight});
            }
        },
    });
});
