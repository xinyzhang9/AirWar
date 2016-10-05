// 程序入口
class Game{
    constructor()
    {   
        Laya.init(480,852);
        var bg: Background = new Background();
        Laya.stage.addChild(bg);
    }
    
}
new Game();