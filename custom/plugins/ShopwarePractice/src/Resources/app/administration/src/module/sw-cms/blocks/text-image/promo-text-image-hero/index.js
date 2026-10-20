import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'promo-text-image-hero',
  category: 'text-image',
  label: 'vierpunkt-theme.cms.blocks.promoTextImageHero.label',
  component: 'sw-cms-block-promo-text-image-hero',
  previewComponent: 'sw-cms-preview-promo-text-image-hero',
  defaultConfig: {
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: null,
    marginRight: null,
    sizingMode: 'boxed',
  },
  slots: {
    image: {
      type: 'image',
      default: {
        config: {
          displayMode: { source: 'static', value: 'cover' },
          minHeight: { source: 'static', value: '340px' },
        },
      },
    },
    content: 'promo-text-image-hero',
  },
});
