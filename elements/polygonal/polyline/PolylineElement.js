/**
 * @fileOverview Declaration and implementation of JSGL API
 * <code>jsgl.elements.PolylineElement</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */    

/**
 * @class Polyline element API class.
 * @extends jsgl.elements.AbstractPolygonalElement
 * @constructor
 * @description Creates new instance of <code>jsgl.elements.PolylineElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter An
 * appropriate DOM presenter to be used for rendering the polyline on the user's
 * browser.   
 * @since version 1.0
 * @version 2.0 
 */     
jsgl.elements.PolylineElement=function(domPresenter,panel,stroke,zIndex) {

  jsgl.elements.AbstractPolygonalElement.call(this,panel,zIndex);

  /**
   * The function listening to changes in associated stroke object.
   * @type function
   * @private
   */           
  this.strokeChangeListener=jsgl.util.delegate(
    this.onChangeRaiser,this.onChangeRaiser.raiseEvent);

  /**
   * The stroke object specifying the style of the polyline. Note that because
   * there is no fill object for the polyline, the stroke object completely
   * defines its appearance.     
   * @type jsgl.stroke.AbstractStroke
   * @private
   */           
  this.stroke = null;
  this.setStroke(stroke || new jsgl.stroke.SolidStroke());

  /**
   * The DOM presenter that is used for rendering the polyline on the user's
   * browser.
   * @type jsgl.elements.AbstractPolylineDomPresenter
   * @private
   */            
  this.domPresenter=domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.PolylineElement.jsglExtend(jsgl.elements.AbstractPolygonalElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the polyline on the user's browser.
 * @methodOf jsgl.elements.PolylineElement#
 * @returns {jsgl.elements.AbstractPolylineDomPresenter}
 * @since version 1.0
 */     
jsgl.elements.PolylineElement.prototype.getDomPresenter=function() {

  return this.domPresenter;
}

/**
 * @description Gets the stroke object specifying style of the polyline.
 * @methodOf jsgl.elements.PolylineElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 1.0
 */    
jsgl.elements.PolylineElement.prototype.getStroke=function() {

  return this.stroke;
}

/**
 * @description Sets the stroke object specifying style of the polyline. Note
 * that this object fully defines the style of the polyline. The polyline
 * element will be listening to changes in the stroke and repaint itself
 * automatically whenever a change takes place.
 * @methodOf jsgl.elements.PolylineElement#
 * @param {jsgl.stroke.AbstractStroke} The stroke object to be associated with
 * the polyline.
 * @since version 1.0
 */    
jsgl.elements.PolylineElement.prototype.setStroke=function(stroke) {

  if(this.stroke) {
  
    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }

  this.stroke=stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}
