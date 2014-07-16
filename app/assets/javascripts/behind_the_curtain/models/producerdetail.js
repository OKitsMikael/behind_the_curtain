define(function(require) {
  var Backbone = require('backbone');

  var ProducerDetail = Backbone.Model.extend({
    defaults: {
      query: '',
      tracks: []
    },

    url: function() {
      return 'https://www.googleapis.com/freebase/v1/search?indent=true&query=' + this.get('query') +'&filter=(all%20type:/music/producer)&output=(/music/producer/tracks_produced)';
    },

    parse: function(data) {
      var populate = {};
      populate.tracks = data.result[0].output['/music/producer/tracks_produced']['/music/producer/tracks_produced'];

      return populate;
    },

    hasOutput: function() {
      return true;
    }

  });

  return ProducerDetail;

});
