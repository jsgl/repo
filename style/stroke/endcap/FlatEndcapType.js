/**
 * @fileOverview <code>jsgl.stroke.FlatEndcapType</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Flat endcap type.
 * @extends jsgl.stroke.AbstractEndcapType
 * @constructor
 * @description Creates new instance of <code>jsgl.stroke.FlatEndcapType</code>
 * class. Typically, calling this constructor is not needed since there is
 * a singleton instance available via <code>jsgl.EndcapTypes.FLAT</code>. Also,
 * the singleton instance may be obtained via static
 * {@link jsgl.stroke.FlatEndcapType.getInstance} method.
 * @since version 1.0
 */
jsgl.stroke.FlatEndcapType = function() {

}
jsgl.stroke.FlatEndcapType.jsglExtend(
  jsgl.stroke.AbstractEndcapType);

/**
 * @methodOf jsgl.stroke.FlatEndcapType#
 * @see jsgl.stroke.AbstractEndcapType#applyToSvgElement
 * @since version 1.0
 */
jsgl.stroke.FlatEndcapType.prototype.applyToSvgElement = function(svgElement) {

  svgElement.style.setProperty("stroke-linecap", "butt", null);
}

/**
 * @methodOf jsgl.stroke.FlatEndcapType#
 * @see jsgl.stroke.AbstractEndcapType#applyToVmlStrokeElement
 * @since version 1.0
 */
jsgl.stroke.FlatEndcapType.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.endcap = "flat";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.FlatEndcapType</code> class.
 * @methodOf jsgl.stroke.FlatEndcapType
 * @static
 * @since version 1.0
 */
jsgl.stroke.FlatEndcapType.getInstance = jsgl.util.singletonInstanceGetter;
