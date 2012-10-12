/**
 * @fileOverview <code>jsgl.stroke.SquareEndcapType</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Square endcap type.
 * @extends jsgl.stroke.AbstractEndcapType
 * @constructor
 * @description Creates new instance of <code>jsgl.stroke.SquareEndcapType</code>
 * class. Typically, calling this constructor is not needed since there is
 * a singleton instance available via <code>jsgl.EndcapTypes.SQUARE</code>.
 * Also, the singleton instance may be obtained via static
 * {@link jsgl.stroke.SquareEndcapType.getInstance} method.
 * @since version 1.0
 */
jsgl.stroke.SquareEndcapType = function() {

}
jsgl.stroke.SquareEndcapType.jsglExtend(
  jsgl.stroke.AbstractEndcapType);

/**
 * @methodOf jsgl.stroke.SquareEndcapType#
 * @see jsgl.stroke.AbstractEndcapType#applyToSvgElement
 * @since version 1.0
 */
jsgl.stroke.SquareEndcapType.prototype.applyToSvgElement = function(svgElement) {

  svgElement.style.setProperty("stroke-linecap", "square", null);
}

/**
 * @methodOf jsgl.stroke.SquareEndcapType#
 * @see jsgl.stroke.AbstractEndcapType#applyToVmlStrokeElement
 * @since version 1.0
 */
jsgl.stroke.SquareEndcapType.prototype.applyToVmlStrokeElement = function(strokeElement) {

  strokeElement.endcap = "square";
}

/**
 * @description Gets a singleton instance of the
 * <code>jsgl.stroke.SquareEndcapType</code> class.
 * @methodOf jsgl.stroke.SquareEndcapType
 * @static
 * @since version 1.0
 */
jsgl.stroke.SquareEndcapType.getInstance = jsgl.util.singletonInstanceGetter;
