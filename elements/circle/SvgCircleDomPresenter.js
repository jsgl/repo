/**
 * @fileOverview <code>jsgl.elements.SvgCircleDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */
 
/**
 * @class Scalable Vector Graphics DOM presenter for JSGL circle element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor  
 * @description Creates new instance of <code>jsgl.elements.SvgCircleDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating SVG elements. 
 * @since version 1.0
 * @version 2.0 
 */
jsgl.elements.SvgCircleDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);

  /**
   * The SVG <code>&lt;circle&gt;</code> element to be used for rendering.
   * @type SVGCircleElement
   * @private
   */           
  this.svgCircleElement = ownerDocument.createElementNS(
    "http://www.w3.org/2000/svg", "circle");
  
  this.attachMouseHandlers(this.svgCircleElement);
}
jsgl.elements.SvgCircleDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the root SVG element that is used for rendering.
 * @methodOf jsgl.elements.SvgCircleDomPresenter#
 * @returns SVGCircleElement
 * @since version 1.0
 * @version 2.0 
 */   
jsgl.elements.SvgCircleDomPresenter.prototype.getXmlElement = function() {

  return this.svgCircleElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the JSGL circle element associated.
 * @methodOf jsgl.elements.SvgCircleDomPresenter#  
 * @private
 * @since version 1.0
 * @version 2.0
 */ 
jsgl.elements.SvgCircleDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var location = this.graphicsElement.getCenterLocation(),
      radius = this.graphicsElement.getRadius();

  this.svgCircleElement.setAttribute("cx", location.X);
  this.svgCircleElement.setAttribute("cy", location.Y);
  this.svgCircleElement.setAttribute("r", radius);

  this.graphicsElement.getStroke().applyToSvgElement(this.svgCircleElement);
  this.graphicsElement.getFill().applyToSvgElement(this.svgCircleElement);
}