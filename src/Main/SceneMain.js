/****************************************************************************

 ****************************************************************************/


var SceneMain = cc.Scene.extend({
    _mainLayer:null,
    _optionLayer:null,

    onEnter:function () {
        this._super();
        this._mainLayer = new LayerMainMenu();
        this.addChild(this._mainLayer, 1);
    },

    showOptionLayer:function () {
        this._optionLayer = new LayerMainOption();
        this.addChild(this._optionLayer, 2);
    }

});