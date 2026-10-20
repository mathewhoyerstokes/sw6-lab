import './component';
import './preview';

const slots = {};

for (let index = 1; index <= 4; index += 1) {
  slots[`image-${index}`] = {
    type: 'image',
    default: {
      config: {
        media: {
          source: 'static',
          value: null,
          required: false,
          entity: {
            name: 'media',
          },
        },
        displayMode: {
          source: 'static',
          value: 'standard',
        },
        minHeight: {
          source: 'static',
          value: '80px',
        },
      },
    },
  };

  slots[`title-${index}`] = {
    type: 'brand-logo-grid-title',
    default: {
      config: {
        headline: {
          source: 'static',
          value: '',
        },
      },
    },
  };
}

Shopware.Service('cmsService').registerCmsBlock({
  name: 'brand-logo-grid',
  label: 'vierpunkt-theme.cms.blocks.brandLogoGrid.label',
  category: 'image',
  component: 'sw-cms-block-brand-logo-grid',
  previewComponent: 'sw-cms-preview-brand-logo-grid',
  defaultConfig: {
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: null,
    marginRight: null,
    sizingMode: 'boxed',
  },
  slots,
});
