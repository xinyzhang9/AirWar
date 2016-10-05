var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 程序入口
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        _super.call(this);
        this.width = 480;
        this.height = 852;
        this.init();
    }
    Background.prototype.init = function () {
        //create bg1
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage('res/background.png');
        this.addChild(this.bg1);
        //create bg2
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage('res/background.png');
        this.bg2.pos(0, -this.height);
        this.addChild(this.bg2);
        //create frame loop
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Background.prototype.onLoop = function () {
        this.y += 1;
        if (this.bg1.y + this.y >= this.height) {
            this.bg1.y -= this.height * 2;
        }
        if (this.bg2.y + this.y >= this.height) {
            this.bg2.y -= this.height * 2;
        }
    };
    return Background;
}(Laya.Sprite));
//# sourceMappingURL=Background.js.map