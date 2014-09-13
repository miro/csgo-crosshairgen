

// This object will be synced with the backend
var endpointUrl = 'http://gocfg.net/';
var configStorage = {
	hash: '',
	configString: '',
	key: null,
	secretKey: null
};

$(function() {

	// STAGE

	// GET CONFIG FROM API
	var initFunction = function init() {
		var urlHash = window.location.hash.substring(1).split('/');
		if (!urlHash[2] || !urlHash[4]) {
			// no key&secret -pair found, abort
			window.location(endpointUrl);
		}

		configStorage.key = urlHash[2];
		configStorage.secretKey = urlHash[4];

		$.ajax({
			url: getAPIurl(configStorage.key, configStorage.secretKey),
			type: 'GET',
			success: function(response) {
				if (!!response && !!response.Value && !!response.Config) {
					configStorage.hash = response.Value;
					configStorage.configString = response.Config;
					changeCrosshair(parseHash(configStorage.hash));
				}
			},
			error: function(response) {
				// Terminate
				window.location(endpointUrl);
			}
		});

	}();

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

	// Save -button
	$('button#save').click(function(event) {
		event.preventDefault();
		$.ajax({
			type: 'POST',
			url: getAPIurl(configStorage.key, configStorage.secretKey),
			contentType: "application/json; charset=utf-8",

			data: JSON.stringify({
				Config: configStorage.configString,
				Json: configStorage.hash
			}),

			success: function() {
				triggerNotification({message: 'Crosshair saved succesfully'});
			},

			error: function(response) {
				triggerNotification({message: 'Error while trying to save Crosshair. Try again', type: 'error'});
			}
		});
	});


	// Back -button
	$('button#back').click(function(event) {
		event.preventDefault();
		window.location.href = getEditPageURL(configStorage.key, configStorage.secretKey);
	});


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
			configStorage.hash = getUpdatedHash(crosshair, configStorage.hash);
		}
	}).blur(function(event) {
		configStorage.hash = getUpdatedHash(crosshair, configStorage.hash);
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
	changeCrosshair(parseHash(configStorage.hash));

});


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





// CHANGE


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



// Bind the "click to hide" -function to notification box
$(document).ready(function() {
	$('.notification-box').click(function() {
		hideNotification();
	});
});
