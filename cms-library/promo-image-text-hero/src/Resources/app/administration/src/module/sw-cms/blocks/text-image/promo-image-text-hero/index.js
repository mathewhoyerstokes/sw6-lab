import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'promo-image-text-hero',
  category: 'text-image',
  label: 'vierpunkt-theme.cms.blocks.promoImageTextHero.label',
  component: 'sw-cms-block-promo-image-text-hero',
  previewComponent: 'sw-cms-preview-promo-image-text-hero',
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
    content: 'promo-image-text-hero',
  },
});
