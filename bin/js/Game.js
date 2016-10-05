/**
* Game
*/
var Game = (function () {
    function Game() {
        //initialize width and height
        Laya.init(480, 852);
        //create background
        var bg = new BackGround();
        //add background to stage
        Laya.stage.addChild(bg);
        //load image collections
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        //create a hero
        this.hero = new Role();
        //set hero position
        this.hero.pos(240, 700);
        //add hero to stage
        Laya.stage.addChild(this.hero);
        //add listener to mouse
        Laya.stage.on('mousemove', this, this.onMouseMove);
    };
    Game.prototype.onMouseMove = function (e) {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    return Game;
}());
//启动游戏
new Game();
//# sourceMappingURL=Game.js.map