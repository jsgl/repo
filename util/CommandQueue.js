/**
 * @fileOverview <code>jsgl.util.CommandQueue</code> class implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */

/**
 * @class Simple command queue implementation. Command queues are important for
 * handling events. The command queue prevents hazardeous states by executing
 * update operations invoked by individual events in FIFO manner. If an event
 * leads to changes in the list of listeners, it will not happen so before all
 * peer listeners have been executed.
 * @extends jsgl.util.Queue 
 * @constructor
 * @description Creates new instance of <code>jsgl.util.CommandQueue</code>
 * @since version 1.0
 */   
jsgl.util.CommandQueue = function() {

  jsgl.util.Queue.call(this);

  /**
   * Determines whether the command queue is currently stopped.
   * @type boolean
   * @private
   */           
  this.stopped = false;
}
jsgl.util.CommandQueue.jsglExtend(jsgl.util.Queue);

/**
 * @description Stops the command queue.
 * @methodOf jsgl.util.CommandQueue#
 * @since version 1.0
 */  
jsgl.util.CommandQueue.prototype.stop = function() {

  this.stopped = true;
}

/**
 * @description Runs the command queue.
 * @methodOf jsgl.util.CommandQueue#
 * @since version 1.0
 */   
jsgl.util.CommandQueue.prototype.go = function() {

  while(this.peek() != null) {
  
    this.dequeue();
  }
  
  this.stopped = false;
}

/**
 * @description Adds new subroutine at the end of the command queue.
 * @methodOf jsgl.util.CommandQueue#
 * @param {function()} item The subroutine to be added at the end of the queue.
 * @since version 1.0
 */    
jsgl.util.CommandQueue.prototype.enqueue = function(item) {

  if(this.stopped) jsgl.util.Queue.prototype.enqueue.call(this,item);
  else item();
}

/**
 * @description Executes the first subroutine at the head of the command queue
 * and removes it from the queue.
 * @methodOf jsgl.util.CommandQueue#
 * @since version 1.0  
 */
jsgl.util.CommandQueue.prototype.dequeue = function() {

  jsgl.util.Queue.prototype.dequeue.call(this)();
}
