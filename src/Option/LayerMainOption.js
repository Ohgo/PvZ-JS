/**
 * Created by
 */

var LayerMainOption = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        var bg = cc.Sprite.create(dock_options);
        bg.setAnchorPoint(cc.p(0,0));
        this.addChild(bg,1);

        var titleLabel = cc.LabelTTF.create("Game Options", "Impact", 38);
        titleLabel.setPosition(winSize.width / 2, winSize.height - 40);
        this.addChild(titleLabel, 5);


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


LayerMainOption.create = function () {
    var opt = new LayerMainOption();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};

