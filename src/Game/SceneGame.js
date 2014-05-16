var g_GameZOder = {bg:0, ui:1, front:100};//present layer
var g_GameStatus = {play:0, stop:1, gameOver:2};//game status


var SceneGame = cc.Scene.extend({

    gBGLayer:null,
    gCharacterLayer:null,


    onEnter:function () {
        cc.log("SceneGame: onEnter");
        this._super();

        gBGLayer = new LayerGameBg();
        gCharacterLayer = new GameCharacterLayer();

        this.addChild(gBGLayer, g_GameZOder.bg);
        this.addChild(gCharacterLayer, g_GameZOder.ui);
        //gCharacterLayer.init();
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(LayerMainMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },

    reduceLive:function (){
        cc.log("REDUCE LIFE");
        n_lives -= 1;
        if(n_lives > 0){
            lblLives.initWithFile("/lives_" + n_lives + ".png");
        }
        lblLives.setAnchorPoint(cc.p(1, 1));

        if (n_lives <= 0) {
            //g_GameStatus = g_GameStatus.gameOver;
            cc.log("GAME OVER");
            //this.overGame();
        } else {
        }
    }
});

