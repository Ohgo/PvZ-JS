var g_GameZOder = {bg:0, ui:1, front:100};//present layer
var g_GameStatus = {play:0, stop:1, gameOver:2};//game status
var g_GameCharacterLayer;

var GameCharacterLayer = cc.Layer.extend({
    _time:null,
    _levelManager:null,
    _state:0,

    init:function(){
        var bRet = false;
        if (this._super()) {
            PvZ.CONTAINER.BACTERIAS = [];
            PvZ.ACTIVE_BACTERIA = 0;
            this._state = g_GameStatus.normal;

            winSize = cc.Director.getInstance().getWinSize();
            this._levelManager = new LevelManager(this);

            // schedule
            this.scheduleUpdate();
            this.schedule(this.scoreCounter, 1);

            bRet = true;

            g_GameCharacterLayer = this;

            //pre set
            Bacteria.preSet();
        }
        return bRet;
    },

    scoreCounter:function () {
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
        cc.log("checkIsCollide");
    }

//    initBacteria:function(){
//        //add bacteriaSprite
//        var bacteria = new BacteriaHappyGray();
//        bacteria.initData();
//        bacteria.setPosition(cc.p(960,320));
//
//        this.addChild(bacteria,1);
//       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
////        bacteria.update(2);
//        cc.log("add bacteria");
//    }

});