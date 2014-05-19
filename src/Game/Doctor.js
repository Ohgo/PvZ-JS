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
    coffeeCost:0,
    medicineType:null,
    attackDelay:0,
    _winsize:null,
    //constructor
    ctor:function(arg){
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();
        this.HP = arg.HP;
        this.doctorStatus = g_DoctorStatus.normal;
        this.coffeeCost = arg.coffeeCost;
        this.medicineType = arg.medicineType;
        this.attackDelay = arg.attackDelay;
        this.initWithFile(arg.textureName);
        this.actDoctorAnimation(arg);
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

        if(i < g_MapGridRow.length && j < g_MapGridRow[i].length && g_MapGridRow[i][j][0] == g_MapGridStatus.free && PvZ.COLLECTED_COFFEE >= this.coffeeCost) {
            this.setPosition(g_MapGridRow[i][j][1]._origin.x + 50,g_MapGridRow[i][j][1]._origin.y+50);
            g_MapGridRow[i][j][0] = g_MapGridStatus.occupied;
            this.doctorStatus = g_DoctorStatus.freeze;
            this.active = true;
            this.runAction(cc.Animate.create(this.animation));
            this.attack();
            this.schedule(this.attack, this.attackDelay);
            PvZ.ACTIVE_DOCTOR++;
            g_GameCharacterLayer.decreaseCoffee(this.coffeeCost);
        }

        else this.destroy();
    },

    attack:function() {
        if(_status == g_GameStatus.play){
            var pos = this.getPosition();
            var medicine = Medicine.getOrCreateMedicine(MedicineType[this.medicineType]);
            medicine.setPosition(pos.x, pos.y);
            var translation = cc.MoveTo.create(medicine.speed, cc.p(g_GameCharacterLayer.screenRect.width+medicine.getContentSize().width, pos.y));
            medicine.runAction(translation);
        }
    },

    destroy:function() {
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
        this.unschedule(this.attack);
        this.unscheduleAllCallbacks();
        PvZ.ACTIVE_DOCTOR--;
        // todo: create a function for this duplicate lines?
        var i = Math.floor(this.getPosition().y / (screenType*50));
        var j = Math.floor(this.getPosition().x / (screenType*50));
        //if(g_DoctorStatus.freezeg_DoctorStatus.freeze) g_MapGridRow[i][j][0] = g_MapGridStatus.free;
    },

    //deal with the animation of doctors
    actDoctorAnimation:function(arg){
        this.animation = cc.Animation.create();
        //var frame = new Array(s_doctorWalk01,s_doctorWalk02,s_doctorWalk03,s_doctorWalk04);
        var frameArray = new Array(arg.textureName,arg.attackTextureName);
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
            selChild.HP = arg.HP;
            selChild.coffeeCost = arg.coffeeCost;
            this.medicineType = arg.medicineType;
            this.attackDelay = arg.attackDelay;

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