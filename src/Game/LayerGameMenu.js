/**
 * Contains pause button and other HUD elements
 */

var LayerGameMenu = cc.Layer.extend({

    menu:null,
    resumeMenu:null,

    ctor:function(){
        this._super();
        this.initPauseMenu();
        this.initResumeMenu();
    },

    initPauseMenu:function(){
        var winSize = cc.Director.getInstance().getWinSize();

        var pauseNormal = cc.Sprite.create(btn_pause, cc.rect(160, 0, 155, 75));
        var pauseSelected = cc.Sprite.create(btn_pause, cc.rect(160, 80, 155, 75));

        var pauseGame = cc.MenuItemSprite.create(pauseNormal, pauseSelected, this.onPauseGame, this);

        // place menus on screen
        menu = cc.Menu.create(pauseGame);
        menu.alignItemsHorizontallyWithPadding(90);
        menu.setPosition(900, winSize.height - 50);
        menu.setVisible(true);
        this.addChild(menu, 0);

    },

    initResumeMenu:function(){
        var resumeNormal = cc.Sprite.create(btn_pause, cc.rect(320, 0, 155, 75));
        var resumeSelected = cc.Sprite.create(btn_pause, cc.rect(320, 80, 155, 75));
        var restartNormal = cc.Sprite.create(btn_pause, cc.rect(0, 0, 155, 75));
        var restartSelected = cc.Sprite.create(btn_pause, cc.rect(0, 80, 155, 75));

        var resumeGame = cc.MenuItemSprite.create(resumeNormal,resumeSelected,this.onResumeGame,this);
        var restartGame = cc.MenuItemSprite.create(restartNormal,restartSelected,this.onRestartGame,this);

        var winSize = cc.Director.getInstance().getWinSize();

        resumeMenu = cc.Menu.create(resumeGame,restartGame);
        resumeMenu.alignItemsHorizontallyWithPadding(90);
        resumeMenu.setPosition(winSize.width/2 , winSize.height/2);
        this.addChild(resumeMenu, g_GameZOder.ui);

        resumeMenu.setVisible(false);

    },

    onPauseGame:function(){
        _status = g_GameStatus.stop;
        cc.Director.getInstance().pause();
        cc.log("Game Paused"+_status);
        menu.setVisible(false);
        resumeMenu.setVisible(true);

    },

    onResumeGame:function(){

        _status = g_GameStatus.play;
        cc.Director.getInstance().resume();
        cc.log("Game Resumed"+_status);
        menu.setVisible(true);
        resumeMenu.setVisible(false);
    },

    onRestartGame:function(){
        cc.Director.getInstance().resume();
        var newScene = new SceneMain();
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, newScene));
    }
})