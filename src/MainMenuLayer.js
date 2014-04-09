/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    titleLabel:null,
    circle:null,
    sprite:null,

    init:function () {

        if(!this._super()) return false;

        var winSize = cc.Director.getInstance().getWinSize();

        /*
         // Title text
         var titleLabel = cc.LabelTTF.create("Plants vs Zombies", "Impact", 38);
         titleLabel.setPosition(size.width / 2, size.height - 40);
         addChild(this.titleLabel, 5);
         */

        // load and place background on screen
        this.sprite = cc.Sprite.create(bg_MainMenu);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(winSize.width / 2, winSize.height / 2);
        this.sprite.setScale(winSize.height/this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);

        // load buttons
        var newGameNormal = cc.Sprite.create(btn_MainMenu_png, cc.rect(0, 0, 126, 33));
        var newGameSelected = cc.Sprite.create(btn_MainMenu_png, cc.rect(0, 33, 126, 33));
        var newGameDisabled = cc.Sprite.create(btn_MainMenu_png, cc.rect(0, 33 * 2, 126, 33));
        var gameOptionsNormal = cc.Sprite.create(btn_MainMenu_png, cc.rect(126, 0, 126, 33));
        var gameOptionsSelected = cc.Sprite.create(btn_MainMenu_png, cc.rect(126, 33, 126, 33));
        var gameOptionsDisabled = cc.Sprite.create(btn_MainMenu_png, cc.rect(126, 33 * 2, 126, 33));
        var aboutNormal = cc.Sprite.create(btn_MainMenu_png, cc.rect(252, 0, 126, 33));
        var aboutSelected = cc.Sprite.create(btn_MainMenu_png, cc.rect(252, 33, 126, 33));
        var aboutDisabled = cc.Sprite.create(btn_MainMenu_png, cc.rect(252, 33 * 2, 126, 33));

        // put buttons into clickable menus and assign onclick events
        var playGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this.onPlayGame, this);
        var option = cc.MenuItemSprite.create(gameOptionsNormal, gameOptionsSelected, gameOptionsDisabled, this.onOption, this);
        var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

        // place menus on screen
        var menu = cc.Menu.create(playGame, option, about);
        menu.alignItemsVerticallyWithPadding(30);
        this.addChild(menu, 1, 2);
        menu.setPosition(winSize.width / 2 + 200, winSize.height / 2);

        return true;
    },
    onButtonEffect:function(){
        // TODO: Play sound effects
        cc.log("onButtonEffect");
    },
    onPlayGame:function (pSender) {
        cc.log("Play Game!");
        this.onButtonEffect();

        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));

    },
    onOption:function (pSender) {
        cc.log("Option");
        this.onButtonEffect();
        // TODO: Go to option scene
    },
    onAbout:function (pSender) {
        cc.log("About");
        this.onButtonEffect();
        // TODO: Go to about scene
    }

});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
