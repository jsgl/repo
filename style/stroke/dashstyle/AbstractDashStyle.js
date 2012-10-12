/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.stroke.AbstractDashStyle</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Base class for dash pattern controlling classes for
 * <code>jsgl.style.SolidStroke</code>. All the inheriting provide some pattern
 * of dashes and gaps used to stroke paths. To achieve compatibility of VML,
 * only finite number of dash patterns (represented by individual inheriting
 * classes) is available.
 * @since version 1.0
 */ 
jsgl.stroke.AbstractDashStyle = function() {

}

/**
 * @description Gets the array for the dashes and gaps pattern to be used by
 * the stroke.
 * @methodOf jsgl.stroke.AbstractDashStyle#
 * @returns {array} Array of numbers coding the dashed and gaps pattern. The
 * sizes are relative to the weight of the stroke.
 * @abstract 
 * @since version 1.0
 */
jsgl.stroke.AbstractDashStyle.prototype.getDashArray = function() {

  throw "not implemented";
}

/**
 * @description Applies the dash style pattern to a SVG element. This is done
 * via CSS <code>stroke-dasharray</code> property of the element. For SVG, this
 * method is the same for all the inheriting classes -- it only uses the
 * implementation of abstract <code>getDashArray</code> method.
 * @methodOf jsgl.stroke.AbstractDashStyle#
 * @param {SVGElement} svgElement The SVG element to which the dash style will
 * be applied.
 * @param {number} strokeWeight Current weight of the stroke. Because the dash
 * patterns (following VML) are relative to the weight of the stroke, the weight
 * must be provided for convertion to absolutely-measured dash patterns in SVG.
 * @since version 1.0
 */   
jsgl.stroke.AbstractDashStyle.prototype.applyToSvgElement = function(svgElement, strokeWeight) {

  var dashArray = this.getDashArray();
  for(var i=0; i<dashArray.length; i++) {
  
    dashArray[i] *= strokeWeight;

    if(!dashArray[i]) {
      // bugfix for browsers that do not support zero-length dashes
      dashArray[i] += 1e-2;
    }
  }

  svgElement.style.setProperty("stroke-dasharray", dashArray.join(), null)
}

/**
 * @description Applies the dash style pattern to a VML <code>stroke</code>
 * subelement. Every subclass provides a valid VML dash style name.
 * @methodOf jsgl.stroke.AbstractDashStyle#
 * @param {VmlStrokeElement} strokeElement The VML <code>stroke</code> element
 * to which the dash style will be applied.
 * @abstract  
 * @since version 1.0
 */   
jsgl.stroke.AbstractDashStyle.prototype.applyToVmlStrokeElement = function(strokeElement) {

  throw "not implemented";
}