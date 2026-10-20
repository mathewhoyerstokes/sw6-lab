import template from './sw-cms-el-promo-text-image-hero.html.twig';
import './sw-cms-el-promo-text-image-hero.scss';

Shopware.Component.register('sw-cms-el-promo-text-image-hero', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  created() { this.initElementConfig('promo-text-image-hero'); },
});
