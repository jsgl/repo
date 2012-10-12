/**
 * @fileOverview <code>jsgl.panel.SvgPanelDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class SVG DOM presenter for <code>jsgl.Panel</code> object.
 *  
 */ 
jsgl.panel.SvgPanelDomPresenter=function(panelObject) {

  jsgl.panel.AbstractPanelDomPresenter.call(this, panelObject);
  
  this.svgHolder = this.panelObject.getOwnerDocument().createElementNS(
    "http://www.w3.org/2000/svg", "svg");
  this.svgHolder.style.position = "absolute";
  this.svgHolder.style.left = "0px";
  this.svgHolder.style.top = "0px";
  
  this.holderElement.appendChild(this.svgHolder);

  this.domSorter = new jsgl.elements.DomSorter(this.svgHolder);

  
  this.lastSize = new jsgl.Vector2D();
  
  this.sizeUpdate();
  window.setInterval(jsgl.util.delegate(this, this.sizeUpdate), 50);
}
jsgl.panel.SvgPanelDomPresenter.jsglExtend(jsgl.panel.AbstractPanelDomPresenter);

jsgl.panel.SvgPanelDomPresenter.prototype.addElement = function(element) {

  //this.svgHolder.appendChild(element.getDomPresenter().getXmlElement());
  this.domSorter.add(element);
}

jsgl.panel.SvgPanelDomPresenter.prototype.removeElement = function(element) {

  //this.svgHolder.removeChild(element.getDomPresenter().getXmlElement());
  this.domSorter.remove(element);
}

jsgl.panel.SvgPanelDomPresenter.prototype.clear = function() {

/*  while(this.svgHolder.lastChild) {
    this.svgHolder.removeChild(this.svgHolder.lastChild);
  }*/
  
  for(var i=0; i<this.panelObject.getElementsCount(); i++) {
  
    this.domSorter.remove(this.panelObject.getElementAt(i));
  }
}

jsgl.panel.SvgPanelDomPresenter.prototype.sizeUpdate = function() {
  
  if(this.lastSize.X != this.holderElement.clientWidth ||
     this.lastSize.Y != this.holderElement.clientHeight) {
     
    this.lastSize.X = this.holderElement.clientWidth;
    this.lastSize.Y = this.holderElement.clientHeight;
    
    this.svgHolder.setAttribute("width", this.lastSize.X);
    this.svgHolder.setAttribute("height", this.lastSize.Y);
  }
}