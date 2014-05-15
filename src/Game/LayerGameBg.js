/**
 * Created by 00 on 14-4-10.
 */

var g_MapGridStatus = {free:0,occupied:1};
var g_MapGridRow;

var LayerGameBg = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        var bRet = false;
        if (this._super()) {
            var bg = cc.Sprite.create(bg_Game_png);
            bg.setAnchorPoint(cc.p(0,0));
            this.addChild(bg,1);
            cc.log("Game on!");
            this.initMap();
        }
        return bRet;
    },

    //Initial the grid, need to be fixed -Huimin
    initMap:function(){
        //numbers will be replaced ,should be as constant
        //cc.log("initializing the map!!!!!!!!");
        var winSize = cc.Director.getInstance().getWinSize();
        g_MapGridRow = new Array(5);
        for (var i = 0; i < g_MapGridRow.length ; i++){
            g_MapGridRow[i] = new Array(8);
            for(var j = 0 ; j<g_MapGridRow[i].length; j++){
                // create a rect on each 2d array element;
                g_MapGridRow[i][j] = new Array(2);
                g_MapGridRow[i][j][0] = g_MapGridStatus.free;
                g_MapGridRow[i][j][1] = cc.rect(50*j*screenType,50*screenType*i,50*screenType,50*screenType);
            }
        }
    }
});