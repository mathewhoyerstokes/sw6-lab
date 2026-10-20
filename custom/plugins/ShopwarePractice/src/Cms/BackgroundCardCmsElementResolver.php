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

/**
 * The background-card media picker saves an image ID, not its URL.
 * This resolver loads that media record and exposes it as
 * element.data.backgroundMedia so Twig can use its URL as the card background.
 */
class BackgroundCardCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'background-card';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $media = $slot->getFieldConfig()->get('backgroundMedia');
        if (!$media || !$media->isStatic() || !\is_string($media->getValue()) || !Uuid::isValid($media->getValue())) {
            return null;
        }

        $criteria = new CriteriaCollection();
        $criteria->add('background_media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria([$media->getValue()]));

        return $criteria;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $mediaId = $slot->getFieldConfig()->get('backgroundMedia')?->getValue();
        $media = \is_string($mediaId)
            ? $result->get('background_media_' . $slot->getUniqueIdentifier())?->getEntities()->get($mediaId)
            : null;

        $slot->setData(new ArrayStruct(['backgroundMedia' => $media]));
    }
}
