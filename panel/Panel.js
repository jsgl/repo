/**
 * @fileOverview <code>jsgl.Panel</code> class implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */


/**
 * @class Core API object for creating and displaying JSGL elements within
 * HTML <code>&lt;div&gt;</code> element. 
 * @constructor
 * @description Creates new <code>jsgl.Panel</code> object.
 * @param {HTMLDivElement} holderElement HTML <code>&lt;div&gt;</code> element
 * to be drawn onto.
 * @since version 1.0 
 * @version 2.0 
 */   
jsgl.Panel=function(holderElement) {

  /**
   * HTML <code>&lt;div&gt;</code> that the graphics elements will be put into.
   * @type HTMLDivElement
   * @private
   */           
  this.holderElement=holderElement;

  /**
   * This list of the elements added to the viewport.
   * @type jsgl.util.ArrayList  
   * @since version 2.0
   * @private   
   */
  this.elements = new jsgl.util.ArrayList();

  /*
   * Owner document of the holder <code>&lt;div&gt;</code> element. In MSIE 5.5,
   * ownerDocument property of the element is not supported, preventing JSGL from
   * being used inside frames.
   * @type HTMLDocument
   * @since version 1.0
   * @private         
   */
  this.ownerDocument = null;
  if(jsgl.util.BrowserInfo.isMSIE55) {
    this.ownerDocument=document;
  }
  else {
    this.ownerDocument=holderElement.ownerDocument;
  }

  this.holderElement.style.position = "relative";
  this.holderElement.style.overflow = "hidden";
  this.holderElement.style.cursor = "default";

  
  this.domPresenter = null;  
  if(jsgl.util.BrowserInfo.supportsSvg) {

    this.domPresenter = new jsgl.panel.SvgPanelDomPresenter(this);
  }
  else {

    this.domPresenter = new jsgl.panel.NonSvgPanelDomPresenter(this);
  }
  
  /**
   * Cursor to display when the mouse is on the panel.
   * @type jsgl.Cursor
   * @since version 2.0
   * @private
   */
  this.cursor = jsgl.Cursor.INHERIT;              
  
  ////////////////////////////////////////////////////
  this.mouseMoveRaiser = new jsgl.util.EventRaiser();
  this.mouseDownRaiser = new jsgl.util.EventRaiser();
  this.mouseUpRaiser = new jsgl.util.EventRaiser();
  this.mouseOverRaiser = new jsgl.util.EventRaiser();
  this.mouseOutRaiser = new jsgl.util.EventRaiser();
  this.clickRaiser = new jsgl.util.EventRaiser();
  this.dblClickRaiser = new jsgl.util.EventRaiser();
  this.contextMenuRaiser = new jsgl.util.EventRaiser();
}

/**
 * @description Gets the holder HTML <code>&lt;div&gt;</code> for the panel.
 * @methodOf jsgl.Panel#
 * @returns HTMLDivElement
 * @since version 1.0
 */    
jsgl.Panel.prototype.getHolderElement=function() {

  return this.holderElement;
}

/**
 * @description Gets the owner document of the holder <code>&lt;div&gt;</code>
 * element.
 * @methodOf jsgl.Panel#
 * @returns HTMLDocument
 * @since version 2.0
 */
jsgl.Panel.prototype.getOwnerDocument = function() {

  return this.ownerDocument;
}     

/**
 * @description Adds an element (created by some of the factory methods) to the
 * Panel's viewport.
 * @methodOf jsgl.Panel#
 * @param {jsgl.elements.AbstractElement} element The element to be added.
 * @since version 1.0
 * @version 2.0  
 */ 
jsgl.Panel.prototype.addElement=function(element) {

  //this.elementsGroup.addElement(element);
  this.domPresenter.addElement(element);
  this.elements.add(element);
  element.setContainer(this);
}

/**
 * @description Removes all the elements from the Panel's viewport.
 * @methodOf jsgl.Panel#
 * @since version 1.0 
 */  
jsgl.Panel.prototype.clear=function() {

  //this.elementsGroup.removeAllElements();
  this.domPresenter.clear();  
  this.elements.clear();

  for(i=0; i<this.elements.getCount(); i++) {
    this.elements.get(i).setContainer(null);
  }
}

