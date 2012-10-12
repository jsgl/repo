/**
 * @fileOverview Implementation of <code>jsgl.elements.SvgGroupDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Purely SVG-based DOM presenter for JSGL group element.
 * @private 
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.SvgGroupDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating SVG elements.
 * @since version 2.0 
 */
jsgl.elements.SvgGroupDomPresenter = function(ownerDocument) {
  
  /**
   * The SVG <code>&lt;g&gt;</code> element for grouping other elements.
   * @type SVGGElement
   * @private
   */      
  this.svgGroupElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");

  this.attachMouseHandlers(this.svgGroupElement);
}
jsgl.elements.SvgGroupDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;g&gt;</code> element that is used for
 * grouping the subelements in DOM tree.
 * @methodOf jsgl.elements.SvgGroupDomPresenter#
 * @returns {SVGGElement}
 * @since version 2.0
 */  
jsgl.elements.SvgGroupDomPresenter.prototype.getXmlElement = function() {

  return this.svgGroupElement;
}

/**
 * @description Updates the contents of rendering SVG accoring to the state
 * of the API group element associated.
 * @methodOf jsgl.elements.SvgGroupDomPresenter#
 * @since version 2.0
 */   
jsgl.elements.SvgGroupDomPresenter.prototype.update = function() {
  
  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);  
  
  var location = this.graphicsElement.getLocation();
  this.svgGroupElement.setAttribute("transform","translate("+location.X+","+location.Y+")");
}