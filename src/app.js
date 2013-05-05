var app = app || {};

$(function($) {
    "use strict";

    window.addEventListener("load",function() {
        // Set a timeout...
        setTimeout(function(){
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);
    });

    app.AppView = Backbone.View.extend({
        SOURCES: ['DesignPorn', 'EarthPorn'],

        IMAGE_PADDING: 30,

        initialize: function() {
            _.bindAll(this);

            var width;
            width = $("BODY").width() - this.IMAGE_PADDING;
            this.getImagesForSubreddit(this.SOURCES[0], width, this.renderImages);

            $("HEADER .arrow, HEADER .title").click(this.headerClick);
        },

        headerClick: function() {
            if ($("HEADER").hasClass("fullHeight")) {
                $("HEADER").removeClass("fullHeight");
                $("HEADER .expand").fadeOut(function() {
                    $("HEADER .expand").remove();
                });
            } else{
                var template = Handlebars.compile($("#tmpl-header").html());
                $("HEADER").append(template({items: this.SOURCES}));
                $("HEADER").addClass("fullHeight");
                $("HEADER .expand").hide();
                $("HEADER .expand").fadeIn();

                $("HEADER .expand LI").click(this.headerLinkClick);
            }
        },

        headerLinkClick: function(evt) {
           var width;
            width = $("BODY").width() - this.IMAGE_PADDING;
            this.getImagesForSubreddit(evt.toElement.lastChild.data, width, this.renderImages);
        },
        
        getImagesForSubreddit: function(subreddit, width, callback) {
            $(".title").html(subreddit);

            var source = 'http://www.reddit.com/r/' + subreddit + '/hot.json?jsonp=?';

            $.getJSON(
                source,
                function(data) {
                    var images = [];
                    $.each(data.data.children, function (i, item) { 
                        var img, subimg;
                        img = item.data.url;
                        subimg = img.substring(img.length - 3);
                        if ( subimg == 'jpg' || subimg == 'png') {  
                            images.push("http://imagizer.imageshack.us/" + width + "xf/" + img);
                        }
                    });
                    callback(images);
                }
            );
        },

        renderImages: function(images) {
            $(".image-contain").addClass("kill");
            $(".kill").fadeOut(function() {
                $(".kill").remove();
            });

            $.each(images, function(idx, image) {
                new app.ImageView({
                    id: idx,
                    image: image
                });
            });
        }
    });

    var view = new app.AppView();
});
