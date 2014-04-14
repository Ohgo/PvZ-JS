var LevelManager = cc.Class.extend({
    _currentLevel:null,
    _gameLayer:null,
    ctor:function(gameLayer){
        if(!gameLayer){
            throw "gameLayer must be non-nil";
        }
        //this._currentLevel = Level1;
        this._gameLayer = gameLayer;
        //this.setLevel(this._currentLevel);
    },

    addBacteriaToGameLayer:function(){
        cc.log("add bacteria!");
        var addBacteria = new BacteriaHappyGray();
        var bacteriapos = cc.p(100,320);
        var bacteriacs =  addBacteria.getContentSize();
        addBacteria.setPosition(bacteriapos);

        var tmpAction;
        var a0=0;
        var a1=0;
        a0 = cc.MoveBy.create(0.5, 3);
        a1 = cc.MoveBy.create(1, cc.p(-50 - 100 * Math.random(), 0));
        tmpAction = cc.Sequence.create(a0, a1);

        addBacteria.runAction(tmpAction);
    }
});