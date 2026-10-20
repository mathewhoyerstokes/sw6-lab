import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'background-card',
  label: 'vierpunkt-theme.cms.backgroundCard.label',
  component: 'sw-cms-el-background-card',
  configComponent: 'sw-cms-el-config-background-card',
  previewComponent: 'sw-cms-el-preview-background-card',
  defaultConfig: {
    backgroundMedia: { source: 'static', value: null, entity: { name: 'media' } },
    backgroundColor: { source: 'static', value: '#343a40' },
    headline: { source: 'static', value: '' },
    text: { source: 'static', value: '' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
  },
});
