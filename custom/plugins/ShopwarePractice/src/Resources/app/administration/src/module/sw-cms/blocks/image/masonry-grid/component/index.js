import './sw-cms-block-masonry-grid.scss';

const { Component } = Shopware;

const columns = Array.from({ length: 3 }, (_, columnIndex) => {
  const items = Array.from({ length: 10 }, (_, index) => {
    if (index % 3 !== columnIndex) return '';
    const number = index + 1;

    return `
          <div class="sw-cms-block-masonry-grid__item">
              <span class="sw-cms-block-masonry-grid__number">${number}</span>
              <slot name="image-${number}"></slot>
          </div>
      `;
  }).join('');
  return `<div class="sw-cms-block-masonry-grid__column">${items}</div>`;
}).join('');

Component.register('sw-cms-block-masonry-grid', {
  template: `
        <div class="sw-cms-block-masonry-grid">
            <slot name="title"></slot>
            <div class="sw-cms-block-masonry-grid__grid">
                ${columns}
            </div>
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
