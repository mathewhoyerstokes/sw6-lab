import template from './sw-cms-el-category-card.html.twig';
import './sw-cms-el-category-card.scss';

Shopware.Component.register('sw-cms-el-category-card', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  inject: ['repositoryFactory'],
  data() { return { category: null, isLoading: false }; },
  computed: {
    categoryName() {
      return this.category?.translated?.name || this.category?.name
        || this.$t('vierpunkt-theme.cms.categoryCard.placeholder');
    },
  },
  created() {
    this.initElementConfig('category-card');
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
      } finally {
        if (this.element.config.category.value === categoryId) this.isLoading = false;
      }
    },
  },
});
