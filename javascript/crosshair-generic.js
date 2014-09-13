// general functionality needed by the crosshair-generator 
// 


// NOTIFICATION BOX 
// (note: these are not crosshair-specific, these could be own module)
function triggerNotification(event) {
    var notificationBox = $('.notification-box');

    $('.notification-text').text(event.message);

    if (event.type === 'error') {
        notificationBox.addClass('error');
    } else {
        notificationBox.removeClass('error');
    }
    
    showNotification();

    // after interval, hide the notification
    setTimeout(function() {
        hideNotification();
    }, 3000);
};

function hideNotification() {
    $('.notification-box').css('opacity', 0);

    setTimeout(function() {
        $('.notification-box').css('display', 'none');
    }, 100);
};

function showNotification() {
    var self = this;
    $('.notification-box').css('display', 'block');


    setTimeout(function() {
        $('.notification-box').css('opacity', 1);
    }, 30); // hack to allow the fade in to happen
};
// /NOTIFICATION BOX

// CROSSHAIR CREATING
function createCrosshair(layer, crosshair, center) {
    var canvasCrosshair = {
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
    };

    canvasCrosshair.group = new Kinetic.Group({
        position : {
            x : center.x,
            y : center.y
        }
    });
    layer.add(canvasCrosshair.group);
    canvasCrosshair.group.moveToTop();

    // Crosshair classic
    canvasCrosshair.classic.group = new Kinetic.Group();
    canvasCrosshair.group.add(canvasCrosshair.classic.group);
    if (getCrosshairStyleType(crosshair.style) == "classic")
        canvasCrosshair.classic.group.show();
    else
        canvasCrosshair.classic.group.hide();

    var crosshairShape = new Kinetic.Rect({});
    canvasCrosshair.classic.left = crosshairShape.clone();
    canvasCrosshair.classic.right = crosshairShape.clone();
    canvasCrosshair.classic.top = crosshairShape.clone();
    canvasCrosshair.classic.bottom = crosshairShape.clone();

    canvasCrosshair.classic.left.rotateDeg(-90);
    canvasCrosshair.classic.right.rotateDeg(90);
    canvasCrosshair.classic.bottom.rotateDeg(180);

    canvasCrosshair.classic.dot = new Kinetic.Rect({});

    canvasCrosshair.classic.group.add(canvasCrosshair.classic.left);
    canvasCrosshair.classic.group.add(canvasCrosshair.classic.right);
    canvasCrosshair.classic.group.add(canvasCrosshair.classic.top);
    canvasCrosshair.classic.group.add(canvasCrosshair.classic.bottom);
    canvasCrosshair.classic.group.add(canvasCrosshair.classic.dot);

    // Crosshair default
    canvasCrosshair.def.group = new Kinetic.Group();
    canvasCrosshair.group.add(canvasCrosshair.def.group);
    if (getCrosshairStyleType(crosshair.style) == "default")
        canvasCrosshair.def.group.show();
    else
        canvasCrosshair.def.group.hide();

    var crosshairShapeDef = new Kinetic.Rect({

    });
    canvasCrosshair.def.left = new Kinetic.Polygon({
        points : [ 0, 0, -15, -2, -15, 2 ],
        offset : [ 10, 0 ]
    });
    canvasCrosshair.def.right = canvasCrosshair.def.left.clone();
    canvasCrosshair.def.top = canvasCrosshair.def.left.clone();
    canvasCrosshair.def.bottom = canvasCrosshair.def.left.clone();

    canvasCrosshair.def.right.rotateDeg(180);
    canvasCrosshair.def.top.rotateDeg(90);
    canvasCrosshair.def.bottom.rotateDeg(-90);

    canvasCrosshair.def.dot = new Kinetic.Circle({
        x : 0,
        y : 0,
        radius : 2,
        shadow : {
            color : 'black',
            blur : 3,
            offset : [ 0, 0 ],
            opacity : 1
        }
    });

    canvasCrosshair.def.lines.left = crosshairShapeDef.clone();
    canvasCrosshair.def.lines.right = crosshairShapeDef.clone();
    canvasCrosshair.def.lines.top = crosshairShapeDef.clone();
    canvasCrosshair.def.lines.bottom = crosshairShapeDef.clone();

    canvasCrosshair.def.lines.left.rotateDeg(90);
    canvasCrosshair.def.lines.bottom.rotateDeg(180);
    canvasCrosshair.def.lines.right.rotateDeg(-90);

    canvasCrosshair.def.group.add(canvasCrosshair.def.left);
    canvasCrosshair.def.group.add(canvasCrosshair.def.right);
    canvasCrosshair.def.group.add(canvasCrosshair.def.top);
    canvasCrosshair.def.group.add(canvasCrosshair.def.bottom);
    canvasCrosshair.def.group.add(canvasCrosshair.def.dot);
    canvasCrosshair.def.group.add(canvasCrosshair.def.lines.left);
    canvasCrosshair.def.group.add(canvasCrosshair.def.lines.right);
    canvasCrosshair.def.group.add(canvasCrosshair.def.lines.top);
    canvasCrosshair.def.group.add(canvasCrosshair.def.lines.bottom);

    return canvasCrosshair;
}
// / CROSSHAIR CREATING

