define(function(require) {

  var Backbone = require('backbone');

  var SearchResult = Backbone.Model.extend({
    defaults: {
      name: '',
      output: {}
    }
  });

  var SearchResults = Backbone.Collection.extend({
    model: SearchResult,
    searchTerm: '',

    url: function() {
      return 'https://www.googleapis.com/freebase/v1/search?indent=true&query=' + escape(this.searchTerm) + '&filter=(all%20type:/music/recording)&output=(/music/recording/producer%20/music/recording/artist)';
    },

    search: function(keyword) {
      this.searchTerm = keyword;
      this.fetch();
    },

    parse: function(data) {
      return data.result[0];
    }
  });

  return new SearchResults();
});
