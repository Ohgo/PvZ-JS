/**
 * Created by Ohgo on 14-4-23.
 */
var SceneOption = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var backgroundLayer = new LayerOptionBg();
        var mainLayer = new LayerOptionMenu();

        this.addChild(backgroundLayer, 0);
        this.addChild(mainLayer, 1);
    }
});


