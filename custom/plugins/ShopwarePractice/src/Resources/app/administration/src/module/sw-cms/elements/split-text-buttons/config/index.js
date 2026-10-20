import template from './sw-cms-el-config-split-text-buttons.html.twig';

Shopware.Component.register('sw-cms-el-config-split-text-buttons', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  created() { this.initElementConfig('split-text-buttons'); },
  methods: {
    updateField(field, value) {
      this.element.config[field] = { ...this.element.config[field], source: 'static', value };
      this.$emit('element-update', this.element);
    },
  },
});
