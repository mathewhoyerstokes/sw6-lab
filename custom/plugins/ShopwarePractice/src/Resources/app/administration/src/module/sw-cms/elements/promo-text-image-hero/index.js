import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'promo-text-image-hero',
  label: 'vierpunkt-theme.cms.promoTextImageHero.label',
  component: 'sw-cms-el-promo-text-image-hero',
  configComponent: 'sw-cms-el-config-promo-text-image-hero',
  previewComponent: 'sw-cms-el-preview-promo-text-image-hero',
  defaultConfig: {
    headline: { source: 'static', value: '' },
    text: { source: 'static', value: '' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
    buttonTwoText: { source: 'static', value: '' },
    buttonTwoUrl: { source: 'static', value: '' },
  },
});
