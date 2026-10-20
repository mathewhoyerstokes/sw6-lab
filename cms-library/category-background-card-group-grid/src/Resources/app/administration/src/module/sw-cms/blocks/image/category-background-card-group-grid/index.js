import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'category-background-card-group-grid',
  label: 'vierpunkt-theme.cms.blocks.categoryBackgroundCardGroupGrid.label',
  category: 'image',
  component: 'sw-cms-block-category-background-card-group-grid',
  previewComponent: 'sw-cms-preview-category-background-card-group-grid',
  defaultConfig: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots: {
    'category-1': 'category-background-card',
    'category-2': 'category-background-card',
    'category-3': 'category-background-card',
    'category-4': 'category-background-card',
  },
});
