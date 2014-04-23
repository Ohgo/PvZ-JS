/**
 * Created by Ohgo on 4/23/14.
 */


var LayerMainBg = cc.Layer.extend({
    backgroundSprite:null,

    ctor:function () {

        this._super();

        var winSize = cc.Director.getInstance().getWinSize();

        // load and place background on screen
        this.backgroundSprite = cc.Sprite.create(bg_MainMenu);
        this.backgroundSprite.setAnchorPoint(0.5, 0.5);
        this.backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
        this.backgroundSprite.setScale(winSize.height/this.backgroundSprite.getContentSize().height);
        this.addChild(this.backgroundSprite, 0);
    }
})