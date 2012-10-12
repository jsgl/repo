/**
 * @fileOverview Implementation of <code>jsgl.elements.VmlPolygonDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Vector Markup Language DOM presenter for the JSGL polygon element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlPolygonDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML element.
 * @since version 1.0
 * @version 2.0
 */    
jsgl.elements.VmlPolygonDomPresenter = function(ownerDocument) {

  /**
   * The VML <code>&lt;shape&gt;</code> element to be used for rendering the
   * polyline. Note that general <code>&lt;shape&gt;</code> element is used
   * instead of VML <code>&lt;polygon&gt;</code> because of several bugs in
   * MSIE's implementation of the VML DOM interface.
   * @type VmlShapeElement
   * @private
   */            
  this.vmlElement = ownerDocument.createElement("vml:shape");
  this.vmlElement.style.position = "absolute";

  /**
   * The VML <code>&lt;stroke&gt;</code> subelement used to define the outline
   * of the polygon.
   * @type VmlStrokeElement
   * @private
   */               
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlElement.appendChild(this.vmlStrokeElement);

  /**
   * The VML <code>&lt;fill&gt;</code> subelement used to define the interior
   * of the polygon.
   * @type VmlFillElement
   * @private
   */            
  this.vmlFillElement = ownerDocument.createElement("vml:fill");
  this.vmlElement.appendChild(this.vmlFillElement);
  
  this.attachMouseHandlers(this.vmlElement);
}
jsgl.elements.VmlPolygonDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the root VML <code>&lt;shape&gt;</code> element that is
 * used for rendering the polygon.
 * @methodOf jsgl.elements.VmlPolygonDomPresenter
 * @returns {VmlShapeElement}
 * @since version 1.0
 */
jsgl.elements.VmlPolygonDomPresenter.prototype.getXmlElement = function() {

  return this.vmlElement;
}

/**
 * @description Gets the VML <code>&lt;stroke&lt;</code> element that is used
 * for defining the style of polygon's outline.
 * @methodOf jsgl.elements.VmlPolygonDomPresenter#
 * @returns {VmlStrokeElement}
 * @since version 1.0
 */
jsgl.elements.VmlPolygonDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Gets the VML <code>&lt;fill&gt;</code> element that is used
 * for defining the style of polygon's interior.
 * @methodOf jsgl.elements.VmlPolygonDomPresenter#
 * @returns {VmlFillElement}
 * @since version 1.0
 */ 
jsgl.elements.VmlPolygonDomPresenter.prototype.getFillElement = function() {

  return this.vmlFillElement;
}

/**
 * @description Updates the contents of rendering VML in accordance with the
 * state of the API polygon element associated.
 * @methodOf jsgl.elements.VmlPolygonDomPresenter#
 * @since version 1.0
 */    
jsgl.elements.VmlPolygonDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var pointsCount=this.graphicsElement.getPointsCount();

  if(pointsCount < 2) {

    this.vmlElement.path = "";
    this.vmlElement.style.width = this.vmlElement.style.height = "0px";
    return;
  }

  var currentPoint = this.graphicsElement.getPointAt(0);

  var left = currentPoint.X,
      right = currentPoint.X,
      top = currentPoint.Y,
      bottom = currentPoint.Y,
      pathString="M"+currentPoint.X.jsglVmlize()+" "+currentPoint.Y.jsglVmlize();
  
  for(var i=0; i<pointsCount; i++) {

    currentPoint = this.graphicsElement.getPointAt(i);
    
    if(left > currentPoint.X) {

      left = currentPoint.X;
    }
    
    if(right < currentPoint.X) {

      right = currentPoint.X;
    }
    
    if(top > currentPoint.Y) {

      top = currentPoint.Y;
    }
    
    if(bottom < currentPoint.Y) {

      bottom = currentPoint.Y;
    }

    pathString += "l"+currentPoint.X.jsglVmlize()+" "+currentPoint.Y.jsglVmlize();
  }

  pathString += "xe";
  
  this.vmlElement.coordsize = (right-left).jsglVmlize()+" "+(bottom-top).jsglVmlize();
  this.vmlElement.setAttribute("path", pathString);
  this.vmlElement.style.width = (right-left)+"px";
  this.vmlElement.style.height = (bottom-top)+"px";

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
  this.graphicsElement.getFill().applyToVmlFillElement(this.vmlFillElement);

  //this.vmlElement.parentNode.replaceChild(this.vmlElement,this.vmlElement);
}