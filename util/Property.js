/**
 * @fileOverview Sugar class <code>jsgl.util.Property</code> implementation.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Sugar property-wrapping class for simplification of MVC architecture
 * building.
 * @constructor
 * @param {value} value The initial value of the property.
 * @description Creates new instance of <code>jsgl.elements.Property</code>.
 * @since version 1.0
 */  
jsgl.util.Property=function(value) {

  /**
   * The value to be stored by the Property object.
   * @type value
   * @private
   */           
  this.value = value;
  
  /**
   * The event raiser object to inform listening objects about value changes.
   * @type jsgl.util.EventRaiser
   * @private
   */           
  this.eventRaiser=new jsgl.util.EventRaiser();
}

/**
 * @description Sets the value and informs the listeners about new value.
 * @methodOf jsgl.util.Property#
 * @param {value} value The new value.
 * @since version 1.0
 */  
jsgl.util.Property.prototype.setValue=function(value) {

  if(this.value != value)
  {
    this.value = value;
    this.eventRaiser.raiseEvent(value);
  }
}

/**
 * @description Gets the current value.
 * @methodOf jsgl.util.Property#
 * @returns value  
 * @since version 1.0
 */  
jsgl.util.Property.prototype.getValue=function() {

  return this.value;
}

/**
 * @description Register new listener to be informed about value changes.
 * @methodOf jsgl.util.Property#
 * @param {function(value)} listener The new listener to be added to the chain.
 * @since version 1.0
 */  
jsgl.util.Property.prototype.registerChangeListener=function(listener) {

  this.eventRaiser.registerListener(listener);
}

/**
 * @description Unregister already-present listener from listening to Property's
 * value changes. 
 * @methodOf jsgl.util.Property#
 * @param {function(value)} listener The listener to be removed from the chain.
 * @since version 1.0
 */   
jsgl.util.Property.prototype.unregisterChangeListener=function(listener) {

  this.eventRaiser.unregisterListener(listener);
}