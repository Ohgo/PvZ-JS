/**
 * Created by Sercan on 2014-05-18.
 */
var LayerAboutBack = cc.Layer.extend({

    ctor:function () {
        cc.log("LayerAboutBackButton");
        this._super();
        this.setTouchEnabled(true);
        var winSize = cc.Director.getInstance().getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_options_plist);

            var backNormal = cc.Sprite.create(btn_back, cc.rect(160, 0, 155, 75));
            var backSelected = cc.Sprite.create(btn_back, cc.rect(160, 80, 155, 75));
            var backDisabled = cc.Sprite.create(btn_back, cc.rect(126, 33 * 2, 126, 33));

            var back = cc.MenuItemSprite.create(backNormal, backSelected, backDisabled, this.onBack, this);

            var backMenu = cc.Menu.create(back);

            backMenu.alignItemsHorizontallyWithPadding(90);
            backMenu.setPosition(500, 85);
            this.addChild(backMenu, 1);

            return true;
        },

        onBack:function(){
            cc.log("Back to the main page");
            var scene = new SceneMain();
            cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, scene));
        }

   });

LayerAboutBack.create = function () {
    var opt = new LayerAboutBack();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};