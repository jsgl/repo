/**
 * @fileOverview <code>jsgl.fill.AbstractFill</code> class declaration.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Base class for interior-styling objects for JSGL elements.
 * @constructor
 * @description Base constructor for any element-interior styling object.
 * @since version 1.0
 */    
jsgl.fill.AbstractFill = function() {

  /**
   * The MVC event raiser responsible for the propagation of changes made in
   * the fill object. The set of listeners always contains all the JSGL API
   * elements that use the fill object. Whenever informed about change in fill,
   * they inform their DOM presenters that repaint should take place.
   * @type jsgl.util.EventRaiser
   * @private   
   * @since version 1.0
   */                    
  this.onChangeRaiser = new jsgl.util.EventRaiser();
}

/**
 * @description Applies the fill properties to a SVG element. Typically, the CSS
 * <code>style</code> attributes are used to achieve that.
 * @methodOf jsgl.elements.AbstractFill#
 * @param {SVGElement} svgElement The SVG element to which the fill should be
 * applied.
 * @abstract
 * @private
 * @since version 1.0
 */
jsgl.fill.AbstractFill.prototype.applyToSvgElement = function(svgElement) {

  throw "not implemented";
}

/**
 * @description Applies the fill properties to a VML <code>&lt;fill&gt;</code>
 * element, which is typically a subelement of some VML shape-defining element.
 * The fill properties are typically applied by setting XML attribute values
 * of the element.  
 * @methodOf jsgl.elements.AbstractFill#
 * @param {VmlFillElement} The VML <code>&lt;fill&gt;</code> element to which
 * the fill should be applied.
 * @abstract
 * @private
 * @since version 1.0
 */   
jsgl.fill.AbstractFill.prototype.applyToVmlFillElement = function(fillElement) {

  throw "not implemented";
}

/**
 * @description Registers a function listening to changes in the properties
 * of the fill object. Typically, JSGL API elements are listening to the
 * changes, allowing MVC repainting to be done whenever the fill is changed.
 * @methodOf jsgl.elements.AbstractFill#
 * @param {function} listener The function that should start listening to
 * changes in the fill object.
 * @since version 1.0
 */   
jsgl.fill.AbstractFill.prototype.registerChangeListener = function(listener) {

  this.onChangeRaiser.registerListener(listener);
}

/**
 * @description Removes a fuction that is already listening to the changes of
 * the fill object from the pool os listeners. This is typically needed when
 * a fill object of some JSGL API element is replaced by another one, making
 * changes in the old one unimportant.
 * @methodOf jsgl.elements.AbstractFill#
 * @param {function} listener The already-listening function that should be
 * removed from the pool of listeners.
 * @since version 1.0
 */   
jsgl.fill.AbstractFill.prototype.unregisterChangeListener = function(listener) {

  this.onChangeRaiser.unregisterListener(listener);
}