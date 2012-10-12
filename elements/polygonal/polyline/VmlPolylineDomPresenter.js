/**
 * @fileOverview Implementation of <code>jsgl.elements.VmlPolylineDomPresenter</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Vector Markup Language DOM presenter for the JSGL polyline element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.VmlPolylineDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML elements.
 * @since version 1.0
 * @version 2.0 
 */   
jsgl.elements.VmlPolylineDomPresenter=function(ownerDocument) {

  /**
   * The VML <code>&lt;shape&gt;</code> element to be used for rendering the polyline.
   * Note that general <code>&lt;shape&gt;</code> element is used instead of
   * VML <code>&lt;polygon&gt;</code> due to several bugs in MSIE's implementation
   * of VML DOM interface.   
   * @type VmlShapeElement
   * @private
   */
  this.vmlElement = ownerDocument.createElement("vml:shape");
  this.vmlElement.style.position = "absolute";
  
  /**
   * The VML <code>&lt;stroke&gt;</code> subelement used to define the style
   * of the polyline.      
   * @type VmlStrokeElement
   * @private
   */            
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlElement.appendChild(this.vmlStrokeElement);
  
  this.vmlElement.filled = "no";

  this.attachMouseHandlers(this.vmlElement);
}
jsgl.elements.VmlPolylineDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the root VML <code>&lt;shape&gt;</code> element that is
 * used for rendering the polyline.
 * @methodOf jsgl.elements.VmlPolylineDomPresenter
 * @returns {VmlShapeElement}
 * @since version 1.0
 */   
jsgl.elements.VmlPolylineDomPresenter.prototype.getXmlElement = function() {

  return this.vmlElement;
}

/**
 * @description Gets the VML <code>&lt;stroke&lt;</code> element that is used
 * for defining polyline's style.
 * @methodOf jsgl.elements.VmlPolylineDomPresenter
 * @returns {VmlStrokeElement}
 * @since version 1.0
 */
jsgl.elements.VmlPolylineDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Updates the contents of the rendering VML according to the
 * state of the API polyline object associated.
 * @methodOf jsgl.elements.VmlPolylineDomPresenter
 * @since version 1.0 
 */    
jsgl.elements.VmlPolylineDomPresenter.prototype.update=function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var pointsCount = this.graphicsElement.getPointsCount();

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
      pathString = "m"+Math.round(currentPoint.X)+" "+Math.round(currentPoint.Y);
  
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

    pathString += "l"+Math.round(currentPoint.X)+","+Math.round(currentPoint.Y);
  }

  pathString += "e";

  this.vmlElement.setAttribute("path", pathString);
  this.vmlElement.coordsize = (right-left)*100+" "+(bottom-top)*100;
  this.vmlElement.style.width = (right-left)*100+"px";
  this.vmlElement.style.height = (bottom-top)*100+"px";

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
}