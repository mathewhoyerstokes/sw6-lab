import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'hero-card-slider',
  label: 'vierpunkt-theme.cms.heroCardSlider.label',
  component: 'sw-cms-el-hero-card-slider',
  configComponent: 'sw-cms-el-config-hero-card-slider',
  previewComponent: 'sw-cms-el-preview-hero-card-slider',
  defaultConfig: {
    slides: { source: 'static', value: [{ id: 'first-slide', mediaId: null, headline: 'Your headline', subheadline: 'Your supporting text', buttonText: '', buttonUrl: '', secondaryButtonText: '', secondaryButtonUrl: '' }] },
  },
});
