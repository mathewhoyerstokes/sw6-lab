import template from './sw-cms-el-masonry-grid-title.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-masonry-grid-title', {
  template,
  mixins: [
    Mixin.getByName('cms-element'),
  ],
  created() {
    this.initElementConfig('masonry-grid-title');
  },
});
