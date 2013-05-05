var app = app || {};

$(function($) {
    "use strict";

    app.AppView = Backbone.View.extend({
        SOURCES: ['DesignPorn', 'EarthPorn'],

        IMAGE_PADDING: 30,

        initialize: function() {
            var width;
            width = $("BODY").width() - this.IMAGE_PADDING;
            this.getImagesForSubreddit(this.SOURCES[0], width, this.renderImages);
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
