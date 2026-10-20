import './component';
import './preview';
Shopware.Service('cmsService').registerCmsBlock({
  name: 'hero-card-slider',
  category: 'text-image',
  label: 'vierpunkt-theme.cms.heroCardSlider.label',
  component: 'sw-cms-block-hero-card-slider',
  previewComponent: 'sw-cms-preview-hero-card-slider',
  defaultConfig: { marginTop: '0px', marginBottom: '0px', marginLeft: '0px', marginRight: '0px', sizingMode: 'full_width' },
  slots: { content: 'hero-card-slider' },
});
