/**
 * display when the player lose the game
 * handle restart function
 */

var SceneGameOver = cc.Scene.extend({

    onEnter:function () {

    this._super();
    this.initData();

   },
    initData:function(){

        var winSize = cc.Director.getInstance().getWinSize();

        //Layer
        this.gameOverLayer = cc.Layer.create();
        this.addChild(this.gameOverLayer);
        //BG
        var bg = cc.Sprite.create(bg_gameOver);
        this.gameOverLayer.addChild(bg,g_GameZOder.bg);
        bg.setAnchorPoint(cc.p(0,0));
        bg.setPosition(cc.p(0,0));

        // load buttons
        var newRestartNormal = cc.Sprite.create(btn_pause, cc.rect(0, 0, 155, 75));
        var newRestartSelected = cc.Sprite.create(btn_pause, cc.rect(0, 80, 155, 75));

        var restartGame = cc.MenuItemSprite.create(newRestartNormal, newRestartSelected, this.onRestartGame, this);

        // place menus on screen
        var menu = cc.Menu.create(restartGame);
        menu.alignItemsVerticallyWithPadding(30);
        menu.setPosition(winSize.width / 2 , winSize.height / 2 - 100);
        this.gameOverLayer.addChild(menu,g_GameZOder.ui);

        gSharedEngine.playMusic(MUSIC_BACKGROUND,true);
        gSharedEngine.setMusicVolume(0.5);
    },
    onRestartGame:function(){
        var newScene = new SceneMain();
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, newScene));
    }
 });