import './component';
import './preview';

const slots = {
  title: {
    type: 'masonry-grid-title',
    default: {
      config: {
        headline: {
          source: 'static',
          value: 'Grid title',
        },
      },
    },
  },
};

for (let index = 1; index <= 10; index += 1) {
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
      },
    },
  };
}

Shopware.Service('cmsService').registerCmsBlock({
  name: 'masonry-grid',
  label: 'vierpunkt-theme.cms.blocks.masonryGrid.label',
  category: 'image',
  component: 'sw-cms-block-masonry-grid',
  previewComponent: 'sw-cms-preview-masonry-grid',
  defaultConfig: {
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: null,
    marginRight: null,
    sizingMode: 'boxed',
  },
  slots,
});
