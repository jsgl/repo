/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.elements.CurveElement</code>.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Curve element API class. Allows drawing cubic bezier curves.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new <code>jsgl.elements.CurveElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter Appriate
 * curve-rendering DOM presenter for the user's browser.
 * @param {jsgl.Panel} panel The factory <code>jsgl.Panel</code> object that
 * creates the curve.
 * @since version 2.0
 */
jsgl.elements.CurveElement = function(domPresenter, panel) {

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
   * Starting point of the cubic bezier curve.
   * @type jsgl.Vector2D
   * @private
   */
  this.startPoint = new jsgl.Vector2D();
  
  /**
   * First control point of the cubic bezier curve.
   * @type jsgl.Vector2D
   * @private
   */
  this.control1Point = new jsgl.Vector2D();
  
  /**
   * Second control point of the cubic bezier curve.
   * @type jsgl.Vector2D
   * @private
   */
  this.control2Point = new jsgl.Vector2D();
  
  /**
   * Ending point of the cubic bezier curve.
   * @type jsgl.Vector2D
   * @private
   */
  this.endPoint = new jsgl.Vector2D();
  
  /**
   * Stroke object specifying style of curve's outline.
   * @type jsgl.stroke.AbstractStroke
   * @private
   */           
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());

  /**
   * Fill object specifying style of curve's interior. By default, it is
   * disabled.
   * @type jsgl.fill.AbstractFill
   * @private
   */
  this.fill = null;
  this.setFill(new jsgl.fill.SolidFill());
  this.fill.setEnabled(false);
  
  /**
   * The DOM presenter to be used for rendering the curve on the user's browser.
   * @type jsgl.elements.AbstractDomPresenter
   * @private
   */           
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.CurveElement.jsglExtend(
  jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.elements.AbstractDomPresenter}
 * @private 
 * @since version 2.0 
 */
jsgl.elements.CurveElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Gets the current X-coordinate of the starting point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getStartX = function() {

  return this.startPoint.X;
}

/**
 * @description Sets the new X-coordinate of the starting point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * starting point in pixels.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setStartX = function(newX) {

  this.startPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the starting point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getStartY = function() {

  return this.startPoint.Y;
}

/**
 * @description Sets the new Y-coordinate of the starting point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newY Real number representing the new Y-coordinate of the
 * starting point in pixels.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setStartY = function(newY) {

  this.startPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the curve's starting point as
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getStartPoint = function() {

  return jsgl.cloneObject(this.startPoint);
}

/**
 * @description Sets the new location of the curve's starting point using a
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @param {jsgl.Vector2D} newLocation The new location of the starting point.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setStartPoint = function(newLocation) {

  this.startPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new location of the curve's starting point using
 * couple of real-valued coordinates.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX A real number that the X-coordinate will be set to.
 * @param {number} newY A real number that the Y-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setStartPointXY = function(newX, newY) {

  this.startPoint.X = newX;
  this.startPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}  

/**
 * @description Gets the current X-coordinate of the first control point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getControl1X = function() {

  return this.control1Point.X;
}

/**
 * @description Sets the X-coordinate of the first control point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * first control point in pixels.
 * @since version 1.0
 */
