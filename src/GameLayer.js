var GameLayer = cc.Layer.extend({
    init:function () {
        if (!this._super()) return false;

        var bg = cc.Sprite.create(bg_Game_png);
        bg.setAnchorPoint(0,0);
        this.addChild(bg, 0, 1);
        /*
         var cacheImage = cc.TextureCache.getInstance().addImage(res.menuTitle_png);
         var title = cc.Sprite.createWithTexture(cacheImage, cc.rect(0, 36, 100, 34));
         title.setPosition( winSize.width / 2, winSize.height - 60 );
         this.addChild(title);

         // There is a bug in LabelTTF native. Apparently it fails with some unicode chars.
         var about = cc.LabelTTF.create("   This showcase utilizes many features from Cocos2d-html5 engine, including: Parallax background, tilemap, actions, ease, frame animation, schedule, Labels, keyboard Dispatcher, Scene Transition. \n    Art and audio is copyrighted by Enigmata Genus Revenge, you may not use any copyrigted material without permission. This showcase is licensed under GPL. \n \n Programmer: \n Shengxiang Chen (陈升想) \n Dingping Lv (吕定平) \n Effects animation: Hao Wu(吴昊)\n Quality Assurance:  Sean Lin(林顺)", "Arial", 14, cc.size(winSize.width * 0.85, 320), cc.TEXT_ALIGNMENT_LEFT );
         about.setPosition(winSize.width / 2,  winSize.height/2 -20 );
         about.setAnchorPoint(0.5, 0.5 );
         this.addChild(about);

         var label = cc.LabelTTF.create("Go back", "Arial", 14);
         var back = cc.MenuItemLabel.create(label, this.onBackCallback);
         var menu = cc.Menu.create(back);
         menu.setPosition( winSize.width / 2, 40);
         this.addChild(menu);
         */

        return true;
    },
    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MainMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
