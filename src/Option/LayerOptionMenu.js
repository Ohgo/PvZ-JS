/**
 * Created by
 */

var LayerOptionMenu = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // load buttons
        // TODO: use spritesheet
        var btn_incMusicNormal = cc.Sprite.create(btn_increaseVolume);
        var btn_incMusicSelected = cc.Sprite.create(btn_increaseVolume);
        var btn_incMusicDisabled = cc.Sprite.create(btn_increaseVolume);

        var btn_decMusicNormal = cc.Sprite.create(btn_decreaseVolume);
        var btn_decMusicSelected = cc.Sprite.create(btn_decreaseVolume);
        var btn_decMusicDisabled = cc.Sprite.create(btn_decreaseVolume);

        var btn_incSoundEffectNormal = cc.Sprite.create(btn_increaseVolume);
        var btn_incSoundEffectSelected = cc.Sprite.create(btn_increaseVolume);
        var btn_incSoundEffectDisabled = cc.Sprite.create(btn_increaseVolume);

        var btn_decSoundEffectNormal = cc.Sprite.create(btn_decreaseVolume);
        var btn_decSoundEffectSelected = cc.Sprite.create(btn_decreaseVolume);
        var btn_decSoundEffectDisabled = cc.Sprite.create(btn_decreaseVolume);

        // put as clickable menu
        var incMusic = cc.MenuItemSprite.create(btn_incMusicNormal, btn_incMusicSelected, btn_incMusicDisabled, this.aFunction, this);
        var decMusic = cc.MenuItemSprite.create(btn_decMusicNormal, btn_decMusicSelected, btn_decMusicDisabled, this.aFunction, this);
        var incSoundEffect = cc.MenuItemSprite.create(btn_incMusicNormal, btn_incSoundEffectSelected, btn_incSoundEffectDisabled, this.aFunction, this);
        var decSoundEffect = cc.MenuItemSprite.create(btn_decSoundEffectNormal, btn_decSoundEffectSelected, btn_decSoundEffectDisabled, this.aFunction, this);

        // place menus on screen
        var MusicControl = cc.Menu.create(incMusic, decMusic);
        var SoundEffectControl = cc.Menu.create(incSoundEffect, decSoundEffect);
        MusicControl.alignItemsHorizontallyWithPadding(30);
        MusicControl.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(MusicControl, 0);


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


LayerOptionMenu.create = function () {
    var opt = new LayerOptionMenu();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};

