import template from './sw-cms-el-content-card.html.twig';
import './sw-cms-el-content-card.scss';

Shopware.Component.register('sw-cms-el-content-card', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  computed: {
    imageUrl() {
      return this.element.data?.media?.url || this.element.config.imageUrl?.value || '';
    },
  },
  created() {
    this.initElementConfig('content-card');
    this.initElementData('content-card');
  },
});
