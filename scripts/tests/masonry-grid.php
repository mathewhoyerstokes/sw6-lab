<?php declare(strict_types=1);

// Run with: docker compose exec -T web php scripts/tests/masonry-grid.php
require dirname(__DIR__, 2) . '/vendor/autoload.php';

use Shopware\Core\Framework\Adapter\Twig\SecurityExtension;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TokenParser\IncludeTokenParser;

$source = file_get_contents(dirname(__DIR__, 2) . '/custom/plugins/ShopwarePractice/src/Resources/views/storefront/block/cms-block-masonry-grid.html.twig');
$twig = new Environment(new ArrayLoader([
    'masonry' => $source,
    '@Storefront/storefront/element/cms-element-image.html.twig' => '{{ element.id }}',
]));
$twig->addExtension(new SecurityExtension([]));
// Stub only Shopware's template lookup; exercise the real layout and security filters.
$twig->addTokenParser(new class extends IncludeTokenParser {
    public function getTag(): string
    {
        return 'sw_include';
    }
});

foreach ([[], [1], range(1, 10), [2, 4, 5, 9]] as $populated) {
    $slots = new class($populated) {
        public function __construct(private array $populated) {}

        public function getSlot(string $name): ?array
        {
            if ($name === 'title') {
                return null;
            }
            $index = (int) substr($name, 6);

            return [
                'id' => 'image-' . $index,
                'type' => 'image',
                'data' => ['media' => in_array($index, $this->populated, true) ? ['url' => '/image.jpg'] : null],
            ];
        }
    };
    $html = $twig->render('masonry', ['block' => ['slots' => $slots]]);
    preg_match_all('/class="cms-masonry-grid__column">(.*?)<\/div>\s*(?=<div class="cms-masonry-grid__column">|<\/div>)/s', $html, $columns);
    if (count($columns[1]) !== 3) {
        throw new RuntimeException('Expected three masonry columns');
    }
    foreach ($columns[1] as $column => $markup) {
        preg_match_all('/data-cms-element-id="image-(\d+)"/', $markup, $matches);
        $expected = array_values(array_filter($populated, static fn ($index, $position) => $position % 3 === $column, ARRAY_FILTER_USE_BOTH));
        if (array_map('intval', $matches[1]) !== $expected) {
            throw new RuntimeException('Incorrect masonry image distribution');
        }
        preg_match_all('/--masonry-order: (\d+);/', $markup, $orders);
        if (array_map('intval', $orders[1]) !== $expected) {
            throw new RuntimeException('Incorrect mobile image order');
        }
    }
}

echo "Masonry rendering passed: empty, single, full and sparse image slots.\n";
