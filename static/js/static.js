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
