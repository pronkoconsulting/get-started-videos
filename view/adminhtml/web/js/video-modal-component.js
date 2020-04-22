define([
        'jquery',
        "uiComponent",
        "ko",
        'Magento_Ui/js/modal/modal',
        "underscore"
    ], function ($, Component, ko, modal, _) {
        "use strict";
        return Component.extend({
            initialize: function () {
                this._super();
                this.videos = this._getVideos();
                this._initModal();
            },
            _getVideos: function () {
                let videosData = _.toArray(this.videosData);
                videosData = videosData.map(function (value) {
                    value.visible = ko.observable(false);
                    return value;
                });
                return videosData;
            },
            _initModal: function () {
                const options = {
                    type: 'popup',
                    modalClass: 'video-popup',
                    buttons: []
                };
                modal(options, $('#video-modal'));
                this._bindModalFunctions();
            },
            _bindModalFunctions: function () {
                const $this = this;

                $('.video-link').live("click", function (e) {
                    e.preventDefault();
                    const videoIndex = $(this).attr('video-id');
                    $this.videos[videoIndex].visible(true);
                    $('#video-modal').modal('openModal');

                });

                $('#video-modal').live('modalclosed', function (e) {
                    $this.videos.forEach(function (video) {
                        video.visible(false);
                    });
                    $this._pauseVideos();
                })
            },
            _pauseVideos: function () {
                if ($f) {
                    $('.video-frame').each(function () {
                        const iframe = $(this)[0];
                        if (iframe) {
                            const player = $f(iframe);
                            player.api('pause');
                        }
                    });
                }
            }
        });
    });
