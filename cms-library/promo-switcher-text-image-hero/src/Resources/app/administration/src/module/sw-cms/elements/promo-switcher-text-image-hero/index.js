import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'promo-switcher-text-image-hero',
  label: 'vierpunkt-theme.cms.promoSwitcherTextImageHero.label',
  component: 'sw-cms-el-promo-switcher-text-image-hero',
  configComponent: 'sw-cms-el-config-promo-switcher-text-image-hero',
  previewComponent: 'sw-cms-el-preview-promo-switcher-text-image-hero',
  defaultConfig: {
    imageOnRight: { source: 'static', value: false },
    headline: { source: 'static', value: '' },
    text: { source: 'static', value: '' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
    buttonTwoText: { source: 'static', value: '' },
    buttonTwoUrl: { source: 'static', value: '' },
  },
});
