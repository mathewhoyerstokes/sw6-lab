import template from './sw-cms-el-config-designer-slider-header.html.twig';
Shopware.Component.register('sw-cms-el-config-designer-slider-header', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  created() { this.initElementConfig('designer-slider-header'); },
  methods: {
    updateField(field, value) {
      this.element.config[field] = { source: 'static', value };
      this.$emit('element-update', this.element);
    },
  },
});
