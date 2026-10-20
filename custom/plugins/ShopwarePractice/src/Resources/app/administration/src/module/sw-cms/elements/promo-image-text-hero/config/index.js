import template from './sw-cms-el-config-promo-image-text-hero.html.twig';

Shopware.Component.register('sw-cms-el-config-promo-image-text-hero', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  created() { this.initElementConfig('promo-image-text-hero'); },
  methods: {
    onElementUpdate() { this.$emit('element-update', this.element); },
  },
});
