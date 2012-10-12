/**
 * @fileOverview Implementation of <code>jsgl.util.Animator</code> utility class.
 * @author Tomas Rehorek
 * @since version 2.0
 */

/**
 * @class Utility class for creating animations. Although it is especially useful
 * for programming graphics, its scope goes beyond graphics applications. 
 * @constructor
 * @description Creates new instance of <code>jsgl.util.Animator</code> class.
 * @since version 2.0
 */
jsgl.util.Animator = function() {
  
  /**
   * The start value of the animation's control parameter.
   * @type number
   * @private
   */
  this.startValue = 0;
  
  /**
   * The end value of the animation's control parameter.
   * @type number
   * @private
   */
  this.endValue = 1;

  /**
   * The duration of the animation in milliseconds.
   * @type number
   * @private
   */
  this.duration = 1000;           
  
  /**
   * Current time in milliseconds.
   * @type number
   * @private
   */
  this.currTime = 0;
  
  /**
   * Determines whether the animation should be reversed.
   * @type boolean
   * @private
   */
  this.reversed = false;           
  
  /**
   * The event raiser for the animation functions.
   * @type jsgl.util.EventRaiser
   * @private
   */
  this.animRaiser = new jsgl.util.EventRaiser();
  
  /**
   * The event raiser for the functions listening to animation start events.
   * @type jsgl.util.EventRaiser
   * @private
   */
  this.animStartRaiser = new jsgl.util.EventRaiser();         
  
  /**
   * The event raiser for the functions listening to animation end events.
   * @type jsgl.util.EventRaiser
   * @private
   */
  this.animEndRaiser = new jsgl.util.EventRaiser();
    
  /**
   * The time of the last step in milliseconds since midnight Jan 1, 1970.
   * @type number
   * @private
   */         
  this.prevStepTime = 0;
  
  /**
   * The timer identifier currently used.
   * @type number
   * @private
   */
  this.timer = 0;
  
  /**
   * Frames per second.  
   * @type number
   * @private   
   */
  this.fps = jsgl.util.BrowserInfo.isMSIE ? 10 : 20;
  
  /**
   * Determines whether the animator is in repeat mode or not.
   * @type boolean
   * @private      
   */
  this.repeat = false;
  
  /**
   * Determines whether the animator is currently playing or not.
   * @type number
   * @private      
   */     
  this.playing = false;
}

/**
 * @description Gets the currently set start value of the animation's control
 * parameter.
 * @methodOf jsgl.util.Animator#
 * @returns {number}
 * @since version 2.0
 */  
jsgl.util.Animator.prototype.getStartValue = function() {

  return this.startValue;
}

/**
 * @description Sets the new start value for the animation's control parameter. 
 * @methodOf jsgl.util.Animator#
 * @param {number} newValue The new start value of the control parameter.
 * @since version 2.0
 */  
jsgl.util.Animator.prototype.setStartValue = function(newValue) {

  this.startValue = newValue;
}

/**
 * @description Gets the currently set end value of the animation's control
 * parameter.
 * @methodOf jsgl.util.Animator#
 * @returns {number}
 * @since version 2.0
 */
jsgl.util.Animator.prototype.getEndValue = function() {

  return this.endValue;
}

/**
 * @description Sets the new end value for the animation's control parameter.
 * @methodOf jsgl.util.Animator#
 * @param {number} newValue The new end value for the control parameter.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.setEndValue = function(newValue)   {

  this.endValue = newValue;
}

/**
 * @description Gets the currently set duration of the animation in milliseconds.
 * @methodOf jsgl.util.Animator#
 * @returns {number}
 * @since version 2.0
 */
jsgl.util.Animator.prototype.getDuration = function() {

  return this.timeStep;
}

/**
 * @description Sets the duration of the animation in milliseconds.
 * @methodOf jsgl.util.Animator#
 * @param {number} newDuration The new duration in milliseconds.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.setDuration = function(newDuration) {

  this.duration = newDuration;
}

/**
 * @description Determines whether or not the animation is currently
 * in reversed mode.
 * @methodOf jsgl.util.Animator#
 * @returns {boolean}
 * @since version 2.0
 */
