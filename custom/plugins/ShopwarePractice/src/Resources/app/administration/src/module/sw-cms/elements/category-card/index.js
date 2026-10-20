import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'category-card',
  label: 'vierpunkt-theme.cms.categoryCard.label',
  component: 'sw-cms-el-category-card',
  configComponent: 'sw-cms-el-config-category-card',
  previewComponent: 'sw-cms-el-preview-category-card',
  defaultConfig: {
    category: { source: 'static', value: null, entity: { name: 'category' } },
  },
});
