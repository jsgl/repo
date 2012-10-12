/**
 * @fileOverview Implementation of <code>jsgl.elements.NonSvgGroupDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 2.0
 */   

/**
 * @class HTML DIV-based DOM presenter for JSGL group element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.NonSvgGroupDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating DOM elements.
 * @since version 2.0 
 */
jsgl.elements.NonSvgGroupDomPresenter=function(ownerDocument) {

  /**
   * The HTML <code>&lt;div&gt;</code> element to be used for grouping
   * subelements. It is absolutely-positioned and zero-sized but overflowing.
   * @type HTMLDivElement
   * @private         
   */     
  this.divElement=ownerDocument.createElement("div");
  this.divElement.style.position = "absolute";
  this.divElement.style.width=this.divElement.style.height="0px";
  this.divElement.style.overflow="visible";

  this.attachMouseHandlers(this.divElement);
}
jsgl.elements.NonSvgGroupDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the <code>&lt;div&gt;</code> element that is used for embedding
 * subelements.
 * @methodOf jsgl.elements.NonSvgGroupDomPresenter
 * @returns HTMLDivElement
 * @since version 2.0
 */     
jsgl.elements.NonSvgGroupDomPresenter.prototype.getXmlElement=function() {

  return this.divElement;
}

/**
 * @description Updates attributes of the holder <code>&lt;div&gt;</code>
 * element according to group's size and z-index.
 * @methodOf jsgl.elements.NonSvgGroupDomPresenter
 * @private
 * @since version 2.0   
 */
jsgl.elements.NonSvgGroupDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  for(var i=0; i<this.graphicsElement.getElementsCount(); i++) {

    this.graphicsElement.getElementAt(i).getDomPresenter().update();
  }

  var location=this.graphicsElement.getLocation();
  this.divElement.style.left=location.X+"px";
  this.divElement.style.top=location.Y+"px";
}