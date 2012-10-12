/**
 * @fileOverview Implementation of <code>jsgl.elements.VmlCircleDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Vector Markup Language DOM presenter for JSGL circle element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlCircleDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML elements.
 * @since version 1.0
 */  
jsgl.elements.VmlCircleDomPresenter = function(ownerDocument) {

  /**
   * The VML shape element to be used for rendering circle. Note that general
   * <code>&lt;shape&gt;</code> is used instead of <code>&lt;oval&gt;</code> to
   * achieve perfect similarity with SVG version.
   * @type VmlShapeElement
   * @private
   */   
  this.vmlElement = ownerDocument.createElement("vml:shape");
  this.vmlElement.style.position = "absolute";
  
  /**
   * The VML stroke subelement.
   * @type VmlStrokeElement
   * @private
   */           
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlElement.appendChild(this.vmlStrokeElement);
    
  /**
   * The VML fill subelement.
   * @type VmlFillElement
   * @private
   */           
  this.vmlFillElement = ownerDocument.createElement("vml:fill");
  this.vmlElement.appendChild(this.vmlFillElement);
  
  this.attachMouseHandlers(this.vmlElement);
}
jsgl.elements.VmlCircleDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the root VML element that is used for rendering the circle.
 * @methodOf jsgl.elements.VmlCircleDomPresenter#
 * @returns VmlShapeElement
 * @since version 1.0
 */    
jsgl.elements.VmlCircleDomPresenter.prototype.getXmlElement = function() {

  return this.vmlElement;
}

/**
 * @description Gets the stroke VML subelement that is used for defining
 * circle's outline.
 * @methodOf jsgl.elements.VmlCircleDomPresenter#
 * @returns VmlStrokeElement
 * @since version 1.0
 */     
jsgl.elements.VmlCircleDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Get the fill VML subelement that is used for defining
 * circle's interior.
 * @methodOf jsgl.elements.VmlCircleDomPresenter#
 * @returns VmlFillElement
 * @since version 1.0
 */  
jsgl.elements.VmlCircleDomPresenter.prototype.getFillElement = function() {

  return this.vmlFillElement;
}

/**
 * @description Updates the contents of rendering VML according to the state
 * of the JSGL circle element associated.
 * @methodOf jsgl.elements.VmlCircleDomPresenter#
 * @private
 * @since version 1.0
 * @version 2.0
 */
jsgl.elements.VmlCircleDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var location = this.graphicsElement.getCenterLocation(),
      radius = this.graphicsElement.getRadius();

  this.vmlElement.style.left = (location.X - radius) + "px";
  this.vmlElement.style.top = (location.Y - radius) + "px";
  this.vmlElement.style.width = this.vmlElement.style.height=2*radius + "px";
  
  this.vmlElement.coordsize = 20*radius + " " + 20*radius;
  
  this.vmlElement.path = "m" + Math.round(20*radius) + " " + Math.round(10*radius) +
    "qy" + Math.round(10*radius) + " " + Math.round(20*radius) + "qx0 " +
    Math.round(10*radius) + "qy" + Math.round(10*radius) + " 0qx" + Math.round(20*radius) +
    " " + Math.round(10*radius) + "xe";
  
  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
  this.graphicsElement.getFill().applyToVmlFillElement(this.vmlFillElement);
}