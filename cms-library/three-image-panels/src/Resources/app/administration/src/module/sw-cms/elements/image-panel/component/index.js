import template from './sw-cms-el-image-panel.html.twig';
import './sw-cms-el-image-panel.scss';

Shopware.Component.register('sw-cms-el-image-panel', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { backgroundMedia: null }; },
  computed: {
    cardStyle() {
      const url = this.backgroundMedia?.url;
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
        let media = null;
        if (mediaId) {
          try { media = await this.repositoryFactory.create('media').get(mediaId, Shopware.Context.api); }
          catch { media = null; }
        }
        if (this.element.config.backgroundMedia.value === mediaId) this.backgroundMedia = media;
      },
    },
  },
  created() { this.initElementConfig('image-panel'); },
});
