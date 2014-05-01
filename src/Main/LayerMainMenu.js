/**
 * Created by 00 on 14-4-10.
 */

var LayerMainMenu = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        cc.log("LayerMainMenu");
        var bRet = false;
        if(this._super()) {
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
            bRet = true;
        }
        return bRet;
    },
    onButtonEffect:function(){
        // TODO: Play sound effects
        // cc.log("onButtonEffect");
    },
    onPlayGame:function (pSender) {
        this.onButtonEffect();
        var scene = new SceneGame();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));

    },
    onOption:function (pSender) {
        this.onButtonEffect();
        var optionScene = new SceneOption();
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, optionScene));

    },
    onAbout:function (pSender) {
        cc.log("About");
        this.onButtonEffect();
        // TODO: Go to about scene
    }


});
