
this.Backend = {};

Backend.getSubreddits = function() {
  var jsonObj = [];
  jsonObj.push({subreddit: 'EarthPorn'});
  return jsonObj;
};

Backend.getImages = function(subreddit, width) { 
  var source = 'http://www.reddit.com/r/' + subreddit + '/hot.json?jsonp=?';

  var images = []
  $.getJSON(source,
    function(data) { 
      $.each(data.data.children, function (i, item) { 
        img = item.data.url;
        subimg = img.substring(img.length - 3);
        if ( subimg == 'jpg' || subimg == 'png') {  
          imagizer = "http://imagizer.imageshack.us/" + width + "xf/" + img;
          $("<img/>").attr("src",imagizer).appendTo("#images");
        }
    });
  });

};

