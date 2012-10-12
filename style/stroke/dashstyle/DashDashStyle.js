/**
 * @fileOverview <code>jsgl.stroke.DashDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Short dashes dash pattern class.
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of <code>jsgl.stroke.DashDashStyle</code>
 * class. Typically, calling this constructor is not necessary since there is
 * a singleton instance available via <code>jsgl.DashStyles.DASH</code>.
 * Also, the singleton instance may be obtained via the static
 * {@link jsgl.stroke.DashDashStyle.getInstance} method. 
 * @since version 1.0
 */
jsgl.stroke.DashDashStyle = function() {

}
jsgl.stroke.DashDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.DashDashStyle#
 * @returns {array} [3,4]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray
 * @since version 1.0 
 */ 
jsgl.stroke.DashDashStyle.prototype.getDashArray = function() {

  return [3,4];
}

/**
 * @methodOf jsgl.stroke.DashDashStyle#
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement 
 * @since version 1.0
 */   
jsgl.stroke.DashDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.dashstyle = "dash";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.DashDashStyle</code> class.
 * @methodOf jsgl.stroke.DashDashStyle 
 * @static
 * @since version 1.0
 */
jsgl.stroke.DashDashStyle.getInstance = jsgl.util.singletonInstanceGetter;