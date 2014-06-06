/**
 * General Medicine class
 * Handles all medicine related activities
 */

var Medicine = cc.Sprite.extend({
    type:0,
    textureName:null,
    speed:0,
    attackPower:0,
    active:null,
    _winSize:null,

    ctor:function(arg){
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();
        this.reset(arg);
        this.initWithFile(arg.textureName);
    },

    reset:function(arg) {
        this.scheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.RotateBy.create(0.5, 360)));
        this.type = arg.type;
        PvZ.ACTIVE_MEDICINE++;
        this.active = true;
        this.textureName = arg.textureName;
        this.speed = arg.speed;
        this.attackPower = arg.attackPower;
        this.setVisible(true);
    },


    update:function(dt){
        var p = this.getPosition();
        if (p.x >= this._winSize.width - this.getContentSize().width) {
            this.active = false;
            this.destroy();
        }
    },

    destroy:function() {
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
        this.unscheduleUpdate();
        PvZ.ACTIVE_MEDICINE--;
    }

});


Medicine.getOrCreateMedicine = function(arg){
    var selChild = null;

    // if there is a reusable bacteria object in the container, use it
    for (var i = 0; i < PvZ.CONTAINER.MEDICINE.length; i++) {
        selChild = PvZ.CONTAINER.MEDICINE[i];
        // find an inactive sprite of this type and use it
        if (selChild.active == false && selChild.type == arg.type) {
            selChild.reset(arg);
            return selChild;
        }
    }

    // otherwise, create a new one
    selChild = Medicine.create(arg);
    return selChild;
};

Medicine.create = function (arg) {
    var medicine = new Medicine(arg);
    g_GameCharacterLayer.addChild(medicine, medicine.zOrder);
    PvZ.CONTAINER.MEDICINE.push(medicine);
    return medicine;
};