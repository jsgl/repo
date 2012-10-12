/**
 * @fileOverview <code>jsgl.stroke.DashDotDashStyle</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Dash pattern class providing alternating short dashes and dots.
 * @extends jsgl.stroke.AbstractDashStyle
 * @constructor
 * @description Creates new instance of <code>jsgl.stroke.DashDotDashStyle</code>
 * class. Typically, calling this constructor is not necessary since there is
 * a singleton instance available via <code>jsgl.DashStyles.DASH_DOT</code>.
 * Also, the singleton instance may be obtained via static
 * {@link jsgl.stroke.DashDotDashStyle.getInstance} method.
 * @since version 1.0
 */
jsgl.stroke.DashDotDashStyle = function() {

}
jsgl.stroke.DashDotDashStyle.jsglExtend(
  jsgl.stroke.AbstractDashStyle);

/**
 * @methodOf jsgl.stroke.DashDotDashStyle
 * @returns {array} [3,4,0,4]
 * @see jsgl.stroke.AbstractDashStyle#getDashArray  
 * @since version 1.0 
 */   
jsgl.stroke.DashDotDashStyle.prototype.getDashArray = function() {

  return [3,4,0,4];
}

/**
 * @methodOf jsgl.stroke.DashDotDashStyle
 * @see jsgl.stroke.AbstractDashStyle#applyToVmlStrokeElement   
 * @since version 1.0
 */  
jsgl.stroke.DashDotDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.dashstyle = "dashdot";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.DashDotDashStyle</code> class.
 * @methodOf jsgl.stroke.DashDotDashStyle
 * @static
 * @since version 1.0    
 */ 
jsgl.stroke.DashDotDashStyle.getInstance = jsgl.util.singletonInstanceGetter;
