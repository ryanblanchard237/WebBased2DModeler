var theCanvas;
var theContext;
var addShapeState;
var snapModeState;
var userInterfaceState;
var newShape;
var shapes;

var POINT_RADIUS;


// To eventually add snap mode...
// in the mousemove event. If the person has started drawing a shape.
// if (the cursor is close enough to an existing point (or line?))
// {
//     that's when it snaps to it.
//     For a point, you'll make the existing point and the cursor have the same (x,y) location.
//     For a line it would be I guess eh whatever figure it out later it's more complicated. (More complicated mathwise if the line is not vertical or horizontal. But can be figured out.)
// }

// Eventually down the road... could make use of the <canvas>'s
// "translate()" & "rotate()" & "scale()".

window.addEventListener('load', (e) =>
{
    theCanvas = document.getElementById('canvas1');
    canvas1.width = document.querySelector("html").clientWidth - (2 * getScrollBarThickness()); //window.innerWidth instead of html?
    canvas1.height = document.querySelector("html").clientHeight - (2 * getScrollBarThickness());  //window.innerHeight instead of html?
    // Maybe there's a better way to do this but for now this works.
    // (See my "WebProject2" stuff.)
    
    theContext = theCanvas.getContext('2d');
    
    addShapeState = new AddShapeState(); // change to JSON that's set right here maybe
    
    //addShapeState =
    //{
    //    startedAddingAPoint: false,
    //    
    //    startedAddingALineSegment: false,
    //    setLineSegmentFirstPoint: false,
    //    
    //    startedAddingAReferenceLine: false,
    //    setReferenceLineFirstPoint: false,
    //    
    //    startedAddingARectangle: false,
    //    setRectangleFirstCorner: false,
    //    
    //    startedAddingACircle: false,
    //    setCircleCenter: false
    //};
    
    //addShapeState = {
    //    startedAddingAShape: false,
    //    pointInfo: {
    //        startedAddingAPoint: false
    //    },
    //    lineSegmentInfo: {
    //        startedAddingALineSegment: false,
    //        setLineSegmentFirstPoint: false
    //    },
    //    referenceLineInfo: {
    //        startedAddingAReferenceLine: false,
    //        setReferenceLineFirstPoint: false
    //    },
    //    rectangleInfo: {
    //        startedAddingARectangle: false,
    //        setRectangleFirstCorner: false
    //    },
    //    circleInfo: {
    //        startedAddingACircle: false,
    //        setCircleCenter: false
    //    }
    //};
    
    
    
    snapModeState =
    {
        isInSnapMode: false,
        
        snapToPoints: false,
        snapToLines: false
    };
    
    userInterfaceState =
    {
        showCurrentMouseCoordinates: false
    };
    
    newShape = null;
    
    shapes = [ ];

    POINT_RADIUS = 2;
});

function getScrollBarThickness()
{
    // I did not make this function myself.
    // From: Alexandre Gomes. http://www.alexandre-gomes.com/?p=115 Code in a blog post "Get Scrollbar Size Using Javascript" on Mr. Gomes' blog.
    // (Indirectly found via https://stackoverflow.com/a/986977/6399087 .)
    
    // For some reason using "let" instead of "var" for variables in this function
    // breaks things.
    // So for now I am using "var".
    
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
    
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild (inner);
    
    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
    
    document.body.removeChild (outer);
    
    return (w1 - w2);
}





document.getElementById('addAPointButton').addEventListener('click', (e) =>
{
    this.addShapeState.startedAddingAPoint = true;
    this.addShapeState.startedAddingAShape = true;
    document.getElementById("addAPointButton").setAttribute("disabled", "true");
});

document.getElementById('addALineSegmentButton').addEventListener('click', (e) =>
{
    this.addShapeState.startedAddingALineSegment = true;
    this.addShapeState.startedAddingAShape = true;
    document.getElementById("addALineSegmentButton").setAttribute("disabled", "true");
});

