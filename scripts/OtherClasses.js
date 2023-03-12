class AddShapeState
{
    constructor()
    {
        this.startedAddingAShape = false;
        
        
        
        this.startedAddingAPoint = false;
        
        this.startedAddingALineSegment = false;
        this.setLineSegmentFirstPoint = false;
        
        this.startedAddingAPolyline = false;
        this.addedAPolylineInstance = false;
        this.finishedAddingAPolyline = false;
        
        this.startedAddingAReferenceLine = false;
        this.setReferenceLineFirstPoint = false;
        
        this.startedAddingARectangle = false;
        this.setRectangleFirstCorner = false;
        
        this.startedAddingACircle = false;
        this.setCircleCenter = false;
    }
}

class ProgrammaticMouseEvent
{
    constructor(offsetX, offsetY)
    {
        this.name = 'ProgrammaticMouseEvent';
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
}