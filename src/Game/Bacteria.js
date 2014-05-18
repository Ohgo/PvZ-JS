var Bacteria = cc.Sprite.extend({
    isHit: false,   //for collision detection
    HP:0,
    radius:0,    //collision radius
    size:0,

    bacteriaType:1,
    active:true,
    speed:200,
    HP:15,
    zOrder:1000,
    moveType:null,
    moveSpeed:null,
    textureName:null,
    delayTime:1 + 1.2 * Math.random(),
    attackMode:null,
    attackPower:null,
    animation:null,
    state:null,
    Lane:null,
    _winSize:null,

    //attackMode:PvZ.BACTERIA_MOVE_TYPE.HORIZONTAL_WALK,

    ctor: function (arg) {
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();
        //attackMode:PvZ.BACTERIA_MOVE_TYPE.HORIZONTAL_WALK;
        this.HP = arg.HP;
        this.moveType = arg.moveType;
        this.attackMode = arg.attackMode;
        this.bacteriaType = arg.type;
        this.moveSpeed = arg.moveSpeed;
        this.textureName = arg.textureName;
        this.attackPower = arg.attackPower;
        this.size = this.getContentSize();
        //this.initWithFile("BacteriaHappyGray.png");
        //this.initWithSpriteFrameName(arg.textureName);
        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("bacteriaGreen1.png");
        this.initWithSpriteFrame(pFrame);
        this.changeState(PvZ.BACTERIA_STATE.WALK);

        //this.runAction(
        //    cc.Animate.create(this.animation)
        //);
        //this.schedule();
    },

    update:function(dt){
        var p = this.getPosition();
        //cc.log("x: " + p.x + " y: " + p.y);
        /*
        if(p.x < 0 || p.x > this._winSize.width && p.y < 0 || p.y > this._winSize.height){
            this.active = false;
        }
        */
        if (p.x < 0 || this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },

    setCourse:function(lane) {
        this.Lane = lane;
    },

    walk:function(){
        var destinationY =  0;
        var translation = cc.MoveBy.create(this.moveSpeed, cc.p(-g_GameCharacterLayer.screenRect.width - this.size.width, destinationY));
        this.runAction(translation);
        var frameAnimation = cc.AnimationCache.getInstance().getAnimation("BacteriaWalkAnimation");
        this.runAction(cc.RepeatForever.create(cc.Animate.create(frameAnimation)));
    },

    attack:function() {
        // TODO: Change to a real attacking information
        var attackAnimation = cc.AnimationCache.getInstance().getAnimation("BacteriaWalkAnimation");
        this.runAction(cc.RepeatForever.create(cc.Animate.create(attackAnimation)));
    },

    changeState:function(arg) {
        if(this.state != arg) {
            this.stopAllActions();
            this.state = arg;
            switch(this.state) {
                case PvZ.BACTERIA_STATE.WALK:
                    this.walk();
                    break;
                case PvZ.BACTERIA_STATE.ATTACK:
                    this.attack();
                    break;
                default:
                    this.walk();
            }
        }
    },

    destroy:function () {
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
        PvZ.ACTIVE_BACTERIA--;
    }

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
            selChild.textureName = arg.textureName;
            selChild.moveType = arg.moveType;
            selChild.attackMode = arg.attackMode;
            selChild.attackPower = arg.attackPower;
            selChild.state = PvZ.BACTERIA_STATE.WALK;
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
    cc.log("different types of bacteria show up???");
    //walk animation
    for (var i = 1; i < 3; i++) {
        str = "bacteriaGreen" + i + ".png";
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
        animFrames.push(frame);
        cc.log(this.textureName);
    }
    var animation = cc.Animation.create(animFrames, 0.5);
    cc.AnimationCache.getInstance().addAnimation(animation, "BacteriaWalkAnimation");
};
