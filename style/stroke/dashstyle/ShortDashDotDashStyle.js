/**
 * @fileOverview <code>jsgl.stroke.ShortDashDotDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Dash pattern class providing pattern of alternating short dashes and
 * dots. 
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of 
 * <code>jsgl.stroke.ShortDashDotDashStyle</code> class. Typically, calling
 * this constructor is not necessary since there is a singleton instance
 * available via <code>jsgl.DashStyles.SHORT_DASH_DOT</code>. Also, the
 * singleton instance may be obtained via the static
 * {@link jsgl.stroke.ShortDashDotDashStyle.getInstance} method. 
 * @since version 1.0
 */ 
jsgl.stroke.ShortDashDotDashStyle = function() {

}
jsgl.stroke.ShortDashDotDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.ShortDashDotDashStyle#
 * @returns {array} [2,2,0,2]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray 
 * @since version 1.0
 */
jsgl.stroke.ShortDashDotDashStyle.prototype.getDashArray = function() {

  return [2,2,0,2];
}

/**
 * @methodOf jsgl.stroke.ShortDashDotDashStyle#
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement
 * @since version 1.0
 */
jsgl.stroke.ShortDashDotDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.dashstyle = "shortdashdot";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.ShortDashDotDashStyle</code> class.
 * @methodOf jsgl.stroke.ShortDashDotDashStyle
 * @static
 * @since version 1.0
 */
jsgl.stroke.ShortDashDotDashStyle.getInstance = jsgl.util.singletonInstanceGetter;
