
var SceneAbout = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var backgroundLayer = new LayerAboutBg();

        this.addChild(backgroundLayer, 0);
    }
})
