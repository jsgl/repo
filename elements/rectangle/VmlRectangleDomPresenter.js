/**
 * @fileOverview <code>jsgl.elements.VmlRectangleDomPresenter</code>
 * implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Vector Markup Language DOM presenter for JSGL image element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.VmlRectangleDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XML document to be used for
 * creating VML elements.
 * @since version 2.0
 */
jsgl.elements.VmlRectangleDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);

  /**
   * The VML <code>&lt;shape&gt;</code> element to be used for rendering. Note
   * that general <code>&lt;shape&gt;</code> element is used instead of VML
   * <code>&lt;roundrect&gt;</code>, most notable because <code>&lt;roundrect&gt;</code>
   * does not support rounding for x- and y-axis separately.
   * @type VmlShapeElement
   * @private
   */
  this.vmlShapeElement = document.createElement("vml:shape");
  this.vmlShapeElement.style.position = "absolute";

  /**
   * The VML <code>&lt;stroke&gt;</code> subelement that specifies style of the
   * rectangle's outline.
   * @type VmlStrokeElement
   * @private
   */
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlShapeElement.appendChild(this.vmlStrokeElement);

  /**
   * The VML <code>&lt;fill&gt;</code> subelement that specifies style
   * of the rectangle's interior.
   * @type VmlFillElement
   * @private
   */
  this.vmlFillElement = ownerDocument.createElement("vml:fill");
  this.vmlShapeElement.appendChild(this.vmlFillElement);

  this.attachMouseHandlers(this.vmlShapeElement);
}
jsgl.elements.VmlRectangleDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the VML <code>&lt;shape&gt;</code> element that is used
 * for rendering the rectangle.
 * @methodOf jsgl.elements.VmlRectangleDomPresenter#
 * @returns VmlShapeElement
 * @since version 2.0
 */
jsgl.elements.VmlRectangleDomPresenter.prototype.getXmlElement = function() {

  return this.vmlShapeElement;
}

/**
 * @description Gets the VML <code>&lt;stroke&gt;</code> subelement that is used
 * for defining rectangle's outline.
 * @methodOf jsgl.elements.VmlRectangleDomPresenter#
 * @returns VmlStrokeElement
 * @since version 2.0
 */
jsgl.elements.VmlRectangleDomPresenter.prototype.getStrokeElement = function() {

  return this.vmlStrokeElement;
}

/**
 * @description Get the fill VML subelement that is used for defining
 * rectangle's interior.
 * @methodOf jsgl.elements.VmlRectangleDomPresenter#
 * @returns VmlFillElement
 * @since version 2.0
 */
jsgl.elements.VmlRectangleDomPresenter.prototype.getFillElement = function() {

  return this.vmlFillElement;
}

/**
 * @description Updates the contents of rendering VML according to the state
 * of the API rectangle object associated.
 * @methodOf jsgl.elements.VmlRectangleDomPresenter#
 * @since version 2.0
 */
jsgl.elements.VmlRectangleDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  // cooperates with Number.prototype.jsglVmlize()

  var size = this.graphicsElement.getSize(),
      radii = new jsgl.Vector2D(
        Math.min(this.graphicsElement.getXRadius(), size.X/2),
        Math.min(this.graphicsElement.getYRadius(), size.Y/2)),
      location = this.graphicsElement.getLocation();


  var dPhi = Math.PI * this.graphicsElement.getRotation() / 180;

  var origCX = 0, origCY = 0;

  switch(this.graphicsElement.getHorizontalAnchor()) {

    case jsgl.HorizontalAnchor.LEFT:

      origCX = location.X + size.X/2;
      break;

    case jsgl.HorizontalAnchor.CENTER:

      origCX = location.X;
      break;

    case jsgl.HorizontalAnchor.RIGHT:

      origCX = location.X - size.X/2;
      break;
  }

  switch(this.graphicsElement.getVerticalAnchor()) {

    case jsgl.VerticalAnchor.TOP:

      origCY = location.Y + size.Y/2;
      break;

    case jsgl.VerticalAnchor.MIDDLE:

      origCY = location.Y;
      break;

    case jsgl.VerticalAnchor.BOTTOM:

      origCY = location.Y - size.Y/2;
      break;
  }

  var origPhi = Math.atan2(origCY - location.Y, origCX - location.X);

  var d = jsgl.Vector2D.getDistance(location, new jsgl.Vector2D(origCX, origCY));

  var trCX = location.X + Math.cos(origPhi + dPhi) * d;
  var trCY = location.Y + Math.sin(origPhi + dPhi) * d;

  this.vmlShapeElement.style.left = trCX - size.X / 2;
  this.vmlShapeElement.style.top = trCY - size.Y / 2;


  this.vmlShapeElement.coordsize = size.X.jsglVmlize() + " " + size.Y.jsglVmlize();
  this.vmlShapeElement.style.width = size.X;
  this.vmlShapeElement.style.height = size.Y;


  /* During path string computation, redundant qy and qx segments need to be
     removed in case of zero radii, because they affect join style of the
     rectangles's stroke in the corners. */
  var rounded = radii.X > 0 && radii.Y > 0;

  var pathStr = "m" + radii.X.jsglVmlize() + ",0";

  pathStr += "l" + (size.X - (rounded ? radii.X : 0)).jsglVmlize() + ",0";

  if(rounded) {

    pathStr += "qx" + size.X.jsglVmlize() + "," + radii.Y.jsglVmlize();
  }

  pathStr += "l" + size.X.jsglVmlize() + "," + (size.Y - (rounded ? radii.Y : 0)).jsglVmlize();

  if(rounded) {

    pathStr += "qy" + (size.X - radii.X).jsglVmlize() + "," + size.Y.jsglVmlize();
  }

  pathStr += "l" + radii.X.jsglVmlize() + "," + size.Y.jsglVmlize();

  if(rounded) {

    pathStr += "qx0," + (size.Y - radii.Y).jsglVmlize();
  }

  pathStr += "l0," + radii.Y.jsglVmlize();

  if(rounded) {

    pathStr += "qy" + radii.X.jsglVmlize() + ",0";
  }

  pathStr += "ex";

  this.vmlShapeElement.rotation = this.graphicsElement.getRotation();

  this.vmlShapeElement.path = pathStr;

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
  this.graphicsElement.getFill().applyToVmlFillElement(this.vmlFillElement);
}
