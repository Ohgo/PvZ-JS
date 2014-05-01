/****************************************************************************

 ****************************************************************************/


var SceneMain = cc.Scene.extend({
    onEnter:function () {
        cc.log("On Enter");
        this._super();
        var backgroundLayer = new LayerMainBg();
        var mainLayer = new LayerMainMenu();

        this.addChild(backgroundLayer, 0);
        this.addChild(mainLayer, 1);

        gSharedEngine.playMusic(MUSIC_BACKGROUND,true);
    }
});

