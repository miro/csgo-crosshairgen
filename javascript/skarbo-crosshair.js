/*
 * // Please do not hold me accountable for the code. Its...pretty ugly.
 * 
	"cl_crosshairalpha" def. "200" min 0 max 255        
	"cl_crosshaircolor" def. "1" Set crosshair color as defined in game_options.consoles.txt  
	"cl_crosshaircolor_b" ( def. "50" ) 
	"cl_crosshaircolor_r" ( def. "50" )  
	"cl_crosshaircolor_g" ( def. "250" )  
	"cl_crosshairdot" ( def. "0" )   
	"cl_crosshairgap" ( def. "0" )     
	"cl_crosshairscale" ( def. "0" ) Crosshair scaling factor (deprecated)
	"cl_crosshairsize" ( def. "5" )     
	"cl_crosshairstyle" ( def. "0" ) 
	"cl_crosshairusealpha" ( def. "1" )              
	"cl_crosshairthickness" ( def. "0.5" )    
 */

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

$(function() {

	// STAGE

	canvas.canvas = $("#container");
	canvas.canvas.empty();

	canvas.stage = new Kinetic.Stage({
		container : canvas.canvas.attr("id"),
		width : canvas.canvas.width(),
		height : canvas.canvas.height()
	});

	canvas.stage.on("mousemove", function(event) {
		if (!freeze) {
			var position = canvas.stage.getPointerPosition();// canvas.stage.getUserPosition();
			// //
			if (canvas.backgrounds[background] && canvas.backgrounds[background].getVisible()) {
				// Move background
				canvas.backgrounds[background].setPosition((canvas.backgrounds[background].getWidth() - canvas.stage.getWidth()) * (position.x / canvas.stage.getWidth()) * -1,
						(canvas.backgrounds[background].getHeight() - canvas.stage.getHeight()) * (position.y / canvas.stage.getHeight()) * -1);
			}
			canvas.crosshair.group.setPosition(position.x, position.y);
			canvas.stage.draw();
			animateCrosshair(true);
		}
	});

	canvas.canvas.mouseout(function() {
		if (!freeze) {
			canvas.crosshair.group.setPosition(center.x, center.y);
			if (canvas.backgrounds[background])
				canvas.backgrounds[background].centerBackground();
			canvas.stage.draw();
		}
	});
	
	canvas.canvas.click(function() {
		freeze = !freeze;
	});

	// /STAGE

	center = {
		x : canvas.stage.getWidth() / 2,
		y : canvas.stage.getHeight() / 2
	};

	var layer = new Kinetic.Layer();
	canvas.stage.add(layer);

	// Bound rect
	canvas.boundRect = new Kinetic.Rect({
		height : canvas.stage.getWidth(),
		width : canvas.stage.getHeight()
	});
	layer.add(canvas.boundRect);

	// BACKGROUNDS

	canvas.backgroundGroup = new Kinetic.Group({});
	layer.add(canvas.backgroundGroup);
	canvas.backgroundGroup.moveToBottom();

	var backgroundsElement = $("#backgrounds");
	var backgroundElement = $("<div />", {});
	backgroundsElement.append(backgroundElement.attr("data-background", -1).css("background", "white"));
	for (i in backgrounds) {
		backgroundsElement.append(backgroundElement.clone().attr("data-background", i).append($("<img  />", {
			src : IMG_PATH + "min_" + backgrounds[i],
			alt : ""
		})));
	}
	backgroundsElement.children().click(function(event) {
		loadBackground($(this).attr("data-background"));
	});
	
	// /BACKGROUNDS

	// CROSSHAIR

	canvas.crosshair = createCrosshair(layer, crosshair, center);

	// /CROSSHAIR

	// CONTROLS

	// Crosshair style
	var crosshairStyleFunc = function(type, dynamic) {
		type = type || "default";

		var crosshairStyle = 0;
		if (type == "classic" && !dynamic)
			crosshairStyle = 2;
		else if (type == "classic" && dynamic)
			crosshairStyle = 3;
		else if (type == "default" && !dynamic)
			crosshairStyle = 1;

		changeCrosshair({
			"style" : crosshairStyle
		});
	};

	control.buttonset.style = $("#crosshair_style_type").buttonset().change(function(event) {
		crosshairStyleFunc($(event.target).val(), control.button.style.is(":checked"));
	});

	control.button.style = $("#crosshair_style_dynamic").button().change(function(event) {
		crosshairStyleFunc(control.buttonset.style.find("input:checked").val(), $(this).is(":checked"));
	});

	// Crosshair alpha
	createControlSlider("alpha", 255);
	createControlSpinner("alpha", 255);
	control.button.usealpha = $("#crosshair_usealpha").button().change(function(event) {
		changeCrosshair({
			"usealpha" : $(this).is(":checked") ? 1 : 0
		});
	});

	// Crosshair thickness
	createControlSlider("thickness", 100, 0, 0.5);
	createControlSpinner("thickness", 100, 0, 0.5);

	// Crosshair size
	createControlSlider("size");
	createControlSpinner("size");

	// Crosshair gap
	createControlSlider("gap", 100, -100);
	createControlSpinner("gap", 100, -100);

	// Crosshair outline
	createControlSlider("outline", 3, 0);
	createControlSpinner("outline", 3, 0);
	control.button.outline_draw = $("#crosshair_outline_draw").button().change(function(event) {
		changeCrosshair({
			"outline_draw" : $(this).is(":checked") ? 1 : 0
		});
	});

	// Crosshair color
	createControlSlider("color_r", 255);
	createControlSpinner("color_r", 255);
	createControlSlider("color_g", 255);
	createControlSpinner("color_g", 255);
	createControlSlider("color_b", 255);
	createControlSpinner("color_b", 255);

	control.colorPalette = $("#crosshair_color_palette").spectrum({
		color : rgbToHex(crosshair.color_r, crosshair.color_g, crosshair.color_b),
		change : function(color) {
			var rgb = color.toRgb();
			changeCrosshair({
				"color_r" : rgb.r,
				"color_g" : rgb.g,
				"color_b" : rgb.b,
			});
		},
		showInput : true,
		showPalette : true,
		palette : [ [ 'black', 'white', 'red' ], [ 'yellow', 'rgb(0, 255, 0);', 'blue' ] ]
	});

	control.buttonset.color = $("#crosshair_color_type").buttonset().change(function(event) {
		changeCrosshair({
			"color" : $(event.target).val()
		});
	});

	// Crosshair dot
	control.button.dot = $("#crosshair_dot").button().change(function(event) {
		changeCrosshair({
			"dot" : $(this).is(":checked") ? 1 : 0
		});
	});

	// Template
	$(".crosshair_template").button();

	$("#crosshair_template_players").button({
		icons : {
			secondary : "ui-icon-triangle-1-s"
		}
	}).click(function() {
		var menu = $(this).next().show().position({
			my : "left top",
			at : "left bottom",
			of : this
		});
		$(document).one("click", function() {
			menu.hide();
		});
		return false;
	}).next().hide().menu();

	$("*[data-template]").click(function(event) {
		event.preventDefault();
		var temp = $(this).attr("data-template");
		if (TEMPLATE[temp] != undefined)
			changeCrosshair(TEMPLATE[temp]);
	});

	// Config
	control.config = $("#crosshair_config").change(changeConfig);
	control.configConsole = $("#crosshair_config_console").focus(function() {
		$(this).select();
	});

	// /CONTROLS


	// RESIZE

	$(window).resize(function() {
		canvas.canvas.children().hide();
		canvas.canvas.children().height(canvas.canvas.height()).width(canvas.canvas.width());
		canvas.stage.setSize(canvas.canvas.width(), canvas.canvas.height());
		canvas.boundRect.setSize(canvas.canvas.width(), canvas.canvas.height());
		canvas.stage.draw();
		center = {
			x : canvas.stage.getWidth() / 2,
			y : canvas.stage.getHeight() / 2
		};
		canvas.canvas.children().show();
	});

	// Fixes a bug
	setTimeout(function() {
		$(window).resize();
	}, 100);

	// /RESIZE

	// UPDATE HASH

	$(window).keydown(function(event) {
		if (((event.metaKey || event.ctrlKey) && event.keyCode == 76) || (event.altKey && event.keyCode == 68) || event.keyCode == 117) {
			updateHash(crosshair);
		}
	}).blur(function(event) {
		updateHash(crosshair);
	});

	// /UPDATE HASH

	// TABS

	var tabs = $(".tabs");
	tabs.find("* >*[for]").click({
		tabs : tabs,
		content : $(".tab_content")
	}, function(event) {
		var id = $(event.target).attr("for");
		event.data.tabs.find("* >*").removeClass("selected");
		$(event.target).addClass("selected");
		event.data.content.children().removeClass("selected").filter("#" + id).addClass("selected");
	});

	// /TABS
	

	// Tooltip
	$(document).tooltip();

	// Load background
	loadBackground(background);

	// Load crosshair from hash
	changeCrosshair(getHash());

});

