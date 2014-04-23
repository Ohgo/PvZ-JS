/**
 * Created by
 */

var LayerMainOption = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();


         var titleLabel = cc.LabelTTF.create("Plants vs Zombies", "Impact", 38);
         titleLabel.setPosition(size.width / 2, size.height - 40);
         addChild(this.titleLabel, 5);

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


LayerMainOption.create = function () {
    var opt = new LayerMainOption();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};

