define(function(require) {

  var Backbone = require('backbone');
  var searchResults = require('../models/search');
  var _ = require('underscore');

  var SearchView = Backbone.View.extend({
    el: '#search',

    initialize: function() {
      this.listenTo(this.collection, 'sync', this.render);
      this.render();
    },

    render: function() {
      // this will generate a list of search results based on the current model data.
      var producerList = '';
      var artistList = '';

      this.$('#producer-results').show();
      this.$('#artist-results').show();

      this.collection.each(function(model) {

        var producers = model.get('output')['/music/recording/producer']['/music/recording/producer'];

        var artists = model.get('output')['/music/recording/artist']['/music/recording/artist'];

        if (producers) {
          _.each(producers, function(producer) {
            producerList += '<li><a href="#producer/' + encodeURI(producer.name) + '">'+ producer.name +'</a></li>';
          });

        } else {
          this.$('#producer-results').hide();

        }

        _.each(artists, function(artist) {
          artistList += '<li><a href="#artist/' + encodeURI(artist.name) + '">'+ artist.name +'</a></li>';
        });

      });

      this.$('[name="producer-results"]').html(producerList).trigger('change');

      this.$('[name="artist-results"]').html(artistList).trigger('change');
    },

    events: {
      'submit': 'onSubmit',
      // 'change [name="producer-results"]': 'onSelectResult',
      // 'change [name="artist-results"]': 'onSelectResult'
    },

    onSubmit: function(evt) {
      evt.preventDefault();
      var searchTerm = this.$('[name="search"]').val();
      this.collection.search(searchTerm);
      this.$('input').val('');
    },

    onSelectResult: function(evt) {
      evt.preventDefault();
      var selection = this.$(evt.target).val();
      window.location.hash = selection;
    }
  });

  return new SearchView({collection: searchResults});
});