function isCrosshairDynamic(style) {
	return style == 0 || style == 3;
}

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

function loadBackground(index) {
	background = index;
	for (i in canvas.backgrounds) {
		canvas.backgrounds[i].hide();
	}

	if (!backgrounds[index])
		return canvas.stage.draw();

	if (canvas.backgrounds[index]) {
		canvas.backgrounds[index].show();
		canvas.backgrounds[index].centerBackground();
		canvas.stage.draw();
	} else {
		var imageObj = new Image();
		imageObj.onload = function() {
			canvas.backgrounds[index] = new Kinetic.Image({
				x : 0,
				y : 0,
				image : imageObj,
				width : imageObj.width,
				height : imageObj.height
			});
			canvas.backgrounds[index].centerBackground = function() {
				this.setPosition((this.getWidth() - this.getStage().getWidth()) / 2 * -1, (this.getHeight() - this.getStage().getHeight()) / 2 * -1);
			};
			canvas.backgroundGroup.add(canvas.backgrounds[index]);
			canvas.backgrounds[index].centerBackground();
			canvas.stage.draw();
		};
		imageObj.src = IMG_PATH + backgrounds[index];
	}

}

// CREATE

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

function createControlSpinner(type, max, min, step) {
	max = max || 100;
	min = min || 0;
	step = step || 1;
	control.spinner[type] = $("#crosshair_" + type + "_spinner").val(crosshair[type]).spinner({
		min : min,
		max : max,
		step : step,
		value : crosshair[type],
		spin : function(event, ui) {
			var hash = {};
			hash[type] = ui.value;
			changeCrosshair(hash);
		}
	}).keyup(function() {
		var hash = {};
		hash[type] = $(this).spinner("value");
		changeCrosshair(hash);
	});
}