// CROSSHAIR ALTERING
function changeCrosshair(change) {
    for (type in change) {
        if (crosshair[type] != undefined) {
            crosshair[type] = parseFloat(change[type]);
        }
    }
    crosshair.fgap = crosshair.gap;
    updateConfig();
    updateControl();   // HOX HOX HOX HOX
    updateCrosshair(canvas.crosshair, crosshair);
    animateCrosshair(true);

    // Update crosshair
    if (crosshairTimeout)
        clearTimeout(crosshairTimeout);
    crosshairTimeout = setTimeout(function() {
        configStorage.hash = getUpdatedHash(crosshair, configStorage.hash);
    }, 2000);
}

function updateConfig() {
    //control.config.val(getCrosshairConfig(crosshair));
    //control.configConsole.val(getCrosshairConfig(crosshair, ";"));
    configStorage.configString = getCrosshairConfig(crosshair, ";");
}

// / CROSSHAIR ALTERING

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function round5(x) {
    return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}

function bound(val, min, max) {
    return val < min ? max : (val > max ? min : val);
}

function isCrosshairDynamic(style) {
    return style == 0 || style == 3;
}


// CALC

function calcThickness(thickness) {
    return (thickness / 10) * THICKNESS_FACTOR;
}

function calcLength(length) {
    return (length / 10) * LENGTH_FACTOR;
}

function calcGap(gap, noAnimate) {
    return (gap * GAP_FACTOR) + GAP_PAD + (!noAnimate ? ((animate.step / 10) * ANIMATE_GAP) : 0);
}

// /CALC


function animateCrosshair(reset) {
    reset = reset || false;
    if (!isCrosshairDynamic(crosshair.style)) {
        animate.step = 0;
        return;
    }
    if (reset) {
        if (animate.timout)
            animate.timout = clearTimeout(animate.timout);
        animate.timout = setTimeout(function() {
            animateCrosshair(false);
        }, 500);
        animate.step = 10;
    } else {
        animate.step -= 1;
        if (animate.step <= 0) {
            clearInterval(animate.timout);
            animate.step = 0;
        } else {
            animate.timout = setTimeout(function() {
                animateCrosshair(false);
            }, 50);
        }
    }
    updateCrosshair(canvas.crosshair, crosshair);
}



// UPDATE

