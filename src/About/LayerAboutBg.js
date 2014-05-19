/**
 * Created by 00 on 14-5-18.
 */
var LayerAboutBg = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // load and place background on screen
        var backgroundSprite = cc.Sprite.create(bg_About);
        backgroundSprite.setAnchorPoint(0.5, 0.5);
        backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
        backgroundSprite.setScale(winSize.height/backgroundSprite.getContentSize().height);
        this.addChild(backgroundSprite, 0);

        var backNormal = cc.Sprite.create(btn_back, cc.rect(160, 0, 155, 75));
        var backSelected = cc.Sprite.create(btn_back, cc.rect(160, 80, 155, 75));
        var backDisabled = cc.Sprite.create(btn_back, cc.rect(126, 33 * 2, 126, 33));

        var back = cc.MenuItemSprite.create(backNormal, backSelected, backDisabled, this.onBack, this);

        var backMenu = cc.Menu.create(back);

        backMenu.alignItemsHorizontallyWithPadding(90);
        backMenu.setPosition(500, 85);
        this.addChild(backMenu, 1);
    },

    onBack:function(){
        cc.log("Back to the main page");
        var scene = new SceneMain();
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, scene));
    }
})