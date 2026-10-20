import template from './sw-cms-el-config-image-panel.html.twig';

Shopware.Component.register('sw-cms-el-config-image-panel', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  created() { this.initElementConfig('image-panel'); },
  methods: {
    updateField(field, value) {
      this.element.config[field] = { ...this.element.config[field], source: 'static', value };
      this.$emit('element-update', this.element);
    },
  },
});
