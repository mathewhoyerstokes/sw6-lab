import template from './sw-cms-el-config-linked-category-image-panel.html.twig';
Shopware.Component.register('sw-cms-el-config-linked-category-image-panel', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  computed: {
    categoryCriteria() {
      const criteria = new Shopware.Data.Criteria(1, 25);
      criteria.addFilter(Shopware.Data.Criteria.equals('active', true));
      return criteria;
    },
  },
  created() { this.initElementConfig('linked-category-image-panel'); },
  methods: {
    updateField(field, value) {
      this.element.config[field] = { ...this.element.config[field], source: 'static', value: value || (field === 'category' ? null : '') };
      this.$emit('element-update', this.element);
    },
  },
});
