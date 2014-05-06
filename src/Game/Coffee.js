/**
 * Created by Sercan on 4/23/14.
 */

var Coffee = cc.Sprite.extend({
    speed: 200,
    active:true,
    pos_x: size.width/2,
    pos_y: size.heigth/2,
    zOrder:1000,

    ctor: function (arg) {
        this._super();
        this.speed = arg.speed;

        this.initWithFile("coffee.png");
    },

    _timeTick:0,

    update:function(dt){
        var p = this.getPosition();
        if(p.x < 0 || p.x > winSize.width && p.y < 0 || p.y > winSize.height){
            this.active = false;
        }
        this._timeTick += dt;
    }
});

    Coffee.getOrCreateCoffee = function(arg){
    var selChild = null;

    // TODO: This loop logic is confusing. Make sure it works, then change to if and comment. *Aries
    // if there is a reusable bacteria object in the container, use it
    for (var j = 0; j < PvZ.CONTAINER.COFFEES.length; j++) {
        selChild = PvZ.CONTAINER.COFFEES[j];

        if (selChild.active == false) {
            selChild.speed = arg.speed;
            selChild.pos_x = arg.pos_x;
            selChild.pos_y = arg.pos_y;

            selChild.setVisible(true);
            PvZ.ACTIVE_COFFEE++;
            cc.log("Coffee.js: Getting an old coffee from container index " + j);
            return selChild;
        }
    }

    // otherwise, create a new one
    selChild = Coffee.create(arg);
    PvZ.ACTIVE_COFFEE++;
    return selChild;
};

Coffee.create = function (arg) {
    cc.log("Coffee.js: Creating new coffee");
    var bacteria = new Coffee(arg);
    g_GameCoffeeLayer.addChild(coffee, coffee.zOrder);
    PvZ.CONTAINER.COFFEES.push(coffee);
    return coffee;
};

Coffee.move_up_left = function(){
    //when clicked the coffee moves up lef corner
    var coffee_action = cc.MoveTo.create(2,cc.p(0, size.height));
    this.Coffee.runAction(coffee_action);
};
