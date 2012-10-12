/**
 * @fileOverview <code>jsgl.stroke.AbstractStroke</code> class declaration.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Base class for outline-styling objects for JSGL elements.
 * @constructor
 * @description Base constructor for any element outline-styling object.
 * @since version 1.0
 */    
jsgl.stroke.AbstractStroke = function() {

  /**
   * The MVC event raiser responsible for the propagation of changes made in the
   * stroke object. The set of listeners will always contain all the JSGL API
   * elements that use the stroke object for styling. Whenever informed about
   * change in fill, they informorm their DOM presenters that repaint should
   * take place.
   * @type jsgl.util.EventRaiser
   * @private            
   */     
  this.onChangeRaiser = new jsgl.util.EventRaiser();
}

/**
 * @description Applies the stroke properties to a SVG element. Typically, the
 * CSS <code>style</code> attributes are used to achieve that.
 * @methodOf jsgl.stroke.AbstractStroke#
 * @param {SVGElement} svgElement The SVG element to which the stroke properties
 * will be applied.
 * @abstract
 * @since version 1.0
 */   
jsgl.stroke.AbstractStroke.prototype.applyToSvgElement = function(svgElement) {

  throw "not implemented";
}

/**
 * @description Applies the stroke properties to a VML <code>&lt;stroke&gt;</code>
 * element, which is typically a subelement of some VML shape-defining element.
 * The stroke properties are typically applied by setting XML attribute values
 * of the <code>&lt;stroke&gt;</code>.
 * @methodOf jsgl.stroke.AbstractStroke#
 * @param {VmlStrokeElement} strokeElement The VML <code>&lt;stroke&gt;</code>
 * subelement to which the stroke should be applied.
 * @abstract 
 * @since version 1.0
 */   
jsgl.stroke.AbstractStroke.prototype.applyToVmlStrokeElement = function(strokeElement) {

  throw "not implemented";
}

/**
 * @description Registers a function listening to changes in the properties of
 * the stroke object. Typically, JSGL API elements are listening to the changes,
 * allowing MVC repainting to be done whenever the stroke changes.
 * @methodOf jsgl.stroke.AbstractStroke#
 * @param {function} listener The function to start listening to changes in the
 * stroke object.
 * @since version 1.0   
 */ 
jsgl.stroke.AbstractStroke.prototype.registerChangeListener = function(listener)
{
  this.onChangeRaiser.registerListener(listener);
}

/**
 * @description Removes a function that is already listening to changes in the
 * stroke object from the pool of listeners. This is typically needed when
 * a stroke object of sime JSGL API element is replaced by another one, making
 * changes in the old one unimportant.
 * @methodOf jsgl.stroke.AbstractStroke#
 * @param {function} listener The already-listening function that should be
 * removed from the pool of listeners.
 * @since version 1.0
 */   
jsgl.stroke.AbstractStroke.prototype.unregisterChangeListener = function(listener) {

  this.onChangeRaiser.unregisterListener(listener);
}