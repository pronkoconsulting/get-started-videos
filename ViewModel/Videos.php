<?php
/**
 * Copyright © Pronko Consulting (https://www.pronkoconsulting.com)
 * See LICENSE for the license details.
 */
declare(strict_types=1);

namespace Pronko\GetStartedVideos\ViewModel;

use InvalidArgumentException;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\HTTP\Client\Curl;

class Videos implements ArgumentInterface
{
    private const VIDEO_DATA_TEMPLATE = "https://vimeo.com/api/v2/video/{VIDEO_ID}.json";

    /**
     * @var Curl
     */
    private $curl;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @var array
     */
    private $videosIds;

    /**
     * Videos constructor.
     * @param Json $serializer
     * @param Curl $curl
     * @param array $videosIds
     */
    public function __construct(
        Json $serializer,
        Curl $curl,
        array $videosIds = []
    ) {
        $this->serializer = $serializer;
        $this->curl = $curl;
        $this->videosIds = $videosIds;
    }

    /**
     * Get video data
     *
     * @param int $videoId
     * @return mixed
     */
    private function getVideoData($videoId)
    {
        $dataUrI = str_replace('{VIDEO_ID}', $videoId, self::VIDEO_DATA_TEMPLATE);
        $this->curl->get($dataUrI);
        $jsonData = $this->curl->getBody();
        try {
            $data = $this->serializer->unserialize($jsonData);
            if (!isset($data[0])) {
                return [];
            }
        } catch (InvalidArgumentException $exception) {
            return [];
        }

        return $data[0];
    }

    /**
     * Formats duration of a video
     *
     * @param int $duration
     * @return string
     */
    private function formatDuration($duration)
    {
        return (int)($duration / 60) . ":" . ($duration % 60);
    }

    /**
     * Get videos data in a json format
     *
     * @return bool|string
     */
    public function getVideosDataJson()
    {
        $allVideosData = [];
        foreach ($this->videosIds as $videoId) {
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
