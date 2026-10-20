<?php declare(strict_types=1);

namespace YourTheme\Cms;

/** Reuse category/media loading and Shopware URL generation for the background variant. */
class CategoryBackgroundCardCmsElementResolver extends CategoryCardCmsElementResolver
{
    public function getType(): string
    {
        return 'category-background-card';
    }
}
