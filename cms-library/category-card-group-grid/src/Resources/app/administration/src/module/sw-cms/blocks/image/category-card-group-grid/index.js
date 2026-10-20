import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'category-card-group-grid',
  label: 'vierpunkt-theme.cms.blocks.categoryCardGroupGrid.label',
  category: 'image',
  component: 'sw-cms-block-category-card-group-grid',
  previewComponent: 'sw-cms-preview-category-card-group-grid',
  defaultConfig: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots: {
    'category-1': 'category-card',
    'category-2': 'category-card',
    'category-3': 'category-card',
    'category-4': 'category-card',
  },
});
