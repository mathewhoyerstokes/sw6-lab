import template from './sw-cms-el-brand-logo-grid-title.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-brand-logo-grid-title', {
  template,
  emits: ['element-update', 'update:element'],
  mixins: [
    Mixin.getByName('cms-element'),
  ],
  created() {
    this.initElementConfig('brand-logo-grid-title');
  },
  methods: {
    onHeadlineChange(value) {
      this.element.config.headline.value = value;
      this.$emit('element-update', this.element);
      this.$emit('update:element', this.element);
    },
  },
});
