/**
 * @fileOverview Declaration and implementation of API
 * <code>jsgl.elements.RectangleElement</code> class.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Rectangle element API class. It allows to draw rectangles with various
 * eventual features such as rounded corners or rotation arount the anchor point.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new <code>jsgl.elements.RectangleElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter Appropriate
 * rectangle-rendering DOM presenter for the user's browser.
 * @since version 2.0
 */
jsgl.elements.RectangleElement = function(domPresenter, panel) {

  jsgl.elements.AbstractElement.call(this, panel);
  
  /**
   * Location of the anchor point of the rectangle.
   * @type jsgl.Vector2D
   * @private
   */
  this.location = new jsgl.Vector2D();
  
  /**
   * Size vector of the rectangle. The X-coordinate of the vector represent width,
   * while the Y-coordinate represents height. Note that the rectangle of this
   * proportions may be further rotated.
   * @type jsgl.Vector2D
   * @private
   */
  this.size = new jsgl.Vector2D();
  
  /**
   * Horizontal anchor of the rectangle. It specifies the X-component of the
   * anchor to which rectangle location is related and around which the
   * rectangle rotates.
   * @type jsgl.HorizontalAnchor
   * @private
   */
  this.horizontalAnchor = jsgl.HorizontalAnchor.LEFT;           
  
  /**
   * Vertical anchor of the rectangle. It specifies the Y-component of the
   * anchor to which rectangle location is related and around which the
   * rectangle rotates.
   * @type jsgl.VerticalAnchor
   * @private
   */               
  this.verticalAnchor = jsgl.VerticalAnchor.TOP;             

  /**
   * Clockwise rotation in degrees of the rectangle around its anchor point.
   * @type number
   * @private
   */
  this.rotation = 0;
  
  /**
   * Rounding radii vector for the rectangle's corners. The radii are in pixels.   
   * @type jsgl.Vector2D
   * @private
   */
  this.roundingRadii = new jsgl.Vector2D();

  /**
   * The function listening to changes in the associated stroke object.
   * @type function
   * @private
   */      
  this.strokeChangeListener = jsgl.util.delegate(
    this.onChangeRaiser, this.onChangeRaiser.raiseEvent);
  
  /**
   * The function listening to changes in the associated fill object.
   * @type function
   * @private
   */           
  this.fillChangeListener = jsgl.util.delegate(
    this.onChangeRaiser, this.onChangeRaiser.raiseEvent);

  /**
   * Stroke object specifying style of the rectangle's outline.
   * @type jsgl.stroke.AbstractStroke
   * @private
   */           
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());

  /**
   * Fill object specifying style of the rectangle's interior.
   * @type jsgl.fill.AbstractFill
   * @private
   */         
  this.fill = null;
  this.setFill(new jsgl.fill.SolidFill());
  

  /**
   * The DOM presenter that is used for rendering the rectangle.
   * @type jsgl.elements.AbstractDomPresenter
   * @private
   */
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.RectangleElement.jsglExtend(
  jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the rectangle.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.elements.AbstractDomPresenter}
 * @since version 2.0
 */  
jsgl.elements.RectangleElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Get the current X-coordinate of the rectangle's anchor point.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.getX = function() {

  return this.location.X;
}

/**
 * @description Sets the X-coordinate of the rectangle's anchor point.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newX Real number representing the new X-coordinate of
 * the rectangle's anchor point.
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.setX = function(newX) {

  this.location.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the rectangle's anchor point.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */    
jsgl.elements.RectangleElement.prototype.getY = function() {

  return this.location.Y;
}

/**
 * @description Sets the Y-coordinate of the rectangle's anchor point.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newY Real number representing the new Y-coordinate of
 * the rectangle's anchor point.
 * @since version 2.0
 */   
