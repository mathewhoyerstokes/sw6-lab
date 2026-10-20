import template from './sw-cms-block-promo-switcher-text-image-hero.html.twig';
import './sw-cms-block-promo-switcher-text-image-hero.scss';

Shopware.Component.register('sw-cms-block-promo-switcher-text-image-hero', {
  template,
  props: {
    block: { type: Object, required: true },
  },
  computed: {
    orderedSlots() {
      const content = this.block.slots.find(slot => slot.slot === 'content');
      return content?.config?.imageOnRight?.value ? ['content', 'image'] : ['image', 'content'];
    },
  },
});
