var g_GameZOder = {bg:0, ui:1, front:100};//present layer
var g_GameStatus = {play:0, stop:1, gameOver:2};//game status

var SceneGame = cc.Scene.extend({
    onEnter:function () {
        cc.log("SceneGame: onEnter");
        this._super();

        var gBGLayer = new LayerGameBg();
        var gCharacterLayer = new GameCharacterLayer();

        this.addChild(gBGLayer, g_GameZOder.bg);
        this.addChild(gCharacterLayer, g_GameZOder.ui);
        //gCharacterLayer.init();
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(LayerMainMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

