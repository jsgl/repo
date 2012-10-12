/**
 * @fileOverview <code>jsgl.elements.SvgRectangleDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Scalable Vector Graphics DOM presenter for the API rectangle element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.SvgRectangleDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating SVG elements.
 * @since version 2.0
 */   
jsgl.elements.SvgRectangleDomPresenter = function(ownerDocument) {

  /**
   * The SVG <code>&lt;rect&gt;</code> element to be used for rendering.
   * @type SVGRectElement
   * @private
   */
  this.svgRectElement = ownerDocument.createElementNS(
    "http://www.w3.org/2000/svg", "rect");

  this.attachMouseHandlers(this.svgRectElement);         
}
jsgl.elements.SvgRectangleDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;rect&gt;</code> element that is used for
 * rendering.
 * @methodOf jsgl.elements.SvgRectangleDomPresenter#
 * @returns SVGRectElement
 * @since version 2.0
 */
jsgl.elements.SvgRectangleDomPresenter.prototype.getXmlElement = function() {

  return this.svgRectElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the API rectangle element associated.
 * @methodOf jsgl.elements.SvgRectangleDomPresenter#
 * @private
 * @since version 2.0
 */
jsgl.elements.SvgRectangleDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);
  
  var location = this.graphicsElement.getLocation(),
      size = this.graphicsElement.getSize(),
      radii = this.graphicsElement.getRadii();
  
  var x,y;

  switch(this.graphicsElement.getHorizontalAnchor()) {
  
    case jsgl.HorizontalAnchor.LEFT:
    
      x = location.X;
      break;
    
    case jsgl.HorizontalAnchor.CENTER:
    
      x = location.X - size.X / 2;
      break;
    
    case jsgl.HorizontalAnchor.RIGHT:
    
      x = location.X - size.X;
      break;
  }
  
  switch(this.graphicsElement.getVerticalAnchor()) {
  
    case jsgl.VerticalAnchor.TOP:
    
      y = location.Y;
      break;
    
    case jsgl.VerticalAnchor.MIDDLE:
    
      y = location.Y - size.Y / 2;
      break;
    
    case jsgl.VerticalAnchor.BOTTOM:
    
      y = location.Y - size.Y;
      break;
  }

  this.svgRectElement.setAttribute("x", x);
  this.svgRectElement.setAttribute("y", y);
  
  this.svgRectElement.setAttribute("width", size.X);
  this.svgRectElement.setAttribute("height", size.Y);
  this.svgRectElement.setAttribute("rx", radii.X);
  this.svgRectElement.setAttribute("ry", radii.Y);

  this.svgRectElement.setAttribute("transform",
    "rotate(" + this.graphicsElement.getRotation() +
    "," + location.X + "," + location.Y + ")");

  this.graphicsElement.getStroke().applyToSvgElement(this.svgRectElement);
  this.graphicsElement.getFill().applyToSvgElement(this.svgRectElement);
}