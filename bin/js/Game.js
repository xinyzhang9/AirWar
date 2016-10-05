// 程序入口
var Game = (function () {
    function Game() {
        Laya.init(480, 852);
        var bg = new Background();
        Laya.stage.addChild(bg);
    }
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map