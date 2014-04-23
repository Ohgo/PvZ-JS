/**
 * Created by
 */

var LayerOption = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

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


LayerOption.create = function () {
    var opt = new LayerOption();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};

