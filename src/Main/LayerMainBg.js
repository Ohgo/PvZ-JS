/**
 * Created by Ohgo on 4/23/14.
 */

var LayerMainBg = cc.Layer.extend({
    ctor:function () {
        cc.log("LayerMainBg Ctor");
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // load and place background on screen
        var backgroundSprite = cc.Sprite.create(bg_MainMenu);
        backgroundSprite.setAnchorPoint(0.5, 0.5);
        backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
        backgroundSprite.setScale(winSize.height/backgroundSprite.getContentSize().height);
        this.addChild(backgroundSprite, 0);
    }
})