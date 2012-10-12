/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.elements.ArcElement<code>.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Elliptical arc API class.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new <code>jsgl.elements.ArcElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter Appropriate
 * arc-rendering DOM presenter for the user's browser.
 * @param {jsgl.Panel} panel The factory <code>jsgl.Panel</code> object that
 * creates the curve.
 * @since version 2.0
 */
jsgl.elements.ArcElement = function(domPresenter, panel) {

  jsgl.elements.AbstractElement.call(this, panel);

  /**
   * Location of the centre point of the ellipse that the arc is a segment of.
   * @type jsgl.Vector2D
   * @private
   */
  this.centerPoint = new jsgl.Vector2D();
  
  /**
   * The radii vector for the arc.
   * @type jsgl.Vector2D
   * @private
   */
  this.radii = new jsgl.Vector2D();                            

  /**
   * Clockwise rotation of the arc around its center point in degrees.
   * @type number
   * @private
   */
  this.rotation = 0;
  
  /**
   * Start angle of the arc in degrees.
   * @type number
   * @private
   */
  this.startAngle = 0;
  
  /**
   * End angle of the arc in degrees.
   * @type number
   * @private
   */
  this.endAngle = 0;         

  /**
   * Stroke object specifying style of the arc's outline.
   * @type jsgl.elements.AbstractStroke
   * @private
   */           
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());
  
  /**
   * Fill object specifying style of arc's interior. By default, it is disabled.
   * @type jsgl.elements.AbstractFill
   * @private
   */           
  this.fill = null;
  this.setFill(new jsgl.fill.SolidFill());
  this.getFill().setEnabled(false);

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
}
jsgl.elements.ArcElement.jsglExtend(
  jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the arc.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {jsgl.elements.AbstractDomPresenter}
 * @since version 2.0
 */     
jsgl.elements.ArcElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Gets the current X-coordinate of the center point of the ellipse
 * that the arc is a segment of.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.getCenterX = function() {

  return this.centerPoint.X;
}

/**
 * @description Sets the X-coordinate of the center point of the ellipse that
 * the arc is a segment of.
 * @methodOf jsgl.elements.ArcElement#
 * @param {number} newX The real number that the X-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.setCenterX = function(newX) {

  this.centerPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the center point of the ellipse
 * that the arc is a segment of.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.getCenterY = function() {

  return this.centerPoint.Y;
}

/**
 * @description Sets the Y-coordinate of the center point of the ellipse that
 * the arc is a segment of.
 * @methodOf jsgl.elements.ArcElement#
 * @param {number} newY The real number that the Y-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.setCenterY = function(newY) {

  this.centerPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the center point of the ellipse
 * that the arc is a segment of.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.getCenterPoint = function() {

  return jsgl.cloneObject(this.centerPoint);
}

/**
 * @description Sets the new location of the center point of the ellipse that
 * the arc is a segment of. The location is specified using
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.ArcElement#
 * @param {jsgl.Vector2D} newLocation The location of the center point.
 * @since version 2.0
 */     
jsgl.elements.ArcElement.prototype.setCenterPoint = function(newLocation) {

  this.centerPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new location of the center point of the ellipse that
 * the arc is a segment of. The location is specified using couple of
 * real-valued coordinates.
 * @methodOf jsgl.elements.ArcElement#
 * @param {number} newX A real number that the X-coordinate will be set to.
 * @param {number} newY A real number that the Y-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.setCenterPointXY = function(newX, newY) {

  this.centerPoint.X = newX;
  this.centerPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}  

/**
 * @description Gets the current X-radius of the ellipse to be fit by the arc.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0
 */   
jsgl.elements.ArcElement.prototype.getXRadius = function() {

  return this.radii.X;
}

/**
 * @description Sets the X-axis radius of the ellipse to be fit by the arc.
 * @methodOf jsgl.elements.ArcElement#
 * @param {number} newRadius A real number that the X-axis radius will be set to.
 * @since version 2.0
 */
jsgl.elements.ArcElement.prototype.setXRadius = function(newRadius) {

  this.radii.X = newRadius;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-radius of the ellipse to be fit by the arc.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0
 */    
jsgl.elements.ArcElement.prototype.getYRadius = function() {

  return this.radii.Y;
}

/**
 * @description Sets the Y-axis radius of the ellipse to be fit by the arc.
 * @methodOf jsgl.element.ArcElement#
 * @param {number} newRadius A real number that the Y-axis radius will be set to.
 * @since version 2.0
 */ 
jsgl.elements.ArcElement.prototype.setYRadius = function(newRadius) {

  this.radii.Y = newRadius;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current radii vector of the ellipse to be fit by the
 * arc. The X-component of the vector encodes X-radius and the Y-component
 * encodes Y-radius.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {jsgl.Vector2D} 
 * @since version 2.0
 */     
jsgl.elements.ArcElement.prototype.getRadii = function() {

  return jsgl.cloneObject(this.radii);
}

/**
 * @description Sets the new X- and Y- radii of the ellipse to be fit by the
 * arc using <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.ArcElement#
 * @param {jsgl.Vector2D} newRadii The new radii vector. The X-component of the
 * vector represents X-radius, and the Y-component represents Y-radius. Measured
 * in pixels.
 * @since version 2.0
 */    
jsgl.elements.ArcElement.prototype.setRadii = function(newRadii) {

  this.radii = jsgl.cloneObject(newRadii);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new X- and Y- radii of the ellipse to be fit by the
 * arc using couple of real-valued coordinates.
 * @methodOf jsgl.elements.ArcElement#
 * @param {number} newRX A real number that the X-radius will be set to.
 * @param {number} newRY A real number that the Y-radius will be set to.
 * @since version 2.0
 */  
jsgl.elements.ArcElement.prototype.setRadiiXY = function(newRX, newRY) {

  this.radii.X = newRX;
  this.radii.Y = newRY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current start angle of the arc in degrees.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0     
 */
jsgl.elements.ArcElement.prototype.getStartAngle = function() {

  return this.startAngle;
}

/**
 * @description Sets the new start angle of the arc in degrees. The arc is drawn
 * as a clockwise segment of an ellipse from start angle to end angle.
 * @methodOf jsgl.elements.ArcElement#
 * @param {newAngle} A real number that the start engle in degrees will be se to.
 * @since version 2.0
 */  
jsgl.elements.ArcElement.prototype.setStartAngle = function(newAngle) {

  this.startAngle = newAngle;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current end angle of the arc is degrees.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0
 */    
jsgl.elements.ArcElement.prototype.getEndAngle = function() {

  return this.endAngle;
}

/**
 * @description Sets the new end angle of the arc in degrees. The arc is drawn
 * as a clockwise segment of an ellipse from start angle to end angle.
 * @methodOf jsgl.elements.ArcElement#
 * @param {newAngle} A real number that the end angle in degrees will be se to.
 * @since version 2.0
 */  
jsgl.elements.ArcElement.prototype.setEndAngle = function(newAngle) {

  this.endAngle = newAngle;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Get the current rotation of the ellipse to be fit by the arc
 * in degrees.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {number}
 * @since version 2.0
 */     
jsgl.elements.ArcElement.prototype.getRotation = function() {

  return this.rotation;
}

/**
 * @description Sets the new rotation of the ellipse to be fit be the arc
 * in degrees.
 * @methodOf jsgl.elements.ArcElement#
 * @param {number} newRotation The new rotation in degrees.
 * @since version 2.0
 */  
jsgl.elements.ArcElement.prototype.setRotation = function(newRotation) {

  this.rotation = newRotation;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the stroke object that is applied for rendering arc's outline.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 1.0
 */
jsgl.elements.ArcElement.prototype.getStroke = function() {

  return this.stroke;
}

/**
 * @description Sets the stroke object to be applied for rendering arc's outline.
 * The arc element will be listening to changes in the stroke object and
 * repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.ArcElement#
 * @param {jsgl.stroke.AbstractStroke} stroke The stroke object to be associated
 * with the arc element.
 * @since version 1.0
 */     
jsgl.elements.ArcElement.prototype.setStroke = function(stroke) {

  if(this.stroke) {
  
    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }
  
  this.stroke = stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the fill object that is applied for rendering arc's interior.
 * By default, the fill object is disabled. Use
 * <code>myArc.getFill().setEnabled()</code> to enable filling.
 * @methodOf jsgl.elements.ArcElement#
 * @returns {jsgl.fill.AbstractFill}
 * @since version 1.0
 */    
jsgl.elements.ArcElement.prototype.getFill = function() {

  return this.fill;
}

/**
 * @description Sets the fill object to be applied for rendering arc's interior.
 * The arc element will be listening to the changes in the fill object and
 * repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.ArcElement#
 * @param {jsgl.fill.AbstractFill} fill The fill object to be associated with
 * the arc element.
 * @since version 1.0
 */     
jsgl.elements.ArcElement.prototype.setFill = function(fill) {

  if(this.fill) {

    this.fill.unregisterChangeListener(this.fillChangeListener);
  }

  this.fill = fill;
  this.fill.registerChangeListener(this.fillChangeListener);
  this.onChangeRaiser.raiseEvent();
}