jsgl.util.Animator.prototype.getReversed = function() {

  return this.reversed;
}

jsgl.util.Animator.prototype.isReversed = function() {

  return this.reversed;
}


/**
 * @description Sets whether or not the animation should be reversed.
 * @methodOf jsgl.util.Animator#
 * @param {boolean} reversed True if the animation should be reversed, false
 * if not.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.setReversed = function(reversed) {

  this.reversed = reversed;
}

/**
 * @description Adds a listener function to be invoked when the animation
 * starts.
 * @methodOf jsgl.util.Animator#
 * @param {Function} listener The animation-start event listener to be added.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.addStartListener = function(listener) {

  this.animStartRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of animation-start
 * event listeners, making it to not listen anymore.
 * @methodOf jsgl.util.Animator#
 * @param {Function} listener The listener function to be removed.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.removeStartListener = function(listener) {

  this.animStartRaiser.unregisterListener(listener);
}  

/**
 * @description Adds a step function to be invoked on each step of the
 * animation. This is the crucial function that should control graphic elements
 * to make the animation work. When the function is executed, current parameter
 * value is passed to the function as an argument by the Animator. Based on
 * the parameter value, the function should perform desirable operations.
 * @methodOf jsgl.util.Animator#
 * @param {Function} listener The listener function to be added.
 * @since version 2.0 
 */
