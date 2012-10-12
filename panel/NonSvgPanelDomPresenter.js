/**
 * @fileOverview <code>jsgl.panel.NonSvgPanelDomPresenter</code> implementation.
 * @author Tomas Rehorek
 * @since version 2.0
 */   

/**
 * @class Simple non-SVG <code>jsgl.Panel</code> DOM presenter that uses
 * exploits <code>jsgl.elements.GroupElement</code>, especially it DOM presenter
 * <code>jsgl.elements.NonSvgGroupPresenter</code>.
 * @extends jsgl.panel.AbstractPanelDomPresenter 
 * @constructor
 * @description Creates new instance of <code>jsgl.panel.NonSvgPanelDomPresenter</code>.
 * @param {jsgl.Panel} panelObject The <code>jsgl.Panel</code> object to be
 * implemented in DOM.
 * @since version 2.0
 * @version 2.0
 */         
jsgl.panel.NonSvgPanelDomPresenter=function(panelObject) {

  jsgl.panel.AbstractPanelDomPresenter.call(this,panelObject)
  
  this.elementsGroup=this.panelObject.createGroup();
  this.holderElement.appendChild(
    this.elementsGroup.getDomPresenter().getXmlElement());
  
  this.elementsGroup.setContainer(panelObject);
}
jsgl.panel.NonSvgPanelDomPresenter.jsglExtend(jsgl.panel.AbstractPanelDomPresenter);

/**
 * @description Adds a JSGL element to the top-level group.
 * @methodOf jsgl.panel.NonSvgPanelDomPresenter#
 * @param {jsgl.elements.AbstactElement} element The JSGL element to be added
 * to the Panel's DOM
 * @since version 2.0
 */
jsgl.panel.NonSvgPanelDomPresenter.prototype.addElement = function(element) {

  this.elementsGroup.addElement(element);
}

/**
 * @description Removes a JSGL element from the top-level group.
 * @methodOf jsgl.panel.NonSvgPanelDomPresenter#
 * @param {jsgl.elements.AbstractElement} element The JSGL element to be removed
 * from the Panel's DOM.
 * @since version 2.0
 */
jsgl.panel.NonSvgPanelDomPresenter.prototype.removeElement = function(element) {

  this.elementsGroup.removeElement(element);
}

/**
 * @description Clears the top-level group.
 * @methodOf jsgl.panel.NonSvgPanelDomPresenter#
 * @since version 2.0
 */
jsgl.panel.NonSvgPanelDomPresenter.prototype.clear = function() {

  this.elementsGroup.clear();
}   