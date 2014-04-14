/**
 * Created by YingjieChen on 14-4-10.
 */
var GameCharacterLayer = cc.Layer.extend({

    init:function(){
        var bRet = false;
        if (this._super()) {
            //MW.CONTAINER.ENEMIES = [];

            winSize = cc.Director.getInstance().getWinSize();
            //this._levelManager = new LevelManager(this);
            this.initBacteria();
        }
        return bRet;
    },

    initBacteria:function(){
        //add bacteriaSprite
        var bacteria = new BacteriaHappyGray();
        bacteria.initData();
        bacteria.setPosition(cc.p(960,320));

        this.addChild(bacteria,1);
       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
//        bacteria.update(2);
        cc.log("add bacteria");
    }

//    update:function(dt){
//        this.bacteria.update(dt);
//    }
});