/**
 * @fileOverview Implementation of <code>jsgl.stroke.DisabledStroke</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */    

/**
 * @class A trivial stroke-styling API class that does notning but disabling the
 * stroke completely.
 * @extends jsgl.stroke.AbstractStroke
 * @constructor
 * @description Creates new instance of the <code>jsgl.stroke.DisabledStroke</code>
 * class. Typically, this is not needed since a singleton instance is always
 * accessible via <code>jsgl.stroke.DISABLED</code>.
 * @since version 1.0
 * @version 2.0 
 */ 
jsgl.stroke.DisabledStroke = function() {

  jsgl.stroke.AbstractStroke.call(this);
}
jsgl.stroke.DisabledStroke.jsglExtend(jsgl.stroke.AbstractStroke);

/**
 * A singleton instance of the <code>jsgl.stroke.DisabledStoke</code> class.
 * @type jsgl.stroke.DisabledStroke
 * @static
 */   
jsgl.stroke.DISABLED = new jsgl.stroke.DisabledStroke();

/**
 * @description Turns off the stroke for the given SVG element.
 * @methodOf jsgl.stroke.DisabledStroke#
 * @param {SVGElement} svgElement The SVG elements whose outline-painting
 * should be disabled.
 * @since version 1.0
 */   
jsgl.stroke.DisabledStroke.prototype.applyToSvgElement = function(svgElement) {

  svgElement.style.setProperty("stroke", "none", null);
}

/**
 * @description Turns off the stroke via given VML <code>&lt;stroke&gt;</code>
 * subelement.
 * @methodOf jsgl.stroke.DisabledStroke#
 * @param {VmlStrokeElement} strokeElement The VML <code>&lt;stroke&gt;</code>
 * subelement that should be set as disabled.
 * @since version 1.0  
 */
jsgl.stroke.DisabledStroke.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.on = false;
}