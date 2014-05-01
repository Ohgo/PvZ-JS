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
    delayTime:1 + 1.2 * Math.random(),
    attackMode:null,
    //attackMode:PvZ.BACTERIA_MOVE_TYPE.NORMAL,

    ctor: function (arg) {
        this._super();
        //attackMode:PvZ.BACTERIA_MOVE_TYPE.NORMAL;
        this.HP = arg.HP;
        this.moveType = arg.moveType;
        this.attackMode = arg.attackMode;
        this.bacteriaType = arg.type;

        this.initWithFile("BacteriaHappyGray.png");
        //this.schedule();
    },

    _timeTick:0,

    update:function(dt){
        var p = this.getPosition();
        if(p.x < 0 || p.x > winSize.width && p.y < 0 || p.y > winSize.height){
            this.active = false;
        }
        this._timeTick += dt;
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
    for (var j = 0; j < PvZ.CONTAINER.BACTERIAS.length; j++) {
        selChild = PvZ.CONTAINER.BACTERIAS[j];

        if (selChild.active == false && selChild.bacteriaType == arg.type) {
            selChild.HP = arg.HP;
            selChild.active = true;
            selChild.moveType = arg.moveType;
            selChild.attackMode = arg.attackMode;
            //selChild._hurtColorLife = 0;

            //selChild.schedule();
            selChild.setVisible(true);
            PvZ.ACTIVE_BACTERIA++;
            return selChild;
        }
    }
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

Bacteria.preSet = function () {
    var bacteria = null;
    for (var i = 0; i < 3; i++) {
        for (var i = 0; i < BacteriaType.length; i++) {
            bacteria = Bacteria.create(BacteriaType[i]);
            bacteria.setVisible(false);
            bacteria.active = false;
            bacteria.stopAllActions();
            bacteria.unscheduleAllCallbacks();
        }
    }
};
