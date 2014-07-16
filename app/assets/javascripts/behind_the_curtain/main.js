define(function(require) {

  var jquery_ujs = require('jquery_ujs');
  var Backbone = require('backbone');

  var searchView = require('./views/search');
  var router = require('./routers/routes');

  Backbone.history.start();

  $(document).ready(function(){
    $('#producer-results').hide();
    $('#artist-results').hide();

  });

});
