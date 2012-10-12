/**
 * @fileOverview <code>jsgl.elements.SvgLabelDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Scalable Vector Graphics DOM presenter for JSGL label element.
 * @extends jsgl.elements.AbstractDomPresenter
 * @constructor
 * @description Creates new instance of
 * <code>jsgl.elements.SvgLabelDomPresenter</code>
 * @param {XmlDocument} ownerDocument The factory XmlDocument to be used for
 * creating HTML elements.
 * @since version 2.0
 */
jsgl.elements.SvgLabelDomPresenter = function(ownerDocument) {

  jsgl.elements.AbstractDomPresenter.call(this);
  
  /**
   * The SVG <code>&lt;text&gt;</code> element.
   * @type SVGTextElement
   * @private
   */           
  this.svgTextElement = ownerDocument.createElementNS("http://www.w3.org/2000/svg","text");
  
  /**
   * The child text node of the SVG <code>&lt;text&gt;</code> element.
   * @type XMLTextNode
   * @private
   */
  this.textNode = ownerDocument.createTextNode("");
  
  this.svgTextElement.appendChild(this.textNode);

  this.attachMouseHandlers(this.svgTextElement);
           
}
jsgl.elements.SvgLabelDomPresenter.jsglExtend(
  jsgl.elements.AbstractDomPresenter);

/**
 * @description Gets the SVG <code>&lt;text&gt;</code> element that is used
 * for rendering the label.
 * @methodOf jsgl.elements.SvgLabelDomPresenter#
 * @private
 * @since version 2.0
 */
jsgl.elements.SvgLabelDomPresenter.prototype.getXmlElement = function() {

  return this.svgTextElement;
}

/**
 * @description Updates the contents of rendering SVG according to the state
 * of the JSGL label element associated.
 * @methodOf jsgl.elements.SvgLabelDomPresenter#
 * @private
 * @since version 2.0
 */
jsgl.elements.SvgLabelDomPresenter.prototype.update = function() {

  jsgl.elements.AbstractDomPresenter.prototype.update.call(this);

  this.textNode.nodeValue = this.graphicsElement.getText();
  
  this.svgTextElement.style.setProperty('font-family', this.graphicsElement.getFontFamily(), null);
  this.svgTextElement.style.setProperty('fill', this.graphicsElement.getFontColor(), null);
  
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

  this.svgTextElement.style.fontSize = this.graphicsElement.getFontSize()+"px";
  this.svgTextElement.style.textDecoration = decorationString;
  this.svgTextElement.style.fontWeight = this.graphicsElement.getBold()?"bold":"normal";
  this.svgTextElement.style.fontStyle = this.graphicsElement.getItalics()?"italic":"normal";
  
  this.svgTextElement.style.opacity = this.graphicsElement.getOpacity();

  switch(this.graphicsElement.getHorizontalAnchor()) {

    case jsgl.HorizontalAnchor.LEFT:

      this.svgTextElement.style.setProperty('text-anchor', 'start', null);
      break;
    
    case jsgl.HorizontalAnchor.CENTER:

      this.svgTextElement.style.setProperty('text-anchor', 'middle', null);
      break;
    
    case jsgl.HorizontalAnchor.RIGHT:
    
      this.svgTextElement.style.setProperty('text-anchor', 'end', null);
      break;
  }

  this.svgTextElement.setAttribute('x', this.graphicsElement.getX());

  /*
   * As of November 2011, there is a lack of support of CSS dominant-baseline
   * style property -- hence SVG dx and dy properties are used.
   */     
  switch(this.graphicsElement.getVerticalAnchor()) {
  
    case jsgl.VerticalAnchor.TOP:
      
      this.svgTextElement.setAttribute('dy', '1em', null);
      break;
    
    case jsgl.VerticalAnchor.MIDDLE:
    
      this.svgTextElement.setAttribute('dy', '0.6ex', null);
      break;
    
    case jsgl.VerticalAnchor.BOTTOM:
    
      this.svgTextElement.setAttribute('dy', '0em', null);
      break;
  }
  
  this.svgTextElement.setAttribute('y', this.graphicsElement.getY());

}     



      