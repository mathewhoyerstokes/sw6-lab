import template from './sw-cms-el-config-information-card-slider.html.twig';
import './sw-cms-el-config-information-card-slider.scss';

Shopware.Component.register('sw-cms-el-config-information-card-slider', {
  template,
  mixins: [Shopware.Mixin.getByName('cms-element')],
  emits: ['element-update'],
  computed: {
    slides() { return this.element.config.slides.value; },
  },
  created() { this.initElementConfig('information-card-slider'); },
  methods: {
    // Meteor fields emit update:modelValue; sw-media-field emits update:value.
    // Replace the JSON array so CMS change tracking sees each edit before emitting.
    saveSlides(slides) {
      this.element.config.slides = { source: 'static', value: slides };
      this.$emit('element-update', this.element);
    },
    updateSlide(index, field, value) {
      this.saveSlides(this.slides.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, [field]: value } : slide));
    },
    addSlide() {
      if (this.slides.length >= 6) return;
      this.saveSlides([...this.slides, { id: Shopware.Utils.createId(), mediaId: null, headline: '', text: '', buttonText: '', buttonUrl: '', secondaryButtonText: '', secondaryButtonUrl: '' }]);
    },
    removeSlide(index) {
      this.saveSlides(this.slides.filter((slide, slideIndex) => slideIndex !== index));
    },
    moveSlide(index, offset) {
      const target = index + offset;
      if (target < 0 || target >= this.slides.length) return;
      const slides = [...this.slides];
      const [slide] = slides.splice(index, 1);
      slides.splice(target, 0, slide);
      this.saveSlides(slides);
    },
  },
});
