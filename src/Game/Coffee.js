/**
 * Created by Sercan on 4/23/14.
 */

var Coffee;

Coffee = cc.Sprite.extend({
    speed: 200,
    pos_x: size.width/2,
    pos_y: size.heigth/2,

    ctor: function (arg) {
        this._super();
        this.speed = arg.speed;

        this.initWithFile("coffee.png");
    }
});