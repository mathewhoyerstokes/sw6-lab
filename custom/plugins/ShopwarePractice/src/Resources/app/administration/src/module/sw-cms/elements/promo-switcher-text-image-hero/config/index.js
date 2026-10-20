import template from './sw-cms-el-config-promo-switcher-text-image-hero.html.twig';

Shopware.Component.register('sw-cms-el-config-promo-switcher-text-image-hero', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  created() { this.initElementConfig('promo-switcher-text-image-hero'); },
  methods: {
    onElementUpdate() { this.$emit('element-update', this.element); },
  },
});
