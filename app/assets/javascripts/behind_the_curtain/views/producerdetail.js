define(function(require) {
  var Backbone = require('backbone');
  var _ = require('underscore');
  var detailHTML = require('text!../templates/producerdetail.html');

  var ProducerDetailView = Backbone.View.extend({
    tagName: 'div',

    template: _.template(detailHTML),

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {

      var rendered = this.template({tracks: this.model.get('tracks')});
      return this.$el.html(rendered);
    }

  });

  return ProducerDetailView;

});
