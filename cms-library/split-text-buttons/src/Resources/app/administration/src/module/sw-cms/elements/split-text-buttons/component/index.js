import template from './sw-cms-el-split-text-buttons.html.twig';
import './sw-cms-el-split-text-buttons.scss';

Shopware.Component.register('sw-cms-el-split-text-buttons', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  computed: {
    panelStyle() {
      return {
        backgroundColor: this.element.config.backgroundColor.value || 'transparent',
        color: this.element.config.textColor.value || 'inherit',
      };
    },
    orderedColumns() { return this.element.config.headlineOnRight.value ? ['content', 'heading'] : ['heading', 'content']; },
  },
  created() { this.initElementConfig('split-text-buttons'); },
});
