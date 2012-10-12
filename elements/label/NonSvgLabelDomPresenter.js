/**
 * @fileOverview <code>jsgl.elements.NonSvgLabelDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */
 
/**
 * @class Non-SVG, HTML-based DOM presenter for JSGL label element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.NonSvgLabelDomPresenter</code>.
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating HTML elements.
 * @since version 2.0
 */
jsgl.elements.NonSvgLabelDomPresenter=function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);

  /**
   * The HTML <code>&lt;nobr&gt;</code> element that is used for rendering.
   * @type HTMLNobrElement
   * @private
   */      
  this.spanElement=ownerDocument.createElement("nobr");

  /**
   * The child text node of the HTML <code>&lt;nobr&gt;</code> element.
   * @type HTMLTextNode
   * @private
   */           
  this.spanTextNode=ownerDocument.createTextNode("");

  this.spanElement.appendChild(this.spanTextNode);
  this.spanElement.style.position="absolute";

  this.attachMouseHandlers(this.spanElement);
}
jsgl.elements.NonSvgLabelDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the HTML <code>&lt;nobr&gt;</code> element that is used
 * to render the label.
 * @methodOf jsgl.elements.NonSvgLabelDomPresenter#
 * @returns HTMLNobrElement
 * @since version 2.0
 */     
jsgl.elements.NonSvgLabelDomPresenter.prototype.getXmlElement = function() {

  return this.spanElement;
}

/**
 * @description Updates the contents and CSS properties of the <code>&lt;nobr&gt;</code>
 * HTML element according to the state of the associated JSGL label element.
 * @methodOf jsgl.elements.NonSvgLabelDomPresenter#
 * @since version 2.0
 */  
jsgl.elements.NonSvgLabelDomPresenter.prototype.update=function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  this.spanTextNode.nodeValue=this.graphicsElement.getText();
  this.spanElement.style.fontFamily=this.graphicsElement.getFontFamily();
  this.spanElement.style.color=this.graphicsElement.getFontColor();
  
  var underlined=this.graphicsElement.getUnderlined(),
      overlined=this.graphicsElement.getOverlined(),
      struckThrough=this.graphicsElement.getStruckThrough(),
      decorationString="";

  if(underlined) decorationString="underline";

  if(overlined) {

    if(decorationString) {

      decorationString += " overline";
    }
    else {

      decorationString = "overline";
    }
  }

  if(struckThrough) {
    if(decorationString) {

      decorationString+=" line-through";
    }
    else {

      decorationString="line-through";
    }
  }
  
  this.spanElement.style.fontSize = this.graphicsElement.getFontSize()+"px";
  this.spanElement.style.textDecoration = decorationString;
  this.spanElement.style.fontWeight = this.graphicsElement.getBold()?"bold":"normal";
  this.spanElement.style.fontStyle = this.graphicsElement.getItalics()?"italic":"normal";
  
  if(jsgl.util.BrowserInfo.isMSIElte7) {
    if(this.graphicsElement.getOpacity() != 1) {
      this.spanElement.style.filter = 'alpha(opacity=' +
        Math.round(100*this.graphicsElement.getOpacity()) + ')';
    }
    else {
      this.spanElement.style.filter = '';
    }
  }
  else {
    this.spanElement.style.opacity = this.graphicsElement.getOpacity();
  }

  /*
   * After all the properties affecting size of the label (text, font size etc.)
   * are set, compute the X and Y offset according to vertical and horizontal
   * anchors using clientWidth and clientHeight.
   */

  switch(this.graphicsElement.getHorizontalAnchor()) {

    case jsgl.HorizontalAnchor.LEFT:

      this.spanElement.style.left=this.graphicsElement.getX() + "px";
      break;

    case jsgl.HorizontalAnchor.RIGHT:

      this.spanElement.style.left=(this.graphicsElement.getX() - this.spanElement.clientWidth) + "px";
      break;

    case jsgl.HorizontalAnchor.CENTER:
      this.spanElement.style.left=(this.graphicsElement.getX() - this.spanElement.clientWidth / 2) + "px";
      break;
  }
  
  switch(this.graphicsElement.getVerticalAnchor()) {

    case jsgl.VerticalAnchor.TOP:

      this.spanElement.style.top=this.graphicsElement.getY() + "px";
      break;

    case jsgl.VerticalAnchor.BOTTOM:

      this.spanElement.style.top=(this.graphicsElement.getY() - this.spanElement.clientHeight) + "px";
      break;

    case jsgl.VerticalAnchor.MIDDLE:

      this.spanElement.style.top=(this.graphicsElement.getY() - this.spanElement.clientHeight / 2) + "px";
      break;
  }
}