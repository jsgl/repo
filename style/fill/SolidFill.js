/**
 * @fileOverview Implementation of <code>jsgl.fill.SolidFill</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Simple fill-styling API class that allows the object's interior to be
 * filled with given color and opacity.
 * @extends jsgl.fill.AbstractFill
 * @constructor
 * @description Creates new instance of the <code>jsgl.fill.SolidFill</code> class.
 * @since version 1.0
 */ 
jsgl.fill.SolidFill = function(color, opacity, enabled) {

  jsgl.fill.AbstractFill.call(this);

  /**
   * The color of the fill in HTML format.
   * @type string
   * @private
   */           
  this.color = color || "white";
  
  /**
   * The opacity of the fill. It is a real number from interval [0,1].
   * @type number
   * @private
   */      
  this.opacity = typeof(opacity) != "undefined" ? opacity : 1;
  
  /**
   * Determines whether the filling is enabled. It it is disabled, it has the
   * same effect as if <code>jsgl.fill.DISABLED</code> object was used.
   * @type boolean
   * @private
   */         
  this.enabled = typeof(enabled) != "undefined" ? !!enabled : true;
}
jsgl.fill.SolidFill.jsglExtend(jsgl.fill.AbstractFill);

/**
 * @description Applies the fill properties to a SVG element. The properties
 * are applied via CSS <code>style</code> attribute.
 * @methodOf jsgl.fill.SolidFill#
 * @param {SVGElement} svgElement The SVG element to which the fill properties
 * should be applied.
 * @since version 1.0
 */   
jsgl.fill.SolidFill.prototype.applyToSvgElement = function(svgElement) {

  if(this.enabled) {

    svgElement.style.setProperty("fill", this.color, null);
    svgElement.style.setProperty("fill-opacity", this.opacity, null);
  }
  else {

    svgElement.style.setProperty("fill", "none", null);
  }
}

/**
 * @description Applies the fill properties to a VML <code>fill</code> subelement.
 * @methodOf jsgl.fill.SolidFill#
 * @param {VmlFillElement} fillElement The VML <code>fill</code> element to
 * which the sollid fill should be applied.
 * @since version 1.0
 */   
jsgl.fill.SolidFill.prototype.applyToVmlFillElement=function(fillElement) {

  if(this.enabled) {
    fillElement.type = "solid";
    fillElement.color = this.color;
    fillElement.opacity = this.opacity;
    fillElement.on = true;
  }
  else {

    fillElement.on = false;
  }
}

/**
 * @description Gets the current color used for filling.
 * @methodOf jsgl.fill.SolidFill#
 * @returns {string}
 * @since version 1.0
 */    
jsgl.fill.SolidFill.prototype.getColor = function() {

  return this.color;
}

/**
 * @description Sets the new color to be used for filling.
 * @methodOf jsgl.fill.SolidFill#
 * @param {string} The new color in HTML format to be used.
 * @since version 1.0
 */  
jsgl.fill.SolidFill.prototype.setColor = function(newColor) {

  this.color = newColor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether the fill object is currently enabled or not.
 * @methodOf jsgl.fill.SolidFill#
 * @returns {boolean}
 * @since version 1.0
 */ 
jsgl.fill.SolidFill.prototype.getEnabled = function() {

  return this.enabled;
}

jsgl.fill.SolidFill.prototype.isEnabled = jsgl.fill.SolidFill.prototype.getEnabled;

/**
 * @description Sets whether or not to disable the fill. It the fill is
 * disabled, the result is the same as if the <code>jsgl.fill.DISABLED</code>
 * object was used, i.e. no fill will be painted.
 * @methodOf jsgl.fill.SolidFill#
 * @param {boolean} enabled If <code>true</code>, the fill will be enabled, if
 * <code>false</code>, the fill will be disabled.
 * @since version 1.0
 */  
jsgl.fill.SolidFill.prototype.setEnabled = function(enabled) {

  this.enabled = enabled;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current opacity of the fill object.
 * @methodOf jsgl.fill.SolidFill#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.fill.SolidFill.prototype.getOpacity = function() {

  return this.opacity;
}

/**
 * @descrption Sets the new opacity of the solid fill.
 * @methodOf jsgl.fill.SolidFill#
 * @param {number} newOpacity A real number from interval
 * [0,1], where 0.0 means fully transparent, 1.0 means fully opaque.
 * @since version 1.0
 */  
jsgl.fill.SolidFill.prototype.setOpacity = function(newOpacity) {

  this.opacity = newOpacity;
  this.onChangeRaiser.raiseEvent();
}
