import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'information-card-slider',
  label: 'vierpunkt-theme.cms.informationCardSlider.label',
  component: 'sw-cms-el-information-card-slider',
  configComponent: 'sw-cms-el-config-information-card-slider',
  previewComponent: 'sw-cms-el-preview-information-card-slider',
  defaultConfig: {
    slides: {
      source: 'static',
      value: Array.from({ length: 6 }, (_, index) => ({
        id: `information-card-${index + 1}`, mediaId: null,
        headline: '', text: '', buttonText: '', buttonUrl: '',
        secondaryButtonText: '', secondaryButtonUrl: '',
      })),
    },
  },
});
