import './component';
import './config';
import './preview';
Shopware.Service('cmsService').registerCmsElement({
  name: 'designer-slider-header',
  label: 'vierpunkt-theme.cms.designerSliderHeader.label',
  component: 'sw-cms-el-designer-slider-header',
  configComponent: 'sw-cms-el-config-designer-slider-header',
  previewComponent: 'sw-cms-el-preview-designer-slider-header',
  defaultConfig: {
    headline: { source: 'static', value: '' },
    subheadline: { source: 'static', value: '' },
  },
});
