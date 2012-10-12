/**
 * @fileOverview <code>jsgl.stroke.AbstractEndcapType</code> declaration.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Base class for endcap type controlling classes for
 * <code>jsgl.stroke.SolidStroke</code>. The endcap type specifies the shape to
 * be used at the end of open subpaths when they are stroked. There are three
 * inheriting classes:
 * <ul> 
 * <li>{@link jsgl.stroke.RoundEndcapType} for round endcap,</li>
 * <li>{@link jsgl.stroke.FlatEndcapType} for flat endcap,</li>
 * <li>{@link jsgl.stroke.SquareEndcaoType} for square endcap.</li>  
 * </ul>
 * All the inheriting classes must be able to specify the endcap for both the
 * VML and SVG elements.
 * @since version 1.0    
 */
jsgl.stroke.AbstractEndcapType = function() {

}

/**
 * @description Applies the endcap type to a SVG element. This is done via CSS
 * <code>stroke-linecap</code> property.
 * @methodOf jsgl.stroke.AbstractEndcapType#
 * @param {SVGElement} svgElement The SVG element to which the endcap type will
 * be applied.
 * @abstract 
 * @since version 1.0
 */    
jsgl.stroke.AbstractEndcapType.prototype.applyToSvgElement = function(svgElement) {

  throw "not implemented";
}

/**
 * @description Applies the endcap type to a VML stroke subelement. This is done
 * via its <code>endcap</code> attribute.
 * @methodOf jsgl.stroke.AbstractEndcapType#
 * @param {VmlStrokeElement} strokeElement The VML stroke element to which the
 * endcap will be applied.
 * @abstract
 * @since version 1.0   
 */ 
jsgl.stroke.AbstractEndcapType.prototype.applyToVmlStrokeElement = function(strokeElement) {

  throw "not implemented";
}