import './component';
import './preview';
Shopware.Service('cmsService').registerCmsBlock({
  name: 'icon-accordion',
  category: 'text',
  label: 'vierpunkt-theme.cms.iconAccordion.label',
  component: 'sw-cms-block-icon-accordion',
  previewComponent: 'sw-cms-preview-icon-accordion',
  defaultConfig: { marginTop: '20px', marginBottom: '20px', marginLeft: '0px', marginRight: '0px', sizingMode: 'boxed' },
  slots: { content: 'icon-accordion' },
});
