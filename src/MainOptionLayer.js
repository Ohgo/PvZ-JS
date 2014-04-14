/**
 * Created by
 */

var MainOptionLayer = cc.Layer.extend({

    ctor:function () {
        cc.log("Options1!");
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        var bg = cc.Sprite.create(dock_options);
        bg.setAnchorPoint(cc.p(0,0));
        this.addChild(bg,1);
        cc.log("Options!");

        // load and place background on screen

        // load buttons

        // put buttons into clickable menus and assign onclick events

        // place menus on screen

        return true;
    },
    onMusicIncrease:function(){

    },
    onMusicDecrease:function (pSender) {

    },
    onSoundIncrease:function (pSender) {

    },
    onSoundDecrease:function (pSender) {

    }


});


MainOptionLayer.create = function () {
    var opt = new MainOptionLayer();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};

