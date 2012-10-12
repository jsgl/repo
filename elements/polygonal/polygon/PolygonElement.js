/**
 * @fileOverview Declaration and implementation of JSGL API
 * <code>jsgl.elements.PolygonElement</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Polygon element API class.
 * @extends jsgl.elements.AbstractPolygonalElement
 * @constructor
 * @description Creates new <code>jsgl.elements.PolygonElement</code>.
 * @param {jsgl.elements.AbstractDomPresenter} domPresenter An
 * appropriate DOM presenter for rendering the polygon on the user's browser.   
 * @since version 1.0
 * @version 2.0  
 */
jsgl.elements.PolygonElement=function(domPresenter,panel,stroke,fill,zIndex) {

  jsgl.elements.AbstractPolygonalElement.call(this, panel, zIndex);

  /**
   * The function listening to changes in associated stroke object.
   * @type function
   * @private      
   */     
  this.strokeChangeListener=jsgl.util.delegate(
    this.onChangeRaiser,this.onChangeRaiser.raiseEvent);  

  /**
   * The function listening to the changes is associated fill object.
   * @type function
   * @private         
   */  
  this.fillChangeListener=jsgl.util.delegate(
    this.onChangeRaiser,this.onChangeRaiser.raiseEvent);

  /**
   * The stroke object specifying style of circle's outline.
   * @type jsgl.stroke.AbstractStroke
   * @private
   */           
  this.stroke = null;  
  this.setStroke(stroke || new jsgl.stroke.SolidStroke());

  /**
   * The fill object specifying style of circle's interior.
   * @type jsgl.fill.AbstractFill
   * @private
   */           
  this.fill = null;
  this.setFill(fill || new jsgl.fill.SolidFill());

  /**
   * The DOM presenter that is used for rendering the polygon.
   * @type jsgl.elements.AbstractPolygonDomPresenter
   * @private
   */              
  this.domPresenter=domPresenter;
  this.domPresenter.setGraphicsElement(this);
}
jsgl.elements.PolygonElement.jsglExtend(jsgl.elements.AbstractPolygonalElement);

/**
 * @description Gets the associated DOM presenter that is used for rendering
 * the polygon on the user's browser.
 * @methodOf jsgl.elements.PolygonElement#
 * @returns {jsgl.elements.AbstractPolygonDomPresenter}
 * @since version 1.0
 */     
jsgl.elements.PolygonElement.prototype.getDomPresenter=function() {

  return this.domPresenter;
}

/**
 * @description Gets the stroke object currently used for styling the outline
 * of the polygon.
 * @methodOf jsgl.elements.PolygonElement#
 * @returns {jsgl.stroke.AbstractStroke}
 * @since version 1.0
 */    
jsgl.elements.PolygonElement.prototype.getStroke=function() {

  return this.stroke;
}

/**
 * @description Sets the new stroke object for styling the outline of the
 * polygon. The polygon element will be listening to changes in the stroke
 * object and repaint itself automatically whenever a change takes place.
 * @methodOf jsgl.elements.PolygonElement#
 * @param {jsgl.stroke.AbstractStroke} The new stroke object to be associated
 * with the polygon.
 * @since version 1.0
 */       
jsgl.elements.PolygonElement.prototype.setStroke=function(stroke) {

  if(this.stroke) {

    this.stroke.unregisterChangeListener(this.strokeChangeListener);
  }
  
  this.stroke=stroke;
  this.stroke.registerChangeListener(this.strokeChangeListener);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @description Gets the fill object currently used for styling the interior
 * of the polygon.
 * @methodOf jsgl.elements.PolygonElement
 * @returns {jsgl.fill.AbstractFill}
 * @since version 1.0
 */      
jsgl.elements.PolygonElement.prototype.getFill=function() {

  return this.fill;
}

/**
 * @description Sets the new fill object for styling the interior of the
 * polygon. The polygon element will be listening to changes in the fill object
 * and repaint itself automatically whenever a change takes place.
 * @methodOf jsgl.elements.PolygonElement#
 * @param {jsgl.fill.AbstractFill} The new fill object to be associated with
 * the polygon.
 * @since version 1.0
 */       
jsgl.elements.PolygonElement.prototype.setFill=function(fill) {
  
  if(this.fill) {
  
    this.fill.unregisterChangeListener(this.fillChangeListener);
  }
  
  this.fill=fill;
  this.fill.registerChangeListener(this.fillChangeListener);
  this.onChangeRaiser.raiseEvent();
}
