/**
 * @fileOverview <code>jsgl.stroke.RoundEndcapType</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Round endcap type.
 * @extends jsgl.stroke.AbstractEndcapType
 * @constructor
 * @description Creates new instance of <code>jsgl.stroke.RoundEndcapType</code>
 * class. Typically, calling this constructor is not needed since there is
 * a singleton instance available via <code>jsgl.EndcapTypes.ROUND</code>. Also,
 * the singleton instance may be obtained via static
 * {@link jsgl.stroke.RoundEndcapType.getInstance} method.
 * @since version 1.0
 */  
jsgl.stroke.RoundEndcapType = function() {

}
jsgl.stroke.RoundEndcapType.jsglExtend(
  jsgl.stroke.AbstractEndcapType);

/**
 * @methodOf jsgl.stroke.RoundEndcapType#
 * @see jsgl.stroke.AbstractEndcapType#applyToSvgElement
 * @since version 1.0
 */   
jsgl.stroke.RoundEndcapType.prototype.applyToSvgElement = function(svgElement) {

  svgElement.style.setProperty("stroke-linecap", "round", null);
}

/**
 * @methodOf jsgl.stroke.RoundEndcapType#
 * @see jsgl.stroke.AbstractEndcapType#applyToVmlStrokeElement
 * @since version 1.0
 */
jsgl.stroke.RoundEndcapType.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.endcap = "round";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.RoundEndcapType</code> class.
 * @methodOf jsgl.stroke.RoundEndcapType
 * @static
 * @since version 1.0
 */
jsgl.stroke.RoundEndcapType.getInstance = jsgl.util.singletonInstanceGetter;
