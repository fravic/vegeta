var app = app || {};

$(function($) {
    "use strict";

    app.ImageView = Backbone.View.extend({
        MAX_DRAG_X: 200,
        url: '',


        initialize: function(a) {
            _.bindAll(this);

            var template = Handlebars.compile($("#tmpl-image").html());
            $(".app").append(template({image: a.image, id: a.id}));
            this.url = a.img;
            this.dom = $("#img_" + a.id);
            $(".image", this.dom).hammer().on("dragright", this.drag);
            $(".image", this.dom).hammer().on("dragleft", this.drag);
            $(".image", this.dom).hammer().on("dragend", this.dragEnd);
            $(".image", this.dom).hammer().on("dragstart", this.dragStart);
            $(".dropbox-icon", this.dom).hide();
            $(".garbage-icon", this.dom).hide();

            document.ontouchmove = function(event){
                event.preventDefault();
            }
        },

        dragStart: function() {
            $(".image", this.dom).removeClass("transition-all");
            this.dom.css({height: $(".image", this.dom).outerHeight() + 14});
            $("BODY, .container, .app").addClass("scroll-disabled");
        },

        drag: function(evt) {
            if (!evt.gesture) {
                return;
            }
            this.setDragProgress(evt.gesture.deltaX / this.MAX_DRAG_X);
            evt.stopPropagation();
            return false;
        },

        dragEnd: function(evt) {
            if (!evt.gesture) {
                return;
            }
            var prog = evt.gesture.deltaX / this.MAX_DRAG_X;
            if (prog >= 1) {
                this.remove();
                try {
                  var xmlHttp = null;
                  xmlHttp = new XMLHttpRequest();
                  xmlHttp.open( "GET", "http://www.willhughes.ca:8888/dropbox?url=" + this.url, false );
                  xmlHttp.send( null );
                }
                catch (err) {
                  console.log(err)
                }
                
            } else if (prog <= -1) {
                this.remove();
            } else {
                $(".image", this.dom).addClass("transition-all");
                this.setDragProgress(0);
            }
            $("BODY, .container, .app").removeClass("scroll-disabled");
        },

        setDragProgress: function(prog) {
            prog = Math.min(Math.max(prog, -1), 1);
            var deg = prog * 10;
            var left = prog * 150;
            var opacity = 1 - prog/1.5;
            $(".image", this.dom).css({
                left: left + "px",
                opacity: opacity,
            });

            var db = $(".dropbox-icon", this.dom);
            var gb = $(".garbage-icon", this.dom);
            if (prog > 0) {
                var dbLeft = 50 + prog * 100;
                db.show();
                gb.hide();
                db.css({opacity: prog});
            } else {
                var gbRight = 50 + Math.abs(prog) * 100;
                gb.show();
                db.hide();
                gb.css({opacity: Math.abs(prog)});
            }
        },

        remove: function() {
            this.dom.addClass("closing transition-all");
            this.dom.css({height: 0});
        }
    });
});
