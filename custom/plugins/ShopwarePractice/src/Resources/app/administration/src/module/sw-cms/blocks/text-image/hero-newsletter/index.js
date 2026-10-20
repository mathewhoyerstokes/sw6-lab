import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'hero-newsletter',
  label: 'vierpunkt-theme.cms.blocks.heroNewsletter.label',
  category: 'form',
  component: 'sw-cms-block-hero-newsletter',
  previewComponent: 'sw-cms-preview-hero-newsletter',
  defaultConfig: {
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed'
  },
  slots: {
    left: 'image',
    right: {
      type: 'form',
      default: {
        config: {
          type: { source: 'static', value: 'newsletter' }
        }
      }
    }
  }
});
