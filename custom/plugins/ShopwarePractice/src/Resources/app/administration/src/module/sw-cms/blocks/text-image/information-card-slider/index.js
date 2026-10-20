import './component';
import './preview';
Shopware.Service('cmsService').registerCmsBlock({
  name: 'information-card-slider',
  category: 'text-image',
  label: 'vierpunkt-theme.cms.informationCardSlider.label',
  component: 'sw-cms-block-information-card-slider',
  previewComponent: 'sw-cms-preview-information-card-slider',
  defaultConfig: { marginTop: '20px', marginBottom: '20px', marginLeft: '0px', marginRight: '0px', sizingMode: 'boxed' },
  slots: { content: 'information-card-slider' },
});
