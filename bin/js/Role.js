var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Role
 */
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        _super.call(this);
        //初始化
        this.init();
    }
    Role.prototype.init = function () {
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
        this.body = new Laya.Animation();
        this.addChild(this.body);
        //test action
        this.playAction("hero_down");
    };
    Role.prototype.playAction = function (action) {
        this.body.play(0, true, action);
        //get bounds of animation
        var bound = this.body.getBounds();
        //set center position 
        this.body.pos(-bound.width / 2, -bound.height / 2);
    };
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map