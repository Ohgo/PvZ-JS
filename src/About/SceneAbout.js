/*
    Scene for the About page
 */
var SceneAbout = cc.Scene.extend({
    onEnter: function () {
        this._super();
        // it contains only one image
        var backgroundLayer = new LayerAboutBg();
        this.addChild(backgroundLayer, 0);
    }
})