import template from './sw-cms-el-promo-image-text-hero.html.twig';
import './sw-cms-el-promo-image-text-hero.scss';

Shopware.Component.register('sw-cms-el-promo-image-text-hero', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  created() { this.initElementConfig('promo-image-text-hero'); },
});
