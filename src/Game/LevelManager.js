/**
 * Created by Yingjie on 14-4-28.
 */
var LevelManager = cc.Class.extend({
    _currentLevel: null,
    _layerGameCharacter: null,
    ctor:function(layerGameCharacter){
        if(!layerGameCharacter){
            throw "gameLayer must be non-nil";
        }
        this._currentLevel = Level1;
        this._layerGameCharacter = layerGameCharacter;
        //this.setLevel(this._currentLevel);
    },

    loadLevelResource:function(deltaTime){
        if(PvZ.ACTIVE_BACTERIA>= this._currentLevel.bacteriaMax){
            return;
        }
        //load bacteria
        var locCurrentLevel = this._currentLevel;
        for(var i = 0; i< locCurrentLevel.bacterias.length; i++){
            var selBacteria = locCurrentLevel.bacterias[i];
            if(selBacteria){
                if(selBacteria.ShowType === "Once"){
                    if(selBacteria.ShowTime == deltaTime){
                        for(var tIndex = 0; tIndex < selBacteria.Types.length;tIndex++ ){
                            this.addEnemyToGameLayer(selBacteria.Types[tIndex]);
                        }
                    }
                }else if(selBacteria.ShowType === "Repeate"){
                    if(deltaTime % selBacteria.ShowTime === 0){
                        for(var rIndex = 0; rIndex < selBacteria.Types.length;rIndex++ ){
                            this.addEnemyToGameLayer(selBacteria.Types[rIndex]);
                        }
                    }
                }
            }
        }
    },

    addEnemyToGameLayer: function(bacteriaType){
        var addBacteria = Bacteria.getOrCreateBacteria(BacteriaType[bacteriaType]);
        var bacteriaPos = cc.p( 80 + (winSize.width - 160) * Math.random(), winSize.height);
        var bacteriacs =  addBacteria.getContentSize();
        addBacteria.setPosition(bacteriaPos);

        var offset, tmpAction;
        var a0=0;
        var a1=0;
        switch (addBacteria.moveType) {
            case PvZ.BACTERIA_MOVE_TYPE.SHAKY:
                offset = cc.p(-960,0);
                a0 = cc.MoveBy.create(5, offset);
                a1 = cc.ShakyTiles3D.create(5, cc.size(15, 10), 4, false);
                tmpAction = cc.Spawn.create(a0, a1);
                break;
//            case PvZ.ENEMY_MOVE_TYPE.VERTICAL:
//                offset = cc.p(0, -winSize.height - enemycs.height);
//                tmpAction = cc.MoveBy.create(4, offset);
//                break;
//            case PvZ.ENEMY_MOVE_TYPE.HORIZONTAL:
//                offset = cc.p(0, -100 - 200 * Math.random());
//                a0 = cc.MoveBy.create(0.5, offset);
//                a1 = cc.MoveBy.create(1, cc.p(-50 - 100 * Math.random(), 0));
//                var onComplete = cc.CallFunc.create(function (pSender) {
//                    var a2 = cc.DelayTime.create(1);
//                    var a3 = cc.MoveBy.create(1, cc.p(100 + 100 * Math.random(), 0));
//                    pSender.runAction(cc.RepeatForever.create(
//                        cc.Sequence.create(a2, a3, a2.clone(), a3.reverse())
//                    ));
//                }.bind(addEnemy) );
//                tmpAction = cc.Sequence.create(a0, a1, onComplete);
//                break;
//            case PvZ.ENEMY_MOVE_TYPE.OVERLAP:
//                var newX = (enemypos.x <= winSize.width / 2) ? 320 : -320;
//                a0 = cc.MoveBy.create(4, cc.p(newX, -240));
//                a1 = cc.MoveBy.create(4,cc.p(-newX,-320));
//                tmpAction = cc.Sequence.create(a0,a1);
//                break;
        }

        addBacteria.runAction(tmpAction);
    }
});