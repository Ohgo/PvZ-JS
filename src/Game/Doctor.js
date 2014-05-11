/**
 * Created by HuiminZhang on 14-4-8.

 */

var g_DoctorStatus = {normal:1, freeze:0};

var Doctor = cc.Sprite.extend({
    doctorStatus:null,
    animation:null,
    doctorType:null,
    initialposition:null,
    zOrder:0,
    active:false,
    //constructor
    ctor:function(arg){
        this._super();
        this.HP = arg.HP;
        this.doctorStatus = g_DoctorStatus.normal;
        this.initWithFile(s_Doctor);
        this.actDoctorAnimation();
        // activate touch
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
    },
    //detect if mouse is on the doctor
    containsTouchLocation:function(touch){
        var getPoint = touch.getLocation();
        var contentSize = this.getContentSize();

        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect._origin.x += this.getPosition().x-this.getContentSize().width/2;
        myRect._origin.y += this.getPosition().y-this.getContentSize().height/2;

        return cc.rectContainsPoint(myRect, getPoint);

    },
    //detect if mouse is clicked
    onTouchBegan:function(touch,event){
        if(!this.containsTouchLocation(touch))
            return false;
        if(this.doctorStatus == g_DoctorStatus.freeze)
            return false;
        // replace image on the doctor picker
        g_GameCharacterLayer.initDoctorPicker();
        return true;
    },
    //detect if mouse is moving
    onTouchMoved:function(touch,event){
        //cc.log("onTouchMoved");
        var touchPoint = touch.getLocation();
        if(this.doctorStatus == g_DoctorStatus.normal){
            this.setPosition(touchPoint.x,touchPoint.y);
        }
    },
    onTouchEnded:function(touch,event){
        //cc.log("onTouchEnded");
        this.updatePosition(touch);

        //this.doctorStatus = g_DoctorStatus.freeze;
    },
    updatePosition:function(touch){
        // TODO: optimize this calculation, we should be able to determine to which grid a point (x,y) belongs to
        // TODO: without looping through all the grids
        //var currentLocation = touch.getLocation();
        var currentLocation = this.getPosition();
        var contentSize = this.getContentSize();
        var i = Math.floor(this.getPosition().y / (screenType*50));
        var j = Math.floor(this.getPosition().x / (screenType*50));

        if(i < g_MapGridRow.length && j < g_MapGridRow[i].length && g_MapGridRow[i][j][0] == g_MapGridStatus.free) {
            this.setPosition(g_MapGridRow[i][j][1]._origin.x + 50,g_MapGridRow[i][j][1]._origin.y+50);
            g_MapGridRow[i][j][0] = g_MapGridStatus.occupied;
            this.doctorStatus = g_DoctorStatus.freeze;
            this.active = true;
            this.runAction(cc.Animate.create(this.animation));
            PvZ.ACTIVE_DOCTOR++;

        }

        else this.destroy();

        /*
         for(var i =0; i < g_MapGridRow.length; i++){
         for(var j = 0; j< g_MapGridRow[i].length; j++){
         if( cc.rectContainsPoint(g_MapGridRow[i][j][1],currentLocation) && g_MapGridRow[i][j][0] == g_MapGridStatus.free){
         this.setPosition(g_MapGridRow[i][j][1]._origin.x+40*screenType,g_MapGridRow[i][j][1]._origin.y+40*screenType);
         g_MapGridRow[i][j][0] = g_MapGridStatus.occupied;
         //cc.log(g_MapGridRow[i][j][1]._origin.x+contentSize.width/2);
         //cc.log(g_MapGridRow[i][j][1]._origin.y+contentSize.height/2);
         this.doctorStatus = g_DoctorStatus.freeze;
         this.runAction(cc.Animate.create(this.animation));
         PvZ.ACTIVE_DOCTOR++;
         }
         // replace image on the doctor picker
         g_GameCharacterLayer.initDoctorPicker();
         }
         }
         */
    },

    destroy:function() {
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
        PvZ.ACTIVE_DOCTOR--;
        // todo: create a function for this duplicate lines?
        var i = Math.floor(this.getPosition().y / (screenType*50));
        var j = Math.floor(this.getPosition().x / (screenType*50));
        g_MapGridRow[i][j][0] = g_MapGridStatus.free;
    },

    //deal with the animation of doctors
    actDoctorAnimation:function(){
        this.animation = cc.Animation.create();
        //var frame = new Array(s_doctorWalk01,s_doctorWalk02,s_doctorWalk03,s_doctorWalk04);
        var frameArray = new Array(s_doctorPunch01,s_doctorPunch02);
        // Add 60 frames
        for (var j = 0; j < 30; j++) {
            for (var i = 0; i < 2; i++) {
                this.animation.addSpriteFrameWithFile(frameArray[i]);
                //cc.log("frame"+i+" added");
            }
        }
        this.animation.setDelayPerUnit(40 / 60);
        this.animation.setLoops(9999);
        this.animation.setRestoreOriginalFrame(true);

    },

    hurt:function(damage) {
        if(damage > this.HP) this.HP = 0;
        else this.HP -= damage;
        //cc.log("The doctor took " + damage + " damage. Remaining HP: " + this.HP);
        if(this.HP <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }

});


Doctor.getOrCreateDoctor = function(arg){
    var selChild = null;

    // if there is a reusable bacteria object in the container, use it
    for (var i = 0; i < PvZ.CONTAINER.DOCTOR.length; i++) {
        selChild = PvZ.CONTAINER.DOCTOR[i];

        // find an inactive sprite of this type and use it
        if (selChild.active == false && !selChild.visible && selChild.doctorType == arg.type) {
            selChild.HP = arg.HP;
            //selChild.active = true;
            selChild.doctorStatus = g_DoctorStatus.normal;
            selChild.moveSpeed = arg.moveSpeed;
            selChild.attackMode = arg.attackMode;
            selChild.HP = arg.HP;

            selChild.setVisible(true);

            return selChild;
        }
    }

    // otherwise, create a new one
    selChild = Doctor.create(arg);
    return selChild;
};

Doctor.create = function (arg) {
    var doctor = new Doctor(arg);
    g_GameCharacterLayer.addChild(doctor, doctor.zOrder);
    PvZ.CONTAINER.DOCTOR.push(doctor);
    //cc.log("Pushing to doctor container to: " + PvZ.CONTAINER.DOCTOR.length);
    return doctor;
};