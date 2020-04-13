<?php

declare(strict_types=1);

namespace MageMastery\GetStartedVideos\ViewModel;

use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\Serialize\Serializer\Json;

class Videos implements ArgumentInterface
{
    /**
     * @var Json
     */
    private $serializer;

    public function __construct(
        Json $serializer
    ) {
        $this->serializer = $serializer;
    }

    /**
     * @return bool|string
     */
    public function getVideosDataJson()
    {
        return $this->serializer->serialize([
            [
                "url" => "#1",
                "title" => "video1"
            ],
            [
                "url" => "#2",
                "title" => "video2"
            ],
            [
                "url" => "#3",
                "title" => "video3"
            ],
        ]);
    }
}
