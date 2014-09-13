var IMG_PATH = "img/";
var ALPHA_FACTOR = 255;
var THICKNESS_FACTOR = 19;
var LENGTH_FACTOR = 19;
var GAP_FACTOR = 1;
var GAP_PAD = 3;
var SHADOW_BLUR = 0;
var SHADOW_ALPHA = 0.9;
var ANIMATE_GAP = 20;

var COLOR = {
    classic : {
        1 : "#2EFA2E",
        2 : "#FAFA2E",
        3 : "#2E2EFA",
        4 : "#2EFAFA"
    },
    def : {
        1 : {
            cross : [ 0, "#4C462E", 1, "#FFFCE9" ],
            line : "#AAB79D",
            dot : "#A3A798"
        },
        2 : {
            cross : [ 0, "#797F4F", 1, "#EFF57B" ],
            line : "#D1D48D",
            dot : "#D9DCA7"
        },
        3 : {
            cross : [ 0, "#55847C", 1, "#71E7D9" ],
            line : "#8EC4B7",
            dot : "#A0AD91"
        },
        4 : {
            cross : [ 0, "#7F8883", 1, "#E0FFF0" ],
            line : "#C4D4CA",
            dot : "#A5A99A"
        }
    }
};

var CONFIG = {
    alpha : "cl_crosshairalpha",
    color : "cl_crosshaircolor",
    color_b : "cl_crosshaircolor_b",
    color_r : "cl_crosshaircolor_r",
    color_g : "cl_crosshaircolor_g",
    dot : "cl_crosshairdot",
    gap : "cl_crosshairgap",
    size : "cl_crosshairsize",
    style : "cl_crosshairstyle",
    usealpha : "cl_crosshairusealpha",
    thickness : "cl_crosshairthickness",
    fgap : "cl_fixedcrosshairgap",
    outline : "cl_crosshair_outlinethickness",
    outline_draw : "cl_crosshair_drawoutline"
};

var TEMPLATE = {
    def : {
        alpha : 200,
        color : 5,
        color_b : 50,
        color_r : 50,
        color_g : 250,
        dot : 0,
        gap : 0,
        size : 5,
        style : 2,
        usealpha : 1,
        thickness : 0.5,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    dot : {
        alpha : 255,
        color : 5,
        color_b : 0,
        color_r : 0,
        color_g : 255,
        dot : 1,
        gap : 0,
        size : 0,
        style : 2,
        usealpha : 1,
        thickness : 2,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    cross : {
        alpha : 255,
        color : 5,
        color_b : 0,
        color_r : 0,
        color_g : 255,
        dot : 1,
        gap : -5,
        size : 5,
        style : 2,
        usealpha : 1,
        thickness : 2,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    16 : {
        alpha : 200,
        color : 5,
        color_b : 50,
        color_r : 50,
        color_g : 255,
        dot : 0,
        gap : 14,
        size : 6,
        style : 3,
        usealpha : 1,
        thickness : 0.5,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    hatton : {
        alpha : 255,
        color : 5,
        color_b : 255,
        color_r : 255,
        color_g : 0,
        dot : 1,
        gap : 0,
        size : 5,
        style : 2,
        thickness : 1,
        usealpha : 1,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    nip_getright : {
        alpha : 200,
        color : 1,
        color_b : 50,
        color_g : 250,
        color_r : 50,
        dot : 0,
        gap : 0,
        size : 5,
        style : 4,
        thickness : 1.5,
        usealpha : 1,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    nip_forest : {
        alpha : 255,
        color : 1,
        color_b : 0,
        color_g : 0,
        color_r : 0,
        dot : 0,
        gap : -1,
        size : 6,
        style : 4,
        thickness : 1,
        usealpha : 1,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    nip_friberg : {
        alpha : 255,
        color : 4,
        color_b : 250,
        color_g : 250,
        color_r : 50,
        dot : 0,
        gap : 0,
        size : 2,
        style : 2,
        thickness : 0.5,
        usealpha : 1,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    nip_xizt : {
        alpha : 200,
        color : 1,
        color_b : 50,
        color_g : 250,
        color_r : 50,
        dot : 0,
        gap : -1,
        size : 5,
        style : 2,
        thickness : 1,
        usealpha : 1,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    },
    nip_fifflaren : {
        alpha : 255,
        color : 4,
        color_b : 250,
        color_g : 250,
        color_r : 50,
        dot : 0,
        gap : 0,
        size : 3,
        style : 2,
        thickness : 0.5,
        usealpha : 1,
        fgap : 0,
        outline : 0,
        outline_draw : 0
    }
};

var canvas = {
    canvas : null,
    stage : null,
    boundRect : null,
    backgroundGroup : null,
    backgrounds : {},
    crosshair : {
        group : null,
        classic : {
            group : null,
            left : null,
            right : null,
            top : null,
            bottom : null,
            dot : null
        },
        def : {
            group : null,
            left : null,
            right : null,
            top : null,
            bottom : null,
            dot : null,
            lines : {
                left : null,
                right : null,
                top : null,
                bottom : null
            }
        }
    }
};
var crosshair = $.extend({}, TEMPLATE.def);
var control = {
    spinner : {
        alpha : null,
        thickness : null,
        size : null,
        gap : null,
        color_r : null,
        color_g : null,
        color_b : null,
        outline : null
    },
    slider : {
        alpha : null,
        thickness : null,
        size : null,
        gap : null,
        color_r : null,
        color_g : null,
        color_b : null,
        outline : null
    },
    button : {
        usealpha : null,
        outline_draw : null,
        dot : null,
        style : null
    },
    buttonset : {
        color : null,
        style : null
    },
    colorPalette : null,
    config : null,
    configConsole : null
};

var center = {
    x : 0,
    y : 0
};
var freeze = false;
var background = 0;
var backgrounds = [ "de_dust2_6.jpg", "de_dust2_7.jpg", "de_inferno_1.jpg", "de_inferno_3.jpg", "de_nuke_3.jpg" ];
var animate = {
    animating : false,
    step : 0,
    timer : null,
    timout : null
};
var crosshairTimeout = null;
var crosshairDrawTimeout = null;