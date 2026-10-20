<?php declare(strict_types=1);

namespace ShopwarePractice\Cms;

/** Reuses the background-card resolver to turn each panel's selected media ID into a media entity for Twig. */
class ImagePanelCmsElementResolver extends BackgroundCardCmsElementResolver
{
    public function getType(): string
    {
        return 'image-panel';
    }
}
