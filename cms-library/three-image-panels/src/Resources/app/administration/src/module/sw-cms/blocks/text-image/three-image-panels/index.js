import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'three-image-panels',
  label: 'vierpunkt-theme.cms.blocks.threeImagePanels.label',
  category: 'text-image',
  component: 'sw-cms-block-three-image-panels',
  previewComponent: 'sw-cms-preview-three-image-panels',
  defaultConfig: { marginTop: '0px', marginBottom: '0px', marginLeft: '0px', marginRight: '0px', sizingMode: 'full_width' },
  slots: { 'card-1': 'image-panel', 'card-2': 'image-panel', 'card-3': 'image-panel' },
});
