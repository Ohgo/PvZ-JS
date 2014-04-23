/**
 * Created by YingjieChen on 14-4-10.
 */
var SceneOption = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var backgroundLayer = new LayerOptionBg();
        var mainLayer = new LayerOptionMenu();

        this.addChild(backgroundLayer, 0);
        this.addChild(mainLayer, 1);
    },

    onBackCallback:function (pSender) {
        var scene = SceneMain();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});