jsgl.elements.RectangleElement.prototype.setY = function(newY) {

  this.location.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the location of the rectangle's anchor point.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */    
jsgl.elements.RectangleElement.prototype.getLocation = function() {

  return jsgl.cloneObject(this.location);
}

/**
 * @description Sets the coordinates of the rectangle's anchor point using
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {jsgl.Vector2D} newLocation The new coordinates of the anchor point.
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.setLocation = function(newLocation) {

  this.location = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new coordinates of the rectangle's anchor point using
 * couple of real numbers.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * anchor point.
 * @param {number} newY Real number representing the new Y-coordinate of the
 * anchor point.
 * @since version 2.0
 */   
jsgl.elements.RectangleElement.prototype.setLocationXY = function(newX, newY) {

  this.location.X=newX;
  this.location.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current width of the rectangle in pixels.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */         
jsgl.elements.RectangleElement.prototype.getWidth = function() {

  return this.size.X;
}

/**
 * @description Sets new width of the rectangle.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newWidth Real number representing the new width of the
 * rectangle in pixels.
 * @since version 2.0
 */  
jsgl.elements.RectangleElement.prototype.setWidth = function(newWidth) {

  this.size.X=newWidth;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current height of the rectangle in pixels.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */       
jsgl.elements.RectangleElement.prototype.getHeight = function() {

  return this.size.Y;
}

/**
 * @description Sets the current height of the rectangle.
 * @param {number} newHeight Real number representing the new height of the
 * rectangle.
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.setHeight = function(newHeight) {

  this.size.Y=newHeight;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current size of the rectangle as <code>jsgl.Vector2D</code>.
 * The X-coordinate of the vector represents the current width of the rectangle,
 * whilst the Y-coordinate codes the current height.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */   
jsgl.elements.RectangleElement.prototype.getSize = function() {

  return jsgl.cloneObject(this.size);
}

/**
 * @description Sets the size of the rectangle using <code>jsgl.Vector2D</code>
 * object. The X-coordinate of the vector is interpreted as width, whilts the
 * Y-coordinate as height. 
 * @methodOf jsgl.elements.RectangleElement#
 * @param {jsgl.Vector2D} newSize The new size vector for the rectangle.
 * @since version 2.0
 */ 
jsgl.elements.RectangleElement.prototype.setSize = function(newSize) {

  this.size = jsgl.cloneObject(newSize);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the size (Width and Height) of the rectangle using couple
 * of real numbers.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newW Real number representing the new width of the rectangle
 * in pixels. 
 * @param {number} newH Real number representing the new height of the rectangle
 * in pixels. 
 * @since version 2.0
 */      
jsgl.elements.RectangleElement.prototype.setSizeWH = function(newW, newH) {
  
  this.size.X=newW;
  this.size.Y=newH;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current clockwise rotation of the rectangle around its
 * anchor point in degrees.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.getRotation = function() {

  return this.rotation;
}

/**
 * @description Sets the clockwise rotation of the rectangle around its anchor
 * point in degrees.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} rotation Real number representing the new rotation in degrees.
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.setRotation = function(rotation) {

  this.rotation = rotation;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current horizontal anchor of the rectangle.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.HorizontalAnchor}
 * @since version 2.0
 */    
jsgl.elements.RectangleElement.prototype.getHorizontalAnchor = function() {

  return this.horizontalAnchor;
}

/**
 * @description Sets the new horizontal anchor of the rectangle. This influences how
 * the rectangle is horizontally positioned with respect to its anchor point.
 * This also affects how the rectangle is rotated around the anchor point.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {jsgl.HorizontalAnchor} horAnchor The new horizontal anchor of the
 * rectangle. 
 * @since version 2.0
 */  
jsgl.elements.RectangleElement.prototype.setHorizontalAnchor = function(horAnchor) {

  this.horizontalAnchor = horAnchor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current vertical anchor of the rectangle.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.VerticalAnchor}
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.getVerticalAnchor = function() {

  return this.verticalAnchor;
}

/**
 * @description Sets the vertical anchor of the rectangle. This influences how
 * the rectangle is vertically positioned with respect to its anchor point. This
 * also affects how the rectangle is rotated around the anchor point.
 * @methodOf jsgl.elements.RectangleElement# 
 * @param {jsgl.VerticalAnchor} vertAnchor The new vertical anchor of the
 * rectangle.
 * @since version 2.0
 */ 
jsgl.elements.RectangleElement.prototype.setVerticalAnchor = function(vertAnchor) {

  this.verticalAnchor = vertAnchor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current X-axis radius of the ellipse used to round off
 * the corners of the rectangle.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.getXRadius = function() {

  return this.roundingRadii.X;
}

/**
 * @description Sets the new X-axis radius for the ellipse used to round off
 * the corners of the rectangle. If this value is set to zero, corners will not
 * be rounded.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newXRadius The new X-axis radius for corner rounding in pixels.
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.setXRadius = function(newXRadius) {

  this.roundingRadii.X = newXRadius;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current y-axis radius of the ellipse used to round off
 * the corners of the rectangle.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.getYRadius = function() {

  return this.roundingRadii.Y;
}

/**
 * @description Sets the new y-axis radius for the ellipse used to round off
 * the corners of the rectangle. If this value is set to zero, corners will not
 * be rounded.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newYRadius The new y-axis radius for corner rounding in pixels.
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.setYRadius = function(newYRadius) {

  this.roundingRadii.Y = newYRadius;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the x- and y-axis radii of the ellipse used to round off
 * the corners of the rectangle. <code>jsgl.Vector2D</code> object specifying
 * the radii is returned. 
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.getRadii = function() {

  return jsgl.cloneObject(this.roundingRadii);
}

/**
 * @description Sets the new X- and Y-axis radii for the ellipse used to round
 * off the corners of the rectangle. <code>jsgl.Vector2D</code> object
 * specifying the radii is required.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {jsgl.Vector2D} newRadii The new radii vector.
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.setRadii = function(newRadii) {

  this.roundingRadii = jsgl.cloneObject(newRadii);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new X- and Y-axis radii for rounding corners using
 * couple real-numbers.
 * @methodOf jsgl.elements.RectangleElement#
 * @param {number} newXRadius The new X-axis radius for corner rounding in pixels.
 * @param {number} newYRadius The new X-axis radius for corner rounding in pixels.
 * @since version 2.0
 */
jsgl.elements.RectangleElement.prototype.setRadiiXY = function(newXRadius, newYRadius) {

  this.roundingRadii.X = newXRadius;
  this.roundingRadii.Y = newYRadius;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current stroke object that is used for rendering
 * rectangle's outline.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 2.0   
 */
jsgl.elements.RectangleElement.prototype.getStroke=function() {

  return this.stroke;
}

/**
 * @description Sets the stroke object to be applied for rendering rectangle's
 * outline. The rectangle element will be listening to changes in the stroke
 * object and repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.RectangleElement#
 * @param {jsgl.stroke.AbstractStroke} stroke The stroke object to be associated
 * with the rectangle element.
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.setStroke=function(stroke) {

  if(this.stroke) {
  
    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }
  
  this.stroke=stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the current fill object that is used for rendering rectangle's
 * interior.
 * @methodOf jsgl.elements.RectangleElement#
 * @returns {jsgl.fill.AbstractFill}
 * @since version 2.0
 */    
jsgl.elements.RectangleElement.prototype.getFill=function() {

  return this.fill;
}

/**
 * @description Sets the new fill object to be applied for rendering rectangle's
 * interior. The rectangle element will be listening to the changes in the fill
 * object and repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.RectangleElement#
 * @param {jsgl.fill.AbstractFill} fill The fill object to be associated with
 * the rectangle element.
 * @since version 2.0
 */     
jsgl.elements.RectangleElement.prototype.setFill=function(fill) {

  if(this.fill) {

    this.fill.unregisterChangeListener(this.fillChangeListener);
  }

  this.fill=fill;
  this.fill.registerChangeListener(this.fillChangeListener);
  this.onChangeRaiser.raiseEvent();
}