var g_GameCharacterLayer;

MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

var GameCharacterLayer = cc.Layer.extend({
    _time:null,
    _levelManager:null,
    _state:0,
    _bacteriaAnimation:null,
    screenrect:null,
    curScene:null,
    _lbCoffee:null,

        ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        var bRet = false;
        if (this._super()) {
            g_GameCharacterLayer = this;
            //cc.SpriteFrameCache.getInstance().addSpriteFrames(s_bacteria_plist);

            this.curScene = new SceneGame();

            //PvZ.CONTAINER.BACTERIAS = [];
            PvZ.COLLECTED_COFFEE = 200;
            PvZ.ACTIVE_BACTERIA = 0;
            PvZ.ACTIVE_DOCTOR = 0;
            PvZ.ACTIVE_COFFEE = 0;
            PvZ.ACTIVE_MEDICINE = 0;
            this._state = g_GameStatus.play;

            var winSize = cc.Director.getInstance().getWinSize();
            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

            this._levelManager = new LevelManager(this);

            // bacteria animation batch node
            cc.SpriteFrameCache.getInstance().addSpriteFrames(bacteria_plist);
            var bacteriaAnimationTexture = cc.TextureCache.getInstance().addImage(bacteria_png);
            this._bacteriaAnimation = cc.SpriteBatchNode.createWithTexture(bacteriaAnimationTexture);
            //this._bacteriaAnimation.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._bacteriaAnimation);
            Bacteria.sharedAnimation();

            //coffee counter
            this._lbCoffee = cc.LabelTTF.create(""+PvZ.COLLECTED_COFFEE, "Arial", 38);
            this._lbCoffee.setPosition(cc.p(winSize.width/10,5.5*winSize.height/6));
            this.addChild(this._lbCoffee);

            // schedule
            this.scheduleUpdate();
            this.schedule(this.oneSecondTick, 1);
//            this.schedule(this.scoreCounter, 1);
			this.initDoctorPicker();
            bRet = true;

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

    increaseCoffee:function() {
        PvZ.COLLECTED_COFFEE += 50;
        this._lbCoffee.setString(PvZ.COLLECTED_COFFEE);
    },

    decreaseCoffee:function(amount) {
        if(amount >= PvZ.COLLECTED_COFFEE) PvZ.COLLECTED_COFFEE = 0;
        else PvZ.COLLECTED_COFFEE -= amount;
        this._lbCoffee.setString(PvZ.COLLECTED_COFFEE);
    },

    update:function (dt) {
        if(this._state == g_GameStatus.play){
            this.checkIsCollide();
            this.removeInactiveUnit(dt);
        }
    },

    checkIsCollide:function(){
        var bacteria, doctor;
        var collisionDetected = false;
        //cc.log("Checking for Collision!");
        // for each bacteria on the map, check if any of them collide with the doctors
        //cc.log("Total Bacteria: " + PvZ.CONTAINER.BACTERIAS.length + " Active: " + PvZ.ACTIVE_BACTERIA + ", Doctor: " + PvZ.CONTAINER.DOCTOR.length + " Active: " + PvZ.ACTIVE_DOCTOR);
        for (var i = 0; i < PvZ.CONTAINER.BACTERIAS.length; i++) {
            bacteria = PvZ.CONTAINER.BACTERIAS[i];
            if(!bacteria.active) continue;
            // Check if it is out of screen, then decrease life
            var pos = bacteria.getPosition();
            if(pos.x <= 0 ){
                if(n_lives <= 0){
                    this._state = g_GameStatus.gameOver;
                }
                this.curScene.reduceLive();
            }
            for (var j = 0; j < PvZ.CONTAINER.DOCTOR.length; j++) {
                doctor = PvZ.CONTAINER.DOCTOR[j];
                if(!doctor.active) continue;
                if (bacteria.active && doctor.active && this.collide(bacteria, doctor)) {
                    collisionDetected = true;
                    bacteria.changeState(PvZ.BACTERIA_STATE.ATTACK);
                    doctor.hurt(bacteria.attackPower);
                    // it is not possible to attack more than one doctor at a time, so break from this loop and check other bacteria
                    break;
                    //if(doctorDied) bacteria.changeState(PvZ.BACTERIA_STATE.WALK);
                }
            }
            if(!collisionDetected) bacteria.changeState(PvZ.BACTERIA_STATE.WALK);
        }
    },
    removeInactiveUnit:function (dt) {
        var selChild;
        for (var i = 0; i < PvZ.CONTAINER.BACTERIAS.length; i++) {
            var bacteria = PvZ.CONTAINER.BACTERIAS[i];
            if (bacteria && bacteria.active) {
                bacteria.update(dt);
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

    //Create Doctor Sprite

    initDoctorPicker:function(){

        var size = cc.Director.getInstance().getWinSize();
        var doctor = Doctor.getOrCreateDoctor(DoctorType[0]);
        doctor.setAnchorPoint(cc.p(0.5,0.5));
        doctor.setPosition(size.width/5,5.5*size.height/6);
        var nurse = Doctor.getOrCreateDoctor(DoctorType[1]);
        nurse.setAnchorPoint(cc.p(0.5,0.5));
        nurse.setPosition(size.width/5+100,5.5*size.height/6);

        //this.addChild(doctor,1);
    }

//    update:function(dt){
//        this.bacteria.update(dt);
//    }

});

//GameCharacterLayer.prototype.addEnemy = function (bacteria, z, tag) {
//    this._texTransparentBatch.addChild(bacteria, z, tag);
//};
