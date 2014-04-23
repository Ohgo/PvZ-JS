/****************************************************************************

 ****************************************************************************/


var mmScene = cc.Scene.extend({
    _mainLayer:null,
    _optionLayer:null,

    onEnter:function () {
        this._super();
        this._mainLayer = new MainMenuLayer();
        this.addChild(this._mainLayer, 2);
        //mmlayer.ctor();
    },

    showOptionLayer:function () {
        this._optionLayer = new MainOptionLayer();
        this.addChild(this._optionLayer, 1);
        cc.log("Show");
    }

});