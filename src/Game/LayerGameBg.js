/**
 * Contains background image for the game scene and the grid of the game
 */

var g_MapGridStatus = {free:0,occupied:1};
var g_MapGridRow;
var lblLives;
var n_lives;
var _status;

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

            n_lives = 5;
            var winSize = cc.Director.getInstance().getWinSize();
            lblLives = cc.Sprite.create(s_lives5);
            lblLives.setAnchorPoint(cc.p(1, 1));
            lblLives.setPosition(winSize.width - 300, winSize.height - 5);

            this.addChild(bg,g_GameZOder.bg);
            this.addChild(lblLives, g_GameZOder.bg);

            this.initMap();
        }
        return bRet;
    },

    //Initialize the grid
    initMap:function(){
        //numbers will be replaced ,should be as constant
        var winSize = cc.Director.getInstance().getWinSize();
        g_MapGridRow = new Array(5);
        for (var i = 0; i < g_MapGridRow.length ; i++){
            g_MapGridRow[i] = new Array(8);
            for(var j = 0 ; j<g_MapGridRow[i].length; j++){
                // create a rect on each 2d array element;
                g_MapGridRow[i][j] = new Array(2);
                g_MapGridRow[i][j][0] = g_MapGridStatus.free;
                g_MapGridRow[i][j][1] = cc.rect(65+50*j*screenType,30+50*screenType*i,50*screenType,50*screenType);
            }
        }
    }
});