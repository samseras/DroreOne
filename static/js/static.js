//显示小图标：droreMap.showLayer()-->pool.getLayerById【拿到要显示的layerId】-【layers】->setSeedLayer-->addlayer-->droreMap.addLayer-->ulDisplay()
define(function(require, exports, module) {
    // 你也可以引入自己的函数依赖
var Event = (function() {
    var SINGLECLICK_EVENT = "singleclick"; //定义了常量;
    var DOUBLECLICK_EVENT = "dblclick";
    var CLICK_EVENT = "click";
    var MOUSE_OVER_EVENT ="pointermove";
    var DRAW_EVENT = "drawend";
    var SELECT_EVENT = "select";
    var MODIFY_EVENT = "modifyend";
    return {
        SINGLECLICK_EVENT:SINGLECLICK_EVENT,
        DOUBLECLICK_EVENT:DOUBLECLICK_EVENT,
        CLICK_EVENT :CLICK_EVENT,
        DRAW_EVENT:DRAW_EVENT,
        SELECT_EVENT:SELECT_EVENT,
        MOUSE_OVER_EVENT:MOUSE_OVER_EVENT,
        MODIFY_EVENT:MODIFY_EVENT
    }
})();

    module.exports = Event;
})
