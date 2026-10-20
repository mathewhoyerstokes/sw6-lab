import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: '3-cards-with-background-image',
  label: 'vierpunkt-theme.cms.blocks.threeCardsWithBackgroundImage.label',
  category: 'text',
  component: 'sw-cms-block-3-cards-with-background-image',
  previewComponent: 'sw-cms-preview-3-cards-with-background-image',
  defaultConfig: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots: {
    'card-1': 'background-card',
    'card-2': 'background-card',
    'card-3': 'background-card',
  },
});