jsgl.elements.CurveElement.prototype.setControl1X = function(newX) {

  this.control1Point.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the first control point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getControl1Y = function() {

  return this.control1Point.Y;
}

/**
 * @description Sets the Y-coordinate of the first control point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newY Real number representing the new Y-coordinate of the
 * first control point in pixels.
 * @since version 1.0
 */
jsgl.elements.CurveElement.prototype.setControl1Y = function(newY) {

  this.control1Point.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the first control point of the
 * curve as <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getControl1Point = function() {

  return jsgl.cloneObject(this.control1Point);
}

/**
 * @description Sets the new location of the first control point of the curve
 * using a <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @param {jsgl.Vector2D} newLocation The new location of the curve's 
 * first control point.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setControl1Point = function(newLocation) {

  this.control1Point = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new location of the first control point of the curve
 * using couple of real-valued coordinates.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX A real number that the X-coordinate will be set to.
 * @param {number} newY A real number that the Y-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setControl1PointXY = function(newX, newY) {

  this.control1Point.X = newX;
  this.control1Point.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current X-coordinate of the second control point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getControl2X = function() {

  return this.control2Point.X;
}

/**
 * @description Sets the X-coordinate of the second control point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * second control point in pixels.
 * @since version 1.0
 */
jsgl.elements.CurveElement.prototype.setControl2X = function(newX) {

  this.control2Point.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the second control point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getControl2Y = function() {

  return this.control2Point.Y;
}

/**
 * @description Sets the Y-coordinate of the second control point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newY Real number representing the new Y-coordinate of the
 * second control point in pixels.
 * @since version 1.0
 */
jsgl.elements.CurveElement.prototype.setControl2Y = function(newY) {

  this.control2Point.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the second control point of the
 * curve as <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getControl2Point = function() {

  return jsgl.cloneObject(this.control2Point);
}

/**
 * @description Sets the new location of the second control point of the curve
 * using a <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @param {jsgl.Vector2D} newLocation The new location of the second control
 * point.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setControl2Point = function(newLocation) {

  this.control2Point = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new location of the second control point of the curve
 * using couple of real-valued coordinates.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX A real number that the X-coordinate will be set to.
 * @param {number} newY A real number that the Y-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setControl2PointXY = function(newX, newY) {

  this.control2Point.X = newX;
  this.control2Point.Y = newY;
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the current X-coordinate of the ending point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getEndX = function() {

  return this.endPoint.X;
}

/**
 * @description Sets the X-coordinate of the ending point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX Real number representing the new X-coordinate of the
 * ending point in pixels.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setEndX = function(newX) {

  this.endPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the ending point of the
 * curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {number}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getEndY = function() {

  return this.endPoint.Y;
}

/**
 * @description Sets the Y-coordinate of the ending point of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newY Real number representing the new Y-coordinate of the
 * ending point in pixels.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setEndY = function(newY) {

  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current location of the curve's ending point as
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.Vector2D}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getEndPoint = function() {

  return jsgl.cloneObject(this.endPoint);
}

/**
 * @description Sets the new location of the curve's ending point using a
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.CurveElement#
 * @param {jsgl.Vector2D} newLocation The new location of the ending point.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setEndPoint = function(newLocation) {

  this.endPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the new location of the curve's ending point using a
 * couple of real-valued coordinates.
 * @methodOf jsgl.elements.CurveElement#
 * @param {number} newX A real number that the X-coordinate will be set to.
 * @param {number} newY A real number that the Y-coordinate will be set to.
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.setEndPointXY = function(newX, newY) {

  this.endPoint.X = newX;
  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the stroke object that currently defines the line style
 * of the curve.
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 2.0
 */
jsgl.elements.CurveElement.prototype.getStroke = function() {

  return this.stroke;
}

/**
 * @description Sets the stroke object to be used for rendering the curve.
 * The curve element will be listening to changes in the stroke object and
 * repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.CurveElement#
 * @param {jsgl.stroke.AbstractStroke} stroke The stroke object to be associated
 * with the curve element.
 * @since version 2.0
 */     
jsgl.elements.CurveElement.prototype.setStroke = function(stroke) {

  if(this.stroke) {

    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }
  
  this.stroke = stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}


/**
 * @description Gets the fill object that currently defines the interior of the
 * curve. By default, the fill is disabled. To enable filling, use
 * <code>myCurve.getFill().setEnabled(true)</code>. 
 * @methodOf jsgl.elements.CurveElement#
 * @returns {jsgl.fill.AbstractFill}
 * @since version 2.0
 */    
jsgl.elements.CurveElement.prototype.getFill = function() {

  return this.fill;
}

/**
 * @description Sets the fill object to be used for rendering curve's interior.
 * The curve element will be listening to the changes in the fill object and
 * repaint itself automatically whenever a change takes place.  
 * @methodOf jsgl.elements.CurveElement#
 * @param {jsgl.fill.AbstractFill} fill The fill object to be associated with
 * the curve element.
 * @since version 1.0
 */     
jsgl.elements.CurveElement.prototype.setFill = function(fill) {

  if(this.fill) {

    this.fill.unregisterChangeListener(this.fillChangeListener);
  }

  this.fill = fill;
  this.fill.registerChangeListener(this.fillChangeListener);
  this.onChangeRaiser.raiseEvent();
}