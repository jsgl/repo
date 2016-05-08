/**
 * @fileOverview Declaration of <code>jsgl.panel.AbstractPanelDomPresenter</code>
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Base class for DOM implementation for <code>jsgl.Panel</code> object.
 * @constructor
 * @description Base constructor for inheriting classes.
 * @param {jsgl.Panel} panelObject The <code>jsgl.Panel</code> object to be
 * implemented in DOM.
 * @since version 2.0
 * @version 2.0 
 */ 
jsgl.panel.AbstractPanelDomPresenter = function(panelObject) {

  /**
   * The <code>jsgl.Panel</code> object to be implemented in DOM.
   * @type jsgl.Panel
   */   
  this.panelObject = panelObject;
  
  /**
   * The holder element (HTML &lt;div&gt;) of the panel.
   * @type HTMLDivElement
   */         
  this.holderElement = this.panelObject.getHolderElement();
  
  this.initMouseHandlers();
}

/**
 * @description Adds a JSGL element to the DOM.
 * @methodOf jsgl.panel.AbstractPanelDomPresenter#
 * @param {jsgl.elements.AbstractElement} element The JSGL element to be
 * added to the panel's DOM.
 * @since version 2.0    
 */ 
jsgl.panel.AbstractPanelDomPresenter.prototype.addElement = function(element) {
  throw "Not implemented";
}

/**
 * @description Removes a JSGL element from the DOM.
 * @methodOf jsgl.panel.AbstractPanelDomPresenter#
 * @param {jsgl.elements.AbstractElement} element The JSGL element to be
 * removed from the panel's DOM.
 * @since version 2.0
 */
jsgl.panel.AbstractPanelDomPresenter.prototype.removeElement = function(element) {
  throw "Not implemented";
}

/**
 * @description Removes all the elements from the DOM.
 * @methodOf jsgl.panel.AbstractPanelDomPresenter#
 * @since version 2.0
 */
jsgl.panel.AbstractPanelDomPresenter.prototype.clear = function() {
  throw "Not implemented";
}


jsgl.panel.AbstractPanelDomPresenter.prototype.update = function() {

  this.holderElement.style.cursor = this.panelObject.getCursor().asCSS;
}



jsgl.panel.AbstractPanelDomPresenter.prototype.initMouseHandlers = function() {

  this.holderElement.onclick = jsgl.util.delegate(this, function(e) {

      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseClick(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.CLICK));
      
      return false;
    });

  this.holderElement.oncontextmenu = jsgl.util.delegate(this, function(e) {

      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseContextMenu(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.CONTEXTMENU));
      
      return false;
    });

  this.holderElement.ondblclick = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseDoubleClick(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.DOUBLE_CLICK));
      
      return false;
    });
  
  this.holderElement.onmousedown = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseMouseDown(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.DOWN));
      
      return false;
    });
  
  this.holderElement.onmouseup = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseMouseUp(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.UP));
      
      return false;
    });
  
  this.holderElement.onmousemove = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseMouseMove(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.MOVE));
      
      return false;
    });
  
  this.holderElement.onmouseover = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseMouseOver(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.OVER));
      
      return false;
    });
  
  this.holderElement.onmouseout = jsgl.util.delegate(this, function(e) {
  
      if(jsgl.util.BrowserInfo.usesWindowEvent) {
        e = window.event;
      }
      
      this.panelObject.raiseMouseOut(
        jsgl.MouseEvent.fromJsglPanel(e, this.panelObject, jsgl.MouseEvent.OUT));
      
      return false;
    });
}