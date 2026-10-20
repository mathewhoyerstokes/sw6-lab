import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'category-background-card',
  label: 'vierpunkt-theme.cms.categoryBackgroundCard.label',
  component: 'sw-cms-el-category-background-card',
  configComponent: 'sw-cms-el-config-category-background-card',
  previewComponent: 'sw-cms-el-preview-category-background-card',
  defaultConfig: {
    category: { source: 'static', value: null, entity: { name: 'category' } },
  },
});