document.getElementById('addAPolylineButton').addEventListener('click', (e) =>
{
    //if (this.addShapeState.finishedAddingAPolyline)
    //{
    //    // These might eventually actuallly get taken care of somewhere else,
    //    // once I finish the acutal function to add an polyoine.
    //    this.addShapeState.startedAddingAPolyline = false;
    //    this.addShapeState.startedAddingAShape = false;
    //    
    //    document.getElementById('addAPolylineButton').innerHTML = "Add a polyline.";
    //    
    //    return;
    //}
    
    if (this.addShapeState.startedAddingAPolyline == false)
    {
        this.addShapeState.startedAddingAPolyline = true;
        this.addShapeState.startedAddingAShape = true;
        // Click on the canvas to set the first point. (And keep clicking after that to keep adding points.)
        document.getElementById('addAPolylineButton').innerHTML = "Add a polyline (click here again to finish).";
        
        // Now there's kind of an intermediary state of the program, where the user keeps clicking on the canvas
        // to keep setting new points of the current polyline that's being drawn.
        //
        // In this state, the event listener for clicks on the canvas
        // handles stuff.
        //
        // The last thing that happens (for the user) as part of drawing a polyline
        // is that they click the addAPolylineButton to tell the program that they are
        // done drawing their polyline.
        // When *that* happens (when the click (for the 2nd time) the addAPolylineButton),
        // 
    }
    else
    {
        addAPolyline(e, true); // Need to figure out this part here.
        
        document.getElementById('addAPolylineButton').innerHTML = "Add a polyline.";
        this.addShapeState.startedAddingAPolyline = false;
        this.addShapeState.startedAddingAShape = false;
    }
    // I think this should be good now.
    
    //this.addShapeState.finishedAddingAPolyline = true;
    // Obviously this bit will get changed later.
    
    // Gawd really might need to rework the "addShapeState" object too. idk. it does work for now.
});

document.getElementById('addAReferenceLineButton').addEventListener('click', (e) =>
{
    this.addShapeState.startedAddingAReferenceLine = true;
    this.addShapeState.startedAddingAShape = true;
    document.getElementById("addAReferenceLineButton").setAttribute("disabled", "true");
});

document.getElementById('addARectangleButton').addEventListener('click', (e) =>
{
    this.addShapeState.startedAddingARectangle = true;
    this.addShapeState.startedAddingAShape = true;
    document.getElementById("addARectangleButton").setAttribute("disabled", "true");
});

document.getElementById('addACircleButton').addEventListener('click', (e) =>
{
    this.addShapeState.startedAddingACircle = true;
    this.addShapeState.startedAddingAShape = true;
    document.getElementById("addACircleButton").setAttribute("disabled", "true");
});

document.getElementById('showMouseCoordsCheckbox').addEventListener('change', (e) =>
{
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#examples
    
    // Also, https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event .
    //
    // "The change event is fired for <input> and <select> and <textarea> elements
    // when the user modifies the element's value."
    //
    // >> Good. "...the change event fires at a different moment:    -- when a <input type="checkbox"> element
    // is checked or unchecked *(by clicking or using the keyboard)*".
    // Helpful for what I'm trying to do.
    
    
    if (document.getElementById('showMouseCoordsCheckbox').checked)
    {
        this.userInterfaceState.showCurrentMouseCoordinates = true;
    }
    else
    {
        this.userInterfaceState.showCurrentMouseCoordinates = false;
    }
});

document.getElementById('drawingAnimationsCheckbox').addEventListener('change', (e) =>
{
    let drawingAnimationsCheckbox = document.getElementById('drawingAnimationsCheckbox');
    let theCanvas = document.getElementById('canvas1');
    
    if (drawingAnimationsCheckbox.checked)
    {
        theCanvas.addEventListener('mousemove', CANVAS_MOUSEMOVE_EVENT_FUNCTION_HERE);
    }
    else
    {
        theCanvas.removeEventListener('mousemove', CANVAS_MOUSEMOVE_EVENT_FUNCTION_HERE);
    }
});
function realtimeDraw()
{
    
}

// Maybe the button event listeners should only set variables, that indicate
// to other code that they need to like add a point or do other stuff with the geometry/shapes.



document.getElementById('canvas1').addEventListener('click', (e) =>
{
    switch (startedDrawingAShape()) {
        case 'Point':
            addAPoint(e);
            break;
        case 'LineSegment':
            addALineSegment(e);
            break;
        case 'Polyline':
            addAPolyline(e, false);
            break;
        case 'ReferenceLine':
            addAReferenceLine(e);
            break;
        case 'Rectangle':
            addARectangle(e);
            break;
        case 'Circle':
            addACircle(e);
            break;
        default:
            // And now here, this area will be entered sometimes.
            // 
            // Crap maybe the variable names/logic doesn't quite makes sense here.
            // Even though it basically works still.
            
            // Could rename the "startedDrawingAShape()" function to something
            // more like
            // "shapeThatsCurrentlyBeingDrawn()".
            break;
    }
});

