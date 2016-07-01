/**
 * @fileOverview <code>jsgl.elements.VmlImageDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Vector Markup Language DOM presenter for JSGL image element.
 * @extends jsgl.elements.AbstractImageDomPresenter
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.VmlImageDomPresenter</code>
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating VML elements.
 * @since version 2.0
 */
jsgl.elements.VmlImageDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractImageDomPresenter.call(this);

  /**
   * The VML <code>&lt;rect&gt;</code> element used for rendering.
   * @type VmlRectElement
   * @private
   */
  this.vmlRectElement = ownerDocument.createElement("vml:rect");
  this.vmlRectElement.style.position = "absolute";
  this.vmlRectElement.stroked = false;

  /**
   * The VML <code>&lt;stroke&gt;</code> elements specifying the outline of the
   * image, i.e. the stroke of the <code>&lt;rect&gt;</code> object.
   * @type VmlStrokeElement
   * @private
   */
  this.vmlStrokeElement = ownerDocument.createElement("vml:stroke");
  this.vmlRectElement.appendChild(this.vmlStrokeElement);

  /**
   * The VML <code>&lt;fill&gt;</code> element specifying the image to be
   * rendered on <code>&lt;rect&gt;</code>'s background.
   * @type VmlFillElement
   * @private
   */
  this.vmlFillElement = ownerDocument.createElement("vml:fill");
  this.vmlFillElement.type = "frame";
  this.vmlFillElement.rotate = true;

  this.vmlRectElement.appendChild(this.vmlFillElement);

  this.attachMouseHandlers(this.vmlRectElement);
}
jsgl.elements.VmlImageDomPresenter.jsglExtend(
  jsgl.elements.AbstractImageDomPresenter);

/**
 * @description Gets the VML rectangle element that is used for rendering.
 * @methodOf jsgl.elements.VmlImageDomPresenter#
 * @retuns {VmlRectElement}
 * @since version 2.0
 */
jsgl.elements.VmlImageDomPresenter.prototype.getXmlElement = function() {

  return this.vmlRectElement;
}

/**
 * @description Updates the contents of the rendering VML according to the state
 * of the JSGL image element associated.
 * @methodOf jsgl.elements.VmlImageDomPresenter#
 * @private
 * @since version 2.0
 */
jsgl.elements.VmlImageDomPresenter.prototype.update = function() {

  this.loadUrl(this.graphicsElement.getUrl());

  if(!this.isLoaded) {

    window.setTimeout(jsgl.util.delegate(this, this.update), 50);
    return;
  }

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var size = this.graphicsElement.getSize(),
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

  this.vmlRectElement.style.left = trCX - size.X / 2;
  this.vmlRectElement.style.top = trCY - size.Y / 2;

  this.vmlRectElement.style.width = size.X;
  this.vmlRectElement.style.height = size.Y;

  this.vmlRectElement.style.rotation = this.graphicsElement.getRotation() % 360;

  this.vmlFillElement.src = this.graphicsElement.getUrl();
  this.vmlFillElement.opacity = this.graphicsElement.getOpacity();

  this.graphicsElement.getStroke().applyToVmlStrokeElement(this.vmlStrokeElement);
}
