import './component';
import './preview';

const slots = {};
for (let index = 1; index <= 3; index += 1) {
  slots[`image-${index}`] = {
    type: 'image',
    default: {
      config: {
        displayMode: { source: 'static', value: 'cover' },
        minHeight: { source: 'static', value: '180px' },
      },
    },
  };
  slots[`card-${index}`] = 'content-card';
}

Shopware.Service('cmsService').registerCmsBlock({
  name: '3-cards-with-image',
  label: 'vierpunkt-theme.cms.blocks.threeCardsWithImage.label',
  category: 'text-image',
  component: 'sw-cms-block-3-cards-with-image',
  previewComponent: 'sw-cms-preview-3-cards-with-image',
  defaultConfig: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots,
});
