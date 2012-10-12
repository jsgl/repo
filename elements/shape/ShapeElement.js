/**
 * @fileOverview Declaration and implementation of
 * <code>jsgl.elements.ShapeElement</code> API class.
 * @author Tomas Rehorek
 * @since version 2.0
 */   

/**
 * @constructor
 */ 
jsgl.elements.ShapeElement = function(domPresenter, panel) {

  jsgl.elements.AbstractElement.call(this, panel);

  /**
   * @private
   */
  this.path = new jsgl.util.ArrayList();

  /**
   * The function listening to changes is path.
   * @type function
   * @private
   */
  this.pathChangeListener = jsgl.util.delegate(
    this.onChangeRaiser, this.onChangeRaiser.raiseEvent);           

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
   * Stroke object that specifies style of the shape's outline.
   * @type jsgl.stroke.AbstractStroke
   * @private
   */              
  this.stroke = null;
  this.setStroke(new jsgl.stroke.SolidStroke());
  
  /**
   * Fill object that specifies style of the shape's interior.
   * @type jsgl.fill.AbstractFill
   * @private
   */           
  this.fill = null;
  this.setFill(new jsgl.fill.SolidFill());
  
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.ShapeElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that renders the shape
 * element on the user's browser.
 * @methodOf jsgl.elements.ShapeElement#
 * @returns jsgl.elements.AbstractDomPresenter
 * @since version 2.0
 */     
jsgl.elements.ShapeElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Appends a new path segment to the list of the shape's path
 * segment commands.
 * @methodOf jsgl.elements.ShapeElement#
 * @param {jsgl.path.AbstractPathSegment} newSegment The new path segment to
 * be appended.
 * @since version 2.0  
 */
jsgl.elements.ShapeElement.prototype.addPathSegment = function(segment) {

  this.path.add(segment);
  segment.registerChangeListener(this.pathChangeListener);
  
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the path segment at given index from the list of the
 * Shape's path segment commands.
 * @methodOf jsgl.elements.ShapeElement#  
 * @param {number} index Index of the path segment, starting from 0.
 * @returns {jsgl.path.AbstractPathSegment}
 * @since version 2.0  
 */ 
jsgl.elements.ShapeElement.prototype.getPathSegmentAt = function(index) {

  return this.path.get(index);
}

/**
 * @description Gets the current length of the shape's path segment commands list.
 * @methodOf jsgl.elements.ShapeElement#  
 * @returns {number} Number of segments currently present.
 * @since version 2.0 
 */ 
jsgl.elements.ShapeElement.prototype.getPathSize = function() {

  return this.path.getCount();
}

/**
 * @description Replaces a path segment in the list of the Shape's path segment
 * commands at the given index.
 * @methodOf jsgl.elements.ShapeElement#
 * @param {jsgl.path.AbstractPathSegment} newSegment The new path segment command.
 * @param {Number} index Index at which the replacement shall take place in the
 * list.
 * @since version 2.0 
 */ 
jsgl.elements.ShapeElement.prototype.setPathSegmentAt = function(newSegment, index) {

  if(this.path.get(index)) {
    this.path.get(index).unregisterChangeListener(this.pathChangeListener);
  }
  
  this.path.setAt(segment, index);
  segment.registerChangeListener(this.pathChangeListener);

  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Removes a path segment from the list of the shape's path segment
 * commands list at the given index. The rest of the list is shifted left after
 * the segment is removed. 
 * @methodOf jsgl.elements.ShapeElement#
 * @param {Number} index Index of the segment to be removed, starting from 0.
 */ 
jsgl.elements.ShapeElement.prototype.removePathSegmentAt = function(index) {

  this.path.get(index).unregisterChangeListener(this.pathChangeListener);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Inserts a new path segment to the list of the shape's path
 * segment commands. The rest of the list from the index given is shifted left
 * after the segment is inserted. 
 */ 
jsgl.elements.ShapeElement.prototype.insertPathSegmentAt = function(segment, index) {

  this.path.insertAt(segment, index);
  
  segment.registerChangeListener(this.pathChangeListener);
  
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Removes all the path segments from the Shape's path segment
 * commands list.
 * @methodOf jsgl.elements.ShapeElement#
 * @since version 2.0   
 */ 
jsgl.elements.ShapeElement.prototype.clearPath = function() {

  var pathLength = this.path.getCount();

  for(var i=0; i<pathLength; i++) {
  
    this.path.get(i).unregisterChangeListener(this.pathChangeListener);
  }
  
  this.path.clear();
  
  this.inChangeRaiser.raiseEvent();
}



/**
 * @description Gets the stroke object that is currently used for rendering
 * the outline of the shape.
 * @methodOf jsgl.elements.ShapeElement#
 * @returns jsgl.stroke.AbstractStroke
 * @since version 2.0
 */      
jsgl.elements.ShapeElement.prototype.getStroke = function() {

  return this.stroke;
}

/**
 * @description Sets the new stroke object to be used for rendering
 * the outline of the shape.
 * @methodOf jsgl.elements.ShapeElement#
 * @param {jsgl.stroke.AbstractStroke} newStroke The new stroke object. 
 * @since version 2.0
 */      
jsgl.elements.ShapeElement.prototype.setStroke = function(newStroke) {

  if(this.stroke) {

    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }

  this.stroke = newStroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);

  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the fill object that is currently used for rendering
 * the interior of the shape.
 * @methodOf jsgl.elements.ShapeElement#
 * @returns jsgl.fill.AbstractFill
 * @since version 2.0
 */      
jsgl.elements.ShapeElement.prototype.getFill = function() {

  return this.fill;
}

/**
 * @description Sets the new fill object to be used for rendering
 * the interior of the shape.
 * @methodOf jsgl.elements.ShapeElement#
 * @param {jsgl.fill.AbstractFill} newFill The new fill object. 
 * @since version 2.0
 */      
jsgl.elements.ShapeElement.prototype.setFill = function(newFill) {

  if(this.fill) {

    this.fill.unregisterChangeListener(this.fillChangeListener);
  }

  this.fill = newFill;
  this.fill.registerChangeListener(this.fillChangeListener);

  this.onChangeRaiser.raiseEvent();
}