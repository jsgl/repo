/**
 * @fileOverview <code>jsgl.stroke.SolidDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Dash patterns class providing solid line with no gaps.
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of 
 * <code>jsgl.stroke.SolidDashStyle</code> class. Typically, calling this
 * constructor is not necessary since there is a singleton instance available
 * via <code>jsgl.DashStyles.SOLID</code>. Also, the singleton instance may be
 * obtained via the static {@link jsgl.stroke.SolidDashStyle.getInstance} method. 
 * @since version 1.0
 */ 
jsgl.stroke.SolidDashStyle = function() {

}
jsgl.stroke.SolidDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.SolidDashStyle#
 * @returns {array} [Number.POSITIVE_INFINITY]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray 
 * @since version 1.0
 */
jsgl.stroke.SolidDashStyle.prototype.getDashArray = function() {

  return [Number.POSITIVE_INFINITY];
}

/**
 * @description Overrides {@link jsgl.stroke.AbstractDashStyle#applyToSvgElement}
 * method in order to deal with disabled dash pattern (solid line only).
 * @methodOf jsgl.stroke.SolidDashStyle#
 * @param {SVGElement} svgElement The SVG element on which dash patterns for
 * outline painting will be disabled.
 * @since version 1.0
 */
jsgl.stroke.SolidDashStyle.prototype.applyToSvgElement = function(svgElement) {

  svgElement.style.setProperty("stroke-dasharray", "none", null);
}

/**
 * @methodOf jsgl.stroke.SolidDashStyle#
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement
 * @since version 1.0
 */
jsgl.stroke.SolidDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement)
{
  strokeElement.dashstyle = "solid";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.SolidDashStyle</code> class.
 * @methodOf jsgl.stroke.SolidDashStyle
 * @static
 * @since version 1.0
 */
jsgl.stroke.SolidDashStyle.getInstance = jsgl.util.singletonInstanceGetter;