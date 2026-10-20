import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'content-card',
  label: 'vierpunkt-theme.cms.contentCard.label',
  component: 'sw-cms-el-content-card',
  configComponent: 'sw-cms-el-config-content-card',
  previewComponent: 'sw-cms-el-preview-content-card',
  defaultConfig: {
    media: { source: 'static', value: null, required: false, entity: { name: 'media' } },
    imageAlt: { source: 'static', value: '' },
    backgroundColor: { source: 'static', value: '#f5f5f5' },
    headline: { source: 'static', value: '' },
    text: { source: 'static', value: '' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
  },
});
