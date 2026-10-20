import template from './sw-cms-el-background-card.html.twig';
import './sw-cms-el-background-card.scss';

Shopware.Component.register('sw-cms-el-background-card', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { backgroundMedia: null }; },
  computed: {
    cardStyle() {
      const url = this.element.data?.backgroundMedia?.url || this.backgroundMedia?.url;
      return {
        backgroundColor: this.element.config.backgroundColor.value,
        backgroundImage: url ? `url(${JSON.stringify(url)})` : 'none',
      };
    },
  },
  watch: {
    'element.config.backgroundMedia.value': {
      immediate: true,
      async handler(mediaId) {
        const media = mediaId
          ? await this.repositoryFactory.create('media').get(mediaId, Shopware.Context.api)
          : null;
        if (this.element.config.backgroundMedia.value === mediaId) this.backgroundMedia = media;
      },
    },
  },
  created() { this.initElementConfig('background-card'); },
});
