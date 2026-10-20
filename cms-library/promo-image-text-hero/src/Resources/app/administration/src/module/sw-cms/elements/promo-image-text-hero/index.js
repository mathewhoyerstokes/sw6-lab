import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'promo-image-text-hero',
  label: 'vierpunkt-theme.cms.promoImageTextHero.label',
  component: 'sw-cms-el-promo-image-text-hero',
  configComponent: 'sw-cms-el-config-promo-image-text-hero',
  previewComponent: 'sw-cms-el-preview-promo-image-text-hero',
  defaultConfig: {
    headline: { source: 'static', value: '' },
    text: { source: 'static', value: '' },
    buttonText: { source: 'static', value: '' },
    buttonUrl: { source: 'static', value: '' },
    buttonTwoText: { source: 'static', value: '' },
    buttonTwoUrl: { source: 'static', value: '' },
  },
});
