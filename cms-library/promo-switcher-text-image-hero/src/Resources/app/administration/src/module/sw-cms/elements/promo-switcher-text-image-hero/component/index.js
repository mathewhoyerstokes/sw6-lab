import template from './sw-cms-el-promo-switcher-text-image-hero.html.twig';
import './sw-cms-el-promo-switcher-text-image-hero.scss';

Shopware.Component.register('sw-cms-el-promo-switcher-text-image-hero', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  created() { this.initElementConfig('promo-switcher-text-image-hero'); },
});
