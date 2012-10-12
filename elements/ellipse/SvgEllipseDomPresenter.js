/**
 * @fileOverview jsgl.elements.SvgEllipseDomPresenter implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */    

/**
 * @class Scalable Vector Graphics DOM presenter for JSGL ellipse element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of jsgl.elements.SvgEllipseDomPresenter.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating SVG elements.
 * @since version 1.0
 * @version 2.0 
 */       
jsgl.elements.SvgEllipseDomPresenter=function(ownerDocument) {

  /**
   * The SVG <code>&lt;ellipse&gt;</code> element to be used for rendering.
   * @type SVGEllipseElement
   * @private
   */           
  this.svgEllipseElement=ownerDocument.createElementNS("http://www.w3.org/2000/svg","ellipse");
  
  this.attachMouseHandlers(this.svgEllipseElement);
}
jsgl.elements.SvgEllipseDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the root SVG element that is used for rendering.
 * @methodOf jsgl.elements.SvgEllipseDomPresenter#
 * @returns SVGElement
 * @since version 1.0
 * @version 2.0 
 */    
jsgl.elements.SvgEllipseDomPresenter.prototype.getXmlElement=function() {

  return this.svgEllipseElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the JSGL ellipse element associated.
 * @methodOf jsgl.elements.SvgEllipseDomPresenter#
 * @private
 * @since version 1.0
 * @version 2.0
 */   
jsgl.elements.SvgEllipseDomPresenter.prototype.update=function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var location = this.graphicsElement.getCenterLocation();

  this.svgEllipseElement.setAttribute("cx", location.X);
  this.svgEllipseElement.setAttribute("cy", location.Y);
  this.svgEllipseElement.setAttribute("rx",this.graphicsElement.getWidth()/2);
  this.svgEllipseElement.setAttribute("ry",this.graphicsElement.getHeight()/2);
  this.svgEllipseElement.setAttribute("transform","rotate("+this.graphicsElement.getRotation()
    +" "+ location.X +" "+ location.Y +")");

  this.graphicsElement.getStroke().applyToSvgElement(this.svgEllipseElement);
  this.graphicsElement.getFill().applyToSvgElement(this.svgEllipseElement);
}