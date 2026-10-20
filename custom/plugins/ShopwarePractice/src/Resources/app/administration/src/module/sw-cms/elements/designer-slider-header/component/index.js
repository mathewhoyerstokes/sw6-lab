import template from './sw-cms-el-designer-slider-header.html.twig';
import './sw-cms-el-designer-slider-header.scss';
Shopware.Component.register('sw-cms-el-designer-slider-header', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  created() { this.initElementConfig('designer-slider-header'); },
});
