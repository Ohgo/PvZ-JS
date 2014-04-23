/****************************************************************************

 ****************************************************************************/


var SceneMain = cc.Scene.extend({
    _backgroundLayer:null,
    _mainLayer:null,
    _optionLayer:null,

    onEnter:function () {
        this._super();
        this._backgroundLayer = new LayerMainBg();
        this._mainLayer = new LayerMainMenu();
        this._optionLayer = new LayerOptionMenu();

        this.addChild(this._backgroundLayer, 0);
        this.addChild(this._mainLayer, 1);
        //this.addChild(this._optionLayer, 2);
    },

    showOptionLayer:function () {
        this.addChild(this._optionLayer, 2);
    }

});

