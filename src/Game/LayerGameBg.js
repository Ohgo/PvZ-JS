/**
 * Created by 00 on 14-4-10.
 */

var g_MapGridStatus = {free:0,occupied:1};
var g_MapGridRow;

var GameBGLayer = cc.Layer.extend({


    init:function(){
        var bRet = false;
        this.initMap();
        if (this._super()) {
            var bg = cc.Sprite.create(bg_Game_png);
            bg.setAnchorPoint(cc.p(0,0));
            this.addChild(bg,1);
            cc.log("Game on!");
        }
        return bRet;
    },
    initMap:function(){
        //numbers will be replaced ,should be as constant
        g_MapGridRow = new Array(1);
        for (var i = 0; i < g_MapGridRow.length ; i++){
            g_MapGridRow[i] = new Array(6);
            for(var j = 0 ; j<g_MapGridRow[i].length; j++){
                g_MapGridRow[i][j] = new Array(2);
                // create a rect on each 2d array element;
                // need to think about HD Mode
                var gridRect = cc.rect(80*j,300,80,80);
                for(var k = 0; k < g_MapGridRow[i][j].length; k++){
                    g_MapGridRow[i][j][0] = g_MapGridStatus.free;
                    g_MapGridRow[i][j][1] = gridRect;
                    //cc.log(g_MapGridRow[i][j][1]._origin.x);
                }
            }
        }
    }
});