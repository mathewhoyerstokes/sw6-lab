import './sw-cms-block-brand-logo-grid.scss';

const { Component } = Shopware;

const cards = Array.from({ length: 4 }, (_, index) => {
  const number = index + 1;

  return `
        <div class="sw-cms-block-brand-logo-grid__card">
            <span class="sw-cms-block-brand-logo-grid__number">${number}</span>
            <slot name="image-${number}"></slot>
            <slot name="title-${number}"></slot>
        </div>
    `;
}).join('');

Component.register('sw-cms-block-brand-logo-grid', {
  template: `
        <div class="sw-cms-block-brand-logo-grid">
            ${cards}
        </div>
    `,

  props: {
    block: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.block.slots.forEach((slot) => {
      if (!slot.slot?.startsWith('image-')) {
        return;
      }

      if (!slot.config) {
        slot.config = {};
      }

      if (!slot.config.media) {
        slot.config.media = {
          source: 'static',
          value: null,
          entity: { name: 'media' },
        };
      }

      slot.config.media.required = false;
    });
  },
});
