/**
 * Created by
 */

var LayerOptionMenu = cc.Layer.extend({
    _optionComponentsBatch:null,

    ctor:function () {
        cc.log("LayerOptionMenu");
        this._super();
        this.setTouchEnabled(true);
        var winSize = cc.Director.getInstance().getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_options_plist);

        // load option assets
        var optionComponents = cc.TextureCache.getInstance().addImage(s_options_png);
        this._optionComponentsBatch = cc.SpriteBatchNode.createWithTexture(optionComponents);
        this.addChild(this._optionComponentsBatch);

        // buttons
         var btn_incMusicNormal = cc.Sprite.createWithSpriteFrameName(btn_increaseVolume);
         var btn_incMusicSelected = cc.Sprite.createWithSpriteFrameName(btn_increaseVolume_sel);
         var btn_decMusicNormal = cc.Sprite.createWithSpriteFrameName(btn_decreaseVolume);
         var btn_decMusicSelected = cc.Sprite.createWithSpriteFrameName(btn_decreaseVolume_sel);

         var btn_incSoundEffectNormal = cc.Sprite.createWithSpriteFrameName(btn_increaseVolume);
         var btn_incSoundEffectSelected = cc.Sprite.createWithSpriteFrameName(btn_increaseVolume_sel);
         var btn_decSoundEffectNormal = cc.Sprite.createWithSpriteFrameName(btn_decreaseVolume);
         var btn_decSoundEffectSelected = cc.Sprite.createWithSpriteFrameName(btn_decreaseVolume_sel);

        // sliders for music and sound effect control
        cc.log("Creating sliders");
        //var bg_music = cc.Sprite.createWithSpriteFrameName(slider_volume_png);
        //var pin_music = cc.Sprite.createWithSpriteFrameName(pin_volume_png);
        // var slider_music = cc.ControlSlider.initWithSprites(bg_music, bg_music, pin_music);
        var slider_music = cc.ControlSlider.create(slider_volume_png, slider_volume_png, pin_volume_png);
        slider_music.setMinimumAllowedValue(0);
        slider_music.setMaximumAllowedValue(0.5);

        slider_music.setAnchorPoint(0.5,0.5);
        slider_music.setPosition(winSize.width / 2, 2 * winSize.height / 3);
        slider_music.setEnabled(true);
        this.addChild(slider_music, 2);

/*
        var slider_soundeffect = cc.Sprite.createWithSpriteFrameName(slider_volume_png);
        var pin_soundeffect = cc.Sprite.createWithSpriteFrameName(pin_volume_png);
        var slider_soundeffect = cc.ControlSlider.initWithSprites(bg_music, bg_music, pin_music);
        // var slider_soundeffect = cc.ControlSlider.create(bg_music, bg_music, pin_music);
        slider_soundeffect.setPosition(winSize.width / 2, winSize.height / 3);
        this.addChild(slider_soundeffect, 3);
*/
        // put buttons as clickable menu
        var incMusic = cc.MenuItemSprite.create(btn_incMusicNormal, btn_incMusicSelected, this.onMusicIncrease, this);
        var decMusic = cc.MenuItemSprite.create(btn_decMusicNormal, btn_decMusicSelected, this.onMusicDecrease, this);
        var incSoundEffect = cc.MenuItemSprite.create(btn_incSoundEffectNormal, btn_incSoundEffectSelected, this.onSoundEffectIncrease, this);
        var decSoundEffect = cc.MenuItemSprite.create(btn_decSoundEffectNormal, btn_decSoundEffectSelected, this.onSoundEffectDecrease, this);

        // place menus on screen
        var MusicControl = cc.Menu.create(decMusic, incMusic);
        MusicControl.alignItemsHorizontallyWithPadding(winSize.width / 2);
        MusicControl.setPosition(winSize.width / 2, 2 * winSize.height / 3);
        var SoundEffectControl = cc.Menu.create(decSoundEffect, incSoundEffect);
        SoundEffectControl.alignItemsHorizontallyWithPadding(winSize.width / 2);
        SoundEffectControl.setPosition(winSize.width / 2, winSize.height / 3);

        this.addChild(MusicControl, 0);
        this.addChild(SoundEffectControl, 1);

        // put buttons into clickable menus and assign onclick events

        // place menus on screen

        return true;
    },
    onMusicIncrease:function(){
        gSharedEngine.setMusicVolume(gSharedEngine.getMusicVolume()+0.1);
        cc.log("Current music volume: " + gSharedEngine.getMusicVolume());
    },
    onMusicDecrease:function (pSender) {
        gSharedEngine.setMusicVolume(gSharedEngine.getMusicVolume()-0.1);
        cc.log("Current music volume: " + gSharedEngine.getMusicVolume());
    },
    onSoundEffectIncrease:function (pSender) {
        gSharedEngine.setEffectsVolume(gSharedEngine.getEffectsVolume()+0.1);
        cc.log("Current effect volume: " + gSharedEngine.getEffectsVolume());
    },
    onSoundEffectDecrease:function (pSender) {
        gSharedEngine.setEffectsVolume(gSharedEngine.getEffectsVolume()-0.1);
        cc.log("Current effect volume: " + gSharedEngine.getEffectsVolume());
    }


});


LayerOptionMenu.create = function () {
    var opt = new LayerOptionMenu();
    if (opt && opt.init()) {
        return opt;
    }
    return null;
};

