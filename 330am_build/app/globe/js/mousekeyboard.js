//HammerJS + Javascript
//Touchhandler code from Stack Overflow
//http://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events


var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
var pressX = 0, pressY = 0;

var dragging = false;

var rotateX = 0, rotateY = 0;
var rotateVX = 0, rotateVY = 0;
var rotateXMax = 90 * Math.PI/180;

var rotateTargetX = undefined;
var rotateTargetY = undefined;
var myElement = document.getElementById('hammertime');
var keyboard = new THREEx.KeyboardState();
var is_touch_device = 'ontouchstart' in document.documentElement;

if (is_touch_device)
{
	console.log("Touches");
	var myElement = document.getElementById('hammertime');
	var mc = new Hammer.Manager(myElement);


	// create a pinch and rotate recognizer
	// these require 2 pointers
	var pinch = new Hammer.Pinch();
	var pan = new Hammer.Pan();
	// we want to detect both the same time


	// add to the Manager
	mc.add([pinch, pan]);

	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	//Initial Press Down
	var touchpressX;
	var touchpressY;

	var ptouchX;
	var ptouchY;
	//Current Move
	var touchX;
	var touchY;
	var touchDelta;

	var touchclientX;
	var touchclientY;


	// listen to events...

	//On Press
	mc.on("panstart", function(ev) {
		console.log(ev);
		console.log("Pan Start");

		touchX = ev.center.x;
		touchY = ev.center.y;
		//Simulate Mouse Down
		//Inital Press
		touchpressX = touchX;
		touchpressY = touchY;
		dragging = true;

	});


	//On Move
	// listen to events...
	mc.on("pan", function(ev) {
		console.log(ev);
		console.log("Pan");

	});


	//On End of Events
	mc.on("panend", function(ev) {
		console.log(ev);
		console.log("Pan End");
		//Stop Drag
		dragging = false;
	});


	mc.on("pinchout", function(ev) {
		console.log(ev);
		console.log("Pinch Out Raw: " + ev.deltaTime);
		var pandelta = 0;
		pandelta = ev.deltaTime/120;
		console.log("Pinch Out Mathed: " + pandelta);
		handleMWheel(pandelta);
	});

	//Iorn Out the Math
	mc.on("pinchin", function(ev) {
		console.log(ev);
		console.log("Pinch In Raw: " + ev.deltaTime);
		var pandelta = 0;
		pandelta = ev.deltaTime/120;
		pandelta = pandelta * -1;
		console.log("Pinch In Mathed: " + pandelta);
		handleMWheel(pandelta);
	});


	//Touch Pan Emulation
	function touchHandler(event)
{

    var touches = event.changedTouches,
        first = touches[0],
        type = "";
				console.log("Length: " + event.touches.length);
				console.log("Type: " + event.type);
         switch(event.type)
    {
        //case "touchstart": type="mousedown"; break;
        case "touchmove":  type="mousemove"; break;
        //case "touchend":   type="mouseup"; break;

        default: return;

    }


    var simulatedEvent = document.createEvent("MouseEvent");

    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);

    //event.preventDefault();
}


}

//Take in Touch Input for Pan
//Convert to Mouse and Send Event Emitter
//Place in Here


function onDocumentMouseMove( event ) {
	console.log("onDocumentMouseMove");

	pmouseX = mouseX;
	pmouseY = mouseY;
	//console.log("Window X: " + event.clientX + " - vs Mouse X: " + mouseX);
	//console.log("Window Y: " + event.clientY + " - vs Mouse Y: " + mouseY);
	// console.log(event);
	// console.log("MouseX: " + mouseX);
	// console.log("PMouseX: " + pmouseX);
	//console.log("WindowWidth: " + window.innerWidth);
	// console.log("EventX: " + event.clientX);
	mouseX = event.clientX - window.innerWidth * 0.5;
	mouseY = event.clientY - window.innerHeight * 0.5;
	// console.log("MouseX: " + mouseX);

	if(dragging){
		if(keyboard.pressed("shift") == false){

			  rotateVY += (mouseX - pmouseX) / 2 * Math.PI / 180 * 0.3;
  			rotateVX += (mouseY - pmouseY) / 2 * Math.PI / 180 * 0.3;

  		}
  		else{
  			camera.position.x -= (mouseX - pmouseX) * .5;
  			camera.position.y += (mouseY - pmouseY) * .5;
				//console.log("camera.position.x: " + camera.position.x);
				//console.log("camera.position.y: " + camera.position.y);
  		}
	}
}



function onDocumentMouseDown( event ) {
    if(event.target.className.indexOf('noMapDrag') !== -1) {
        return;
    }
		//console.log("onDocumentMouseDown");
		//Capture Initial Position on Mouse Down
    dragging = true;
    pressX = mouseX;
    pressY = mouseY;
    rotateTargetX = undefined;
    rotateTargetX = undefined;
		console.log(pressX + " " + pressY);
}

function onDocumentMouseUp( event ){
	// d3Graphs.zoomBtnMouseup();
	dragging = false;
	// histogramPressed = false;
}


function onClick( event ){
	//	make the rest not work if the event was actually a drag style click
	if( Math.abs(pressX - mouseX) > 3 || Math.abs(pressY - mouseY) > 3 )
		return;

	var pickColorIndex = getPickColor();
	//	find it
	for( var i in countryColorMap ){
		var countryCode = i;
		var countryColorIndex = countryColorMap[i];
		if( pickColorIndex == countryColorIndex ){
			// console.log("selecting code " + countryCode);
			var countryName = countryLookup[countryCode];
			// console.log("converts to " + countryName);
			if( countryName === undefined )
				return;
			if( $.inArray(countryName, selectableCountries) <= -1 )
				return;
			// console.log(countryName);
			var selection = selectionData;
			selection.selectedCountry = countryName;
			selectVisualization( timeBins, selection.selectedYear, [selection.selectedCountry], selection.getExportCategories(), selection.getImportCategories() );
			// console.log('selecting ' + countryName + ' from click');
			return;
		}
	}
}

function onKeyDown( event ){
}


function handleMWheel( delta ) {
	console.log("Mouse Wheel Delta: " + delta);
	console.log("camera.scale.z: " + camera.scale.z);
	camera.scale.z += delta * 0.1;
	camera.scale.z = constrain( camera.scale.z, 0.7, 5.0 );

}

function onMouseWheel( event ){
	var delta = 0;

	if (event.wheelDelta) { /* IE/Opera. */
	        console.log("onMouseWheel Event Delta: " + event.wheelDelta)
					delta = event.wheelDelta/120;

	}
	//	firefox
	else if( event.detail ){
		delta = -event.detail/3;
	}

	if (delta)
	console.log("onMouseWheel: " + delta);
	        handleMWheel(delta);

	event.returnValue = false;
}

function onDocumentResize(e){
}
