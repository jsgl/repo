/**
 * @fileOverview Implementation of <code>jsgl.elements.VmlLineDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Vector Markup Language DOM presenter for the API line element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlLineDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML elements.
 * @since version 1.0
 */   
jsgl.elements.VmlLineDomPresenter = function(ownerDocument) {

  /**
   * The VML <code>&lt;line&gt;</code> element to be used for rendering.
   * @type VmlLineElement
   * @private
   */         
  this.vmlElement = ownerDocument.createElement("vml:line");
  this.vmlElement.style.position = "absolute";
  
  /**
   * The VML <code>&lt;stroke&gt;</code> element to be used for defining style
   * of the line.
   * @type VmlStrokeElement
   * @private
   */            
  this.vmlStrokeElement=ownerDocument.createElement("vml:stroke");
  this.vmlElement.appendChild(this.vmlStrokeElement);

  this.attachMouseHandlers(this.vmlElement);
}
jsgl.elements.VmlLineDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the VML <code>&lt;line&gt;</code> element that is used for
 * rendering.
 * @methodOf jsgl.elements.VmlLineDomPresenter#
 * @returns {VmlLineElement}
 * @since version 1.0
 */      
jsgl.elements.VmlLineDomPresenter.prototype.getXmlElement = function() {

  return this.vmlElement;
}

/**
 * @description Gets the VML <code>&lt;stroke&gt;</code> subelement that defines
 * style of the line.
 * @methodOf jsgl.elements.VmlLineDomPresenter#
 * @returns {VmlStrokeElement}
 * @since version 1.0
 */     
jsgl.elements.VmlLineDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Updates the contents of rendering VML according to the state
 * of the API line object associated.
 * @methodOf jsgl.elements.VmlLineDomPresenter#
 * @since version 1.0
 */    
jsgl.elements.VmlLineDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  this.vmlElement.from = this.graphicsElement.getStartPoint().toString();
  this.vmlElement.to = this.graphicsElement.getEndPoint().toString();

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
}