/**
 * Created by HuiminZhang on 14-5-16.
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
        var newRestartNormal = cc.Sprite.create(btn_restart, cc.rect(0, 0, 178, 56));
        var newRestartSelected = cc.Sprite.create(btn_restart, cc.rect(0, 10, 178, 56));
        var newRestartDisabled = cc.Sprite.create(btn_restart, cc.rect(0, 10 * 2, 178, 56));

        var restartGame = cc.MenuItemSprite.create(newRestartNormal, newRestartSelected, newRestartDisabled, this.onRestartGame, this);

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