function updateCrosshair(canvasCrosshair, crosshair, noAnimate) {
    // Classic
    var color = rgbToHex(crosshair.color_r, crosshair.color_g, crosshair.color_b);
    if (crosshair.color >= 1 && crosshair.color <= 4)
        color = COLOR.classic[crosshair.color];

    var length = calcLength(crosshair.size);
    var thickness = calcThickness(crosshair.thickness);
    var gap = calcGap(crosshair.gap, noAnimate);
    var outline = crosshair.outline_draw ? parseInt(crosshair.outline) : 0;
    var padding = outline;

    canvasCrosshair.classic.top.setSize(thickness, length * -1);
    canvasCrosshair.classic.top.setFill(color);
    canvasCrosshair.classic.top.setOffset(thickness / 2, (thickness / 2) + gap);
    canvasCrosshair.classic.top.setStrokeWidth(outline);
    canvasCrosshair.classic.top.setStroke(outline ? "black" : null);

    canvasCrosshair.classic.left.setAttrs(canvasCrosshair.classic.top.getAttrs());

    canvasCrosshair.classic.right.setAttrs(canvasCrosshair.classic.top.getAttrs());

    canvasCrosshair.classic.bottom.setAttrs(canvasCrosshair.classic.top.getAttrs());

    canvasCrosshair.classic.dot.setPosition((calcThickness(crosshair.thickness) / 2 * -1), (calcThickness(crosshair.thickness) / 2 * -1));
    canvasCrosshair.classic.dot.setFill(color);
    canvasCrosshair.classic.dot.setSize(calcThickness(crosshair.thickness), calcThickness(crosshair.thickness));
    if (crosshair.dot)
        canvasCrosshair.classic.dot.show();
    else
        canvasCrosshair.classic.dot.hide();

    canvasCrosshair.classic.group.setOpacity(crosshair.usealpha ? crosshair.alpha / ALPHA_FACTOR : 0.7);

    canvasCrosshair.classic.size = length + canvasCrosshair.classic.top.getOffset().y;

    // Default
    var thickness = calcThickness(1) + padding;
    var gap = isCrosshairDynamic(crosshair.style) ? calcGap(5, noAnimate) : crosshair.gap;
    var length = 12;
    var width = thickness;
    var linesLength = 10;
    var colorNr = crosshair.color >= 1 && crosshair.color <= 4 ? crosshair.color : 1;
    var hasLine = isCrosshairDynamic(crosshair.style);

    canvasCrosshair.def.left.setPoints([ 0, 0, length * -1, width * -1, length * -1, width ]);

    canvasCrosshair.def.left.setAttrs({
        fillLinearGradientStartPoint : [ 0, 0 ],
        fillLinearGradientEndPoint : [ length * -1, 0 ],
        fillLinearGradientColorStops : COLOR.def[colorNr].cross
    });
    canvasCrosshair.def.left.setOffset(gap, 0);

    canvasCrosshair.def.right.setAttrs(canvasCrosshair.def.left.getAttrs());

    canvasCrosshair.def.top.setAttrs(canvasCrosshair.def.left.getAttrs());

    canvasCrosshair.def.bottom.setAttrs(canvasCrosshair.def.left.getAttrs());

    canvasCrosshair.def.dot.setFill(COLOR.def[colorNr].dot);

    canvasCrosshair.def.lines.top.setPosition(0, 0);
    canvasCrosshair.def.lines.top.setFill(COLOR.def[colorNr].line);
    canvasCrosshair.def.lines.top.setSize(linesLength, 1);
    canvasCrosshair.def.lines.top.setOpacity(0.5);
    canvasCrosshair.def.lines.top.setOffset(linesLength / 2, gap);
    canvasCrosshair.def.lines.top.show();

    canvasCrosshair.def.lines.bottom.setAttrs(canvasCrosshair.def.lines.top.getAttrs());

    canvasCrosshair.def.lines.left.setAttrs(canvasCrosshair.def.lines.top.getAttrs());

    canvasCrosshair.def.lines.right.setAttrs(canvasCrosshair.def.lines.top.getAttrs());

    canvasCrosshair.def.size = length + canvasCrosshair.def.left.getOffset().x;

    // Show/hide default/classic
    if (getCrosshairStyleType(crosshair.style) == "default") {
        canvasCrosshair.def.group.show();
        canvasCrosshair.classic.group.hide();

        if (!hasLine) {
            canvasCrosshair.def.lines.top.hide();
            canvasCrosshair.def.lines.bottom.hide();
            canvasCrosshair.def.lines.left.hide();
            canvasCrosshair.def.lines.right.hide();
        } else {
            canvasCrosshair.def.lines.top.show();
            canvasCrosshair.def.lines.bottom.show();
            canvasCrosshair.def.lines.left.show();
            canvasCrosshair.def.lines.right.show();
        }

    } else {
        canvasCrosshair.def.group.hide();
        canvasCrosshair.classic.group.show();
    }

    canvas.stage.draw();
}

