import template from './sw-cms-el-config-brand-logo-grid-title.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-brand-logo-grid-title', {
  template,
  emits: ['element-update'],
  mixins: [
    Mixin.getByName('cms-element'),
  ],
  created() {
    this.initElementConfig('brand-logo-grid-title');
  },
  methods: {
    onElementUpdate() {
      this.$emit('element-update', this.element);
    },
  },
});
