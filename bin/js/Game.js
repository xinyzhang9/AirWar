// 程序入口
var Game = (function () {
    function Game() {
        Laya.init(480, 852);
        var bg = new Background();
        Laya.stage.addChild(bg);
        Laya.loader.load('res/atlas/war.json', Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        var hero = new Role();
        Laya.stage.addChild(hero);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map