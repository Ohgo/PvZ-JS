/**
 * Created by Yingjie on 14-4-28.
 */
var LevelManager = cc.Class.extend({
    _currentLevel: null,
    _layerGameCharacter: null,

    ctor:function(layerGameCharacter){
        cc.log("LevelManager");
        if(!layerGameCharacter){
            throw "gameLayer must be non-nil";
        }
        this._currentLevel = Level1;
        this._layerGameCharacter = layerGameCharacter;
        this.setLevel(this._currentLevel);
    },

    setLevel:function(level){
        var locCurrentLevelEnemies = this._currentLevel.bacterias;
        for(var i = 0; i< level.bacterias.length; i++)
            locCurrentLevelEnemies[i].ShowTime = this._minuteToSecond(locCurrentLevelEnemies[i].ShowTime);
    },

    loadLevelResource:function(deltaTime){
        /*
        // Safeguard of enemies overload on screen
        if(PvZ.ACTIVE_BACTERIA>= this._currentLevel.bacteriaMax){
            return;
        }
        */

        //load bacteria
        var locCurrentLevel = this._currentLevel;
        for(var i = 0; i< locCurrentLevel.bacterias.length; i++){
            var selBacteria = locCurrentLevel.bacterias[i];
            if(selBacteria){
                if(selBacteria.ShowType === "Once"){
                    if(selBacteria.ShowTime == deltaTime){
                        this.addEnemyToGameLayer(selBacteria);
                    }
                }else if(selBacteria.ShowType === "Repeat"){
                    if(deltaTime % selBacteria.ShowTime === 0){
                        this.addEnemyToGameLayer(selBacteria);
                    }
                }
            }
        }
    },

    addEnemyToGameLayer: function(selBacteria){
        var winSize = cc.Director.getInstance().getWinSize();

        var addBacteria = Bacteria.getOrCreateBacteria(BacteriaType[selBacteria.Type]);
        var bacteriaSize =  addBacteria.getContentSize();
        cc.log("bacteria Lane: " + selBacteria.Lane);
        // TODO: Eliminate hard number
        var bacteriaStartingX = winSize.width + bacteriaSize.width / 2;
        var bacteriaStartingY = (winSize.height / 7) * selBacteria.Lane;
        var bacteriaStartingPos = cc.p(bacteriaStartingX, bacteriaStartingY);
        addBacteria.setPosition(bacteriaStartingPos);
        var bacteriaDestinationPos = cc.p(- bacteriaSize.width / 2, bacteriaStartingY);

        var tmpAction;
        switch (addBacteria.moveType) {
            case PvZ.BACTERIA_MOVE_TYPE.HORIZONTAL_WALK:
                tmpAction = cc.MoveTo.create(addBacteria.moveSpeed, bacteriaDestinationPos);
                break;
            // TODO: add other movements. Now default to HORIZONTAL_WALK.
            default:
                tmpAction = cc.MoveTo.create(addBacteria.moveSpeed, bacteriaDestinationPos);
        }

        addBacteria.runAction(tmpAction);
    },

    _minuteToSecond:function(minuteStr){
        if(!minuteStr)
            return 0;
        if(typeof(minuteStr) !=  "number"){
            var mins = minuteStr.split(':');
            if(mins.length == 1){
                return parseInt(mins[0],10);
            }else {
                return parseInt(mins[0],10 )* 60 + parseInt(mins[1],10);
            }
        }
        return minuteStr;
    }
});