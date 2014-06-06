/**
 * General Bacteria class
 * Handles all bacteria related activities
 */

var Bacteria = cc.Sprite.extend({

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
        // Check if bacteria has gone off map, destroy as necessary
        if(_status == g_GameStatus.play){
            var p = this.getPosition();
            if (p.x < 0 || this.HP <= 0) {
                this.active = false;
                this.destroy();

            }
        }
    },

    setCourse:function(lane) {
    // place the bacteria according to assigned lane
        this.Lane = lane;
    },

    walk:function(){
    // order bacteria to walk horizontally to the left using built-in MoveBy animation
        if(_status == g_GameStatus.play){
            var destinationY =  0;
            var translation = cc.MoveBy.create(this.moveSpeed, cc.p(-g_GameCharacterLayer.screenRect.width - this.size.width, destinationY));
            this.runAction(translation);
            var frameAnimation = cc.AnimationCache.getInstance().getAnimation(this.textureName + "Walk");
            this.runAction(cc.RepeatForever.create(cc.Animate.create(frameAnimation)));
        }
    },

    attack:function() {
        // order bacteria to attack by changing its animation model
        // TODO: Change to a real attacking animation when the asset is ready
        var attackAnimation = cc.AnimationCache.getInstance().getAnimation(this.textureName + "Walk");
        this.runAction(cc.RepeatForever.create(cc.Animate.create(attackAnimation)));
    },

    defend:function() {
        // order bacteria to defend by changing its animation model
        // TODO: Change to a real defending animation when the asset is ready
        var defendAnimation = cc.AnimationCache.getInstance().getAnimation(this.textureName + "Walk");
        this.runAction(cc.Animate.create(defendAnimation));
    },

    changeState:function(arg) {
    // change bacteria's order (e.g. walking to attacking, etc.)
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
    // take damage, if it's greater than its HP, dies
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
    // destroy the bacteria and put the asset as inactive
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
        PvZ.ACTIVE_BACTERIA--;
    }

});

Bacteria.getOrCreateBacteria = function(arg){
// either activate and unused bacteria object or create a new object
// this will optimize memory usage
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

            selChild.setVisible(true);
            PvZ.ACTIVE_BACTERIA++;
            return selChild;
        }
    }

    // otherwise, create a new one
    selChild = Bacteria.create(arg);
    PvZ.ACTIVE_BACTERIA++;
    return selChild;
};

Bacteria.create = function (arg) {
// allocate memory for a new bacteria object
    var bacteria = new Bacteria(arg);
    g_GameCharacterLayer.addChild(bacteria, bacteria.zOrder);
    PvZ.CONTAINER.BACTERIAS.push(bacteria);
    return bacteria;
};

//Bacteria spritesheet animation
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
};
