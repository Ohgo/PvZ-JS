/**
 * Created by Sercan on 2014-05-18.
 */
var LayerAboutBg = cc.Layer.extend({

    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // load and place background on screen
        var backgroundSprite = cc.Sprite.create(bg_MainMenu);
        backgroundSprite.setAnchorPoint(0.5, 0.5);
        backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
        backgroundSprite.setScale(winSize.height/backgroundSprite.getContentSize().height);
        this.addChild(backgroundSprite, 0);

        var titleLabel = cc.LabelTTF.create("About", "Impact", 38);
        titleLabel.setPosition(winSize.width / 2, winSize.height - 40);
        this.addChild(titleLabel, 1);

        var about = cc.LabelTTF.create("   This game is a student project for the User Interface Programming-2 course in Uppsala University. The game is a replica of the famous game Plants vs. Zombies \n \n Programmer: \n Aries Kurnawian \n Huimim Zang \n Yingjie Chen \n Sercan Caglarca \n \n Illustration:\n Yingjie Chen.", "Arial", 14, cc.size(winSize.width * 0.85, 320), cc.TEXT_ALIGNMENT_LEFT );
        about.setPosition(winSize.width / 2,  winSize.height/2 -20 );
        about.setAnchorPoint(0.5, 0.5 );
        this.addChild(about);
    }
})