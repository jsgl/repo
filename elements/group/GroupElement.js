/**
 * @fileOverview Declaration and implementation of JSGL API
 * <code>jsgl.elements.GroupElement</code>. 
 * @author Tomas Rehorek
 * @since version 1.0  
 * @version 2.0
 */ 

/**
 * @class Container class for grouping elements. Uses composite design pattern.
 * @extends jsgl.elements.AbstractElement
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.GroupElement</code>.
 * @param {jsgl.elements.AbstractGroupDomPresenter} domPresenter Appropriate
 * DOM presenter of the group for the user's browser.
 * @param {jsgl.Panel} panel The factor <code>jsgl.Panel</code> object that
 * creates the group element.
 * @since version 1.0
 * @version 2.0
 */    
jsgl.elements.GroupElement=function(domPresenter,panel,x,y,zIndex) {

  jsgl.elements.AbstractElement.call(this,panel,zIndex);
  
  /**
   * Translation of inner coordspace of the group within the coordspace of
   * a parent container.
   * @type jsgl.Vector2D
   * @private
   */              
  this.location = new jsgl.Vector2D(x,y);
  
  /**
   * The list of the elements in the group.
   * @type jsgl.util.ArrayList
   * @private
   */           
  this.elements = new jsgl.util.ArrayList();
  
  /**
   * The DOM presenter that is used for rendering the group (wrapping its elements)
   * on the user's browser.
   * @type jsgl.elements.AbstractGroupDomPresenter
   * @private         
   */     
  this.domPresenter = domPresenter;
  this.domPresenter.setGraphicsElement(this);
  
  
  /**
   * The DOM sorter that ensures appropriate sorting of elements in DOM
   * according to their z-index (SVG does not support CSS z-index!) and age.
   * @type jsgl.elements.DomSorter
   * @private
   */
  this.domSorter = new jsgl.elements.DomSorter(this.domPresenter.getXmlElement());             
}
jsgl.elements.GroupElement.jsglExtend(jsgl.elements.AbstractElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the group.
 * @methodOf jsgl.elements.GroupElement#
 * @returns {jsgl.elements.AbstractGroupDomPresenter}
 * @since version 1.0 
 */  

jsgl.elements.GroupElement.prototype.getDomPresenter=function() {

  return this.domPresenter;
}

/**
 * @description Adds an elements to the group. The element is appended at the
 * end of the list of group's elements. 
 * @methodOf jsgl.elements.GroupElement#
 * @param {jsgl.elements.AbstractElement} element The element to be added.
 * @since version 1.0
 * @version 2.0 
 */  
jsgl.elements.GroupElement.prototype.addElement = function(element) {

  // If the element is already contained within the group, terminate.
  if(this.elements.contains(element)) {
  
    return false;
  }

  this.elements.add(element);
  
  /*
  var newIndex=this.elements.getCount(),
      zIndex=element.getZIndex();

  while((newIndex>0) && this.elements.get(newIndex-1).getZIndex() > zIndex) {

    newIndex--;
  }

  this.domPresenter.getXmlElement().appendChild(
    element.getDomPresenter().getXmlElement());
  */
  
  this.domSorter.add(element);

  
  element.setContainer(this);
  element.getDomPresenter().update();
}

/**
 * @description Gets an element from the list of elements contained within the
 * group at given index.
 * @methodOf jsgl.elements.GroupElement#
 * @param {number} index Index of the element to be retrieved.
 * @since version 1.0
 */  
jsgl.elements.GroupElement.prototype.getElementAt = function(index) {

  return this.elements.get(index);
}

/**
 * @description Gets the number of elements that are currently contained within
 * the group.
 * @methodOf jsgl.elements.GroupElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.GroupElement.prototype.getElementsCount = function() {

  return this.elements.getCount();
}

/**
 * @description Tests whether the given element is currently contained within
 * the group.
 * @methodOf jsgl.elements.GroupElement#
 * @param {jsgl.elements.AbstractElement} element The element to be tested
 * for presence.
 * @since version 1.0
 */     
jsgl.elements.GroupElement.prototype.containsElement = function(element) {

  return this.elements.contains(element);
}

/**
 * @description Removes the given element from the group.
 * @methodOf jsgl.elements.GroupElement#
 * @param {jsgl.elements.AbstractElement} element The element to be removed.
 * @since version 1.0
 */    
jsgl.elements.GroupElement.prototype.removeElement=function(element) {

  if(!this.elements.contains(element)) {

     return false;
  }
  
  this.elements.remove(element);
  
  /*this.domPresenter.getXmlElement().removeChild(
    element.getDomPresenter().getXmlElement());*/
  
  this.domSorter.remove(element);
    
  element.setContainer(null);
}

/**
 * @deprecated
 * @description Removes all the elements from the group.
 * @methodOf jsgl.elements.GroupElement
 * @since version 1.0
 * @version 2.0
 */     
jsgl.elements.GroupElement.prototype.removeAllElements=function() {  
  this.clear();
}

/**
 * @description Removes all the elements from the group.
 * @methodOf jsgl.elements.GroupElement#
 * @since version 2.0
 * @version 2.0
 */
jsgl.elements.GroupElement.prototype.clear = function() {
  var element;
  
  for(var i=this.elements.getCount()-1; i>=0; i--) {

    element=this.elements.get(i);
    
    /*this.domPresenter.getXmlElement().removeChild(
      element.getDomPresenter().getXmlElement());*/
    
    this.domSorter.remove(element);
      
    element.setContainer(null);
  }
  
  this.elements.clear();
}    

/**
 * @description Gets the current X-coordinate of the translation of inner
 * coordspace of the group within the coordspace of a parent container.
 * @methodOf jsgl.elements.GroupElement#
 * @returns {number} The current X-coordinate of the translation in pixels.
 * @since version 2.0
 */
jsgl.elements.GroupElement.prototype.getX = function() {

  return this.location.X;
}

/**
 * @description Sets the new X-axis translation of the group's inner
 * coordspace within the coordspace of a parent container.
 * @methodOf jsgl.elements.GroupElement#
 * @param {number} newX Real number representing the new X-coordinate of group's
 * inner (0,0) point within the coordspace of the parent container. Measured in
 * pixels.
 * @since version 2.0
 */
jsgl.elements.GroupElement.prototype.setX = function(newX) {

  this.location.X = newX;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current X-axis translation of the group's inner
 * coordspace within the coordspace of a parent container.
 * @methodOf jsgl.elements.GroupElement#
 * @returns {number} The current Y-coordinate of the translation in pixels.
 * @since version 2.0
 */
jsgl.elements.GroupElement.prototype.getY = function() {

  return this.location.Y;
}

/**
 * @description Sets the new Y-axis translation of the group's inner
 * coordspace within the coordspace of a parent container.
 * @methodOf jsgl.elements.GroupElement#
 * @param {number} newY Real number representing the new Y-coordinate of group's
 * inner (0,0) point within the coordspace of the parent container. Measured in
 * pixels.
 * @since version 2.0
 */
jsgl.elements.GroupElement.prototype.setY = function(newY) {

  this.location.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Sets the translation of the inner coordspace of the group within the
 * coordspace of a parent container. The translation is given as a
 * <code>jsgl.Vector2D</code> object.
 * @methodOf jsgl.elements.GroupElement#
 * @param {jsgl.Vector2D} location The new location of group's inner (0,0) point
 * within the coordspace of the parent container.
 * @since version 1.0
 */  
jsgl.elements.GroupElement.prototype.setLocation = function(location) {

  this.setLocationXY(location.X, location.Y);
}

/**
 * @description Sets the translation of the inner coordspace of the group within the
 * coordspace of a parent container. The translation is given as couple of
 * coordinates.
 * @methodOf jsgl.elements.GroupElement#
 * @param {number} x Real number representing the X-coordinate of group's inner
 * (0,0) point within the coordspace of the parent container.
 * @param {number} y Real number representing the Y-coordinate of group's inner
 * (0,0) point within the coordsoace of the parent container.
 * @since version 1.0
 */  
jsgl.elements.GroupElement.prototype.setLocationXY = function(x,y) {

  this.location = new jsgl.Vector2D(x,y);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current translation of the inner coordpace of the group within the
 * coordspace of a parent container.
 * @methodOf jsgl.elements.GroupElement#
 * @returns jsgl.Vector2D
 * @since version 1.0
 */     
jsgl.elements.GroupElement.prototype.getLocation = function() {

  return jsgl.cloneObject(this.location);
}
