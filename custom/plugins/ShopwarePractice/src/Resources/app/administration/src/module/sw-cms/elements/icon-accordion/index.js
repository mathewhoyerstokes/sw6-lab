import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
  name: 'icon-accordion',
  label: 'vierpunkt-theme.cms.iconAccordion.label',
  component: 'sw-cms-el-icon-accordion',
  configComponent: 'sw-cms-el-config-icon-accordion',
  previewComponent: 'sw-cms-el-preview-icon-accordion',
  defaultConfig: {
    items: { source: 'static', value: [{ id: 'first-item', iconMediaId: null, title: 'Accordion title', text: '' }] },
  },
});