jsgl.util.Animator.prototype.addStepListener = function(listener) {

  this.animRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of animation-step
 * event listeners, making it to not listen anymore.
 * @methodOf jsgl.util.Animator#
 * @param {Function} listener The listener to be removed. 
 * @since version 2.0
 */
jsgl.util.Animator.prototype.removeStepListener = function(listener) {

  this.animRaiser.unregisterListener(listener);
}

/**
 * @description Adds a listener function to be invoked when the animation ends.
 * When the Animator is in the repeat mode, the end event is raised at the end
 * of each cycle. 
 * @methodOf jsgl.util.Animator#
 * @param {Function} listener The listener to be added.
 * @since version 2.0  
 */
jsgl.util.Animator.prototype.addEndListener = function(listener) {

  this.animEndRaiser.registerListener(listener);
}

/**
 * @description Removes a listener function from the pool of animation-end event
 * listeners, making it to not listen anymore.
 * @methodOf jsgl.util.Animator#
 * @param {Function} listener The listener to be removed.
 * 
 */
jsgl.util.Animator.prototype.removeEndListener = function(listener) {

  this.animEndRaiser.unregisterListener(listener);
}

/**
 * @description Time step function.
 * @private
 */ 
jsgl.util.Animator.prototype.step = function() {

  var currStepTime = (new Date()).getTime();
  
  if(this.prevStepTime) {
  
    this.currTime += (this.reversed ? -1 : 1) * (currStepTime - this.prevStepTime);
  }

  this.currTime = Math.max(0, Math.min(this.currTime, this.duration));

  var paramValue = this.startValue +
    (this.currTime / this.duration) * (this.endValue - this.startValue);
  
  this.animRaiser.raiseEvent(paramValue);
  
  if((!this.reversed && this.currTime == this.duration) ||
     (this.reversed && this.currTime == 0)) {
    
    if(this.repeat) {
    
      this.currTime = this.reversed ? this.duration : 0;
      this.prevStepTime = currStepTime;
    }
    else {
      window.clearInterval(this.timer);
      this.playing = false;
      this.timer = 0;
      //this.currTime = 0;
      this.prevStepTime = 0;
      //this.rewind();
    }

    this.animEndRaiser.raiseEvent();
  }
  else {

    this.prevStepTime = currStepTime;
  }
}

/**
 * @description Allows the animated objects to be correctly initialized before
 * the animation starts. This will simply invoke the step event without actually
 * playing the animation.
 * @methodOf jsgl.util.Animator#
 * @since version 2.0
 */
jsgl.util.Animator.prototype.init = function() {
  
  this.animRaiser.raiseEvent(this.startValue +
    (this.currTime / this.duration) * (this.endValue - this.startValue));
}     

/**
 * @description Plays the animation. If the animation is currently stopped, it
 * start playing from the beginning. If the animation has been previously
 * paused, it is continued from the point when the pause was invoked.
 * @methodOf jsgl.util.Animator#
 * @since version 2.0  
 */ 
jsgl.util.Animator.prototype.play = function() {

  if(this.currTime == this.duration && !this.reversed) {
    this.currTime = 0;
  }

  if(!this.currTime) {
  
    this.animStartRaiser.raiseEvent();
  }

  if(!this.timer) {
  
    this.step();
    this.timer = window.setInterval(jsgl.util.delegate(this, this.step), 1000/this.fps);
  }
  
  this.playing = true;
}

/**
 * @description Rewinds the animation to the start. This does not stop the
 * animation if it is playing.
 * @methodOf jsgl.util.Animator#
 * @since version 2.0
 */    
jsgl.util.Animator.prototype.rewind = function() {

  this.currTime = 0;
  this.prevStepTime = 0;
}

/**
 * @description Pauses the animation at the current point, allowing the play
 * to continue later.
 * @methodOf jsgl.util.Animator#
 * @since version 2.0
 */  
jsgl.util.Animator.prototype.pause = function() {

  window.clearInterval(this.timer);
  this.timer = 0;
  
  this.prevStepTime = 0;
  
  this.playing = false;
}

/**
 * @description Stops the animation, rewinding it to the start.
 * @methodOf jsgl.util.Animator#
 * @since version 2.0
 */   
jsgl.util.Animator.prototype.stop = function() {

  window.clearInterval(this.timer);
  this.timer = 0;
  
  this.currTime = 0;
  this.prevStepTime = 0;
  this.step();
  this.currTime = 0;
  this.prevStepTime = 0;
  
  this.playing = false;

}

/**
 * @description Sets whether or not the animation should be played in a loop.
 * @methodOf jsgl.util.Animator#
 * @param {Boolean} repeating True if the animation should repeat, false if not.
 * @since version 2.0 
 */   
jsgl.util.Animator.prototype.setRepeating = function(repeating) {
  
  this.repeat = repeating;
}

/**
 * @description Determines whether the animation is currently in repeat mode
 * or not.
 * @methodOf jsgl.util.Animator#
 * @returns {Boolean} 
 * @since version 2.0
 */    
jsgl.util.Animator.prototype.isRepeating = function() {

  return this.repeat;
}

/**
 * @description Determines whether or not the animation is currently playing.
 * @methodOf jsgl.util.Animator#
 * @returns {Boolean}
 * @since version 2.0
 */    
jsgl.util.Animator.prototype.isPlaying = function() {

  return this.playing;
}

/**
 * @description Sets the number of steps that the Animator should invoke
 * per second. This overrides the default setting, which is 10 FPS for MSIE
 * and 20 FPS for other browsers. When the CPU is too busy and the browser
 * does not manage to perform as many FPS as required, some frames may be
 * dropped. The Animator primarily aims to meet the required duration of the
 * animation, not to execute every single step according to the desired FPS.
 * It is recommended, however, not to set the FPS value to high, because using
 * too much CPU will definitely not result in a pleasurable user experience.
 * @methodOf jsgl.util.Animator#
 * @param {Number} newFps The new number of frames per second.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.setFps = function(newFps) {

  this.fps = newFps;
}

/**
 * @description Gets the current FPS of the Animator. If no FPS has been set
 * manually before, the value returned may be browser-dependent.
 * @methodOf jsgl.util.Animator#
 * @returns {Number} The current number of steps that the Animator tends to
 * invoke per second.
 * @since version 2.0
 */
jsgl.util.Animator.prototype.getFps = function() {

  return this.fps;
} 