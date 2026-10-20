import './component';
import './preview';

/*
 * Reusing this block for a different number of cards:
 * - Copy this block's library folder into your new project.
 * - Rename the block (for example, four-cards -> two-cards), its filenames,
 *   component/preview registrations, imports, translation label and SCSS selectors.
 * - Keep the same card count in this slots configuration, the Administration
 *   component's slots/layout, the preview and the Storefront Twig loop.
 * - For two cards, keep card-1 and card-2, use a Storefront loop of 1..2,
 *   set columns = 2 and use col-12 col-lg-6. Set the editor layout to two columns.
 * - For three cards, keep card-1 through card-3, loop over 1..3,
 *   set columns = 3 and use col-12 col-lg-4.
 * - Bootstrap's grid has 12 columns: 2 cards = col-lg-6,
 *   3 cards = col-lg-4, 4 cards = col-lg-3 (hyphens, not dots).
 * - Reuse the content-card element unchanged; only the block layout needs changing.
 * Rename before adding the block to saved CMS layouts.
 */

Shopware.Service('cmsService').registerCmsBlock({
  name: 'four-cards',
  label: 'vierpunkt-theme.cms.blocks.fourCards.label',
  category: 'text',
  component: 'sw-cms-block-four-cards',
  previewComponent: 'sw-cms-preview-four-cards',
  defaultConfig: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots: {
    'card-1': 'content-card',
    'card-2': 'content-card',
    'card-3': 'content-card',
    'card-4': 'content-card',
  },
});
