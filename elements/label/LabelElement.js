/**
 * @fileOverview Declaration and implementation of JSGL API
 * <code>jsgl.elements.LabelElement</code> class.
 * @author Tomas Rehorek
 * @since version 1.0  
 * @version 2.0
 */

/**
 * @class Label element API class. It allows simple text labels to be drawn.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.LabelElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter Appropriate DOM
 * presenter for rendering the label element on the user's browser.
 * @param {jsgl.Panel} panel The factory <code>jsgl.Panel</code> object that
 * is creating the image. Note that no other object than <code>jsgl.Panel</code>
 * should call this constructor.
 * @since version 1.0
 * @version 2.0
 */   
jsgl.elements.LabelElement=function(domPresenter, panel, x,y,text,zIndex) {

  jsgl.elements.AbstractElement.call(this, panel, zIndex);
  
  /**
   * Location of the anchor point of the label.
   * @type jsgl.Vector2D
   * @private
   */           
  this.location=new jsgl.Vector2D(x,y);
  
  /**
   * The string displayed by the label.
   * @type string
   * @private
   */           
  this.text=text || "";
  
  /**
   * The CSS font-family of the label.
   * @type string
   * @private
   */           
  this.fontFamily = "sans-serif";
  
  /**
   * The font size of the label in pixels.
   * @type number
   * @private
   */           
  this.fontSize = 12;
  
  /**
   * The HTML color of the label.
   * @type string
   * @private
   */           
  this.fontColor = "black";
  
  /**
   * Determines whether or not the label is underlined.
   * @type boolean
   * @private
   */           
  this.underlined = false;
  
  /**
   * Determines whether or not the label has a line above it or not.
   * @type boolean
   * @private
   */           
  this.overlined = false;
  
  /**
   * Determines whether or not the label is struck-through.
   * @type boolean
   * @private
   */         
  this.struckThrough = false;
  
  /**
   * Determines whether the weight of the label is bold or not.
   * @type boolean
   * @private
   */       
  this.bold = false;
  
  /**
   * Determines whether the font style of the label is italic or not.
   * @type boolean
   * @private
   */           
  this.italic = false;
  
  /**
   * Horizontal anchor of the label. It specifies the X-component of the anchor
   * to which location of the label is related.
   * @type jsgl.HorizontalAnchor
   * @private
   */             
  this.horizontalAnchor = jsgl.HorizontalAnchor.LEFT;
  
  /**
   * Vertical anchor of the label. It specifies the Y-component of the anchor
   * to which location of the label is related.
   * @type jsgl.VerticalAnchor
   * @private
   */              
  this.verticalAnchor = jsgl.VerticalAnchor.TOP;
  
  /**
   * Opacity of the label.
   * @type number
   * @private
   * @since version 2.0
   */
  this.opacity = 1.0;              
  
  /**
   * The DOM presenter that is used for rendering the label on the user's browser.
   * @type jsgl.elements.AbstractDomPresenter
   * @private
   */
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.LabelElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the label.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {jsgl.elements.AbstractDomPresenter}
 * @since version 1.0
 */     
jsgl.elements.LabelElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Gets the X-axis coordinate of the label's anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {number}
 * @since version 1.0
 */ 
jsgl.elements.LabelElement.prototype.getX = function() {

  return this.location.X;
}

/**
 * @description Sets the X-axis coordinate of the label's anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * label's anchor point.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setX = function(newX) {

  this.location.X=newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the Y-axis coordinate of the label's anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getY = function() {

  return this.location.Y;
}

/**
 * @description Sets the Y-axis coordinate of the label's anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @param {number} newY Real number representing the new Y-coordinate of the
 * label's anchor point.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setY = function(newY) {

  this.location.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the location of the label's anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {jsgl.Vector2D}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getLocation = function() {

  return jsgl.cloneObject(this.location);
}

/**
 * @description Sets the location of the label's anchor point using
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.LabelElement#
 * @param {jsgl.Vector2D} newLocation The new coordinates of the anchor point.
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.setLocation = function(newLocation) {

  this.setLocationXY(newLocation.X, newLocation.Y);
}

/**
 * @description Sets the location of the label's anchor point using couple
 * of real-valued coordinates (X and Y).
 * @methodOf jsgl.elements.LabelElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * label's anchor point.
 * @param {number} newY Real number representing the new Y-coordinate of the
 * label's anchor point.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setLocationXY = function(newX, newY) {

  this.location.X = newX;
  this.location.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current horizontal anchor of the label.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {jsgl.HorizontalAnchor}
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.getHorizontalAnchor = function() {

  return this.horizontalAnchor;
}

/**
 * @description Sets the horizontal anchor of the label. This allows the label
 * to be aligned left, center, or right to its anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @param {jsgl.HorizontalAnchor} horizontalAnchor The new horizontal anchor
 * of the label.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setHorizontalAnchor = function(horizontalAnchor) {

  this.horizontalAnchor = horizontalAnchor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current vertical anchor of the label.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {jsgl.VerticalAnchor}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getVerticalAnchor = function() {

  return this.verticalAnchor;
}

/**
 * @description Sets the vertical anchor of the label. This allows the label
 * to be aligned top, middle, or bottom to its anchor point.
 * @methodOf jsgl.elements.LabelElement#
 * @param {jsgl.VerticalAnchor} verticalAnchor the new vertical anchor of the
 * label.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setVerticalAnchor = function(verticalAnchor) {

  this.verticalAnchor = verticalAnchor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the string currently displayed by the label.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {string}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getText = function() {

  return this.text;
}

/**
 * @description Sets the new string to be displayed by the label.
 * @methodOf jsgl.elements.LabelElement#
 * @param {string} newText The new string to be displayed.
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.setText = function(newText) {

  this.text = newText;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current CSS font-family string for the label.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {string}
 * @since version 1.0
 */     
jsgl.elements.LabelElement.prototype.getFontFamily = function() {

  return this.fontFamily;
}

/**
 * @description Sets the new CSS font-family string for the label.
 * @methodOf jsgl.elements.LabelElement#
 * @param {string} fontFamily The new CSS font-family.
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.setFontFamily = function(fontFamily) {

  this.fontFamily = fontFamily;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current font size of the label in pixels.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getFontSize = function() {

  return this.fontSize;
}

/**
 * @description Sets the new font size of the label in pixels.
 * @methodOf jsgl.elements.LabelElement#
 * @param {number} fontSize Real number representing the new font size of the 
 * label in pixels.
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.setFontSize = function(fontSize) {

  this.fontSize = fontSize;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current CSS color of the label's font.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {string}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getFontColor = function() {

  return this.fontColor;
}

/**
 * @description Sets the new color of the label's font in the CSS color format.
 * @methodOf jsgl.elements.LabelElement#
 * @param {string} fontColor The new font color for the label's font to be used.
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.setFontColor = function(fontColor) {

  this.fontColor = fontColor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether or not the label is currently underlined.
 * @methodOf jsgl.elements.LabelElement#
 * @returns boolean
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.getUnderlined = function() {

  return this.underlined;
}

jsgl.elements.LabelElement.prototype.isUnderlined = jsgl.elements.LabelElement.prototype.getUnderlined;

/**
 * @description Sets whether or not the label should be underlined.
 * @methodOf jsgl.elements.LabelElement#
 * @param {boolean} underlined Boolean value that turns the underlining
 * on or off.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setUnderlined = function(underlined) {

  this.underlined = underlined;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether the label is currently overlined or not.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {boolean}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getOverlined = function() {

  return this.overlined;
}

jsgl.elements.LabelElement.prototype.isOverlined = jsgl.elements.LabelElement.prototype.getOverlined;

/**
 * @description Sets whether or not the label should be overlined or not. Setting
 * overlining true causes the label to have line above it.
 * @methodOf jsgl.elements.LabelElement#
 * @param {boolean} overlined Boolean value that turns the overlining
 * on or off.
 * @since version 1.0
 */     
jsgl.elements.LabelElement.prototype.setOverlined = function(overlined) {

  this.overlined = overlined;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether the label is currently struck-through or not.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {boolean}
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.getStruckThrough = function() {

  return this.struckThrough;
}

jsgl.elements.LabelElement.prototype.isStruckThrough = jsgl.elements.LabelElement.prototype.getStruckThrough;

/**
 * @description Sets whether or not the label should be struck-through or not.
 * Setting this true causes the label to have line that crosses it.
 * @methodOf jsgl.elements.LabelElement#
 * @param {boolean} struckThrough Boolean value that turns the strikethrough
 * on or off.
 * @since version 1.0
 */   
jsgl.elements.LabelElement.prototype.setStruckThrough = function(struckThrough) {

  this.struckThrough = struckThrough;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether the font weight of the label is currently bold.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {boolean}
 * @since version 1.0
 */    
jsgl.elements.LabelElement.prototype.getBold=function() {

  return this.bold;
}

jsgl.elements.LabelElement.prototype.isBold = jsgl.elements.LabelElement.prototype.getBold();

/**
 * @description Sets whether or not the font weight of the label should be bold.
 * @methodOf jsgl.elements.LabelElement#
 * @param {boolean} bold Boolean value telling whether or not use bold font.
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.setBold = function(bold) {

  this.bold = bold;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Determines whether the font style of the label is currently
 * italics.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {boolean}
 * @since version 1.0
 */     
jsgl.elements.LabelElement.prototype.getItalics = function() {
  return this.italics;
}

jsgl.elements.LabelElement.prototype.isItalics = jsgl.elements.LabelElement.getItalics;

/**
 * @description Sets whether or not the font style of the label should be
 * italics.
 * @methodOf jsgl.elements.LabelElement#
 * @param {boolean} italics Boolean value telling whether or not use italics font.
 * @since version 1.0
 */  
jsgl.elements.LabelElement.prototype.setItalics = function(italics) {

  this.italics = italics;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current opacity of the label.
 * @methodOf jsgl.elements.LabelElement#
 * @returns {number} The current opacity.
 * @since version 2.0
 */    
jsgl.elements.LabelElement.prototype.getOpacity = function() {

  return this.opacity;
}

/**
 * @description Sets the opacity of the label.
 * @methodOf jsgl.elements.LabelElement#
 * @param {number} opacity The new opacity.
 * @since version 2.0
 */
jsgl.elements.LabelElement.prototype.setOpacity = function(opacity) {
  
  this.opacity = opacity;
  this.onChangeRaiser.raiseEvent();
}    