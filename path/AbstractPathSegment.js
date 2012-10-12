/**
 * @fileOverview Declaration of </code>jsgl.path.AbstractPathSegment</code> class.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Base class for any SVG path segment command as declared in W3C SVG 1.1
 * Recommendation, Section 8.3. It declared what a pen movement command must be
 * able to do, e.g. it must be able to express itself in both the VML and SVG
 * path commands. For the pupropse of emulation SVG path by VML path, several
 * necessary hacks are included, e.g. the command must be able to determine new
 * absolute position based on the current absolute position. This is because in
 * VML, there are no relative commands, resulting in the necessity to emulate
 * them by the absolute ones. Moreover, some other hackery methods for emulating
 * smooth beziers and subpath starting and closing are included.
 * @constructor
 * @description Base class for any SVG path segment command class.
 * @since version 2.0
 */ 
jsgl.path.AbstractPathSegment = function() {

  /**
   * The MVC event raiser responsible for propagation of changes made in the
   * path segment command. The set of listeners will always contain all the
   * JSGL API shape elements that use the segment (though there will typically
   * be only one such element). Whenever the path segment changes (e.g. when the
   * X-coordinate of the second control point of cubic bezier curve command is
   * set to a new value), an event is raised, making the JSGL elements that use
   * the path segment repaint.
   * @type jsgl.util.EventRaiser
   * @private
   */            
  this.onChangeRaiser = new jsgl.util.EventRaiser();
}

/**
 * @description Registers a function listening to changes in the path segment 
 * command. Typically, JSGL element that uses the command in its path needs to
 * register for changes listening as it needs to be repainted whenever a change
 * in some of its path commands happens.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @param {function} listener The function to start listening to changes in the
 * path command. 
 * @private
 * @since version 2.0 
 */ 
jsgl.path.AbstractPathSegment.prototype.registerChangeListener = function(listener) {

  this.onChangeRaiser.registerListener(listener);
}

/**
 * @description Unregisters a function that is already listening to the path
 * segment command's changes from the pool of listeners. This is typically done
 * by the API element after the command is removed from its path. When such
 * thing happens, changes made to the path command are not imporant for the
 * element anymore.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @param {function} listener The already-listening function that should not
 * listen to the changes in the path segment command anymore.
 * @private
 * @since version 2.0   
 */
jsgl.path.AbstractPathSegment.prototype.unregisterChangeListener = function(listener) {

  this.onChangeRaiser.unregisterListener(listener);
} 

/**
 * @description Outputs the path segment to the SVG path segment command string.
 * Typically, this is trivial since JSGL's implementation closely follows the
 * SVG standard and hence there always exists an appropriate path command string
 * in SVG.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @returns {string} The SVG path command.
 * @since version 2.0     
 */ 
jsgl.path.AbstractPathSegment.prototype.toSvgCommand = function() {

  throw "not implemented";
}

/**
 * @description Outputs the path segment to the VML path commands string. This
 * sometimes results in a sequence of multiple commands since some SVG commands
 * cannot be emulated straightforwardly. 
 * @private
 */ 
jsgl.path.AbstractPathSegment.prototype.toVmlCommand = function(pathHistory) {

  throw "not implemented";
}

/**
 * @description Gets the absolute location of the ending point of the segment,
 * i.e. gets the new current point after the path segment command is applied.
 * @methodOf jsgl.path.AbstractPathSegment# 
 * @returns {jsgl.Vector2D} Absolute location of the segment's ending point. 
 * @private
 * 
 *  
 */
jsgl.path.AbstractPathSegment.prototype.getNewLocation = function(pathHistory) {

  return new jsgl.Vector2D(Number.NaN, Number.NaN);
}

/**
 * @private
 */
jsgl.path.AbstractPathSegment.prototype.startsNewSubpath = function() {

  return false;
}

/**
 * @description Determines whether or not the segment is a close path segment.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @returns {boolean}
 * @private
 * @since version 2.0 
 */ 
jsgl.path.AbstractPathSegment.prototype.closesSubpath = function() {

  return false;
}

/**
 * @description Determines whether or not the path segment is cubic bezier.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @returns {boolean} True if and only if the path segment is cubic bezier. 
 * @private
 * @since version 2.0 
 */ 
jsgl.path.AbstractPathSegment.prototype.isCubicBezier = function() {

  return false;
}

/**
 * @description Gets the absolute location of the last control point if the
 * path segment is cubic bezier. For most path segments, this is not applicable.
 * It is important for emulation of shorthand/smooth cubic bezier segments using
 * VML.
 * @methodOf jsgl.path.AbstractPathSegment# 
 * @param {object} pathHistory the path history object provided by VML path
 * translator. 
 * @returns {jsgl.Vector2D} Absolute location of the last control point.
 * @private
 * @since version 2.0 
 */
jsgl.path.AbstractPathSegment.prototype.getCBControlPoint = function(pathHistory) {

  throw "not applicable";
}

/**
 * @description Determines whether or not the path segment is quadratic bezier.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @returns {boolean} True if and only if the path segment is quadratic bezier.
 * @private
 * @since version 2.0 
 */ 
jsgl.path.AbstractPathSegment.prototype.isQuadraticBezier = function() {

  return false;
}

/**
 * @description Gets the absolute location of the control point if the path
 * segment is quadratic bezier. For most path segments, this is not applicable.
 * It is important for emulation of shorthand/smooth quadratic bezier segments
 * using VML.
 * @methodOf jsgl.path.AbstractPathSegment#
 * @param {object} pathHistory The path history object provided by VML path
 * translator.
 * @returns {jsgl.Vector2D} Absolute location of the control point.
 * @private
 * @since version 2.0 
 */
jsgl.path.AbstractPathSegment.prototype.getQBControlPoint = function(pathHistory) {

  throw "not applicable";
} 