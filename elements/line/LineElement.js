/**
 * @fileOverview Declaration and implementation of <code>jsgl.elements.Line</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Line element API class.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.LineElement</code>.
 * @param {jsgl.elements.AbstractLineDomPresenter} domPresenter Appropriate
 * line-rendering DOM presenter for the user's browser.   
 * @since version 1.0
 * @version 2.0 
 */        
jsgl.elements.LineElement=function(domPresenter, panel, x1,y1,x2,y2,stroke,zIndex) {

  jsgl.elements.AbstractElement.call(this,panel,zIndex);

  /**
   * The function listening to changes in the associated stroke object.
   * @type function
   * @private
   */             
  this.strokeChangeListener = jsgl.util.delegate(
    this.onChangeRaiser,this.onChangeRaiser.raiseEvent);
  
  /**
   * The starting point of the line, i.e. (x1,y1).
   * @type jsgl.Vector2D
   * @private
   */           
  this.startPoint = new jsgl.Vector2D(x1,y1);
  
  /**
   * The ending point of the line, i.e. (x2,y2).
   * @type jsgl.Vector2D
   * @private
   */         
  this.endPoint = new jsgl.Vector2D(x2,y2);
  
  /**
   * The stroke object specifying the style of the line. Note that the object
   * fully defines the it's style.
   * @type jsgl.stroke.AbstractStroke
   * @private         
   */     
  this.stroke = null;
  this.setStroke(stroke || new jsgl.stroke.SolidStroke());
  
  /**
   * The DOM presenter used for rendering the line on the user's browser.
   * @type jsgl.elements.AbstractLineDomPresenter
   * @private
   */           
  this.domPresenter=domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.LineElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the line.
 * @methodOf jsgl.elements.LineElement#
 * @returns {jsgl.elements.AbstractLineDomPresenter}
 * @since version 1.0
 */       
jsgl.elements.LineElement.prototype.getDomPresenter=function() {

  return this.domPresenter;
}

/**
 * @description Gets the current X-coordinate of the starting point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.getStartX=function() {

  return this.startPoint.X;
}

/**
 * @description Sets the X-coordinate of the starting point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @param {number} newX Real number representing the new X-coordinate.
 * @since version 1.0
 */   
jsgl.elements.LineElement.prototype.setStartX=function(newX) {

  this.startPoint.X=newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the starting point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.getStartY=function() {

  return this.startPoint.Y;
}

/**
 * @description Sets the Y-coordinate of the starting point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @param {number} newY Real number representing the new Y-coordinate.
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.setStartY=function(newY) {

  this.startPoint.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current starting point of the line as
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.LineElement#
 * @returns {jsgl.Vector2D}
 * @since version 1.0 
 */   
jsgl.elements.LineElement.prototype.getStartPoint=function() 
{
  return jsgl.cloneObject(this.startPoint);
}

/**
 * @description Sets the starting point of the line using given
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.LineElement#
 * @param {Vector2D} startPoint The new start point of the line.
 * @since version 1.0 
 */  
jsgl.elements.LineElement.prototype.setStartPoint=function(startPoint) {

  this.setStartPointXY(startPoint.X,startPoint.Y);
}

/**
 * @description Sets the starting point of the line using couple of real-valued
 * coordinates.
 * @methodOf jsgl.elements.LineElement#
 * @param {newX} Real number representing the new X-coordinate.
 * @param {newY} Real number representing the new Y-coordinate.
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.setStartPointXY=function(newX,newY) {

  this.startPoint.X=newX;
  this.startPoint.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current X-coordinate of the ending point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.getEndX=function() {

  return this.endPoint.X;
}

/**
 * @description Sets the X-coordinate of the ending point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @param {number} newX Real number representing the new X-coordinate.
 * @since version 1.0
 */
jsgl.elements.LineElement.prototype.setEndX=function(newX)
{
  this.endPoint.X=newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current Y-coordinate of the ending point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @returns {number}
 * @since version 1.0
 */
jsgl.elements.LineElement.prototype.getEndY=function() {

  return this.endPoint.Y;
}

/**
 * @description Sets the Y-coordinate of the ending point of the line.
 * @methodOf jsgl.elements.LineElement#
 * @param {number} newY Real number representing the new Y-coordinate.
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.setEndY=function(newY) {

  this.endPoint.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current endting point of the line as
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.LineElement#
 * @returns {jsgl.Vector2D}
 * @since version 1.0 
 */   
jsgl.elements.LineElement.prototype.getEndPoint=function() {

  return jsgl.cloneObject(this.endPoint);
}

/**
 * @description Sets the starting point of the line using given
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.LineElement#
 * @param {Vector2D} endPoint The new ending point of the line.
 * @since version 1.0 
 */
jsgl.elements.LineElement.prototype.setEndPoint=function(endPoint)
{
  this.setEndPointXY(endPoint.X,endPoint.Y);
}

/**
 * @description Sets the starting point of the line using couple of real-valued
 * coordinates.
 * @methodOf jsgl.elements.LineElement#
 * @param {newX} Real number representing the new X-coordinate.
 * @param {newY} Real number representing the new Y-coordinate.
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.setEndPointXY=function(newX,newY) {

  this.endPoint.X=newX;
  this.endPoint.Y=newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the stroke object that is currently used for styling the line.
 * @methodOf jsgl.elements.LineElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 1.0
 */    
jsgl.elements.LineElement.prototype.getStroke=function() {

  return this.stroke;
}

/**
 * @description Sets the stroke object to be used for styling the line. The line
 * will be listening to changes in the stroke object and update itself
 * automatically whenever a change takes place.
 * @methodOf jsgl.elements.LineElement#
 * @param {jsgl.stroke.AbstractStroke} stroke The new stroke object to be
 * associated with the line element.
 * @since version 1.0
 */       
jsgl.elements.LineElement.prototype.setStroke=function(stroke) {

  if(this.stroke) {
  
    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }
  
  this.stroke=stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}
