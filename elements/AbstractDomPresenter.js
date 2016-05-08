/**
 * @fileOverview Declaration and implementation of <code>jsgl.elements.AbstractDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 1.0 
 */   

/**
 * @class AbstractDomPresenter class.
 * @constructor
 * @description Base constructor for any DOM presenter.
 * @since version 1.0
 * @version 2.0 
 */     
jsgl.elements.AbstractDomPresenter=function() {

  /**
   * The JSGL API element to be rendered by the presenter.
   * @type jsgl.elements.AbstractElement
   * @private
   * @since version 2.0         
   */  
  this.graphicsElement = null;

  this.refreshTimer = null;
}

/**
 * @description Returns the associated JSGL element.
 * @methodOf jsgl.elements.AbstractDomPresenter#
 * @returns {jsgl.elements.AbstractElement} 
 * @since version 1.0
 */   
jsgl.elements.AbstractDomPresenter.prototype.getGraphicsElement=function() {

  return this.graphicsElement;
}

/**
 * @description Sets the JSGL API element to be rendered by the presenter.
 * @methodOf jsgl.elements.AbstractDomPresenter#
 * @param {jsgl.elements.AbstractElement} element The JSGL API element to be
 * rendered.   
 * @since version 2.0
 */
jsgl.elements.AbstractDomPresenter.prototype.setGraphicsElement=function(element) {

  this.graphicsElement = element;
  this.getXmlElement().jsglElement = element;
  this.graphicsElement.addChangeListener(jsgl.util.delegate(this,this.invalidate));
}

/**
 * @description Returns the root XML element that is used for rendering.
 * @methodOf jsgl.elements.AbstractDomPresenter#
 * @returns HTMLElement 
 * @since version 1.0 
 */ 
jsgl.elements.AbstractDomPresenter.prototype.getXmlElement=function() {

  throw "getXmlElement(): not implemented";
}

/**
 * @description Updates the contents of rendering XML accoring to state of the
 * JSGL object associated.
 * @private 
 * @methodOf jsgl.elements.AbstractDomPresenter#
 * @since version 1.0
 * @version 2.0    
 */ 
jsgl.elements.AbstractDomPresenter.prototype.update=function() {

  this.getXmlElement().style.zIndex=this.getGraphicsElement().getZIndex();
  this.getXmlElement().style.cursor = this.getGraphicsElement().getCursor().asCSS;
}

/**
 * @description Marks the current contents of the DOM presenter as outdated.
 * In accordance with the rendering policy (<code>jsgl.IMMEDIATE_UPDATE</code>)
 * the element is refreshed either immediately or just after the envoking
 * subroutine finishes.
 * @public 
 * @methodOf jsgl.elements.AbstractDomPresenter#
 * @since version 1.0
 */  
jsgl.elements.AbstractDomPresenter.prototype.invalidate=function() {

  if(!jsgl.IMMEDIATE_UPDATE == true) {
  
    if(this.refreshTimer != null) {
    
      window.clearTimeout(this.refreshTimer);
    }
    this.refreshTimer = window.setTimeout(jsgl.util.delegate(this,this.update),0);
  }
  else {
    this.update();
  }
}


/**
 * @private
 */ 
jsgl.elements.AbstractDomPresenter.prototype.attachMouseHandlers = function(element) {

  element.onclick = jsgl.util.delegate(this, function(e) {

      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseClick(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.CLICK));
    });
  
  element.oncontextmenu = jsgl.util.delegate(this, function(e) {

      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseContextMenu(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.CONTEXTMENU));
    });
  
  element.ondblclick = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseDoubleClick(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.DOUBLE_CLICK));
    });
  
  element.onmousedown = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseMouseDown(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.DOWN));
    });
  
  element.onmouseup = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseMouseUp(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.UP));
    });
  
  element.onmousemove = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseMouseMove(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.MOVE));
    });
  
  element.onmouseover = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseMouseOver(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.OVER));
    });
  
  element.onmouseout = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.graphicsElement.raiseMouseOut(
        jsgl.MouseEvent.fromJsglElement(e, this.graphicsElement, jsgl.MouseEvent.OUT));
    });
}