/**
 * Load background image for the main menu
 */

var LayerMainBg = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        cc.log("LayerMainBg");
        var bRet = false;
        if(this._super()) {
            var winSize = cc.Director.getInstance().getWinSize();

            // load and place background on screen
            var backgroundSprite = cc.Sprite.create(bg_MainMenu);
            backgroundSprite.setAnchorPoint(0.5, 0.5);
            backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
            backgroundSprite.setScale(winSize.height/backgroundSprite.getContentSize().height);
            this.addChild(backgroundSprite, 0);
            bRet = true;
        }
        return bRet;
    }
})