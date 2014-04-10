/**
 * Created by YingjieChen on 14-4-9.
 */

var BacteriaSprite = cc.Sprite.extend({
    isHit: false,   //for collision detection
    hp:0,
    radius:0    //collision radius
});

var BacteriaHappyGray = new BacteriaSprite.extend({
    init: function () {
        this._super();
        this.initWithFile(s_BacteriaHappyGray);
    },
    initData:function(){
        this.isHit = false;
        this.hp = 10;
        this.radius = 110;
        this.setPosition(cc.p(960,300));
        this.velocity = cc.p(100,100);
    }
//    update: function (dt) {
//        this.setPosition(cc.pMult(this.getPositionX(),cc.pMult(this.velocity, -dt)),300);
//        this.checkHitEdge();
//    }

})