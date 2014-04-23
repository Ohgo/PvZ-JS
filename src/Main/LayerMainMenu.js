/**
 * Created by 00 on 14-4-10.
 */

var LayerMainMenu = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // load buttons
        var newGameNormal = cc.Sprite.create(btn_MainMenu_png, cc.rect(0, 0, 126, 33));
        var newGameSelected = cc.Sprite.create(btn_MainMenu_png, cc.rect(0, 33, 126, 33));
        var newGameDisabled = cc.Sprite.create(btn_MainMenu_png, cc.rect(0, 33 * 2, 126, 33));
        var gameOptionsNormal = cc.Sprite.create(btn_MainMenu_png, cc.rect(126, 0, 126, 33));
        var gameOptionsSelected = cc.Sprite.create(btn_MainMenu_png, cc.rect(126, 33, 126, 33));
        var gameOptionsDisabled = cc.Sprite.create(btn_MainMenu_png, cc.rect(126, 33 * 2, 126, 33));
        var aboutNormal = cc.Sprite.create(btn_MainMenu_png, cc.rect(252, 0, 126, 33));
        var aboutSelected = cc.Sprite.create(btn_MainMenu_png, cc.rect(252, 33, 126, 33));
        var aboutDisabled = cc.Sprite.create(btn_MainMenu_png, cc.rect(252, 33 * 2, 126, 33));

        // put buttons into clickable menus and assign onclick events
        var playGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this.onPlayGame, this);
        var option = cc.MenuItemSprite.create(gameOptionsNormal, gameOptionsSelected, gameOptionsDisabled, this.onOption, this);
        var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

        // place menus on screen
        var menu = cc.Menu.create(playGame, option, about);
        menu.alignItemsVerticallyWithPadding(30);
        menu.setPosition(winSize.width / 2 + 200, winSize.height / 2);
        this.addChild(menu, 0);

        return true;
    },
    onButtonEffect:function(){
        // TODO: Play sound effects
        // cc.log("onButtonEffect");
    },
    onPlayGame:function (pSender) {
        // cc.log("Play Game!");
        this.onButtonEffect();

        var scene = new GameScene();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));

    },
    onOption:function (pSender) {
        // cc.log("Option");
        this.onButtonEffect();
        //var scene = new SceneMain();
        //scene.showOptionLayer();
        //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, scene));
        var nextScene = cc.Scene.create();
        var nextLayer = new LayerMainOption;
        nextScene.addChild(nextLayer);
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, nextScene));
    },
    onAbout:function (pSender) {
        cc.log("About");
        this.onButtonEffect();
        // TODO: Go to about scene
    }


});
