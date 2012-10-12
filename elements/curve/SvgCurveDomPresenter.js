/**
 * @fileOverview <code>jsgl.elements.SvgCurveDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Scalable Vector Graphics DOM presenter for the API curve element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.SvgCurveDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating SVG elements.
 * @since version 2.0
 */
jsgl.elements.SvgCurveDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);

  /**
   * The SVG <code>&lt;path&gt;</code> element to be used for rendering the
   * curve.
   * @type SVGPathElement
   * @private
   */
  this.svgPathElement = ownerDocument.createElementNS(
    "http://www.w3.org/2000/svg", "path");
  
  this.attachMouseHandlers(this.svgPathElement);         
}
jsgl.elements.SvgCurveDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;path&gt;</code> element that is used for
 * rendering the curve.
 * @methodOf jsgl.elements.SvgCurveDomPresenter#
 * @returns {SVGPathElement}
 * @since version 2.0
 */    
jsgl.elements.SvgCurveDomPresenter.prototype.getXmlElement = function() {

  return this.svgPathElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the API curve element associated.
 * @methodOf jsgl.elements.SvgCurveDomPresenter#
 * @since version 2.0
 */
jsgl.elements.SvgCurveDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);
  
  this.svgPathElement.setAttribute("d",
    "M" + this.graphicsElement.getStartX() +
    "," + this.graphicsElement.getStartY() +
    "C" + this.graphicsElement.getControl1X() +
    "," + this.graphicsElement.getControl1Y() +
    "," + this.graphicsElement.getControl2X() +
    "," + this.graphicsElement.getControl2Y() +
    "," + this.graphicsElement.getEndX() +
    "," + this.graphicsElement.getEndY());
  
  this.graphicsElement.getStroke().applyToSvgElement(this.svgPathElement);
  this.graphicsElement.getFill().applyToSvgElement(this.svgPathElement);
}