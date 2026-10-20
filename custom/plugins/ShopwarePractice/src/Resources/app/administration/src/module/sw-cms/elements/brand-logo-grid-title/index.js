import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'brand-logo-grid-title',
  label: 'vierpunkt-theme.cms.brandLogoGrid.headline',
  component: 'sw-cms-el-brand-logo-grid-title',
  configComponent: 'sw-cms-el-config-brand-logo-grid-title',
  previewComponent: 'sw-cms-el-preview-brand-logo-grid-title',
  hidden: true,
  defaultConfig: {
    headline: {
      source: 'static',
      value: '',
    },
  },
});
