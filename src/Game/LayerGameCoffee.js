var g_GameCoffeeLayer;

GameCoffeeLayer = cc.Layer.extend({
    isMouseDown: false,

    ctor: function(){
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        cc.log("GameCoffeeLayer");
        var size = cc.Director.getinstatance().getWinSize();

        this.Coffee = cc.Sprite.create("coffee.png");
        this.Sprite.setAnchorpoint(cc.p(0.5,0.5));
        this.Coffee.setPosition(cc.p(size.witdh/2, size.height/2));

        this.addChild(this.Coffee, 0);
        g_GameCoffeeLayer = this;
        return true;
    },

    //coffee sets its position to a random spot on the top line of the screen and moves down
    refresh_CoffeeAct:function() {

        this.pos_x = Math.round(Math.random()*(size.width-100))+ 100;
        this.pos_y = 0;

            this.Coffee.setPosition(cc.p(pos_x,pos_y));

        var coffee_action = cc.MoveBy.create(2, cc.p(pos_x, pos_y - Coffee.size.height/2)); //goes outof the screen
        this.Coffee.runAction(coffee_action);
},

    //in a random period of 0.5 to 3 sec the coffee refreshes its act.
    loop:function () {
             var random_time = Math.round(Math.random()*(3000-500))+ 500;
            setTimeout(function(){
                refresh_CoffeeAct();
                loop();
            },random_time);
        },

    move_up_left: function(){
    //when clicked the coffee moves up lef corner
    var coffee_action = cc.MoveTo.create(2,cc.p(0, size.height));
    this.Coffee.runAction(coffee_action);
}

});