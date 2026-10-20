import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'split-text-buttons',
  label: 'vierpunkt-theme.cms.splitTextButtons.label',
  component: 'sw-cms-el-split-text-buttons',
  configComponent: 'sw-cms-el-config-split-text-buttons',
  previewComponent: 'sw-cms-el-preview-split-text-buttons',
  defaultConfig: {
    backgroundColor: { source: 'static', value: '#2d4266' },
    textColor: { source: 'static', value: '#ffffff' },
    headlineOnRight: { source: 'static', value: false },
    headline: { source: 'static', value: 'Your headline' },
    subheadline: { source: 'static', value: '' },
    text: { source: 'static', value: 'Add your supporting text here.' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
    buttonTwoText: { source: 'static', value: '' },
    buttonTwoUrl: { source: 'static', value: '' },
  },
});
