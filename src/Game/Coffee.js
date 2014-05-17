var Coffee = cc.Sprite.extend({
    _winSize:null,
    _destinationPosition:null,
    _originPosition:null,
    _active:false,

    ctor: function (arg) {
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();
        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame(coffeenormal);
        this.initWithSpriteFrame(pFrame);
        this.reset();
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
    },

    reset:function() {
        this.active = true;
        var i = Math.floor(Math.random()*g_MapGridRow.length);
        var j = Math.floor(Math.random()*g_MapGridRow[i].length);
        var oriX = g_MapGridRow[i][j][1]._origin.x + 50;
        var destX = oriX; // straight vertical movement
        var oriY = this._winSize.height;
        var destY = g_MapGridRow[i][j][1]._origin.y+50;

        //this._destinationPosition = g_MapGridRow[i][j][1]._origin.x + 50,g_MapGridRow[i][j][1]._origin.y+50;
        //this._originPosition = cc.p(g_MapGridRow[i][j][1]._origin.x + 50, this._winSize);
        this.setPosition(cc.p(oriX, oriY));

        var onComplete = cc.CallFunc.create(this.destroy, this);
        var moveAnim = cc.MoveTo.create(1+g_MapGridRow.length - i, cc.p(destX,destY));
        this.runAction(cc.Sequence.create(moveAnim, cc.DelayTime.create(3),onComplete));
        //this.runAction(moveAnim);
    },

    onTouch:function() {
        this._active = false;
        this.stopAllActions();

        g_GameCharacterLayer.increaseCoffee();

        // animate
        var storeAnim = cc.MoveTo.create(0.3, cc.p(this._winSize.width/10,5.5*this._winSize.height/6));
        var onComplete = cc.CallFunc.create(this.destroy, this);
        this.runAction(cc.Sequence.create(storeAnim, onComplete));
    },

    update:function(dt){
        /*
        var p = this.getPosition();
        if (p.x < 0 || this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
        */
    },

    containsTouchLocation:function(touch){
        var getPoint = touch.getLocation();
        var contentSize = this.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect._origin.x += this.getPosition().x-this.getContentSize().width/2;
        myRect._origin.y += this.getPosition().y-this.getContentSize().height/2;
        return cc.rectContainsPoint(myRect, getPoint);
    },

    onTouchBegan:function(touch,event){
        if(!this.containsTouchLocation(touch))
            return false;
        //if(!this._active)
        //    return false;
        this.onTouch();
        return true;
    },

    destroy:function () {
        cc.log("Coffee.js: Destroy.");
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
    }

});

Coffee.getOrCreateCoffee = function(){
    var selChild = null;

    // if there is a reusable coffee object in the container, use it
    for (var j = 0; j < PvZ.CONTAINER.COFFEE.length; j++) {
        selChild = PvZ.CONTAINER.COFFEE[j];

        // find an inactive sprite of this type and use it
        if (selChild.active == false) {
            selChild.reset();
            selChild.setVisible(true);
            PvZ.ACTIVE_COFFEE++;
            cc.log("Coffee.js: Getting an old coffee from container index " + j);
            return selChild;
        }
    }

    // otherwise, create a new one

    selChild = Coffee.create();
    PvZ.ACTIVE_COFFEE++;
    return selChild;
};

Coffee.create = function () {
    var coffee = new Coffee();
    g_GameCharacterLayer.addChild(coffee, coffee.zOrder);
    PvZ.CONTAINER.COFFEE.push(coffee);
    return coffee;
};
