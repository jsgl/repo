/**
 * @fileOverview <code>jsgl.stroke.LongDashDotDotDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Dash pattern class providing pattern of alternating long dashes
 * followed by two dots.
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of 
 * <code>jsgl.stroke.LongDashDotDotDashStyle</code> class. Typically, calling
 * this constructor is not necessary since there is a singleton instance available
 * via <code>jsgl.DashStyles.LONG_DASH_DOT_DOT</code>. Also, the singleton
 * instance may be obtained via the static
 * {@link jsgl.stroke.LongDashDotDotDashStyle.getInstance} method. 
 * @since version 1.0
 */ 
jsgl.stroke.LongDashDotDotDashStyle = function() {

}
jsgl.stroke.LongDashDotDotDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.LongDashDotDotDashStyle#
 * @returns {array} [7,4,0,4,0,4]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray 
 * @since version 1.0
 */  
jsgl.stroke.LongDashDotDotDashStyle.prototype.getDashArray = function() {

  return [7,4,0,4,0,4];
}

/**
 * @methodOf jsgl.stroke.LongDashDotDotDashStyle#
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement
 * @since version 1.0
 */
jsgl.stroke.LongDashDotDotDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.dashstyle = "longdashdotdot";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.LongDashDotDotDashStyle</code> class.
 * @methodOf jsgl.stroke.LongDashDotDotDashStyle
 * @static
 * @since version 1.0
 */
jsgl.stroke.LongDashDotDotDashStyle.getInstance = jsgl.util.singletonInstanceGetter;
