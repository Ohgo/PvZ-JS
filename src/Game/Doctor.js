/**
 * Created by HuiminZhang on 14-4-8.

 */

var g_DoctorStatus = {normal:1, freeze:0};

var DoctorSprite = cc.Sprite.extend({
    doctorStatus:null,
    //constructor
    ctor:function(){
        this._super();
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
        return true;
    },
    //detect if mouse is moving
    onTouchMoved:function(touch,event){
        //cc.log("onTouchMoved");
        var touchPoint = touch.getLocation();
        if(this.doctorStatus){
            this.setPosition(touchPoint.x,touchPoint.y);
        }
    },
    onTouchEnded:function(touch,event){
        //cc.log("onTouchEnded");
        this.updatePosition(touch);
        //this.doctorStatus = g_DoctorStatus.freeze;
    },
    updatePosition:function(touch){
        //var currentLocation = touch.getLocation();
        var currentLocation = this.getPosition();
        var contentSize = this.getContentSize();
        for(var i =0; i < g_MapGridRow.length; i++){
            for(var j = 0; j< g_MapGridRow[i].length; j++){
                if( cc.rectContainsPoint(g_MapGridRow[i][j][1],currentLocation)){
                    this.setPosition(g_MapGridRow[i][j][1]._origin.x+40*screenType,g_MapGridRow[i][j][1]._origin.y+40*screenType);
                    g_MapGridRow[i][j][0] = g_MapGridStatus.occupied;
                    cc.log(g_MapGridRow[i][j][1]._origin.x+contentSize.width/2);
                    cc.log(g_MapGridRow[i][j][1]._origin.y+contentSize.height/2);
                    this.doctorStatus = g_DoctorStatus.freeze;
                }
            }
        }

    },
    //deal with the animation of doctors
    actDoctorAnimation:function(){
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
        animation.setLoops(9999);
        animation.setRestoreOriginalFrame(true);
        this.runAction(cc.Animate.create(animation));
    }

});