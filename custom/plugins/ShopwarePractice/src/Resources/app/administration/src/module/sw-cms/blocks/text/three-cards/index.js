import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'three-cards',
  label: 'vierpunkt-theme.cms.blocks.threeCards.label',
  category: 'text',
  component: 'sw-cms-block-three-cards',
  previewComponent: 'sw-cms-preview-three-cards',
  defaultConfig: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots: {
    'card-1': 'content-card',
    'card-2': 'content-card',
    'card-3': 'content-card',
  },
});
