import template from './sw-cms-el-linked-category-image-panel.html.twig';
import './sw-cms-el-linked-category-image-panel.scss';

Shopware.Component.register('sw-cms-el-linked-category-image-panel', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { category: null, isLoading: false }; },
  computed: {
    cardStyle() {
      const url = this.category?.media?.url;
      return { backgroundImage: url ? `url(${JSON.stringify(url)})` : 'none' };
    },
    categoryName() {
      return this.category?.translated?.name || this.category?.name
        || this.$t('vierpunkt-theme.cms.categoryCard.placeholder');
    },
  },
  created() {
    this.initElementConfig('linked-category-image-panel');
    this.$watch(() => this.element.config.category.value, this.loadCategory, { immediate: true });
  },
  methods: {
    async loadCategory(categoryId) {
      this.category = null;
      this.isLoading = false;
      if (!categoryId) return;
      this.isLoading = true;
      const criteria = new Shopware.Data.Criteria(1, 1);
      criteria.addAssociation('media');
      try {
        const category = await this.repositoryFactory.create('category')
          .get(categoryId, Shopware.Context.api, criteria);
        // Ignore a late response if the user has selected a different category.
        if (this.element.config.category.value === categoryId) this.category = category;
      } catch {
        if (this.element.config.category.value === categoryId) this.category = null;
      } finally {
        if (this.element.config.category.value === categoryId) this.isLoading = false;
      }
    },
  },
});
