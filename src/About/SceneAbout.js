/**
 * Created by Sercan on 2014-05-18.
 */

var SceneAbout = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var backgroundLayer = new LayerAboutBg();
        var mainLayer = new LayerAboutBack();

        this.addChild(backgroundLayer, 0);
        this.addChild(mainLayer, 1);
    }
});
