define(function(require) {
  var Backbone = require('backbone');
  var _ = require('underscore');

  var ArtistDetail = Backbone.Model.extend({
    defaults: {
      query: '',
      images: [],
      name: '',
      uri: '',
      id: '',
      external_urls: {},
      artists: []
    },

    url: function() {
      return 'https://api.spotify.com/v1/search?q='+ this.get('query') + '&type=artist';
    },

    hasID: function() {
      return !!this.get('id');
    },

    hasImage: function() {
      return !!this.get('images').length;
    },

    getImage: function() {
      return this.hasImage() ? this.get('images')[0].url : '';
    },

    getURL: function() {
      return this.get('external_urls')['spotify'];
    },

    parse: function(data) {
      return data.artists.items[0];
    },

    getArtists: function() {
      return this.get('artists');
    },

    hasRelated: function() {
      return !!this.get('artists').length;
    },

    getRelated: function() {
      var thisModel = this;
      $.get('https://api.spotify.com/v1/artists/'+ this.get('id') + '/related-artists', function(data) {
        _.each(data.artists, function(artist) {
          thisModel.get('artists').push(artist);
        });
      }).then(function() {
        // console.log('changed again');
        thisModel.trigger('change');

      });
    }

  });

  return ArtistDetail;

});