function startedDrawingAShape()
{
    var shapeTheyStarted = '';

    if (this.addShapeState.startedAddingAPoint)
        shapeTheyStarted = 'Point';
    if (this.addShapeState.startedAddingALineSegment)
        shapeTheyStarted = 'LineSegment';
    if (this.addShapeState.startedAddingAPolyline)
        shapeTheyStarted = 'Polyline';
    if (this.addShapeState.startedAddingAReferenceLine)
        shapeTheyStarted = 'ReferenceLine';
    if (this.addShapeState.startedAddingARectangle)
        shapeTheyStarted = 'Rectangle';
    if (this.addShapeState.startedAddingACircle)
        shapeTheyStarted = 'Circle';

    return shapeTheyStarted;
}

document.getElementById('canvas1').addEventListener('mousemove', (e) =>
{
    if (this.userInterfaceState.showCurrentMouseCoordinates)
    {
        
    }
    
    if (this.addShapeState.startedAddingAShape)
    {
        if (this.snapModeState.isInSnapMode)
        {
            // this could be a tad involved.
            
            // 2023-01-17--2316
            // I think the best way to handle this is to add/remove a 'mousemove' event listener
            // on the canvas... adding it when the user enables snap mode,
            // removing it when the user turns off snap mode.
            // (Currently, this would work, since I'm not listening to the 'mousemove' event
            // on the canvas for anything else. (Am only listening for 'click' events.)
        }
        
    }
});





function addAPoint(mouseEvent)
{
    newShape = new Point();
    shapes.push(newShape);
    newShape.x = mouseEvent.offsetX;
    newShape.y = mouseEvent.offsetY;
    this.addShapeState.startedAddingAPoint = false;
    drawShape(newShape);
    newShape = null;
    document.getElementById("addAPointButton").removeAttribute("disabled");
    return;
}

function addALineSegment(mouseEvent)
{
    if (this.addShapeState.setLineSegmentFirstPoint == false) {
        newShape = new LineSegment();
        shapes.push(newShape);
        newShape.end1 = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        this.addShapeState.setLineSegmentFirstPoint = true;
        return;
    } else {
        newShape.end2 = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        this.addShapeState.startedAddingALineSegment = false;
        this.addShapeState.setLineSegmentFirstPoint = false;
        drawShape(newShape);
        newShape = null;
        document.getElementById("addALineSegmentButton").removeAttribute("disabled");
    }
}

function addAPolyline(mouseEvent, finishThePolyline)
{
    // Parameters:
    // 1) The mouse click event. (Or maybe just null or undefined? (That would be for the case where the polyline is being finished.))
    // 2) A boolean. Which indicates whether or not to finish drawing the polyline.
    
    
    // In the object: an array of Point's.
    
    // Add the Polyline instance when the first mouseclick happens.
    // Because I set up the event listener above to go to this function
    // when there is a mouseclick on the canvas.
    // (When the user clicks, to set the first point.)
    
    // Have this function get arguments like this?
    // addAPolyline(hmmm)
    // {
    //     And then the click it received (from me manually giving it the click... from the event listener... )...
    //     could be a
    //     -- click on the canvas. (Which would be to set a point for the polyline).
    //     -- A click on the "Polyline" button, to end the drawing of the polyline.
    //        And then you might have to do some stuff here to finish up the drawing of the polyline.
    // }
    
    
    
    // For drawing the polyline. (I.e., showing the polyline on the canvas.)
    // -- If animations are off.
    //    They click to set a polyline point.
    //    And then you draw that connecting line segment.
    // -- If animations are on.
    //    Probably the same thing as above.
    //    But you just also draw a grayer line, from the current last point of the polyline
    //      to the current position of the cursor.
    
    if (this.addShapeState.addedAPolylineInstance == false)
    {
        this.addShapeState.addedAPolylineInstance = true;
        
        this.newShape = new Polyline();
        newShape.points = [];
        newShape.points.push(new Point(mouseEvent.offsetX, mouseEvent.offsetY));
        
        this.shapes.push(newShape);
    }
    else
    {
        //newShape.points.push(new Point(mouseEvent.offsetX, mouseEvent.offsetY));
        //
        //var newPolylineSegment = new LineSegment();
        //newPolylineSegment.end2 = newShape.points.at(newShape.points.length - 1);
        //newPolylineSegment.end1 = newShape.points.at(newShape.points.length - 2);
        //
        //drawShape(newPolylineSegment);
        //
        //// ? Hmm not sure if this is quite what is needed, but screw it give it a try.
        //if (finishThePolyline)
        //{
        //    // Looking at the stuff for some of the other types of things that can be drawn...
        //    
        //    // 1) Reset the marker variables.
        //    this.addShapeState.addedAPolylineInstance = false;
        //    
        //    // 2) I've already drawn the segment of the polyline that was just added.
        //    
        //    newShape = null;
        //    
        //    // 4) For the polyline, the button to start drawing it    does not get disabled.
        //    // So I don't need to do anything with that.
        //}
        
        
        
        
        if (!finishThePolyline)
        {
            newShape.points.push(new Point(mouseEvent.offsetX, mouseEvent.offsetY));
            
            var newPolylineSegment = new LineSegment();
            newPolylineSegment.end2 = newShape.points.at(newShape.points.length - 1);
            newPolylineSegment.end1 = newShape.points.at(newShape.points.length - 2);
            
            drawShape(newPolylineSegment);
        }
        else
        {
            // Looking at the stuff for some of the other types of things that can be drawn...
            
            // 1) Reset the marker variables.
            this.addShapeState.addedAPolylineInstance = false;
            
            // 2) I've already drawn the segment of the polyline that was just added.
            
            newShape = null;
            
            // 4) For the polyline, the button to start drawing it    does not get disabled.
            // So I don't need to do anything with that.
        }
    }
}

