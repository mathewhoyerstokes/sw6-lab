import './component';
import './config';
import './preview';
Shopware.Service('cmsService').registerCmsElement({
  name: 'linked-category-image-panel',
  label: 'vierpunkt-theme.cms.linkedCategoryImagePanel.label',
  component: 'sw-cms-el-linked-category-image-panel',
  configComponent: 'sw-cms-el-config-linked-category-image-panel',
  previewComponent: 'sw-cms-el-preview-linked-category-image-panel',
  defaultConfig: {
    category: { source: 'static', value: null, entity: { name: 'category' } },
    text: { source: 'static', value: '' },
  },
});
