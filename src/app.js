$(function() {
    "use strict";
    window.App = Ember.Application.create();

    App.ApplicationController = Ember.Controller.extend({
        sources: ['designporn', 'earthporn'],

        init: function() {
            var width, images, imagesView;
            width = $("BODY").width();
            images = this.getImagesForSubreddit(this.sources[0], width);
            imagesView = Ember.View.create({
                templateName: 'imageList',
                images: images
            });
        },
        
        getImagesForSubreddit: function(subreddit, width) {
            var source = 'http://www.reddit.com/r/' + subreddit + '/hot.json?jsonp=?';

            var images = [];
            $.getJSON(
                source,
                function(data) { 
                    $.each(data.data.children, function (i, item) { 
                        var img, subimg, imagizer;
                        img = item.data.url;
                        subimg = img.substring(img.length - 3);
                        if ( subimg == 'jpg' || subimg == 'png') {  
                            imagizer = "http://imagizer.imageshack.us/" + width + "xf/" + img;
                            $("<img/>").attr("src",imagizer).appendTo("#images");
                        }
                    });
                }
            );
            return images;
        },
    });
});
