import template from './sw-cms-el-information-card-slider.html.twig';
import './sw-cms-el-information-card-slider.scss';

Shopware.Component.register('sw-cms-el-information-card-slider', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { media: {}, mediaRequest: 0 }; },
  computed: {
    slides() { return (this.element.config.slides?.value || []).slice(0, 6); },
    mediaIds() { return this.slides.map(slide => slide.mediaId).filter(Boolean); },
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
  created() { this.initElementConfig('information-card-slider'); },
});
