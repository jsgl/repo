/**
 * @fileOverview <code>jsgl.elements.VmlCurveDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Vector Markup Language DOM presenter for the API curve element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlCurveDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML elements.
 * @since version 2.0
 */
jsgl.elements.VmlCurveDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);
  
  /**
   * The VML <code>&lt;curve&gt;</code> element to be used for rendering.
   * @type VmlCurveElement
   * @private
   */
  this.vmlCurveElement = ownerDocument.createElement("vml:curve");
  this.vmlCurveElement.style.position = "absolute";
  
  /**
   * The VML <code>&lt;stroke&gt;</code> subelement.
   * @type VmlStrokeElement
   * @private
   */
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlCurveElement.appendChild(this.vmlStrokeElement);
    
  /**
   * The VML <code>&lt;fill&gt;</code> subelement.
   * @type VmlFillElement
   * @private
   */           
  this.vmlFillElement = ownerDocument.createElement("vml:fill");
  this.vmlCurveElement.appendChild(this.vmlFillElement);

  this.attachMouseHandlers(this.vmlCurveElement);           
}
jsgl.elements.VmlCurveDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the VML <code>&lt;curve&gt;</code> element that is used for
 * rendering the curve.
 * @methodOf jsgl.elements.VmlCurveDomPresenter#
 * @returns VmlCurveElement   
 * @since version 2.0
 */
jsgl.elements.VmlCurveDomPresenter.prototype.getXmlElement = function() {

  return this.vmlCurveElement;
}

/**
 * @description Gets the VML <code>&lt;stroke&gt;</code> subelement that is used
 * for styling interior of the curve.
 * @methodOf jsgl.elements.VmlCurveDomPresenter#
 * @returns VmlStrokeElement
 * @since version 2.0
 */     
jsgl.elements.VmlCurveDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Get the VML <code>&lt;fill&gt;</code> subelement that is used
 * for styling interior of the curve.
 * @methodOf jsgl.elements.VmlCurveDomPresenter#
 * @returns VmlFillElement
 * @since version 2.0
 */  
jsgl.elements.VmlCurveDomPresenter.prototype.getFillElement = function() {

  return this.vmlFillElement;
}

/**
 * @description Updates the contents of rendering VML in accordance with the
 * state of the API curve object associated.
 * @methodOf jsgl.elements.VmlCurveDomPresenter#
 * @since version 2.0
 */
jsgl.elements.VmlCurveDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);
  
  this.vmlCurveElement.from = this.graphicsElement.getStartPoint().toString()
  this.vmlCurveElement.control1 = this.graphicsElement.getControl1Point().toString();
  this.vmlCurveElement.control2 = this.graphicsElement.getControl2Point().toString();
  this.vmlCurveElement.to = this.graphicsElement.getEndPoint().toString();

  /*this.vmlShapeElement.path = "m" + this.graphicsElement.getStartX().jsglVmlize() +
    "," + this.graphicsElement.getStartY().jsglVmlize() +
    "l" + this.graphicsElement.getControl1X().jsglVmlize() +
    "," + this.graphicsElement.getControl1Y().jsglVmlize() +
    "l" + this.graphicsElement.getControl2X().jsglVmlize() +
    "," + this.graphicsElement.getControl2Y().jsglVmlize() +
    "l" + this.graphicsElement.getEndX().jsglVmlize() +
    "," + this.graphicsElement.getEndY().jsglVmlize() + "e";
  
  this.vmlShapeElement.coordsize = (100).jsglVmlize() + " " + (100).jsglVmlize();
  this.vmlShapeElement.style.width = this.vmlShapeElement.style.height = "100px";*/

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
  this.graphicsElement.getFill().applyToVmlFillElement(this.vmlFillElement);
} 