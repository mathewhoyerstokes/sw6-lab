import template from './sw-cms-el-config-category-background-card.html.twig';

Shopware.Component.register('sw-cms-el-config-category-background-card', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  computed: {
    categoryCriteria() {
      const criteria = new Shopware.Data.Criteria(1, 25);
      criteria.addFilter(Shopware.Data.Criteria.equals('active', true));
      criteria.addFilter(Shopware.Data.Criteria.not('AND', [Shopware.Data.Criteria.equals('type', 'folder')]));
      return criteria;
    },
  },
  created() { this.initElementConfig('category-background-card'); },
  methods: {
    onCategoryChange(categoryId) {
      this.element.config.category.value = categoryId || null;
      this.element.config.category.source = 'static';
      this.$emit('element-update', this.element);
    },
  },
});
