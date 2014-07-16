define(function(require) {
  var Backbone = require('backbone');
  var _ = require('underscore');
  var detailHTML = require('text!../templates/artistdetail.html');

  var ArtistDetailView = Backbone.View.extend({
    tagName: 'div',

    template: _.template(detailHTML),

    initialize: function() {
      this.listenTo(this.model, 'sync change', this.render);
    },

    render: function() {
      // make an ajax request to get related artists and save to model
      if(this.model.hasID()) {
        // console.log('has Id');
        this.model.getRelated();
      }
      var rendered = this.template({model: this.model});
      return this.$el.html(rendered);
    }

  });

  return ArtistDetailView;

});
