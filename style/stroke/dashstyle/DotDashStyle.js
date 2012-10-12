/**
 * @fileOverview <code>jsgl.stroke.DotDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Dash pattern class providing simple pattern of dots.
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of <code>jsgl.stroke.DotDashStyle</code>
 * class. Typically, calling this constructor is not necessary since there is
 * a singleton instance available via <code>jsgl.DashStyles.DOT</code>.
 * Also, the singleton instance may be obtained via the static
 * {@link jsgl.stroke.DashDashStyle.getInstance} method.  
 * @since version 1.0
 */
jsgl.stroke.DotDashStyle = function() {

}
jsgl.stroke.DotDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.DotDashStyle
 * @returns {array} [0,4]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray 
 * @since version 1.0
 */  
jsgl.stroke.DotDashStyle.prototype.getDashArray = function() {

  return [0, 4];
}

/**
 * @methodOf jsgl.stroke.DotDashStyle
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement  
 * @since version 1.0
 */  
jsgl.stroke.DotDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.dashstyle = "dot";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.DotDashStyle</code> class.
 * @methodOf jsgl.stroke.DotDashStyle 
 * @static
 * @since version 1.0
 */
jsgl.stroke.DotDashStyle.getInstance = jsgl.util.singletonInstanceGetter;
