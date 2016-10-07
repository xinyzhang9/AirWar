var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * UI
 */
var GameInfo = (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        _super.call(this);
        this.pauseBtn.on('click', this, this.onPauseBtnClick);
        //initialize UI
        this.reset();
    }
    GameInfo.prototype.reset = function () {
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    };
    GameInfo.prototype.onPauseBtnClick = function (e) {
        e.stopPropagation();
        //pause game
        this.infoLabel.text = 'Game paused.\nPress ESC to resume';
        gameInstance.pause();
        Laya.stage.once('click', this, this.onStageClick);
    };
    GameInfo.prototype.onStageClick = function (e) {
        this.infoLabel.text = "";
        gameInstance.resume();
    };
    //display hp
    GameInfo.prototype.hp = function (value) {
        this.hpLabel.text = 'HP:' + value;
    };
    //display level
    GameInfo.prototype.level = function (value) {
        this.levelLabel.text = 'Level:' + value;
    };
    //display score
    GameInfo.prototype.score = function (value) {
        this.scoreLabel.text = 'Score:' + value;
    };
    return GameInfo;
}(ui.GameInfoUI));
//# sourceMappingURL=GameInfo.js.map