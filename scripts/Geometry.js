class Point
{
    constructor(x, y)
    {
        this.name = 'Point';
        this.x = x; // Should be a JS Number.
        this.y = y; // Should be a JS Number.
    }
}

class LineSegment
{
    constructor(end1, end2)
    {
        this.name = 'LineSegment';
        this.end1 = end1; // Should be a (this_file) Point.
        this.end2 = end2; // Should be a (this_file) Point.
    }
}

class Polyline
{
    constructor(points)
    {
        this.name = 'Polyline';
        this.points = points;
        // Can just do `this.points = [];`?
    }
}

class ReferenceLine
{
    // If this is ever tried to be transitioned to a 3D program,
    // I remember Solidworks had something like this
    // that - when you render this class - it shows up as an infinitely long line.
    // (So it extends as far as it can in either direction in the viewport...
    // it just has 2 points to nail down the direction that it goes).
    // It's helpful for lining things up when you're doing your digital drawing.
    
    constructor(point1, point2)
    {
        this.point1 = point1;
        this.point2 = point2;
    }
}

class Rectangle
{
    constructor(corner, diagonalCorner)
    {
        this.name = 'Rectangle';
        this.corner = corner; // Should be a (this_file) Point.
        this.diagonalCorner = diagonalCorner; // Should be a (this_file) Point.
    }
}

class Circle
{
    constructor(center, radius)
    {
        this.name = 'Circle';
        this.center = center; // Should be a (this_file) Point.
        this.radius = radius; // Should be a JS Number.
    }
}




class GeometricLine
{
    constructor(slope, intercept)
    {
        this.slope = slope; // Should be a JS Number.
        // Need to make sure, when using this -- the coordinate system.
        // (Computers usually start with the (left, top) being (0, 0).)
        // (Positive x direction is the same.)
        // (Positive y direction is down.)
        
        this.intercept = intercept; // Should be a JS Number.
        // I messed this up earlier.
        // This is where your line crosses the Y axis.
    }
    
    // Example. Im still a little sketch lealrning js syntax.
    // sayHi() {
    //     alert("Hello user. Tron awaits you.");
    // }
    
    yFrom(x)
    {
        var result = (this.slope * x) + this.intercept;
        return result;
    }
}