/**
 * @description Gets the number of elements that are currently diplayed on the
 * Panel's viewport.
 * @methodOf jsgl.Panel#
 * @since version 1.0
 * @version 2.0 
 */   
jsgl.Panel.prototype.getElementsCount=function() {

  //return this.elementsGroup.getElementsCount();
  return this.elements.getCount();
}

/**
 * @description Gets an element from the Panel's viewport at the specified index.
 * @methodOf jsgl.Panel#
 * @since version 1.0
 * @param {number} index Index of the element to be returned. 
 * @version 2.0 
 */  
jsgl.Panel.prototype.getElementAt=function(index) {

  //return this.elementsGroup.getElementAt(index);
  return this.elements.get(index);
}

/**
 * @description Determines whether the specified element is currently contained
 * within the Panel's viewport.
 * @methodOf jsgl.Panel#
 * @param {jsgl.elements.AbstractElement} element The element to be tested for
 * presence on the Panel's viewport. 
 * @returns {Boolean}  
 * @since version 1.0
 * @version 2.0 
 */  
jsgl.Panel.prototype.containsElement=function(element) {

  //return this.elementsGroup.containsElement(element);
  return this.elements.contains(element);
}

/**
 * @description Removes the given element out of the Panel's viewport.
 * @methodOf jsgl.Panel#
 * @param {jsgl.elements.AbstractElement} element The element to be removed
 * from the Panel's viewport.
 * @since version 1.0
 * @version 2.0 
 */     
jsgl.Panel.prototype.removeElement=function(element) {

  //this.elementsGroup.removeElement(element);
  this.domPresenter.removeElement(element);
  this.elements.remove(element);
  element.setContainer(null);
}

/**
 * @description Factory method that creates new instance of <code>GroupElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.Element.GroupElement} 
 * @since version 1.0 
 * @version 2.0 
 */
jsgl.Panel.prototype.createGroup=function(x,y,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
    domPresenter = new jsgl.elements.SvgGroupDomPresenter(this.ownerDocument);
  }
  else {
    domPresenter = new jsgl.elements.NonSvgGroupDomPresenter(this.ownerDocument);
  }

  return new jsgl.elements.GroupElement(domPresenter,this,x,y,zIndex);
}

/**
 * @description Factory method that creates new instance of <code>CircleElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.CircleElement} 
 * @since version 1.0
 */   
jsgl.Panel.prototype.createCircle=function(x,y,radius,stroke,fill,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
    domPresenter=new jsgl.elements.SvgCircleDomPresenter(this.ownerDocument);
  }
  else {
    domPresenter=new jsgl.elements.VmlCircleDomPresenter(this.ownerDocument);
  }

  return new jsgl.elements.CircleElement(domPresenter,this,x,y,radius,stroke,fill,zIndex);
}

/**
 * @description Factory method that creates new instance of <code>EllipseElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.EllipseElement} 
 * @since version 1.0 
 */
jsgl.Panel.prototype.createEllipse=function(x,y,width,height,rotation,stroke,fill,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
  
    domPresenter=new jsgl.elements.SvgEllipseDomPresenter(this.ownerDocument);
  }
  else {

    domPresenter=new jsgl.elements.VmlEllipseDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.EllipseElement(domPresenter,this,x,y,width,height,rotation,stroke,fill,zIndex);
}

/**
 * @description Factory method that creates new instance of
 * <code>jsgl.elements.RectangleElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.RectangleElement}
 * @since version 2.0
 */
jsgl.Panel.prototype.createRectangle = function() {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
  
    domPresenter = new jsgl.elements.SvgRectangleDomPresenter(this.ownerDocument);
  }
  else {
  
    domPresenter = new jsgl.elements.VmlRectangleDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.RectangleElement(domPresenter, this);
}  

/**
 * @description Factory method that creates new instance of <code>LineElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.LineElement} 
 * @since version 1.0
 */   
