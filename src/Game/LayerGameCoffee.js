var g_GameStatus = {play:0, stop:1, gameOver:2};//game status
var g_GameCoffeeLayer;

GameCoffeeLayer = cc.Layer.extend({
    isMouseDown: false,

    ctor: function(){
        this._super();
        this.init();
    },

    init:function () {
        var bRet = false;
        if (this._super()) {

        cc.log("GameCoffeeLayer");
        var size = cc.Director.getinstatance().getWinSize();

        this.Coffee = cc.Sprite.create("coffee.png");
        this.Sprite.setAnchorpoint(cc.p(0.5,0.5));
        this.Coffee.setPosition(cc.p(size.witdh/2, size.height/2));
        this.addChild(this.Coffee, 0);

        PvZ.CONTAINER.COFFEES = [];
        PvZ.ACTIVE_COFFEE = 0;
        this._state = g_GameStatus.play;

        var winSize = cc.Director.getInstance().getWinSize();

            // schedule
            this.scheduleUpdate();
            this.schedule(this.refreshCoffeeAct, 1);

        g_GameCoffeeLayer = this;

            bRet = true;
        }
        return bRet;
    },


    //coffee sets its position to a random spot on the top line of the screen and moves down
    refresh_CoffeeAct:function() {

        this.pos_x = Math.round(Math.random()*(size.width-100))+ 100;
        this.pos_y = 0;

            this.Coffee.setPosition(cc.p(pos_x,pos_y));

        var coffee_action = cc.MoveBy.create(2, cc.p(pos_x, pos_y - Coffee.size.height/2)); //goes outof the screen
        this.Coffee.runAction(coffee_action);
},

    update:function (dt) {
        if(this._state == g_GameStatus.play){
            this.checkIsCollide();
        }
    },

    //in a random period of 0.5 to 3 sec the coffee refreshes its act.



});