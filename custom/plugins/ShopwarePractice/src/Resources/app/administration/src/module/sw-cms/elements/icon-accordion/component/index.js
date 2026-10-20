import template from './sw-cms-el-icon-accordion.html.twig';
import './sw-cms-el-icon-accordion.scss';

Shopware.Component.register('sw-cms-el-icon-accordion', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { iconMedia: {}, mediaRequest: 0 }; },
  computed: {
    items() { return (this.element.config.items?.value || []).slice(0, 6); },
    iconMediaIdsKey() {
      return [...new Set(this.items.map(item => item.iconMediaId).filter(Boolean))].sort().join(',');
    },
  },
  watch: {
    iconMediaIdsKey: {
      immediate: true,
      async handler(key) {
        const request = ++this.mediaRequest;
        const ids = key ? key.split(',') : [];
        const entries = await Promise.all(ids.map(async id => {
          try { return [id, await this.repositoryFactory.create('media').get(id, Shopware.Context.api)]; }
          catch { return [id, null]; }
        }));
        // Ignore late responses when the user changes or removes an uploaded icon.
        if (request === this.mediaRequest) this.iconMedia = Object.fromEntries(entries);
      },
    },
  },
  created() { this.initElementConfig('icon-accordion'); },
});
