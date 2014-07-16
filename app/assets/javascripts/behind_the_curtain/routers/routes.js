define(function(require){

  var Backbone = require('backbone');
  var HomeView = require('../views/home');
  var ArtistDetail = require('../models/artistdetail');
  var ArtistDetailView = require('../views/artistdetail');
  var ProducerDetail = require('../models/producerdetail');
  var ProducerDetailView = require('../views/producerdetail');

  var CurtainRouter = Backbone.Router.extend({
    routes: {
      'home': 'home',
      'producer/:query': 'producers',
      'artist/:query': 'artists',
      '*default': 'home'
    },

    setView: function(view) {
      if (this.view) {
        this.view.remove();
      }

      this.view = view;
      this.view.render().appendTo('#main');
    },

    home: function() {
      var view = new HomeView();
      this.setView(view);
    },

    producers: function(query) {
      var model = new ProducerDetail({query: query});
      var view = new ProducerDetailView({model: model});
      this.setView(view);
      model.fetch({parse: true});
    },

    artists: function(query) {
      var model = new ArtistDetail({query: query});
      var view = new ArtistDetailView({model: model});
      this.setView(view);
      model.fetch();
    }
  });

  return new CurtainRouter();
});
