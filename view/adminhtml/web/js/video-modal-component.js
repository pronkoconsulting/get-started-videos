/**
 * Copyright © Pronko Consulting (https://www.pronkoconsulting.com)
 * See LICENSE for the license details.
 */
define([
    'jquery',
    "uiComponent",
    "ko",
    'Magento_Ui/js/modal/modal',
    "underscore",
    "vimeo"
], function ($, Component, ko, modal, _) {
    "use strict";
    return Component.extend({
        initialize: function () {
            this._super();
            this.videos = this._getVideos();
            this._initModal();
        },
        _getVideos: function () {
            var videosData = _.toArray(this.videosData);
            videosData = videosData.map(function (value) {
                value.visible = ko.observable(false);
                return value;
            });
            return videosData;
        },
        _initModal: function () {
            var options = {
                type: 'popup',
                modalClass: 'video-popup',
                buttons: []
            };
            modal(options, $('#video-modal'));
            this._bindModalFunctions();
        },
        _bindModalFunctions: function () {
            var $this = this;

            $('.video-link').live("click", function (e) {
                e.preventDefault();
                var videoIndex = $(this).attr('video-id');
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
            if (window.$f) {
                $('.video-frame').each(function () {
                    var iframe = $(this)[0];
                    if (iframe) {
                        var player = window.$f(iframe);
                        player.api('pause');
                    }
                });
            }
        }
    });
});
