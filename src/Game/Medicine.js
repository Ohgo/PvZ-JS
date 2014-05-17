/**
 * Created by Ohgo on 14-5-17.

 */

var Medicine = cc.Sprite.extend({
    type:0,
    textureName:null,
    speed:0,
    attackPower:0,
    active:null,

    ctor:function(arg){
        this._super();
        this.reset(arg);
        this.initWithFile(arg.textureName);
    },

    reset:function(arg) {
        this.type = arg.type;
        PvZ.ACTIVE_MEDICINE++;
        this.active = true;
        this.textureName = arg.textureName;
        this.speed = arg.speed;
        this.attackPower = arg.attackPower;
        this.setVisible(true);
    },

    destroy:function() {
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
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