function createControlSlider(type, max, min, step) {
	max = max || 100;
	min = min || 0;
	step = step || 1;
	control.slider[type] = $("#crosshair_" + type + "_slider").slider({
		min : min,
		max : max,
		step : step,
		value : crosshair[type],
		slide : function(event, ui) {
			var hash = {};
			hash[type] = ui.value;
			changeCrosshair(hash);
		}
	});
}

// /CREATE

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

function updateConfig() {
	control.config.val(getCrosshairConfig(crosshair));
	control.configConsole.val(getCrosshairConfig(crosshair, ";"));
}

// /UPDATE

// CHANGE


function changeCrosshair(change) {
	for (type in change) {
		if (crosshair[type] != undefined) {
			crosshair[type] = parseFloat(change[type]);
		}
	}
	crosshair.fgap = crosshair.gap;
	updateConfig();
	updateControl();
	updateCrosshair(canvas.crosshair, crosshair);
	animateCrosshair(true);

	// Update crosshair
	if (crosshairTimeout)
		clearTimeout(crosshairTimeout);
	crosshairTimeout = setTimeout(function() {
		updateHash(crosshair);
	}, 2000);
}

function changeConfig() {
	var regex, match, config = control.config.val(), crosshairNew = {}, val, i = 0;
	for (type in CONFIG) {
		regex = new RegExp(CONFIG[type] + "\\s\\W?([\\-\\d.]+)\\W?");
		match = config.match(regex);
		if (match != null) {
			val = getCrosshairValue(type, parseFloat(match[1]));
			if (match != null && crosshair[type] != undefined && crosshair[type] != val) {
				i++;
				crosshairNew[type] = val;
			}
		}
	}
	if (i > 0)
		changeCrosshair(crosshairNew);
	else
		updateConfig();
}


// /CHANGE

// HASH

function getHash() {
	var hash = window.location.hash.substring(1);
	var hashesArray = hash.split("/");
	var hashesObject = {};
	var hashArray;
	for (i in hashesArray) {
		hashArray = hashesArray[i].split(/[\:\=]/);
		hashesObject[hashArray[0]] = hashArray[1];
	}
	return hashesObject;
};

function updateHash(hashObject) {
	var hash = getHash();
	var hashNew = $.extend(hash, hashObject);
	var hashArray = [];
	for (key in hashNew) {
		if (key && hashNew[key] != undefined && key != "fgap") {
			hashArray.push(key + "=" + hashNew[key]);
		}
	}
	window.location.hash = "#" + hashArray.join("/");
};

// /HASH

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