/**
 * Created by 00 on 14-4-10.
 */
var GameBGLayer = cc.Layer.extend({
    init:function(){
        var bRet = false;
        if (this._super()) {
            var bg = cc.Sprite.create(bg_Game_png);
            bg.setAnchorPoint(cc.p(0,0));
            this.addChild(bg,1);
            cc.log("Game on!");
        }
        return bRet;
    }
});