import template from './sw-cms-el-hero-card-slider.html.twig';
import './sw-cms-el-hero-card-slider.scss';

Shopware.Component.register('sw-cms-el-hero-card-slider', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { media: {}, mediaRequest: 0 }; },
  computed: {
    slides() { return (this.element.config.slides?.value || []).slice(0, 6); },
    firstSlide() { return this.slides[0] || {}; },
    mediaIds() { return this.slides.map(slide => slide.mediaId).filter(Boolean); },
    imageUrl() { return this.media[this.firstSlide.mediaId]?.url; },
  },
  watch: {
    mediaIds: {
      immediate: true,
      async handler(ids) {
        const request = ++this.mediaRequest;
        const entries = await Promise.all(ids.map(async id => {
          try { return [id, await this.repositoryFactory.create('media').get(id, Shopware.Context.api)]; }
          catch { return [id, null]; }
        }));
        if (request === this.mediaRequest) this.media = Object.fromEntries(entries);
      },
    },
  },
  created() { this.initElementConfig('hero-card-slider'); },
});
