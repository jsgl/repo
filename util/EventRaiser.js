/**
 * @fileOverview Implementation of <code>jsgl.util.EventRaiser</code> class.
 * @author Tomas Rehorek
 * @since version 1.0
 */    

/**
 * @class EventRaiser class for MVC architecture.
 * @constructor
 * @description Instantiates new <code>jsgl.util.EventRaiser</code>.
 * @since version 1.0
 */    
jsgl.util.EventRaiser=function() {
  
  /**
   * The ArrayList of registered listeners.
   * @type jsgl.util.ArrayList
   * @private   
   */        
  this.listeners = new jsgl.util.ArrayList();
  
  /**
   * CommandQueue used for executing listeners. It avoids potential problems
   * caused by registering/unregistering during sequential execution of listeners.
   * @type jsgl.util.CommandQueue
   * @private   
   */         
  this.commandQueue = new jsgl.util.CommandQueue();
}

/**
 * @description Registers a function listening to the event.
 * @public 
 * @methodOf jsgl.util.EventRaiser# 
 * @param {function} listener The listener function. {@link jsgl.util.delegate}
 * may be used to provide method of a specific object. 
 * @since version 1.0
 */ 
jsgl.util.EventRaiser.prototype.registerListener = function(listener) {

  if(!listener) return;
  
  this.commandQueue.enqueue(jsgl.util.delegate(this,function()
    {
      this.listeners.add(listener);
    }));
}

/**
 * @description Unregisters a function listening to the event.
 * @public 
 * @methodOf jsgl.util.EventRaiser#
 * @param {function} listener The function that is currently listening to events
 * and shall not listen anymore.  
 * @since version 1.0
 */    
jsgl.util.EventRaiser.prototype.unregisterListener = function(listener) {

  if(!listener) return;

  this.commandQueue.enqueue(jsgl.util.delegate(this,function()
    {
      this.listeners.remove(listener);
    }));
}

/**
 * @description Raises an event. This results in sequential execution of all
 * the registered listeners.
 * @public 
 * @methodOf jsgl.util.EventRaiser#
 * @param {value} eventAtgs Event arguments that shall be passed to the listeners.
 * @since version 1.0
 */  
jsgl.util.EventRaiser.prototype.raiseEvent = function(eventArgs) {

  this.commandQueue.enqueue(jsgl.util.delegate(this,function()
    {
      this.commandQueue.stop();

      for(var i=0;i<this.listeners.getCount();i++)
      {
        this.listeners.get(i)(eventArgs);
      }
      
      this.commandQueue.go();
    }));
}
