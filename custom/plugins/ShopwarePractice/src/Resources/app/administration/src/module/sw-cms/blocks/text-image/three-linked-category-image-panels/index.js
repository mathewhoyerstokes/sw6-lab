import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'three-linked-category-image-panels',
  label: 'vierpunkt-theme.cms.blocks.threeLinkedCategoryImagePanels.label',
  category: 'text-image',
  component: 'sw-cms-block-three-linked-category-image-panels',
  previewComponent: 'sw-cms-preview-three-linked-category-image-panels',
  defaultConfig: { marginTop: '0px', marginBottom: '0px', marginLeft: '0px', marginRight: '0px', sizingMode: 'full_width' },
  slots: { 'card-1': 'linked-category-image-panel', 'card-2': 'linked-category-image-panel', 'card-3': 'linked-category-image-panel' },
});
