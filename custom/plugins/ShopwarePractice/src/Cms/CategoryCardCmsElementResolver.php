<?php declare(strict_types=1);

namespace ShopwarePractice\Cms;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Category\CategoryEntity;
use Shopware\Core\Content\Category\Service\AbstractCategoryUrlGenerator;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\Framework\Uuid\Uuid;

/** Loads one selected category, including its translated name and category image. */
class CategoryCardCmsElementResolver extends AbstractCmsElementResolver
{
    public function __construct(private readonly AbstractCategoryUrlGenerator $categoryUrlGenerator)
    {
    }

    public function getType(): string
    {
        return 'category-card';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig()->get('category');
        if (!$config || !$config->isStatic() || !\is_string($config->getValue()) || !Uuid::isValid($config->getValue())) {
            return null;
        }

        $criteria = new Criteria([$config->getValue()]);
        $criteria->addAssociation('media');
        $criteria->addFilter(new EqualsFilter('active', true));

        $collection = new CriteriaCollection();
        $collection->add('category_card_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $categoryId = $slot->getFieldConfig()->get('category')?->getValue();
        $category = \is_string($categoryId)
            ? $result->get('category_card_' . $slot->getUniqueIdentifier())?->getEntities()->get($categoryId)
            : null;

        if (!$category instanceof CategoryEntity || !$category->getActive()) {
            $slot->setData(new ArrayStruct(['category' => null, 'url' => null]));
            return;
        }

        // Use Shopware's URL generator for SEO links, external links and folder categories.
        $url = $this->categoryUrlGenerator->generate($category, $resolverContext->getSalesChannelContext()->getSalesChannel());
        $slot->setData(new ArrayStruct(['category' => $category, 'url' => $url]));
    }
}
