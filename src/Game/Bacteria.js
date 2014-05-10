var Bacteria = cc.Sprite.extend({
    isHit: false,   //for collision detection
    HP:0,
    radius:0,    //collision radius

    bacteriaType:1,
    active:true,
    speed:200,
    HP:15,
    zOrder:1000,
    moveType:null,
    moveSpeed:null,
    delayTime:1 + 1.2 * Math.random(),
    attackMode:null,
    animation:null,
    state:null,
    //attackMode:PvZ.BACTERIA_MOVE_TYPE.HORIZONTAL_WALK,

    ctor: function (arg) {
        this._super();
        //attackMode:PvZ.BACTERIA_MOVE_TYPE.HORIZONTAL_WALK;
        this.HP = arg.HP;
        this.moveType = arg.moveType;
        this.attackMode = arg.attackMode;
        this.bacteriaType = arg.type;
        this.moveSpeed = arg.moveSpeed;

        //this.initWithFile("BacteriaHappyGray.png");
        //this.initWithSpriteFrameName(arg.textureName);
        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("bacteriaGray1.png");
        this.initWithSpriteFrame(pFrame);

        this.state = PvZ.WALK;
        this.changeState();
        //this.runAction(
        //    cc.Animate.create(this.animation)
        //);
        //this.schedule();
    },

    _timeTick:0,

    update:function(dt){
        var p = this.getPosition();
        if(p.x < 0 || p.x > winSize.width && p.y < 0 || p.y > winSize.height){
            this.active = false;
        }
        this._timeTick += dt;
    },

    walk:function(){
        this.animation = cc.AnimationCache.getInstance().getAnimation("BacteriaWalkAnimation");
        this.runAction(cc.Animate.create(this.animation));
    },

    attack:function() {

    },

    changeState:function(){
        switch(this.state) {
            case PvZ.WALK:
                this.walk();
                break;
            case PvZ.ATTACK:
                this.attack();
            default:
                this.walk();
        }
    }

//    initData:function(){
//        this.isHit = false;
//        this.HP = 10;
//        this.radius = 110;
//        this.velocity = cc.p(100,100);
        //GameCharacterLayer.addChild(BacteriaHappyGray,1);

        //var addBacteria = new BacteriaHappyGray();
//        var bacteriapos = cc.p(100,320);
//        var bacteriacs =  this.getContentSize();
//        this.setPosition(bacteriapos);

//        var tmpAction;
//        var a0=0;
//        var a1=0;
//        a0 = cc.MoveBy.create(5, cc.p(-960,0));
//        a1 = cc.ShakyTiles3D.create(5, cc.size(15, 10), 4, false);
//        tmpAction = cc.Spawn.create(a0, a1);
//
//        this.runAction(tmpAction);
//        cc.log("add bacteria!!!");
//    }
    //update: function (dt) {
        //this.setPosition(cc.pMult(this.getPosition(),cc.pMult(this.velocity, dt)),310);
        //this.checkHitEdge();
    //}
});

Bacteria.getOrCreateBacteria = function(arg){
    var selChild = null;

    // if there is a reusable bacteria object in the container, use it
    for (var j = 0; j < PvZ.CONTAINER.BACTERIAS.length; j++) {
        selChild = PvZ.CONTAINER.BACTERIAS[j];

        // find an inactive sprite of this type and use it
        if (selChild.active == false && selChild.bacteriaType == arg.type) {
            selChild.HP = arg.HP;
            selChild.active = true;
            selChild.moveSpeed = arg.moveSpeed;
            selChild.moveType = arg.moveType;
            selChild.attackMode = arg.attackMode;
            //selChild._hurtColorLife = 0;

            // does it have anything routine to do?
            //selChild.schedule();

            selChild.setVisible(true);
            PvZ.ACTIVE_BACTERIA++;
            //cc.log("Bacteria.js: Getting an old bacteria from container index " + j);
            return selChild;
        }
    }

    // otherwise, create a new one
    selChild = Bacteria.create(arg);
    PvZ.ACTIVE_BACTERIA++;
    return selChild;
};

Bacteria.create = function (arg) {
    var bacteria = new Bacteria(arg);
    g_GameCharacterLayer.addChild(bacteria, bacteria.zOrder);
    PvZ.CONTAINER.BACTERIAS.push(bacteria);
    return bacteria;
};

//Bacteria Animation
Bacteria.sharedAnimation = function () {
    var animFrames = [];
    var str = "";

    //walk animation
    for (var i = 1; i < 5; i++) {
        str = "bacteriaGray" + i + ".png";
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.create(animFrames, 0.5);
    cc.AnimationCache.getInstance().addAnimation(animation, "BacteriaWalkAnimation");
};
