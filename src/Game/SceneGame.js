var SceneGame = cc.Scene.extend({
    onEnter:function () {
        cc.log("SceneGame: onEnter");
        this._super();

        var gBGLayer = new GameBGLayer();
        var gCharacterLayer = new GameCharacterLayer();

        this.addChild(gBGLayer, 0);
        this.addChild(gCharacterLayer, 1);
        //gCharacterLayer.init();
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(LayerMainMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

