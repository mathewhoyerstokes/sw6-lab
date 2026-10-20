import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'four-cards-stacked',
  label: 'vierpunkt-theme.cms.blocks.fourCardsStacked.label',
  category: 'text',
  component: 'sw-cms-block-four-cards-stacked',
  previewComponent: 'sw-cms-preview-four-cards-stacked',
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
    'card-4': 'content-card',
  },
});