function updateControl() {
    var enable = getCrosshairStyleType(crosshair.style) == "classic";
    for (type in crosshair) {
        if (control.spinner[type]) {
            control.spinner[type].spinner("value", crosshair[type]);
            control.spinner[type].spinner(enable || (type == "gap" && !isCrosshairDynamic(crosshair.style)) ? "enable" : "disable");
        }
        if (control.slider[type]) {
            control.slider[type].slider("value", crosshair[type]);
            control.slider[type].slider(enable || (type == "gap" && !isCrosshairDynamic(crosshair.style)) ? "enable" : "disable");
        }
        if (control.button[type]) {
            control.button[type].button(enable || type == "style" ? "enable" : "disable");
            var buttonChecked = (type != "style" && crosshair[type]) || (type == "style" && isCrosshairDynamic(crosshair[type]));
            control.button[type].prop("checked", buttonChecked);
            control.button[type].val(crosshair[type]).button("refresh");
        }
        if (control.buttonset[type]) {
            control.buttonset[type].find("input[value=" + crosshair[type] + "]").prop("checked", false);
            control.buttonset[type].find("label").removeClass("ui-state-active").attr("aria-pressed", true);
            control.buttonset[type].buttonset(enable || type == "style" || type == "color" ? "enable" : "disable");
            if (type == "style") {
                control.buttonset[type].find("input[value=" + getCrosshairStyleType(crosshair[type]) + "]").prop("checked", true);
                control.buttonset[type].find("label[for=crosshair_" + type + "_" + getCrosshairStyleType(crosshair[type]) + "]").addClass("ui-state-active").attr("aria-pressed",
                        true);
            } else {
                control.buttonset[type].find("input[value=" + crosshair[type] + "]").prop("checked", true);
                control.buttonset[type].find("label[for=crosshair_" + type + "_" + crosshair[type] + "]").addClass("ui-state-active").attr("aria-pressed", true);
            }
            // control.buttonset[type].buttonset("refresh");
        }
    }

    var alphaEnable = enable && crosshair.usealpha;
    control.slider.alpha.slider(alphaEnable ? "enable" : "disable");
    control.spinner.alpha.spinner(alphaEnable ? "enable" : "disable");
    
    var outlineEnable = enable && crosshair.outline_draw;
    control.slider.outline.slider(outlineEnable ? "enable" : "disable");
    control.spinner.outline.spinner(outlineEnable ? "enable" : "disable");

    control.colorPalette.spectrum("set", "rgb " + crosshair.color_r + " " + crosshair.color_g + " " + crosshair.color_b);

    var colorEnable = (crosshair.color < 1 || crosshair.color > 4) && enable;
    control.slider.color_r.slider(colorEnable ? "enable" : "disable");
    control.slider.color_g.slider(colorEnable ? "enable" : "disable");
    control.slider.color_b.slider(colorEnable ? "enable" : "disable");
    control.spinner.color_r.spinner(colorEnable ? "enable" : "disable");
    control.spinner.color_g.spinner(colorEnable ? "enable" : "disable");
    control.spinner.color_b.spinner(colorEnable ? "enable" : "disable");
    $("#crosshair_color").css("opacity", colorEnable ? 1 : 0.5);

    if (enable)
        $("[for=crosshair_color_5]").css("opacity", 1);
    else
        $("[for=crosshair_color_5]").css("opacity", 0.5);
}

// /UPDATE

// GET

function getCrosshairStyleType(style) {
    return style == 0 || style == 1 ? "default" : "classic";
}

function getCrosshairValue(type, val) {
    var f = function(val, min, max) {
        return val >= min && val <= max ? val : (val < min ? min : max);
    };
    switch (type) {
    case "color":
        val = f(val, 1, 5);// val >= 1 && val <= 5 ? val : TEMPLATE.def[type];
        break;
    case "style":
        val = f(val, 0, 4);
        break;
    case "alpha":
    case "color_r":
    case "color_g":
    case "color_b":
        val = f(val, 0, 255); // val >= 0 && val <= 255 ? val :
        // TEMPLATE.def[type];
        break;
    case "dot":
    case "usealpha":
        val = f(val, 0, 1); // val >= 0 && val <= 1 ? val : TEMPLATE.def[type];
        break;
    case "thickness":
    case "size":
        val = val >= 0 ? val : 0;
        break;
    case "gap":
        val = val >= -100 && val <= 100 ? val : TEMPLATE.def[type];
        break;
    }
    return val;
}

function getCrosshairParsed(crosshairConfig) {
    var regex, match, config = crosshairConfig, crosshairNew = {}, val;
    for (type in CONFIG) {
        crosshairNew[type] = null;
        regex = new RegExp(CONFIG[type] + "\\s\\\"?([\\-\\d.]+)\\\"?\\;?");
        match = config.match(regex);
        if (match != null) {
            val = getCrosshairValue(type, parseFloat(match[1]));
            crosshairNew[type] = val;
        }
    }
    return crosshairNew;
};


function getCrosshairConfig(crosshair, splitter, quote) {
    splitter = splitter || "\n";
    quote = quote == undefined ? "\"" : quote;
    var value, configValue = "";
    for (type in CONFIG) {
        value = CONFIG[type] + " " + quote + crosshair[type] + quote;
        configValue += value + splitter;
    }
    return jQuery.trim(configValue);
}

// /GET



// HASH
function parseHash(hash) {
    var hashesArray = hash.split("/");
    var hashesObject = {};
    var hashArray;
    for (i in hashesArray) {
        hashArray = hashesArray[i].split(/[\:\=]/);
        hashesObject[hashArray[0]] = hashArray[1];
    }
    return hashesObject;
};

function getUpdatedHash(hashObject, oldHash) {
    var hashNew = $.extend(oldHash, hashObject);
    var hashArray = [];
    for (key in hashNew) {
        if (key && hashNew[key] != undefined && key != "fgap") {
            hashArray.push(key + "=" + hashNew[key]);
        }
    }
    return hashArray.join("/");
};
// /HASH



// API ENDPOINT 
function getAPIurl(key, secretKey) {
    return endpointUrl + 'api/Crosshair?' +
        'viewkey=' + key + 
        '&editkey=' + secretKey;
}

function getEditPageURL(key, secretKey) {
    return endpointUrl + 'edit/' + key + '?key=' + secretKey;
}
// /API ENDPOINT