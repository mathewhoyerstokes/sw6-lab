import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'masonry-grid-title',
  label: 'vierpunkt-theme.cms.masonryGrid.headline',
  component: 'sw-cms-el-masonry-grid-title',
  configComponent: 'sw-cms-el-config-masonry-grid-title',
  previewComponent: 'sw-cms-el-preview-masonry-grid-title',
  hidden: true,
  defaultConfig: {
    headline: {
      source: 'static',
      value: 'Grid title',
    },
  },
});
