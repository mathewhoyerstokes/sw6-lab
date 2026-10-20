import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'image-panel',
  label: 'vierpunkt-theme.cms.imagePanel.label',
  component: 'sw-cms-el-image-panel',
  configComponent: 'sw-cms-el-config-image-panel',
  previewComponent: 'sw-cms-el-preview-image-panel',
  defaultConfig: {
    backgroundMedia: { source: 'static', value: null, entity: { name: 'media' } },
    backgroundColor: { source: 'static', value: '#343a40' },
    headline: { source: 'static', value: '' },
    text: { source: 'static', value: '' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
  },
});
