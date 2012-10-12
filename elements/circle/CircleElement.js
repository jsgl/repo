/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.elements.CircleElement</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 **/  

/**
 * @class Circle element API class.
 * @extends jsgl.elements.AbstractElement 
 * @constructor 
 * @description Creates new <code>jsgl.elements.CircleElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter Appriate
 * circle-rendering DOM presenter for user's browser.
 * @param {jsgl.Panel} panel The factory <code>jsgl.Panel</code> object that
 * creates the circle. 
 * @since version 1.0
 * @version 2.0 
 */
jsgl.elements.CircleElement = function(domPresenter, panel) {

  jsgl.elements.AbstractElement.call(this, panel);

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
   * Location of the centre point of the circle.
   * @type jsgl.Vector2D
   * @private
   */           
  this.centerLocation = new jsgl.Vector2D();
  
  /**
   * Radius of the circle.
   * @type number
   * @private
   */           
  this.radius = 0;

  /**
   * Stroke object specifying style of circle's outline.
   * @type jsgl.stroke.AbstractStroke
   * @private
   */           
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());

  /**
   * Fill object specifying style of circle's interior.
   * @type jsgl.fill.AbstractFill
   * @private
   */         
  this.fill = null;
  this.setFill(new jsgl.fill.SolidFill());
  
  /**
   * The DOM presenter used for rendering the circle on the user's browser.
   * @type jsgl.elements.AbstractDomPresenter
   * @private
   */           
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.CircleElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM Presenter.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {jsgl.elements.AbstractDomPresenter} 
 * @since version 1.0
 */ 
jsgl.elements.CircleElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Gets the current X-coordinate of the circle's center location.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {number} 
 * @since version 1.0
 */  
jsgl.elements.CircleElement.prototype.getCenterX = function() {

  return this.centerLocation.X;
}

/**
 * @description Sets the X-coordinate of the circle's center location.
 * @methodOf jsgl.elements.CircleElement#
 * @param {number} x The real number that the X-coordiate will be set to. 
 * @since version 1.0
 */ 
jsgl.elements.CircleElement.prototype.setCenterX = function(x) {

  this.centerLocation.X = x;
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the current Y-coordinate of the circle's center location.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {number}
 * @since version 1.0  
 */ 
jsgl.elements.CircleElement.prototype.getCenterY = function() {

  return this.centerLocation.Y;
}


/**
 * @description Sets the Y-coordinate of the circle's center location.
 * @methodOf jsgl.elements.CircleElement#
 * @param {number} y The real number that the Y-coordinate will be set to.
 * @since version 1.0
 */    
jsgl.elements.CircleElement.prototype.setCenterY = function(y) {

  this.centerLocation.Y = y;
  this.onChangeRaiser.raiseEvent(); 
}

/**
 * @description Gets the current location of the circle's center as
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {jsgl.Vector2D}
 * @since version 1.0
 */    
jsgl.elements.CircleElement.prototype.getCenterLocation = function() {

  return jsgl.cloneObject(this.centerLocation);
}

/**
 * @description Sets the circle's center location to a given
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CircleElement#
 * @param {jsgl.Vector2D} location The location that the circle's center will
 * be moved to.
 * @since version 1.0
 */  
jsgl.elements.CircleElement.prototype.setCenterLocation = function(location) {

  this.centerLocation = jsgl.cloneObject(location);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the center location to a given couple of real-valued
 * coordinates.
 * @methodOf jsgl.elements.CircleElement#
 * @param {number} x The real number that the X-coordinate will be set to.
 * @param {number} y The real number that the Y-coordinate will be set to.
 * @since version 1.0
 */  
jsgl.elements.CircleElement.prototype.setCenterLocationXY = function(x,y) {

  this.centerLocation.X = x;
  this.centerLocation.Y = y;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current radius of the circle.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.CircleElement.prototype.getRadius = function() {

  return this.radius;
}

/**
 * @description Sets the radius of the circle.
 * @methodOf jsgl.elements.CircleElement#
 * @param {number} radius Non-negative real number that the radius will be set to.  
 * @since version 1.0
 */  
jsgl.elements.CircleElement.prototype.setRadius = function(radius) {

  this.radius = radius;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current stroke object that is used for styling circle's
 * outline.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 1.0
 */
jsgl.elements.CircleElement.prototype.getStroke = function() {

  return this.stroke;
}

/**
 * @description Sets the new stroke object to be applied for styling outline of
 * the circle. The circle element will be listening to changes in the stroke
 * object and repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.CircleElement#
 * @param {jsgl.stroke.AbstractStroke} stroke The stroke object to be associated
 * with the circle element.
 * @since version 1.0
 */     
jsgl.elements.CircleElement.prototype.setStroke = function(stroke) {

  if(this.stroke) {
  
    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }
  
  this.stroke = stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the current fill object that is used for styling circle's
 * interior.
 * @methodOf jsgl.elements.CircleElement#
 * @returns {jsgl.fill.AbstractFill}
 * @since version 1.0
 */    
jsgl.elements.CircleElement.prototype.getFill = function() {

  return this.fill;
}

/**
 * @description Sets the new fill object to be applied for styling interior of
 * the circle. The circle element will be listening to the changes in the fill
 * object and repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.CircleElement#
 * @param {jsgl.fill.AbstractFill} fill The fill object to be associated with
 * the circle element.
 * @since version 1.0
 */     
jsgl.elements.CircleElement.prototype.setFill = function(fill) {

  if(this.fill) {

    this.fill.unregisterChangeListener(this.fillChangeListener);
  }

  this.fill = fill;
  this.fill.registerChangeListener(this.fillChangeListener);
  this.onChangeRaiser.raiseEvent();
}