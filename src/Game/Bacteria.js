var Bacteria = cc.Sprite.extend({
    isHit: false,   //for collision detection
    HP:0,
    radius:0,    //collision radius
    size:0,

    bacteriaType:1,
    active:true,
    speed:200,
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
        this.textureName = arg.textureName;
        cc.log("tex: " + this.textureName + " text: " + arg.textureName);
        //this.initWithFile("BacteriaHappyGray.png");
        //this.initWithSpriteFrameName(arg.textureName);
        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("bacteriaGreen1.png");
        this.initWithSpriteFrame(pFrame);
        this.changeState(PvZ.BACTERIA_STATE.WALK);
    },

    update:function(dt){
        var p = this.getPosition();
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
        var frameAnimation = cc.AnimationCache.getInstance().getAnimation(this.textureName + "Walk");
        this.runAction(cc.RepeatForever.create(cc.Animate.create(frameAnimation)));
    },

    attack:function() {
        // TODO: Change to a real attacking information
        var attackAnimation = cc.AnimationCache.getInstance().getAnimation(this.textureName + "Walk");
        this.runAction(cc.RepeatForever.create(cc.Animate.create(attackAnimation)));
    },

    defend:function() {
        // TODO: Change to a real defending information
        var defendAnimation = cc.AnimationCache.getInstance().getAnimation(this.textureName + "Walk");
        this.runAction(cc.Animate.create(defendAnimation));
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
                case PvZ.BACTERIA_STATE.DEFEND:
                    this.defend();
                    break;
                default:
                    this.walk();
            }
        }
    },

    hurt:function(damage) {
        if(damage > this.HP) this.HP = 0;
        else this.HP -= damage;
        cc.log("The bacteria took " + damage + " damage. Remaining HP: " + this.HP);
        if(this.HP <= 0) {
            g_GameCharacterLayer.increaseKilledBacteria();
            this.destroy();
            return true;
        }
        return false;
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
            selChild.textureName = arg.textureName;
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
    //walk animation for each bacteria
    for(var i = 0; i< BacteriaType.length ; i++) {
        var animFrames = [];
        var str = "";
        for (var j = 1; j < 3; j++) {
            str = BacteriaType[i].textureName + j + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.5);
        cc.AnimationCache.getInstance().addAnimation(animation, BacteriaType[i].textureName + "Walk");
    }

    /*
    for (var j = 1; j < 3; j++) {
        str = "bacteriaPink" + j + ".png";
        cc.log("Creating bacteria which supposed to have name: " + this.textureName);
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
        animFrames.push(frame);
        cc.log(this.textureName);
    }
    var animation = cc.Animation.create(animFrames, 0.5);
    cc.AnimationCache.getInstance().addAnimation(animation, "BacteriaWalkAnimation");
    */
};
