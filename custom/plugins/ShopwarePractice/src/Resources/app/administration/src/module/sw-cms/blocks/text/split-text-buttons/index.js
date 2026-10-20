import './component';
import './preview';
Shopware.Service('cmsService').registerCmsBlock({
  name: 'split-text-buttons',
  category: 'text',
  label: 'vierpunkt-theme.cms.splitTextButtons.label',
  component: 'sw-cms-block-split-text-buttons',
  previewComponent: 'sw-cms-preview-split-text-buttons',
  defaultConfig: { marginTop: '0px', marginBottom: '0px', marginLeft: '0px', marginRight: '0px', sizingMode: 'full_width' },
  slots: { content: 'split-text-buttons' },
});
