<?php declare(strict_types=1);

namespace YourTheme\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\Framework\Uuid\Uuid;

/** Resolves the media IDs saved by the slide editor to full media entities, including thumbnails.
 * All six slides are loaded in one query. Missing/deleted images are skipped in the storefront.
 */
class HeroCardSliderCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string { return 'hero-card-slider'; }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $ids = [];
        foreach ($this->slides($slot) as $slide) {
            $id = $slide['mediaId'] ?? null;
            if (\is_string($id) && Uuid::isValid($id)) $ids[] = $id;
        }
        if (!$ids) return null;
        $criteria = new CriteriaCollection();
        $criteria->add('hero_slider_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria(array_values(array_unique($ids))));
        return $criteria;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $media = $result->get('hero_slider_' . $slot->getUniqueIdentifier())?->getEntities();
        $slides = [];
        foreach ($this->slides($slot) as $slide) {
            $id = $slide['mediaId'] ?? null;
            $image = \is_string($id) && Uuid::isValid($id) ? $media?->get($id) : null;
            if (!$image) continue;
            $slide['media'] = $image;
            $slides[] = $slide;
        }
        $slot->setData(new ArrayStruct(['slides' => $slides]));
    }

    private function slides(CmsSlotEntity $slot): array
    {
        $field = $slot->getFieldConfig()->get('slides');
        $value = $field?->getValue();
        return $field?->isStatic() && \is_array($value)
            ? array_values(array_filter(array_slice($value, 0, 6), 'is_array')) : [];
    }
}
