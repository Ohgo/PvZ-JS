var SceneGame = cc.Scene.extend({
    onEnter:function () {
        cc.log("SceneGame: onEnter");
        this._super();

        var gBGLayer = new LayerGameBg();
        var gCharacterLayer = new GameCharacterLayer();
        var gCoffeeLayer = new GameCoffeeLayer();

        this.addChild(gBGLayer, 0);
        this.addChild(gCharacterLayer, 1);
        this.addChild(gCoffeeLayer, 2);
        //gCharacterLayer.init();
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(LayerMainMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

