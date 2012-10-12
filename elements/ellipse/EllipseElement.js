/**
 * @fileOverview Declaration and implementation of JSGL API
 * <code>jsgl.elements.EllipseElement</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */    

/**
 * @class Ellipse element API class.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new <code>jsgl.elements.EllipseElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter Appropriate
 * ellipse-rendering DOM presenter for user's browser.
 * @param {jsgl.Panel} panel The factory <code>jsgl.Panel</code> object that
 * creates the ellipse.
 * @since version 1.0
 */ 
jsgl.elements.EllipseElement = function(domPresenter, panel) {

  jsgl.elements.AbstractElement.call(this, panel);
  
  /**
   * Location of the centre point of the ellipse.
   * @type jsgl.Vector2D
   * @private
   */           
  this.centerLocation = new jsgl.Vector2D();
  
  /**
   * Size vector of the ellipse. The X-coordinate of the vector represents witdh,
   * whilst the Y-coordinate represents height. Note that the ellipse of this
   * proportions may be further rotated.
   * @type jsgl.Vector2D
   * @private
   */                    
  this.size = new jsgl.Vector2D();
  
  /**
   * Clockwise rotation of the ellipse in degrees.
   * @type number
   * @private
   */         
  this.rotation = 0;

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
   * Stroke object specifying style of ellipse's outline.
   * @type jsgl.elements.AbstractStroke
   * @private
   */           
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());
  
  /**
   * Fill object specifying style of ellipse's interior.
   * @type jsgl.elements.AbstractFill
   * @private
   */           
  this.fill = null;
  this.setFill(new jsgl.fill.SolidFill());

  /**
   * The DOM presenter that is used for rendering the ellipse on the user's
   * browser.
   * @type jsgl.elements.AbstractEllipseDomPresenter
   * @private
   */              
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.EllipseElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the ellipse.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {jsgl.elements.AbstractDomPresenter}
 * @since version 1.0
 */     
jsgl.elements.EllipseElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Gets the current X-coordinate of the ellipse's center location.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.EllipseElement.prototype.getCenterX = function() {

  return this.centerLocation.X;
}

/**
 * @description Sets the X-coordinate of the ellipse's center location.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {number} x A real number that the X-coordinate will be set to. 
 * @since version 1.0
 */    
jsgl.elements.EllipseElement.prototype.setCenterX = function(newX) {

  this.centerLocation.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the ellipse's center location.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.EllipseElement.prototype.getCenterY = function() {

  return this.centerLocation.Y;
}

/**
 * @description Sets the Y-coordinate of the ellipse's center location.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {number} y A real number that the Y-coordinate will be set to.
 * @since version 1.0
 */    
