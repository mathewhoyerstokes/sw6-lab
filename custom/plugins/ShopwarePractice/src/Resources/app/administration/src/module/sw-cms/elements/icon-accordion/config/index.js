import template from './sw-cms-el-config-icon-accordion.html.twig';
import './sw-cms-el-config-icon-accordion.scss';

Shopware.Component.register('sw-cms-el-config-icon-accordion', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  computed: {
    items() { return this.element.config.items.value; },
  },
  created() { this.initElementConfig('icon-accordion'); },
  methods: {
    // Replace the JSON array before notifying the CMS so item edits persist on layout save.
    saveItems(items) {
      this.element.config.items = { source: 'static', value: items };
      this.$emit('element-update', this.element);
    },
    updateItem(index, field, value) {
      this.saveItems(this.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item));
    },
    addItem() {
      if (this.items.length >= 6) return;
      this.saveItems([...this.items, { id: Shopware.Utils.createId(), iconMediaId: null, title: '', text: '' }]);
    },
    removeItem(index) { this.saveItems(this.items.filter((item, itemIndex) => itemIndex !== index)); },
    moveItem(index, offset) {
      const target = index + offset;
      if (target < 0 || target >= this.items.length) return;
      const items = [...this.items];
      const [item] = items.splice(index, 1);
      items.splice(target, 0, item);
      this.saveItems(items);
    },
  },
});
