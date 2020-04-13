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
            return _.toArray(this.videosData);
        }
    });
});