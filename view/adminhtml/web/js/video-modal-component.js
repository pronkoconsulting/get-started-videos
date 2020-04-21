define([
        'jquery',
        "uiComponent",
        "ko",
        'Magento_Ui/js/modal/modal'
    ], function ($, Component, ko, modal) {
        "use strict";
        return Component.extend({
            initialize: function () {
                this._super();
                this.modalText = ko.observable("modal text");
                this.videoUrl = ko.observable("broken");
                this.videoTitle = ko.observable("video title");
                this._initModal();
            },
            _initModal: function () {
                let $this = this;
                let options = {
                    type: 'popup',
                    responsive: true,
                    innerScroll: true,
                    buttons: []
                };
                var popup = modal(options, $('#video-modal'));
                $('.video-link').live("click", function (e) {
                    e.preventDefault();
                    let link = $(this).attr("video-url");
                    let title = $(this).attr("video-title");
                    $this.videoTitle(title);
                    $this.videoUrl(link);
                    $('#video-modal').modal('openModal');
                });
            }
        });
    }
);