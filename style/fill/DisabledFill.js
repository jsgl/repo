/**
 * @fileOverview Implementation of <code>jsgl.fill.DisabledFill</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class A trivial fill-styling API class that does nothing but disabling the
 * fill completely.
 * @extends jsgl.fill.AbstractFill 
 * @constructor
 * @description Creates new instance of the <code>jsgl.fill.DisabledFill</code>   
 * class. Typically, it is not needed since a singleton instance is always
 * accessible via <code>jsgl.fill.DISABLED</code>.
 * @since version 1.0
 */    
jsgl.fill.DisabledFill = function() {

  jsgl.fill.AbstractFill.call(this);
}
jsgl.fill.DisabledFill.jsglExtend(jsgl.fill.AbstractFill);

/**
 * A singleton instance of the <code>jsgl.fill.DisabledFill</code> class.
 * @type jsgl.fill.DisabledFill
 * @static
 */
jsgl.fill.DISABLED = new jsgl.fill.DisabledFill();

/**
 * @description Turns the fill off for the given SVG element.
 * @methodOf jsgl.fill.DisabledFill#
 * @param {SVGElement} svgElement The SVG element whose filling should be
 * disabled.
 * @since version 1.0
 */   
jsgl.fill.DisabledFill.prototype.applyToSvgElement = function(svgElement) {

  svgElement.style.setProperty("fill", "none", null);
}

/**
 * @description Turns the filling off for the given VML <code>fill</code>
 * subelement.
 * @methodOf jsgl.fill.DisabledFill#
 * @param {VmlFillElement} fillElement The VML <code>fill</code> element that
 * should be set as disabled.
 * @since version 1.0
 */   
jsgl.fill.DisabledFill.prototype.applyToVmlFillElement = function(fillElement) {

  fillElement.on = false;
}