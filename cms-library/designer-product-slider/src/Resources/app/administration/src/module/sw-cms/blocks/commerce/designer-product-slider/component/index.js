import template from './sw-cms-block-product-slider.html.twig';

Shopware.Component.register('sw-cms-block-designer-product-slider', {
  template,
  props: { block: { type: Object, required: true } },
  computed: {
    hasLegacyDescription() {
      return this.block.slots.find(slot => slot.slot === 'sliderTitle')?.type !== 'designer-slider-header';
    },
  },
  created() { this.upgradeLegacyHeader(); },
  methods: {
    plainText(html) {
      const document = new DOMParser().parseFromString(html || '', 'text/html');
      return (document.body.textContent || '').trim();
    },
    upgradeLegacyHeader() {
      const title = this.block.slots.find(slot => slot.slot === 'sliderTitle');
      const description = this.block.slots.find(slot => slot.slot === 'sliderDescription');
      if (!title || title.type !== 'text') return;
      const titleConfig = title.config?.content || title.translated?.config?.content;
      const descriptionConfig = description?.config?.content || description?.translated?.config?.content;
      // Keep dynamic mappings/custom elements intact; only convert the original static text slots.
      if ((titleConfig && titleConfig.source !== 'static') ||
          (description && (description.type !== 'text' || (descriptionConfig && descriptionConfig.source !== 'static')))) return;
      title.config = {
        headline: { source: 'static', value: this.plainText(titleConfig?.value) },
        subheadline: { source: 'static', value: this.plainText(descriptionConfig?.value) },
      };
      title.type = 'designer-slider-header';
      // Retain the legacy description record for compatibility; the new heading renders both fields.
      // Product selections and slider configuration are never changed here.
    },
  },
});
