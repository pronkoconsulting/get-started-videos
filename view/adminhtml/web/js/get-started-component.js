define([
    "jquery",
    "uiComponent",
    "ko",
    "underscore"
], function ($, Component, ko, _) {
    "use strict";
    return Component.extend({
        initialize: function () {
            this._super();
            this.buttonText = ko.observable("?");
            this.isShowVideoLinks = ko.observable(false);
            this.arrayVideosData =  _.toArray(this.videosData);
            this.bindButton();
        },
        bindButton: function () {
            let $this = this;
            $('.get-started-button').live("click", function (e) {
                let isShow = $this.isShowVideoLinks();
                isShow = !isShow;
                $this.isShowVideoLinks(isShow);
                $this.buttonText(isShow ? "x" : "?");
            });
        },
        getVideosData: function () {
            return this.arrayVideosData;
        }
    });
});