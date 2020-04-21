<?php

declare(strict_types=1);

namespace MageMastery\GetStartedVideos\ViewModel;

use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\HTTP\Client\Curl;

class Videos implements ArgumentInterface
{
    private const VIDEO_DATA_TEMPLATE = "https://vimeo.com/api/v2/video/{VIDEO_ID}.json";
    private const VIDEOS_IDS = ["410112490", "410112480", "410112470"];

    /**
     * @var Curl
     */
    private $curl;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * Videos constructor.
     * @param Json $serializer
     * @param Curl $curl
     */
    public function __construct(
        Json $serializer,
        Curl $curl
    ) {
        $this->serializer = $serializer;
        $this->curl = $curl;
    }

    /**
     * @param $videoId
     * @return mixed
     */
    private function getVideoData($videoId)
    {
        $dataUrI = str_replace('{VIDEO_ID}', $videoId, self::VIDEO_DATA_TEMPLATE);
        $this->curl->get($dataUrI);
        $jsonData = $this->curl->getBody();
        try {
            $data = $this->serializer->unserialize($jsonData);
        } catch (\InvalidArgumentException $exception) {
            return [];
        }

        return $data[0];
    }

    /**
     * @param $duration
     * @return string
     */
    private function formatDuration($duration)
    {
        return (int)($duration / 60) . ":" . ($duration % 60);
    }

    /**
     * @return bool|string
     */
    public function getVideosDataJson()
    {
        $allVideosData = [];
        foreach (self::VIDEOS_IDS as $videoId) {
            $videoData = $this->getVideoData($videoId);
            if (!empty($videoData)) {
                $allVideosData[] = [
                    "url" => "https://player.vimeo.com/video/" . $videoId,
                    "title" => $videoData["title"],
                    "image" => $videoData["thumbnail_small"],
                    "duration" => $this->formatDuration($videoData["duration"])
                ];
            }
        }

        return $this->serializer->serialize($allVideosData);
    }
}