jsgl.elements.EllipseElement.prototype.setCenterY = function(newY) {

  this.centerLocation.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the ellipse's center as
 * <code>jsgl.Vector2D</code>.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {jsgl.Vector2D}
 * @since version 1.0
 */
jsgl.elements.EllipseElement.prototype.getCenterLocation = function() {

  return jsgl.cloneObject(this.centerLocation);
}

/**
 * @description Sets the ellipse's center location to a given
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {jsgl.Vector2D} location The location that the ellipse's center will
 * be moved to.
 * @since version 1.0
 */    
jsgl.elements.EllipseElement.prototype.setCenterLocation = function(location) {

  this.centerLocation = jsgl.cloneObject(location);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the center location of the ellipse to a given couple of
 * real-valued coordinates.
 * @methodOf jsgl.elements.EllipseElement# 
 * @param {number} x A real number that the X-coordinate will be set to.
 * @param {number} y A real number that the Y-coordinate will be set to.
 * @since version 1.0
 */   
jsgl.elements.EllipseElement.prototype.setCenterLocationXY = function(x, y) {

  this.centerLocation.X = x;
  this.centerLocation.Y = y;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current width of the ellipse. If the ellipse is rotated,
 * then this is the width before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {number}
 * @since version 1.0
 */  
jsgl.elements.EllipseElement.prototype.getWidth = function() {

  return this.size.X;
}

/**
 * @description Sets the width of the ellipse. If the ellipse is rotated, this
 * is the width before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {number} width A non-negative real number representing the new
 * width.
 * @since version 1.0
 */      
jsgl.elements.EllipseElement.prototype.setWidth = function(width) {

  this.size.X = width;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current height of the ellipse. If the ellipse is
 * rotated, then this is the height before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {number}
 * @since version 1.0
 */     
jsgl.elements.EllipseElement.prototype.getHeight = function() {

  return this.size.Y;
}

/**
 * @description Sets the height of the ellipse. If the ellipse is rotated, this
 * is the height before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {number} height A non-negative real number representing the new height.
 * @since version 1.0
 */     
jsgl.elements.EllipseElement.prototype.setHeight = function(height) {

  this.size.Y = height;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current size of the ellipse as <code>jsgl.Vector2D</code>
 * object. The X-coordinate of the object means width, while the Y-coordinate
 * means height. If the ellipse is rotated, this is the size before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {jsgl.Vector2D}
 * @since version 1.0
 */      
jsgl.elements.EllipseElement.prototype.getSize = function() {

  return jsgl.cloneObject(this.size);
}

/**
 * @description Sets the size of the ellipse to a given <code>jsgl.Vector2D</code>
 * object. The X-coordinate of the object means width, while the Y-coordinate
 * means height. If the ellipse is rotated, this is the size before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {jsgl.Vector2D} size The new size vector.
 * @since version 1.0
 */       
jsgl.elements.EllipseElement.prototype.setSize = function(size) {

  this.size = jsgl.cloneObject(size);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the size of the elllipse to a given couple of real values.
 * If the ellipse is rotated, then this is the size before the rotation.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {number} newWidth The new width of the ellipse.
 * @param {number} newHeight The new height of the ellipse.
 * @since version 2.0
 */
jsgl.elements.EllipseElement.prototype.setSizeWH = function(newWidth, newHeight) {

  this.size = new jsgl.Vector2D(newWidth, newHeight);
  this.onChangeRaiser.raiseEvent();
}       

/**
 * @description Gets the current clockwise rotation of the ellipse in
 * degrees.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {number}
 * @since version 1.0
 */     
jsgl.elements.EllipseElement.prototype.getRotation = function() {

  return this.rotation;
}

/**
 * @description Sets the new clockwise rotation of the ellipse in degrees.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {number} rotation A real number representing the new rotation in
 * degrees.
 * @since version 1.0
 */      
jsgl.elements.EllipseElement.prototype.setRotation = function(rotation) {

  this.rotation = rotation;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the stroke object that is currently applied for rendering
 * ellipse's outline.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 1.0
 */     
jsgl.elements.EllipseElement.prototype.getStroke = function() {

  return this.stroke;
}

/**
 * @description Sets the new stroke object to be applied for rendering
 * ellipse's outline. The ellipse element will be listening to changes in
 * the stroke object and repaint itself automatically whenever a change takes
 * place. 
 * @methodOf jsgl.elements.EllipseElement#
 * @param {jsgl.stroke.AbstractStroke} The new stoke object.
 * @since version 1.0
 */   
jsgl.elements.EllipseElement.prototype.setStroke = function(stroke) {

  if(this.stroke) {

    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }

  this.stroke = stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);

  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the fill object that is currently applied for rendering
 * ellipse's interior.
 * @methodOf jsgl.elements.EllipseElement#
 * @returns {jsgl.fill.AbstractFill}
 * @since version 1.0
 */    
jsgl.elements.EllipseElement.prototype.getFill = function() {

  return this.fill;
}

/**
 * @description Sets the new fill object to be applied for rendering ellipse's
 * interior. The ellipse element will be listening to changes in the fill object
 * and repaint itself automatically whenever a change takes place.
 * @methodOf jsgl.elements.EllipseElement#
 * @param {jsgl.fill.AbstractFill} The new fill object.
 * @since version 1.0
 */   
jsgl.elements.EllipseElement.prototype.setFill = function(fill) {

  if(this.fill) {

    this.fill.unregisterChangeListener(this.fillChangeListener);
  }

  this.fill = fill;
  this.fill.registerChangeListener(this.fillChangeListener);

  this.onChangeRaiser.raiseEvent();
}
