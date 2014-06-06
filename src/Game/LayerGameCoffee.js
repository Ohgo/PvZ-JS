/**
 * Contains coffee to be collected
 */

var g_GameCoffeeLayer;

var LayerGameCoffee = cc.Layer.extend({
    _size:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        g_GameCoffeeLayer = this;
        this._size = cc.Director.getInstance().getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(coffee_plist);
        //Coffee.setUpAnimation();
        this.schedule(this.spawnCoffee, 10);
    },

    spawnCoffee:function() {
        if(_status == g_GameStatus.play){
            Coffee.getOrCreateCoffee();
        }
    }
})