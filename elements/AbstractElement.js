/** 
 * @fileOverview Declaration and implementation of <code>AbstractElement</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class AbstractElement API class.
 * @constructor
 * @description Base constructor for any JSGL element.
 * @since version 1.0
 * @panel The factory <code>jsgl.Panel</code> that is creating the element.
 * @version 2.0 
 */    
jsgl.elements.AbstractElement = function(panel) {

  /**
   * The <code>jsgl.Panel</code> object that created the element.
   * @type jsgl.Panel
   * @private
   * @since 2.0
   */
  this.panel = panel;

  /**
   * The current container (either <code>jsgl.Panel</code> or
   * <code>jsgl.elements.GroupElement</code>) that currently hold the elements.
   * @type object
   * @private
   * @since version 2.0
   */            
  this.container = null;

  /**
   * The age of the element in the container. This is used for resolving
   * conflicts of with the same z-index.
   * @type number
   * @private
   * @since version 2.0
   */
  this.age = 0;

  /**
   * The current Z-index of the element. It affects z-ordering of the elements,
   * i.e. the order in which elements are drawn.
   * @type number      
   * @private
   */      
  this.zIndex = 0;
  
  /**
   * The MVC event raiser responsible for propagation of changes in z-index.
   * It is important because SVG does not support z-indices and hence changes
   * in z-index require re-ordering of elements in the DOM tree whenever
   * z-index changes.
   * @type jsgl.util.EventRaiser
   * @private
   */                   
  this.zIndexChangeRaiser = new jsgl.util.EventRaiser();
  
  this.cursor = jsgl.Cursor.INHERIT;
  
  /**
   * The unique ID of the element.
   * @type number
   * @const
   * @private
   */
  this.uid = jsgl.elements.AbstractElement.uidCounter ++;              
  
  /**
   * The MVC event raiser responsible for propagation of changes made in the
   * elements. Most notably, whenever some property of the element changes by
   * a setter method, the event raiser should raise an event. One of the event
   * listeners is always the element's DOM presenter, which renders the element
   * on the user's browser. Hence whenever some property changes, through the
   * <code>onChangeRaiser</code>, repaint process is invoked.
   * @type jsgl.util.EventRaiser
   * @private
   */      
  this.onChangeRaiser=new jsgl.util.EventRaiser();

  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addMouseMoveListener()</code> method about mouse-move events on the
   * element.
   * @type jsgl.util.EventRaiser
   * @private
   */      
  this.mouseMoveRaiser = new jsgl.util.EventRaiser();
  
  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addMouseDownListener</code> method about mouse-down events on the
   * element.
   * @type jsgl.util.EventRaiser
   * @private
   */            
  this.mouseDownRaiser = new jsgl.util.EventRaiser();
  
  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addMouseUpListener</code> method about mouse-up events on the element.
   * @type jsgl.util.EventRaiser
   * @private
   */            
  this.mouseUpRaiser = new jsgl.util.EventRaiser();
  
  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addMouseOverListener</code> method about mouse-enter events on the
   * element.
   * @type jsgl.util.EventRaiser
   * @private
   */
  this.mouseOverRaiser = new jsgl.util.EventRaiser();
  
  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addMouseOutListener</code> method about mouse-leave events on the
   * element.
   * @type jsgl.util.EventRaiser
   * @private
   */            
  this.mouseOutRaiser = new jsgl.util.EventRaiser();
  
  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addClickListener</code> method about mouse-click events on the
   * element.
   * @type jsgl.util.EventRaiser
   * @private
   */            
  this.clickRaiser = new jsgl.util.EventRaiser();
  
  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addDoubleClickListener</code> method about mouse double-click events
   * on the element.
   * @type jsgl.util.EventRaiser
   * @private
   */            
  this.dblClickRaiser = new jsgl.util.EventRaiser();

  /**
   * MVC event raiser that informs the listeners registered via the
   * <code>addMouseOverListener</code> method about context menu
   * (right-click) events on the element.
   * @type jsgl.util.EventRaiser
   * @private
   */
  this.contextMenuRaiser = new jsgl.util.EventRaiser();
}

