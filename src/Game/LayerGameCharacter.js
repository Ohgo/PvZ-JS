var g_GameCharacterLayer;

MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

var GameCharacterLayer = cc.Layer.extend({
    _time:null,
    _levelManager:null,
    _state:0,
    _bacteriaAnimation:null,
    doctor:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        var bRet = false;
        if (this._super()) {
            //cc.SpriteFrameCache.getInstance().addSpriteFrames(s_bacteria_plist);

            PvZ.CONTAINER.BACTERIAS = [];
            PvZ.ACTIVE_BACTERIA = 0;
            PvZ.ACTIVE_DOCTOR = 0;
            this._state = g_GameStatus.play;

            var winSize = cc.Director.getInstance().getWinSize();

            this._levelManager = new LevelManager(this);

            // bacteria animation batch node
            cc.SpriteFrameCache.getInstance().addSpriteFrames(bacteria_plist);
            var bacteriaAnimationTexture = cc.TextureCache.getInstance().addImage(bacteria_png);
            this._bacteriaAnimation = cc.SpriteBatchNode.createWithTexture(bacteriaAnimationTexture);
            //this._bacteriaAnimation.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._bacteriaAnimation);
            Bacteria.sharedAnimation();

            // schedule
            this.scheduleUpdate();
            this.schedule(this.oneSecondTick, 1);
//            this.schedule(this.scoreCounter, 1);
			this.addDoctor();
            bRet = true;

            g_GameCharacterLayer = this;

            //pre set
            //Bacteria.preSet();
            bRet = true;
        }
        return bRet;
    },

    oneSecondTick:function () {
        // check if it's a spawn time of any monster
        if (this._state == g_GameStatus.play) {
            this._time++;
            this._levelManager.loadLevelResource(this._time);
        }
    },

    update:function (dt) {
        if(this._state == g_GameStatus.play){
            this.checkIsCollide();
        }
    },

    checkIsCollide:function(){
        var bacteria, doctor;
        // for each bacteria on the map, check if any of them collide with the doctors
        for (var i = 0; i < PvZ.CONTAINER.BACTERIAS.length; i++) {
            bacteria = PvZ.CONTAINER.BACTERIAS[i];
            for (var j = 0; j < PvZ.CONTAINER.DOCTOR.length; j++) {
                doctor = PvZ.CONTAINER.DOCTOR[j];

                if (bacteria.active && doctor.active && this.collide(bacteria, doctor)) {
                    cc.log("Collide!");
                    bacteria.changeState(PvZ.BACTERIA_STATE.ATTACK);
                    //doctor.hurt();
                }
            }
        }
    },

    collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();
        if (Math.abs(pos1.x - pos2.x) > MAX_CONTAINT_WIDTH || Math.abs(pos1.y - pos2.y) > MAX_CONTAINT_HEIGHT)
            return false;

        var asize = a.getContentSize();
        var aRect = cc.rect(pos1.x - asize.width / 2, pos1.y - asize.height / 4, asize.width, asize.height / 2+20);

        var bsize = b.getContentSize();
        var bRect = cc.rect(pos2.x - bsize.width / 2, pos2.y - bsize.height / 4, bsize.width, bsize.height / 2+20);

        return cc.rectIntersectsRect(aRect, bRect);
    },

//    initBacteria:function(){
//        //add bacteriaSprite
//        var bacteria = new BacteriaHappyGray();
//        bacteria.initData();
//       bacteria.setPosition(cc.p(960,320));
//
//        this.addChild(bacteria,1);
//       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
////        bacteria.update(2);
//        cc.log("add bacteria");
//        this.addChild(bacteria,1);
       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
//        bacteria.update(2);
//        cc.log("add bacteria");
//    },

    /* To be finished - Huimin
     //display doctor card
     //??????????
     var doctorCardNormal = cc.Sprite.create(s_Doctor);
     var doctorCardSelected = cc.Sprite.create(s_Doctor);
     //var doctorCardDisabled = cc.Sprite.create(s_Doctor);

     var newDoctor = cc.MenuItemSprite.create(doctorCardNormal, doctorCardSelected,this.newDoctorSprite, this);
     var cardDock = cc.Menu.create(newDoctor);
     this.gameLayer.addChild(cardDock,g_GameZOder.ui);
     cardDock.setPosition(0,500);

     },
     newDoctorSprite:function(){
     cc.log("New Doctor!");
     //this.onButtonEffect();
     //add doctor
     */

    //Create Doctor Sprite

    addDoctor:function(){
        var size = cc.Director.getInstance().getWinSize();
        this.doctor = new Doctor();
        this.doctor.setAnchorPoint(cc.p(0.5,0.5));
        //this.doctor.setPosition(910,590);
        this.doctor.setPosition(size.width/5,4*size.height/5);
        //this.doctor.setScale(0.7,0.7);
        this.addChild(this.doctor,1);
    }

//    update:function(dt){
//        this.bacteria.update(dt);
//    }

});

//GameCharacterLayer.prototype.addEnemy = function (bacteria, z, tag) {
//    this._texTransparentBatch.addChild(bacteria, z, tag);
//};
