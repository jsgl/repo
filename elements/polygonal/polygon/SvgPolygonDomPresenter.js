/**
 * @fileOverview <code>jsgl.elements.SvgPolygonDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @constructor
 * @version 2.0 
 */ 
jsgl.elements.SvgPolygonDomPresenter=function(ownerDocument) {

  this.svgPolygonElement=ownerDocument.createElementNS("http://www.w3.org/2000/svg","polygon");
  
  this.attachMouseHandlers(this.svgPolygonElement);
}
jsgl.elements.SvgPolygonDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

jsgl.elements.SvgPolygonDomPresenter.prototype.getXmlElement=function() {
  
  return this.svgPolygonElement;
}

jsgl.elements.SvgPolygonDomPresenter.prototype.update=function()
{
  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var pointsCount=this.graphicsElement.getPointsCount();
  
  if(pointsCount < 2) {
  
    this.svgPolygonElement.setAttribute("points","");
    return;
  }

  var pointsString=(this.graphicsElement.getPointAt(0).X)+
    ","+(this.graphicsElement.getPointAt(0).Y);
  
  for(var i=1; i<pointsCount; i++)
  {
    pointsString+=" "+(this.graphicsElement.getPointAt(i).X)+
      ","+(this.graphicsElement.getPointAt(i).Y);
  }
  
  this.svgPolygonElement.setAttribute("points", pointsString);

  this.graphicsElement.getStroke().applyToSvgElement(this.svgPolygonElement);
  this.graphicsElement.getFill().applyToSvgElement(this.svgPolygonElement);
}