/**
 * Copyright © Pronko Consulting (https://www.pronkoconsulting.com)
 * See LICENSE for the license details.
 */
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
            var $this = this;
            $('.get-started-button').live("click", function (e) {
                var isShow = $this.isShowVideoLinks();
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
