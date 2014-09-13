// With this js-file it is possible to fetch and draw crosshair to selected element 
// from the API
//
// (This is based on Skarbo's crosshair.html)

// stubs needed by the crosshair-generic.js
var configStorage = {};
function updateControl() {
    // stub function that needs to exist so this can work. definetly a HACK but you know how it goes.
}

// @param canvasSelector - jQuery selector that will be used when selecting the element
// where the crosshair canvas will be drawn
//
// @param crosshairCfg - crosshair "hash" as it is stored in our backend on the Value-field.
function createCrosshairCanvas(canvasSelector, crosshairCfg) {
    canvas.canvas = $(canvasSelector);
    canvas.canvas.empty();

    canvas.stage = new Kinetic.Stage({
        container: canvas.canvas.attr("id"),
        width: canvas.canvas.width(),
        height: canvas.canvas.height()
    });

    var layer = new Kinetic.Layer();
    canvas.stage.add(layer);

    center = {
        x: canvas.stage.getWidth() / 2,
        y: canvas.stage.getHeight() / 2
    };

    canvas.crosshair = createCrosshair(layer, crosshair, center);
    changeCrosshair(parseHash(crosshairCfg));
};