function addAReferenceLine(mouseEvent)
{
    if (this.addShapeState.setReferenceLineFirstPoint == false) {
        newShape = new ReferenceLine();
        shapes.push(newShape);
        newShape.point1 = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        this.addShapeState.setReferenceLineFirstPoint = true;
        return;
    } else {
        newShape.point2 = new Point(mouseEvent.offsetX, mouseEvent.offsetY)
        this.addShapeState.startedAddingAReferenceLine = false;
        this.addShapeState.setReferenceLineFirstPoint = false;
        drawShape(newShape);
        newShape = null;
        document.getElementById("addAReferenceLineButton").removeAttribute("disabled");
    }
}

function addARectangle(mouseEvent)
{
    if (this.addShapeState.setRectangleFirstCorner == false) {
        newShape = new Rectangle();
        shapes.push(newShape);
            console.log("newShape = " + JSON.stringify(newShape));
        newShape.corner = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
            console.log("newShape.corner = " + JSON.stringify(newShape.corner));
        this.addShapeState.setRectangleFirstCorner = true;
        return;
    } else {
        newShape.diagonalCorner = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        console.log("newShape.diagonalCorner is " + JSON.stringify(newShape.diagonalCorner));
        this.addShapeState.startedAddingARectangle = false;
        this.addShapeState.setRectangleFirstCorner = false;
        drawShape(newShape);
        newShape = null;
        document.getElementById("addARectangleButton").removeAttribute("disabled");
    }
}

function addACircle(mouseEvent)
{
    if (this.addShapeState.setCircleCenter == false) {
        newShape = new Circle();
        shapes.push(newShape);
        newShape.center = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        this.addShapeState.setCircleCenter = true;
    } else {
        let triangleX = Math.abs(newShape.center.x - mouseEvent.offsetX);
        let triangleY = Math.abs(newShape.center.y - mouseEvent.offsetY);
        let radius = Math.sqrt(Math.pow(triangleX, 2) + Math.pow(triangleY, 2));
        newShape.radius = radius;
        this.addShapeState.startedAddingACircle = false;
        this.addShapeState.setCircleCenter = false;
        drawShape(newShape);
        newShape = null;
        document.getElementById("addACircleButton").removeAttribute("disabled");
    }
}



function drawShape(shape)
{
    if (shape.constructor.name == "Point") {
        theContext.beginPath();
        theContext.arc(shape.x, shape.y, POINT_RADIUS, 0, 2*Math.PI);
        theContext.fill();
    }
    if (shape.constructor.name == "LineSegment"){
        //drawShape(shape.end1);
        //drawShape(shape.end2);
        // If you want the line segment to have bigger endpoints, like endpoints more than
        // what <canvas> provides with the built-in line (the built-in line has no especially pronounced endpoints),
        // then leave this part (the above two "drawShape()" things) in.
        
        theContext.beginPath();
        theContext.moveTo(shape.end1.x, shape.end1.y);
        theContext.lineTo(shape.end2.x, shape.end2.y);
        theContext.stroke();
    }
    if (shape.constructor.name == "ReferenceLine") {
        console.log("Still need to to do the math to draw a ReferenceLine.");
    }
    if (shape.constructor.name == "Rectangle"){
        theContext.beginPath();
        theContext.rect(shape.corner.x, shape.corner.y,  shape.diagonalCorner.x - shape.corner.x, shape.diagonalCorner.y - shape.corner.y);
        theContext.stroke();
    }
    if (shape.constructor.name == "Circle"){
        theContext.beginPath();
        theContext.arc(shape.center.x, shape.center.y,  shape.radius,  0, 2*Math.PI);
        theContext.stroke();
    }
}

function drawReferenceLine(refline)
{
    
}