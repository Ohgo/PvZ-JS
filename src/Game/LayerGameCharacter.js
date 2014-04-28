/**
 * Created by YingjieChen on 14-4-10.
 */
var GameCharacterLayer = cc.Layer.extend({

    doctor:null,

    init:function(){
        var bRet = false;
        if (this._super()) {
            //MW.CONTAINER.ENEMIES = [];

            winSize = cc.Director.getInstance().getWinSize();
            //this._levelManager = new LevelManager(this);
            //this.initBacteria();
            this.initDoctor();
        }
        return bRet;
    },

    initBacteria:function(){
        //add bacteriaSprite
        var bacteria = new BacteriaHappyGray();
        bacteria.initData();
        bacteria.setPosition(cc.p(960,320));

        this.addChild(bacteria,1);
       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
//        bacteria.update(2);
        cc.log("add bacteria");
    },

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

    initDoctor:function(){
        var size = cc.Director.getInstance().getWinSize();
        this.doctor = new DoctorSprite();
        this.doctor.setAnchorPoint(cc.p(0.5,0.5));
        //this.doctor.setPosition(910,590);
        this.doctor.setPosition(size.width/5,4*size.height/5);
        this.doctor.setScale(0.5,0.5);
        this.addChild(this.doctor,1);
        this.actDoctorAnimation(true);
    },
    //deal with the animation of doctors
    actDoctorAnimation:function(active){
        if(active){
            var animation = cc.Animation.create();
            //var frame = new Array(s_doctorWalk01,s_doctorWalk02,s_doctorWalk03,s_doctorWalk04);
            var frameArray = new Array(s_doctorPunch01,s_doctorPunch02);
            // Add 60 frames
            for (var j = 0; j < 30; j++) {
                for (var i = 0; i < 2; i++) {
                    animation.addSpriteFrameWithFile(frameArray[i]);
                    //cc.log("frame"+i+" added");
                }
            }
            animation.setDelayPerUnit(40 / 60);
            animation.setLoops(999);
            animation.setRestoreOriginalFrame(true);
            var action = cc.Animate.create(animation);
            this.doctor.runAction(action);
        }
    }
//    update:function(dt){
//        this.bacteria.update(dt);
//    }
});