/**
 * Unique ID counter for JSGL elements.
 * @type number
 * @static
 * @since version 2.0 
 */   
jsgl.elements.AbstractElement.uidCounter = 0;

/**
 * @description Gets the unique id of the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @returns {number} The unique identifier.
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.getUid = function() {

  return this.uid;
}

/**
 * @description Gets the <code>jsgl.Panel</code> object that created the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @returns {jsgl.Panel}
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.getPanel = function() {

  return this.panel;
}

/**
 * @description Gets the DOM presenter that is used for rendering the element
 * of the user's browser.
 * @methodOf jsgl.elements.AbstractElement#
 * @returns {jsgl.elements.AbstractDomPresenter}
 * @since version 1.0
 * @version 2.0 
 */
jsgl.elements.AbstractElement.prototype.getDomPresenter = function() {

  return this.domPresenter;
}

/**
 * @description Sets the container of the element. This is called either by
 * <code>jsgl.Panel</code> object or by <code>jsgl.elements.GroupElement</code>
 * object.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {object} container The panel or the group which newly holds the element.
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.setContainer = function(container) {

  this.container = container;
}

/**
 * @description Gets the container of the element. May return either
 * <code>jsgl.elements.GroupElement</code> or <code>jsgl.Panel</code> object.
 * @methodOf jsgl.elements.AbstractElement#
 * @returns object
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.getContainer = function() {

  return this.container;
}

/**
 * @description Gets the current of the element in scope of its container. This
 * is used for resolving conflict between elements with the same z-index. 
 * @methodOf jsgl.elements.AbstractElement#
 * @returns {number} The current age of the element.
 * @private
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.getAge = function() {

  return this.age;
} 

/**
 * @description Sets the new age of the element within a container. The container
 * should call this whenever the element is added into it, increasing an internal
 * age counter. Using the age information, container may resolve conflicts
 * between elements with the same z-index.
 * @methodOf jsgl.elements.AbstractElement#    
 * @param {number} newAge The new age of the element within the container.
 * @private
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.setAge = function(newAge) {

  this.age = newAge;
} 

/**
 * @description Adds a listener function for handling mouse move events on the
 * element. 
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */ 
jsgl.elements.AbstractElement.prototype.addMouseMoveListener=function(listener) {

  this.mouseMoveRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse move event
 * listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse move events on the element anymore.
 * @since version 2.0
 */  
jsgl.elements.AbstractElement.prototype.removeMouseMoveListener=function(listener) {

  this.mouseMoveRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse move event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The mouse move event arguments object.  
 * @private
 * @since version 2.0
 */ 
jsgl.elements.AbstractElement.prototype.raiseMouseMove = function(eventArgs) {

  this.mouseMoveRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling mouse down events on the
 * element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */       
jsgl.elements.AbstractElement.prototype.addMouseDownListener=function(listener) {

  this.mouseDownRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse down event
 * listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse down events on the element anymore.
 * @since version 2.0
 */  
jsgl.elements.AbstractElement.prototype.removeMouseDownListener=function(listener) {

  this.mouseDownRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse down event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The mouse down event arguments object.
 * @private
 * @since version 2.0
 */    
jsgl.elements.AbstractElement.prototype.raiseMouseDown = function(eventArgs) {

  this.mouseDownRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling mouse up events on the
 * element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */       
jsgl.elements.AbstractElement.prototype.addMouseUpListener=function(listener) {

  this.mouseUpRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse up event
 * listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse up events on the element anymore.
 * @since version 2.0
 */      
jsgl.elements.AbstractElement.prototype.removeMouseUpListener=function(listener) {

  this.mouseUpRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse up event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The mouse up event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.raiseMouseUp = function(eventArgs) {

  this.mouseUpRaiser.raiseEvent(eventArgs);
}     

/**
 * @description Adds a listener function for handling mouse over events on the
 * element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.addMouseOverListener=function(listener) {

  this.mouseOverRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse over event
 * listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse over events on the element anymore.
 * @since version 2.0
 */      
jsgl.elements.AbstractElement.prototype.removeMouseOverListener=function(listener) {

  this.mouseOverRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse over event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The mouse over event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.raiseMouseOver = function(eventArgs) {

  this.mouseOverRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling mouse out events on the
 * element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */  
jsgl.elements.AbstractElement.prototype.addMouseOutListener=function(listener) {

  this.mouseOutRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse out event
 * listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse out events on the element anymore.
 * @since version 2.0
 */      
jsgl.elements.AbstractElement.prototype.removeMouseOutListener=function(listener) {

  this.mouseOutRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse out event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The mouse out event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.raiseMouseOut = function(eventArgs) {

  this.mouseOutRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling click events on the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */  
jsgl.elements.AbstractElement.prototype.addClickListener=function(listener) {

  this.clickRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of click event listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to click events on the element anymore.
 * @since version 2.0
 */     
jsgl.elements.AbstractElement.prototype.removeClickListener=function(listener) {

  this.clickRaiser.unregisterListener(listener);
}

/**
 * @description Raises the click event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The click event arguments object.  
 * @private
 * @since version 2.0 
 */ 
jsgl.elements.AbstractElement.prototype.raiseClick = function(eventArgs) {

  this.clickRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling double click events on the
 * element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */ 
jsgl.elements.AbstractElement.prototype.addDoubleClickListener=function(listener) {

  this.dblClickRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of double click event
 * listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listeer function that should not
 * listen to double click events on the element anymore.
 * @since version 2.0
 */   
jsgl.elements.AbstractElement.prototype.removeDoubleClickListener=function(listener) {

  this.dblClickRaiser.unregisterListener(listener);
}

/**
 * @description Raises the double click event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.util.MouseEvet} eventArgs The click event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.elements.AbstractElement.prototype.raiseDoubleClick = function(eventArgs) {

  this.dblClickRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling context menu (right-click)
 * events on the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 */  
jsgl.elements.AbstractElement.prototype.addContextMenuListener=function(listener) {

  this.contextMenuRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of context menu
 * (right-click) event listeners.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to context menu (right-click) events on the element anymore.
 */     
jsgl.elements.AbstractElement.prototype.removeContextMenuListener=function(listener) {

  this.contextMenuRaiser.unregisterListener(listener);
}

/**
 * @description Raises the context menu (right-click) event.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.MouseEvent} eventArgs The context menu (right-click) event
 * arguments object.  
 * @private
 */ 
jsgl.elements.AbstractElement.prototype.raiseContextMenu = function(eventArgs) {

  this.contextMenuRaiser.raiseEvent(eventArgs);
}

jsgl.elements.AbstractElement.prototype.addChangeListener=function(listener) {

  this.onChangeRaiser.registerListener(listener);
}

jsgl.elements.AbstractElement.prototype.removeChangeListener=function(listener) {

  this.onChangeRaiser.unregisterListener(listener);
}

/**
 * @description Sets the new Z-axis index of the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param zIndex The new z-index.
 * @since version 1.0
 */    
jsgl.elements.AbstractElement.prototype.setZIndex = function(zIndex) {

  this.zIndex = Number(zIndex);
  this.zIndexChangeRaiser.raiseEvent();
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the curent Z-axis index of the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @returns {number}
 * @since version 1.0
 */    
jsgl.elements.AbstractElement.prototype.getZIndex = function() {

  return this.zIndex;

}

/**
 * @description Sets the new mouse cursor for the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @param {jsgl.Cursor} cursor The new cursor.
 * @since version 2.0  
 */ 
jsgl.elements.AbstractElement.prototype.setCursor = function(cursor) {

  this.cursor = cursor;
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the current mouse cursor of the element.
 * @methodOf jsgl.elements.AbstractElement#
 * @returns {jsgl.Cursor} The current cursor used by the element.
 * @since version 2.0
 */   
jsgl.elements.AbstractElement.prototype.getCursor = function() {

  return this.cursor;
}

jsgl.elements.AbstractElement.prototype.addZIndexChangeListener = function(listener) {

  this.zIndexChangeRaiser.registerListener(listener);
}

jsgl.elements.AbstractElement.prototype.removeZIndexChangeListener = function(listener) {

  this.zIndexChangeRaiser.unregisterListener(listener);
}