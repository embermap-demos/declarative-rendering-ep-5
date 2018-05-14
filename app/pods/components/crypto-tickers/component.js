import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import $ from 'jquery';

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);

    this.get('pollCurrencies').perform();
  },

  pollCurrencies: task(function*() {
    while (true) {
      let currencies = yield $.getJSON('/currencies');
      this.set('currencies', currencies);

      yield timeout(1000);
    }
  }).drop()

});
