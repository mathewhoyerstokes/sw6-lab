import template from './sw-cms-preview-brand-logo-grid.html.twig';
import './sw-cms-preview-brand-logo-grid.scss';

const { Component } = Shopware;

Component.register('sw-cms-preview-brand-logo-grid', {
  template,

  computed: {
    assetFilter() {
      return Shopware.Filter.getByName('asset');
    },
  },
});
