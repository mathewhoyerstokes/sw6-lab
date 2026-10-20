<?php declare(strict_types=1);

namespace ShopwarePractice\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\Framework\Uuid\Uuid;

/** The media upload fields save IDs. Load the selected SVG media records in one query
 * so Twig can render their URLs as 40 × 40px images. Missing icons do not hide the item.
 */
class IconAccordionCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'icon-accordion';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $ids = $this->mediaIds($slot);
        if (!$ids) return null;

        $criteria = new CriteriaCollection();
        $criteria->add('accordion_icons_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria($ids));
        return $criteria;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $media = $result->get('accordion_icons_' . $slot->getUniqueIdentifier())?->getEntities();
        $icons = [];
        foreach ($this->mediaIds($slot) as $id) {
            $icon = $media?->get($id);
            if ($icon) $icons[$id] = $icon;
        }
        $slot->setData(new ArrayStruct(['icons' => $icons]));
    }

    private function mediaIds(CmsSlotEntity $slot): array
    {
        $field = $slot->getFieldConfig()->get('items');
        $items = $field?->getValue();
        if (!$field?->isStatic() || !\is_array($items)) return [];

        $ids = [];
        foreach (\array_slice($items, 0, 6) as $item) {
            $id = \is_array($item) ? ($item['iconMediaId'] ?? null) : null;
            if (\is_string($id) && Uuid::isValid($id)) $ids[] = $id;
        }
        return \array_values(\array_unique($ids));
    }
}
