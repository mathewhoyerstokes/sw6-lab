import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'designer-product-slider',
  label: 'vierpunkt-theme.cms.blocks.designerProductSlider.label',
  category: 'commerce',
  component: 'sw-cms-block-designer-product-slider',
  previewComponent: 'sw-cms-preview-designer-product-slider',
  defaultConfig: {
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: null,
    marginRight: null,
    sizingMode: 'boxed',
  },
  slots: {
    sliderTitle: 'designer-slider-header',
    sliderProducts: 'product-slider',
  },
});
