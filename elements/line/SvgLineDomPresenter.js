/**
 * @fileOverview <code>jsgl.elements.SvgLineDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 * @version 2.0 
 */

/**
 * @class Scalable Vector Graphics DOM presenter for the API line element. 
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.SvgLineDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating SVG elements. 
 * @since version 1.0 
 * @version 2.0
 */  
jsgl.elements.SvgLineDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);

  /**
   * The SVG <code>&lt;line&gt;</code> element to be used for rendering.
   * @type SVGLineElement
   * @private
   */         
  this.svgLineElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg","line");

  this.attachMouseHandlers(this.svgLineElement);
}
jsgl.elements.SvgLineDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;element&gt;</code> that is used for
 * rendering. 
 * @methodOf jsgl.elements.SvgLineDomPresenter#
 * @returns {SVGLineElement} 
 * @since version 1.0
 * @version 2.0
 */   
jsgl.elements.SvgLineDomPresenter.prototype.getXmlElement = function() {

  return this.svgLineElement;
}

/**
 * @description Updates the rendering SVG in accordance with the state of the
 * API line element associated.
 * @methodOf jsgl.elements.SvgLineDomPresenter#  
 * @since version 1.0
 * @version 2.0
 */
jsgl.elements.SvgLineDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);
  
  this.svgLineElement.setAttribute("x1", this.graphicsElement.getStartX());
  this.svgLineElement.setAttribute("y1", this.graphicsElement.getStartY());
  this.svgLineElement.setAttribute("x2", this.graphicsElement.getEndX());
  this.svgLineElement.setAttribute("y2", this.graphicsElement.getEndY());
  
  this.graphicsElement.getStroke().applyToSvgElement(this.svgLineElement);
}