jsgl.Panel.prototype.createLine=function(x1,y1,x2,y2,stroke,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {

    domPresenter=new jsgl.elements.SvgLineDomPresenter(this.ownerDocument);
  }
  else {

    domPresenter=new jsgl.elements.VmlLineDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.LineElement(domPresenter,this,x1,y1,x2,y2,stroke,zIndex);
}


/**
 * @description Factory method that creates new instance of <code>LabelElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.LabelElement} 
 * @since version 1.0
 */   
jsgl.Panel.prototype.createLabel=function(x,y,text,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
  
    domPresenter = new jsgl.elements.SvgLabelDomPresenter(this.ownerDocument);
  }
  else {
  
    domPresenter = new jsgl.elements.NonSvgLabelDomPresenter(this.ownerDocument);
  }

  return new jsgl.elements.LabelElement(domPresenter,this,x,y,text,zIndex);
}


/**
 * @description Factory method that creates new instance of <code>PolylineElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.PolylineElement} 
 * @since version 1.0  
 */
jsgl.Panel.prototype.createPolyline=function(stroke,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
    domPresenter=new jsgl.elements.SvgPolylineDomPresenter(this.ownerDocument);
  }
  else {
    domPresenter=new jsgl.elements.VmlPolylineDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.PolylineElement(domPresenter,this,stroke,zIndex);
}


/**
 * @description Factory method that creates new instance of <code>PolygonElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.PolygonElement} 
 * @since version 1.0
 */
jsgl.Panel.prototype.createPolygon=function(stroke,fill,zIndex) {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
    domPresenter=new jsgl.elements.SvgPolygonDomPresenter(this.ownerDocument);
  }
  else {
    domPresenter=new jsgl.elements.VmlPolygonDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.PolygonElement(domPresenter,this,stroke,fill,zIndex);
}

/**
 * @description Factory method that creates an instance of
 * <code>jsgl.elements.ImageElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.ImageElement}
 * @since version 2.0
 */    
jsgl.Panel.prototype.createImage = function() {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
  
    domPresenter = new jsgl.elements.SvgImageDomPresenter(this.ownerDocument);
  }
  else {
  
    domPresenter = new jsgl.elements.VmlImageDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.ImageElement(domPresenter, this);
}

/**
 * @description Factory method that creates new instance of
 * <code>jsgl.elements.CurveElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.CurveElement}
 * @since version 2.0
 */
jsgl.Panel.prototype.createCurve = function() {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
  
    domPresenter = new jsgl.elements.SvgCurveDomPresenter(this.ownerDocument);
  }
  else {
  
    domPresenter = new jsgl.elements.VmlCurveDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.CurveElement(domPresenter, this);
}     

/**
 * @description Factory method that creates instance of
 * <code>jsgl.elements.ShapeElement</code>.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.elements.ShapeElement}
 * @since version 2.0
 */     
jsgl.Panel.prototype.createShape = function() {

  var domPresenter;
  
  if(jsgl.util.BrowserInfo.supportsSvg) {
  
    domPresenter = new jsgl.elements.SvgShapeDomPresenter(this.ownerDocument);
  }
  else {
  
    domPresenter = new jsgl.elements.VmlShapeDomPresenter(this.ownerDocument);
  }
  
  return new jsgl.elements.ShapeElement(domPresenter, this);
}


////////////////////////////////////////////////

/**
 * @description Sets the new cursor for the Panel.
 * @methodOf jsgl.Panel#
 * @param {jsgl.Cursor} newCursor The new cursor.
 * @since version 2.0 
 */
jsgl.Panel.prototype.setCursor = function(newCursor) {

  this.cursor = newCursor;
  this.domPresenter.update();
}

/**
 * @description Gets the current mouse cursor used by the Panel.
 * @methodOf jsgl.Panel#
 * @returns {jsgl.Cursor} The cursor currently used.
 * @since version 2.0
 */
jsgl.Panel.prototype.getCursor = function() {

  return this.cursor;
}    


/**
 * @description Adds a listener function for handling mouse move events on the
 * panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */ 
