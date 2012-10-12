/**
 * @fileOvervire <code>jsgl.stroke.LongDashDotDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Dash pattern class providing pattern of alternating long dashes and
 * dots.
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.stroke.LongDashDotDashStyle</code> class. Typically, calling this
 * constructor is not necessary since there is a singleton instance available
 * via <code>jsgl.DashStyles.LONG_DASH_DOT</code>. Also, the singleton instance
 * may be obtained via the static
 * {@link jsgl.stroke.LongDashDotDashStyle.getInstance} method. 
 * @since version 1.0
 */
jsgl.stroke.LongDashDotDashStyle = function() {

}
jsgl.stroke.LongDashDotDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.LongDashDotDashStyle#
 * @returns {array} [7,4,0,4]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray 
 * @since version 1.0
 */  
jsgl.stroke.LongDashDotDashStyle.prototype.getDashArray = function() {

  return [7,4,0,4];
}

/**
 * @methodOf jsgl.stroke.LongDashDotDashStyle#
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement  
 * @since version 1.0 
 */  
jsgl.stroke.LongDashDotDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.dashstyle = "longdashdot";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.LongDashDotDashStyle</code> class.
 * @methodOf jsgl.stroke.LongDashDotDashStyle
 * @static
 * @since version 1.0
 */
jsgl.stroke.LongDashDotDashStyle.getInstance = jsgl.util.singletonInstanceGetter;
