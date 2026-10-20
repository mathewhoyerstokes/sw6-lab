import template from './sw-cms-el-config-background-card.html.twig';

Shopware.Component.register('sw-cms-el-config-background-card', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  inject: ['repositoryFactory'],
  created() {
    this.initElementConfig('background-card');
  },
  methods: {
    async onBackgroundMediaChange(mediaId) {
      this.element.config.backgroundMedia.value = mediaId || null;
      this.element.config.backgroundMedia.source = 'static';
      const media = mediaId
        ? await this.repositoryFactory.create('media').get(mediaId, Shopware.Context.api)
        : null;
      // Keep the canvas preview in sync without waiting for a page reload.
      if (this.element.config.backgroundMedia.value !== (mediaId || null)) return;
      this.element.data = { ...this.element.data, backgroundMedia: media };
      this.onElementUpdate();
    },
    onElementUpdate() {
      this.$emit('element-update', this.element);
    },
  },
});
