/**
 * @fileOverview Implementation of <code>jsgl.stroke.SolidStroke</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class General outline-styling API class. Allows outline to be painted with
 * specific weight, color, opacity, dash style, endcap type and join style.
 * @extends jsgl.stroke.AbstractStroke#
 * @constructor
 * @description Creates new instance of the <code>jsgl.stroke.SolidStroke</code>
 * class.
 * @since version 1.0
 * @version 2.0 
 */
jsgl.stroke.SolidStroke = function() {

  jsgl.stroke.AbstractStroke.call(this);

  /**
   * The weight (width) of the stroke in pixels.
   * @type number
   * @private
   */      
  this.weight = 1;

  /**
   * The color of the stroke in HTML format.
   * @type string
   * @private
   */      
  this.color = "black";
  
  /**
   * The opacity of the stroke. This is a real number from interval [0,1].
   * @type number
   * @private
   */      
  this.opacity = 1;

  /**
   * Determines whether or not the outline rendering is enabled or not. If it is
   * disabled, the result is the same as if the <code>jsgl.stroke.DISABLED</code>
   * object was used.
   * @type boolean
   * @private
   */                 
  this.enabled = true;

  /**
   * The dash style defining object to be used by the stroke object. It
   * controls the dash pattern of the outline.      
   * @type jsgl.stroke.AbstractDashStyle
   * @private
   */         
  this.dashStyle = new jsgl.stroke.SolidDashStyle();
  
  /**
   * The endcap type defining object to be used by the stroke object.
   * @type jsgl.stroke.AbstractEndcapType
   * @private
   */   
  this.endcapType = new jsgl.stroke.RoundEndcapType();
  
  /**
   * The join style type defining object to be used by the stroke object.
   * @type jsgl.stroke.AbstractJoinStyle
   * @private
   */
  this.joinStyle = new jsgl.stroke.RoundJoinStyle();
}
jsgl.stroke.SolidStroke.jsglExtend(jsgl.stroke.AbstractStroke);

/**
 * @description Applies the stroke properties to a SVG elements. The properties
 * are applied via CSS <code>style</code> attribute.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {SVGElement} svgElement The SVG element to which the stroke properties
 * will be applied.
 * @since version 1.0
 */   
jsgl.stroke.SolidStroke.prototype.applyToSvgElement = function(svgElement) {

  if(this.enabled) {

    svgElement.style.setProperty("stroke", this.color, null);
    svgElement.style.setProperty("stroke-width", this.weight+"px", null);
    svgElement.style.setProperty("stroke-opacity", this.opacity, null);
    this.dashStyle.applyToSvgElement(svgElement, this.weight);
    this.endcapType.applyToSvgElement(svgElement);
    this.joinStyle.applyToSvgElement(svgElement);
  }
  else {

    svgElement.style.setProperty("stroke", "none", null);
  }
}

/**
 * @description Applies the stroke properties to a VML <code>stroke</code>
 * subelement.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {VmlStrokeElement} strokeElement The VML <code>stroke</code> element
 * to which properties of the stroke will be applied.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.applyToVmlStrokeElement = function(strokeElement) {

  if(this.enabled) {

    strokeElement.color = this.color;
    strokeElement.weight = this.weight+"px";
    strokeElement.opacity = this.opacity;
    strokeElement.on = true;
    this.dashStyle.applyToVmlStrokeElement(strokeElement);
    this.endcapType.applyToVmlStrokeElement(strokeElement);
    this.joinStyle.applyToVmlStrokeElement(strokeElement);
  }
  else {

    strokeElement.on = false;
  }
}

/**
 * @description Gets the current weight (i.e. width) of the stroke in pixels.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.stroke.SolidStroke.prototype.getWeight = function() {

  return this.weight;
}

/**
 * @description Sets the new weight (i.e. width) of the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {number} newWeight A real number that the new stroke weight will be
 * set to.
 * @since version 1.0
 */   
