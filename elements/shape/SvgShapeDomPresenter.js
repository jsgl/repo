/**
 * @fileOverview Implementation of <code>jsgl.elements.SvgShapeDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 2.0
 */   

/**
 * @class Scalable Vector Graphics DOM presenter for JSGL shape element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates an instance of
 * <code>jsgl.elements.SvgShapeDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating SVG elements.
 * @since version 2.0
 */   
jsgl.elements.SvgShapeDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);

  /**
   * The SVG <code>&lt;path&gt;</code> element to be used for rendering.
   * @type SVGPathElement
   * @private
   */          
  this.svgPathElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg", "path");
  this.svgPathElement.style.setProperty('fill-rule', 'evenodd', null);
  
  this.attachMouseHandlers(this.svgPathElement);
}
jsgl.elements.SvgShapeDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;path&gt;</code> element that is used for
 * rendering the shape.
 * @methodOf jsgl.elements.SvgShapeDomPresenter#
 * @returns {SVGPathElement}
 * @since version 2.0
 */    
jsgl.elements.SvgShapeDomPresenter.prototype.getXmlElement = function() {

  return this.svgPathElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the JSGL shape element associated.
 * @methodOf jsgl.elements.SvgShapeDomPresenter#  
 * @private
 * @since version 1.0
 * @version 2.0
 */ 
jsgl.elements.SvgShapeDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);
  
  var pathStr = "";
  
  var pathSize = this.graphicsElement.getPathSize();
  
  for(var i=0; i<pathSize; i++) {

    pathStr += this.graphicsElement.getPathSegmentAt(i).toSvgCommand();
  }
  
  this.svgPathElement.setAttribute("d", pathStr);
  
  this.graphicsElement.getStroke().applyToSvgElement(this.svgPathElement);
  this.graphicsElement.getFill().applyToSvgElement(this.svgPathElement);
}