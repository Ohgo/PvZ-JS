var SceneGame = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var gBGLayer = new LayerGameBg();
        var gCharacterLayer = new GameCharacterLayer();
        this.addChild(gBGLayer);
        this.addChild(gCharacterLayer);
        //gCharacterLayer.init();
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(LayerMainMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

