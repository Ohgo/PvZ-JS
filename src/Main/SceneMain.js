/****************************************************************************

 ****************************************************************************/


var SceneMain = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var backgroundLayer = new LayerMainBg();
        var mainLayer = new LayerMainMenu();

        this.addChild(backgroundLayer, 0);
        this.addChild(mainLayer, 1);
    }
});

