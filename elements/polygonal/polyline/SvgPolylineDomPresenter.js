/**
 * @fileOverview <code>jsgl.elements.SvgPolylineDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Scalable Vector Graphics DOM presenter for JSGL polyline element.
 * @extends jsgl.elements.AbstractDomPresenter   
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.SvgPolylineDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating SVG elements. 
 * @version 2.0 
 */    
jsgl.elements.SvgPolylineDomPresenter=function(ownerDocument) {

  /**
   * The SVG <code>&lt;polyline&gt;</code> element.
   * @type SVGPolylineElement
   * @private
   */         
  this.svgPolylineElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg","polyline");
  this.svgPolylineElement.style.setProperty("fill","none",null);

  this.attachMouseHandlers(this.svgPolylineElement);
}
jsgl.elements.SvgPolylineDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;polyline&gt;</code> element that is used
 * for rendering. 
 * @methodOf jsgl.elements.SvgPolylineDomPresenter#
 * @returns {SVGPolylineElement} 
 * @since version 1.0
 * @version 2.0
 */
jsgl.elements.SvgPolylineDomPresenter.prototype.getXmlElement = function() {

  return this.svgPolylineElement;
}

/**
 * @description Updates the rendering SVG according to the state of the API
 * polyline element associated. 
 * @methodOf jsgl.elements.SvgPolylineDomPresenter# 
 * @since version 1.0
 * @version 2.0  
 */ 
jsgl.elements.SvgPolylineDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var pointsCount=this.graphicsElement.getPointsCount();
  
  if(pointsCount == 0) {
    this.svgPolylineElement.setAttribute("points","");
    return;
  }
  
  var pointsString=(this.graphicsElement.getPointAt(0).X)+
    ","+(this.graphicsElement.getPointAt(0).Y);
  
  for(var i=1; i<pointsCount; i++)
  {
    pointsString+=" "+(this.graphicsElement.getPointAt(i).X)+
      ","+(this.graphicsElement.getPointAt(i).Y);
  }
  
  this.svgPolylineElement.setAttribute("points", pointsString);

  this.graphicsElement.getStroke().applyToSvgElement(this.svgPolylineElement);
}