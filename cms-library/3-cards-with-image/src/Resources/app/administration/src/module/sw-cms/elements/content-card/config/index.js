import template from './sw-cms-el-config-content-card.html.twig';

Shopware.Component.register('sw-cms-el-config-content-card', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  emits: ['element-update'],
  data() {
    return { mediaModalIsOpen: false };
  },
  computed: {
    uploadTag() {
      return `content-card-media-${this.element.id}`;
    },
    previewSource() {
      return this.element.data?.media || this.element.config.media.value;
    },
  },
  created() {
    this.initElementConfig('content-card');
  },
  methods: {
    async onImageUpload({ targetId }) {
      const media = await this.repositoryFactory.create('media').get(targetId);
      this.setMedia(media);
    },
    onMediaSelection(selection) {
      if (selection.length) {
        this.setMedia(selection[0]);
      }
      this.mediaModalIsOpen = false;
    },
    setMedia(media = null) {
      this.element.config.media.value = media?.id || null;
      this.element.config.media.source = 'static';
      // Clear the old URL when replacing or removing an existing card image.
      if (this.element.config.imageUrl) {
        this.element.config.imageUrl.value = '';
      }
      this.element.data = { ...this.element.data, mediaId: media?.id || null, media };
      this.onElementUpdate();
    },
    onElementUpdate() {
      this.$emit('element-update', this.element);
    },
  },
});
