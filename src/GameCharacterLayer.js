/**
 * Created by YingjieChen on 14-4-10.
 */
var GameCharacterLayer = cc.Layer.extend({
    bacteriaList:[],

    ctor:function(){
        this._super();
        this.initBacteria();
    },

    initBacteria:function(){
        //add bacteriaSprite
        var bacteria = new BacteriaHappyGray();
        bacteria.initData();
        bacteria.setPosition(cc.p(900,300));
        this.addChild(bacteria,1);
        this.bacteriaList.push(bacteria);
        cc.log("add bacteria");
    }
});