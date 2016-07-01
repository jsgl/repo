/**
 * @fileOverview <code>jsgl.elements.SvgImageDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Scalable Vector Graphics DOM presenter for JSGL image element.
 * @extends jsgl.elements.AbstractImageDomPresenter
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.SvgImageDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating SVG elements.
 * @since version 2.0
 */
jsgl.elements.SvgImageDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractImageDomPresenter.call(this);

  /**
   * The SVG <code>&lt;g&gt;</code> element which hold the image and the rectangle
   * which is used for painting eventual outline.
   * @type SVGGElement
   * @private
   */
  this.svgGElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg","g");

  /**
   * The SVG image element.
   * @type SVGImageElement
   * @private
   */
  this.svgImageElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg","image");
  this.svgImageElement.setAttribute('preserveAspectRatio', 'none');
  this.svgGElement.appendChild(this.svgImageElement);

  /**
   * The SVG rectangle element used for painting eventual outline of the image.
   * @type SVGRectElement
   * @private
   */
  this.svgRectElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg","rect");
  this.svgRectElement.style.setProperty("fill", "none", null);
  this.svgGElement.appendChild(this.svgRectElement);


  this.attachMouseHandlers(this.svgGElement);
}
jsgl.elements.SvgImageDomPresenter.jsglExtend(
  jsgl.elements.AbstractImageDomPresenter);

/**
 * @description Gets the SVG <code>&lt;g&gt;</code> element that is used
 * for rendering.
 * @methodOf jsgl.elements.SvgImageDomPresenter#
 * @returns SVGGElement
 * @since version 2.0
 */
jsgl.elements.SvgImageDomPresenter.prototype.getXmlElement = function() {

  return this.svgGElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the JSGL image element associated.
 * @methodOf jsgl.elements.SvgImageDomPresenter#
 * @private
 * @since version 2.0
 */
jsgl.elements.SvgImageDomPresenter.prototype.update = function() {

  this.loadUrl(this.graphicsElement.getUrl());

  if(!this.isLoaded) {

    window.setTimeout(jsgl.util.delegate(this, this.update), 50);
    return;
  }

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  var size = this.graphicsElement.getSize(),
      location = this.graphicsElement.getLocation();

  var x = 0, y = 0;

  switch(this.graphicsElement.getHorizontalAnchor()) {

    case jsgl.HorizontalAnchor.LEFT:

      x = location.X;
      break;

    case jsgl.HorizontalAnchor.CENTER:

      x = location.X - size.X / 2;
      break;

    case jsgl.HorizontalAnchor.RIGHT:

      x = location.X - size.X;
      break;
  }

  switch(this.graphicsElement.getVerticalAnchor()) {

    case jsgl.VerticalAnchor.TOP:

      y = location.Y;
      break;

    case jsgl.VerticalAnchor.MIDDLE:

      y = location.Y - size.Y / 2;
      break;

    case jsgl.VerticalAnchor.BOTTOM:

      y = location.Y - size.Y;
      break;
  }

  this.svgImageElement.setAttribute("x", x);
  this.svgRectElement.setAttribute("x", x);

  this.svgImageElement.setAttribute("y", y);
  this.svgRectElement.setAttribute("y", y);

  this.svgImageElement.setAttribute("width", size.X);
  this.svgRectElement.setAttribute("width", size.X);

  this.svgImageElement.setAttribute("height", size.Y);
  this.svgRectElement.setAttribute("height", size.Y);

  this.svgImageElement.setAttributeNS("http://www.w3.org/1999/xlink","href", this.graphicsElement.getUrl());

  this.svgGElement.setAttribute("transform",
    "rotate(" + this.graphicsElement.getRotation() +
    "," + location.X + "," + location.Y + ")");

  this.svgImageElement.style.opacity = this.graphicsElement.getOpacity();

  this.graphicsElement.getStroke().applyToSvgElement(this.svgRectElement);
}
