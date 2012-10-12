/**
 * @fileOverview Implementation of <code>jsgl.elements.VmlShapeDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 2.0  
 */

/**
 * @class Vector Markup Language DOM presenter for JSGL shape element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlShapeDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML elements.
 * @since version 2.0
 */   
jsgl.elements.VmlShapeDomPresenter = function(ownerDocument) {

  /**
   * The VML <code>&lt;shape&gt;</code> element to be used for rendering.
   * @type VmlShapeElement
   * @private
   */
  this.vmlShapeElement = document.createElement("vml:shape");
  this.vmlShapeElement.style.position = "absolute";
  
  // cooperates with Number.prototype.jsglVmlize()
  this.vmlShapeElement.coordsize = (1).jsglVmlize() + " " + (1).jsglVmlize();
  this.vmlShapeElement.style.width = this.vmlShapeElement.style.height = 1;

  /**
   * The VML <code>&lt;stroke&gt;</code> subelement that specifies style
   * of the shape's outline.   
   * @type VmlStrokeElement
   * @private
   */
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlShapeElement.appendChild(this.vmlStrokeElement);
  
  /**
   * The VML <code>&lt;fill&gt;</code> subelement that specifies style
   * of the shape's interior.
   * @type VmlFillElement
   * @private
   */
  this.vmlFillElement = ownerDocument.createElement("vml:fill");
  this.vmlShapeElement.appendChild(this.vmlFillElement);
  
  this.attachMouseHandlers(this.vmlShapeElement);
}
jsgl.elements.VmlShapeDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the VML <code>&lt;shape&gt;</code> element that is used
 * for rendering.
 * @methodOf jsgl.elements.VmlShapeDomPresenter#
 * @returns VmlShapeElement
 * @since version 2.0
 */    
jsgl.elements.VmlShapeDomPresenter.prototype.getXmlElement = function() {

  return this.vmlShapeElement;
}

/**
 * @description Gets the VML <code>&lt;stroke&gt;</code> subelement that is used
 * for defining shape's outline.
 * @methodOf jsgl.elements.VmlShapeDomPresenter#
 * @returns VmlStrokeElement
 * @since version 1.0
 */
jsgl.elements.VmlShapeDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Get the fill VML subelement that is used for defining
 * shape's interior.
 * @methodOf jsgl.elements.VmlShapeDomPresenter#
 * @returns VmlFillElement
 * @since version 1.0
 */  
jsgl.elements.VmlShapeDomPresenter.prototype.getFillElement = function() {

  return this.vmlFillElement;
}

/**
 * @description Updates the contents of rendering VML according to the state
 * of the API shape element associated. Because it is generally a difficult
 * task to render SVG path using VML, various hacks are employed.  
 * @methodOf jsgl.elements.VmlShapeDomPresenter#
 * @private
 * @since version 2.0
 */
jsgl.elements.VmlShapeDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);
  
  var pathStr = "",
      pathSize = this.graphicsElement.getPathSize();
  
  var pathHistory = {
  
      currLoc: new jsgl.Vector2D(),
      lastStart: new jsgl.Vector2D()
    };

  for(var i=0; i<pathSize; i++) {
  
    var pathSegment = this.graphicsElement.getPathSegmentAt(i);

    pathStr += pathSegment.toVmlCommand(pathHistory);


    if(pathSegment.isCubicBezier()) {
    
      pathHistory.lastCBCtl = pathSegment.getCBControlPoint(pathHistory);
    }
    else {
    
      pathHistory.lastCBCtl = pathSegment.getNewLocation(pathHistory);
    }
    
    if(pathSegment.isQuadraticBezier()) {
    
      pathHistory.lastQBCtl = pathSegment.getQBControlPoint(pathHistory);
    }
    else {
    
      pathHistory.lastQBCtl = pathSegment.getNewLocation(pathHistory);
    }


    if(!pathSegment.closesSubpath()) {

      pathHistory.currLoc = pathSegment.getNewLocation(pathHistory);
    }
    else {
    
      pathHistory.currLoc = jsgl.cloneObject(pathHistory.lastStart);
    }

    if(pathSegment.startsNewSubpath()) {
    
      pathHistory.lastStart = jsgl.cloneObject(pathHistory.currLoc);
    }
  }

  this.vmlShapeElement.path = pathStr;

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
  this.graphicsElement.getFill().applyToVmlFillElement(this.vmlFillElement);
}