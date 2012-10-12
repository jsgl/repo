/**
 * @fileOverview Implementation of jsgl.elements.VmlEllipseDomPresenter.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Vector Markup Language DOM presenter for JSGL ellipse element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlEllipseDomPresenter</code>
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating VML elements.
 * @since version 1.0
 */       
jsgl.elements.VmlEllipseDomPresenter=function(ownerDocument) {

  /**
   * The VML shape element to be used for rendering ellipse. Note that general
   * <code>vml:shape</code> is used instead of <code>vml:oval</code> to achieve
   * perfect similarity with SVG version.
   * @type VmlShapeElement
   * @private
   */                 
  this.vmlElement=ownerDocument.createElement("vml:shape");
  this.vmlElement.style.position="absolute";
  
  /**
   * The VML stroke subelement.
   * @type VmlStrokeElement
   * @private
   */           
  this.vmlStrokeElement=ownerDocument.createElement("vml:stroke");
  
  /**
   * The VML fill subelement.
   * @type VmlFillElement
   * @private
   */           
  this.vmlFillElement=ownerDocument.createElement("vml:fill");
  
  this.vmlElement.appendChild(this.vmlStrokeElement);
  this.vmlElement.appendChild(this.vmlFillElement);
  
  this.attachMouseHandlers(this.vmlElement);
}
jsgl.elements.VmlEllipseDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the root VML element that is used for rendering
 * the ellipse.
 * @methodOf jsgl.elements.VmlEllipseDomPresenter#
 * @returns VmlShapeElement
 * @since version 1.0
 */  
jsgl.elements.VmlEllipseDomPresenter.prototype.getXmlElement=function() {

  return this.vmlElement;
}

/**
 * @description Gets the stroke VML subelement that is used for defining
 * ellipse's outline.
 * @methodOf jsgl.elements.VmlEllipseDomPresenter#
 * @returns VmlStrokeElement
 * @since version 1.0
 */     
jsgl.elements.VmlEllipseDomPresenter.prototype.getStrokeElement=function() {

  return this.vmlStrokeElement;
}

/**
 * @description Get the fill VML subelement that is used for defining
 * ellipse's interior.
 * @methodOf jsgl.elements.VmlEllipseDomPresenter#
 * @returns VmlFillElement
 * @since version 1.0
 */   
jsgl.elements.VmlEllipseDomPresenter.prototype.getFillElement=function() {

  return this.vmlFillElement;
}

/**
 * @description Updates the contents of rendeting VML according to the state
 * of the JSGL ellipse element associated.
 * @methodOf jsgl.elements.VmlEllipseDomPresenter#
 * @private
 * @since version 1.0
 * @version 2.0  
 */     
jsgl.elements.VmlEllipseDomPresenter.prototype.update=function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var location=this.graphicsElement.getCenterLocation(),
      size=this.graphicsElement.getSize();
  
  this.vmlElement.style.left=(location.X - size.X/2);
  this.vmlElement.style.top=(location.Y - size.Y/2);
  this.vmlElement.style.width=size.X + "px";
  this.vmlElement.style.height=size.Y + "px";
  this.vmlElement.style.rotation=this.graphicsElement.getRotation();
    
  this.vmlElement.coordsize=10*size.X + " " + 10*size.Y;
  this.vmlElement.path="m" + Math.round(10*size.X) + " " + Math.round(5*size.Y) +
    "qy" + Math.round(5*size.X) + " " + Math.round(10*size.Y) + "qx0 " +
    Math.round(5*size.Y) + "qy" + Math.round(5*size.X) + " 0qx" + Math.round(10*size.X) +
    " " + Math.round(5*size.Y) + "xe";
  
  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
  this.graphicsElement.getFill().applyToVmlFillElement(this.vmlFillElement);
}