jsgl.Panel.prototype.addMouseMoveListener = function(listener) {

  this.mouseMoveRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse move event
 * listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse move events on the panel anymore.
 * @since version 2.0
 */  
jsgl.Panel.prototype.removeMouseMoveListener = function(listener) {

  this.mouseMoveRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse move event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The mouse move event arguments object.  
 * @private
 * @since version 2.0
 */ 
jsgl.Panel.prototype.raiseMouseMove = function(eventArgs) {

  this.mouseMoveRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling mouse down events on the
 * panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */       
jsgl.Panel.prototype.addMouseDownListener = function(listener) {

  this.mouseDownRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse down event
 * listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse down events on the panel anymore.
 * @since version 2.0
 */  
jsgl.Panel.prototype.removeMouseDownListener = function(listener) {

  this.mouseDownRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse down event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The mouse down event arguments object.
 * @private
 * @since version 2.0
 */    
jsgl.Panel.prototype.raiseMouseDown = function(eventArgs) {

  this.mouseDownRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling mouse up events on the
 * panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */       
jsgl.Panel.prototype.addMouseUpListener = function(listener) {

  this.mouseUpRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse up event
 * listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse up events on the panel anymore.
 * @since version 2.0
 */      
jsgl.Panel.prototype.removeMouseUpListener = function(listener) {

  this.mouseUpRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse up event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The mouse up event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.Panel.prototype.raiseMouseUp = function(eventArgs) {

  this.mouseUpRaiser.raiseEvent(eventArgs);
}     

/**
 * @description Adds a listener function for handling mouse over events on the
 * panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */
jsgl.Panel.prototype.addMouseOverListener = function(listener) {

  this.mouseOverRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse over event
 * listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse over events on the panel anymore.
 * @since version 2.0
 */      
jsgl.Panel.prototype.removeMouseOverListener = function(listener) {

  this.mouseOverRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse over event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The mouse over event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.Panel.prototype.raiseMouseOver = function(eventArgs) {

  this.mouseOverRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling mouse out events on the
 * panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */  
jsgl.Panel.prototype.addMouseOutListener = function(listener) {

  this.mouseOutRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of mouse out event
 * listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to mouse out events on the panel anymore.
 * @since version 2.0
 */      
jsgl.Panel.prototype.removeMouseOutListener = function(listener) {

  this.mouseOutRaiser.unregisterListener(listener);
}

/**
 * @description Raises the mouse out event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The mouse out event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.Panel.prototype.raiseMouseOut = function(eventArgs) {

  this.mouseOutRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling click events on the panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */  
jsgl.Panel.prototype.addClickListener = function(listener) {

  this.clickRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of click event listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to click events on the panel anymore.
 * @since version 2.0
 */     
jsgl.Panel.prototype.removeClickListener = function(listener) {

  this.clickRaiser.unregisterListener(listener);
}

/**
 * @description Raises the click event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The click event arguments object.  
 * @private
 * @since version 2.0 
 */ 
jsgl.Panel.prototype.raiseClick = function(eventArgs) {

  this.clickRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling click events on the panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.1
 */  
jsgl.Panel.prototype.addContextMenuListener = function(listener) {

  this.contextMenuRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of click event listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listener function that should not
 * listen to click events on the panel anymore.
 * @since version 2.1
 */     
jsgl.Panel.prototype.removeContextMenuListener = function(listener) {

  this.contextMenuRaiser.unregisterListener(listener);
}

/**
 * @description Raises the click event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.MouseEvent} eventArgs The click event arguments object.  
 * @private
 * @since version 2.1 
 */ 
jsgl.Panel.prototype.raiseContextMenu = function(eventArgs) {

  this.contextMenuRaiser.raiseEvent(eventArgs);
}

/**
 * @description Adds a listener function for handling double click events on the
 * panel.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listening function. If the listener
 * should be executed as a method of some specific object,
 * <code>jsgl.util.delegate(obj, function(eventArgs) {...})</code> can be used.
 * @since version 2.0
 */ 
jsgl.Panel.prototype.addDoubleClickListener = function(listener) {

  this.dblClickRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of double click event
 * listeners.
 * @methodOf jsgl.Panel#
 * @param {function(eventArgs)} listener The listeer function that should not
 * listen to double click events on the panel anymore.
 * @since version 2.0
 */   
jsgl.Panel.prototype.removeDoubleClickListener = function(listener) {

  this.dblClickRaiser.unregisterListener(listener);
}

/**
 * @description Raises the double click event.
 * @methodOf jsgl.Panel#
 * @param {jsgl.util.MouseEvet} eventArgs The click event arguments object.
 * @private
 * @since version 2.0
 */
jsgl.Panel.prototype.raiseDoubleClick = function(eventArgs) {

  this.dblClickRaiser.raiseEvent(eventArgs);
}