var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameInfoUI = (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            _super.call(this);
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "props": { "width": 480, "height": 852 }, "child": [{ "type": "Button", "props": { "y": 28, "x": 375, "var": "pauseBtn", "stateNum": "1", "skin": "war/btn_pause.png" } }, { "type": "Label", "props": { "y": 40, "x": 60, "var": "hpLabel", "text": "Hp:10", "fontSize": 20, "color": "#10be6a" } }, { "type": "Label", "props": { "y": 40, "x": 140, "width": 56, "var": "levelLabel", "text": "Level:50", "height": 12, "fontSize": 20, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 40, "x": 230, "var": "scoreLabel", "text": "Score:100", "fontSize": 20, "color": "#ff605a" } }, { "type": "Label", "props": { "y": 500, "x": 60, "var": "infoLabel", "text": "Battle End", "fontSize": 28, "color": "#ffffff" } }] };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map