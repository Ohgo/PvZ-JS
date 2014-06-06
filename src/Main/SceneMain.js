/****************************************************************************
Main Scene, contains:
 Background Layer   : Background image in the main menu
 Main Layer         : Buttons to navigate to about, options, or game play
 ****************************************************************************/


var SceneMain = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var backgroundLayer = new LayerMainBg();
        var mainLayer = new LayerMainMenu();

        this.addChild(backgroundLayer, 0);
        this.addChild(mainLayer, 1);

        // Play the preloaded BGM
        gSharedEngine.playMusic(MUSIC_BACKGROUND,true);
        gSharedEngine.setMusicVolume(0.5);

    }
});