jsgl.stroke.SolidStroke.prototype.setWeight = function(newWeight) {

  this.weight = newWeight;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current color of the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.stroke.SolidStroke.prototype.getColor = function() {

  return this.color;
}

/**
 * @description Sets the new color of the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {string} newColor The new color of the stroke in CSS format.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.setColor = function(newColor) {

  this.color = newColor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current opacity of the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {number}
 * @since version 1.0
 */
jsgl.stroke.SolidStroke.prototype.getOpacity = function() {

  return this.opacity;
}

/**
 * @description Sets the new opacity of the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {number} newOpacity A real number from interval [0,1], where 0.0 means
 * fully transparent, 1.0 means fully opaque.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.setOpacity = function(newOpacity) {

  this.opacity = newOpacity;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the dash style object currently used by the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {jsgl.stroke.AbstractDashStyle} The dash style object currently used.
 * @since version 1.0
 */    
jsgl.stroke.SolidStroke.prototype.getDashStyle = function() {

  return this.dashStyle;
}

/**
 * @description Sets the new dash style specifying object to be used by the
 * stroke. The dash style object controls the pattern of dashes and gaps used
 * by the stroke paths. Singleton dash styles from <code>jsgl.DashStyles</code>
 * enumeration can be used.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {jsgl.stroke.AbstractDashStyle} dashStyle The new dash style object.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.setDashStyle = function(dashStyle) {

  this.dashStyle = dashStyle;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the endcap type object currently used by the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {jsgl.stroke.AbstractEndcapType} The endcap type object currently
 * used. 
 * @since version 1.0
 */     
jsgl.stroke.SolidStroke.prototype.getEndcapType = function() {

  return this.endcapType;
}

/**
 * @description Sets the new endcap type specifying object to be used by the
 * stroke. The endcap type object specifies the shape to be used at the end of
 * open subpaths when they are stroked. Singleton endcap types from
 * <code>jsgl.EndcapTypes</code> enumeration can be used.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {jsgl.stroke.AbstractEndcapType} endcapType The new encap type object.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.setEndcapType = function(endcapType) {

  this.endcapType = endcapType;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Get the join style object currently used by the stroke.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {jsgl.stroke.AbstractJoinStyle} The join style object currently
 * used.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.getJoinStyle = function() {

  return this.joinStyle;
}

/**
 * @description Sets the new join style specifying object to be used for the
 * stroke. The join style object specifies the shape to be used at the corners
 * of paths or basic shapes when they are stroked. Singleton join styles from
 * <code>jsgl.JoinStyles</code> enumeration can be used.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {jsgl.stroke.AbstractJoinStyle} joinStyle The new join style object.
 * @since version 1.0
 */  
jsgl.stroke.SolidStroke.prototype.setJoinStyle = function(joinStyle) {

  this.joinStyle = joinStyle;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether the stroke is currently enabled or not.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {boolean} <code>true</code> if the stroke is enabled,
 * <code>false</code> if it is disabled.
 * @since version 1.0
 * @deprecated 
 */  
jsgl.stroke.SolidStroke.prototype.getEnabled = function() {

  return this.enabled;
}

jsgl.stroke.SolidStroke.prototype.isEnabled = jsgl.stroke.SolidStroke.prototype.getEnabled;

/**
 * @description Determines whether the stroke is currently enabled or not.
 * @methodOf jsgl.stroke.SolidStroke#
 * @returns {boolean} <code>true</code> if the stroke is enabled,
 * <code>false</code> if it is disabled.
 * @since version 2.0
 */
jsgl.stroke.SolidStroke.prototype.isEnabled = function() {

  return this.enabled;
}

/**
 * @description Sets whether or not to enable the stroke. If the stroke is
 * disabled, the result is the same as if the <code>jsgl.stroke.DISABLED</code>
 * object was used, i.e. no stroke will be painted.
 * @methodOf jsgl.stroke.SolidStroke#
 * @param {boolean} enabled If <code>true</code>, the stroke will be enabled,
 * if <code>false</code>, the stroke will be disabled.
 * @since version 1.0
 */   
jsgl.stroke.SolidStroke.prototype.setEnabled = function(enabled) {

  this.enabled = enabled;
  this.onChangeRaiser.raiseEvent();
}
