<?php declare(strict_types=1);

namespace ShopwarePractice\Cms;

/** Loads the chosen category's name and media and generates its storefront link.
 * Reuses the category-card resolver so inactive/missing categories and folders without a URL do not render.
 */
class LinkedCategoryImagePanelCmsElementResolver extends CategoryCardCmsElementResolver
{
    public function getType(): string
    {
        return 'linked-category-image-panel';
    }
}
