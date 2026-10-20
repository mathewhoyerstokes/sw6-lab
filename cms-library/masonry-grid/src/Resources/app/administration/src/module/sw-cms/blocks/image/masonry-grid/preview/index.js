import template from './sw-cms-preview-masonry-grid.html.twig';
import './sw-cms-preview-block-masonry-grid.scss';

const { Component } = Shopware;

Component.register('sw-cms-preview-masonry-grid', {
  template,

  computed: {
    assetFilter() {
      return Shopware.Filter.getByName('asset');
    },
  },
});
