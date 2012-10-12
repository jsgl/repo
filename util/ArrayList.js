/**
 * @fileOverview Implementation of <code>jsgl.util.ArrayList</code>.
 * @author Tomas Rehorek
 * @since version 1.0
 */   

/**
 * @class Simple ArrayList implementation. 
 * @constructor
 * @description Creates an instance of <code>jsgl.util.ArrayList</code>. 
 * @since version 1.0
 */    
jsgl.util.ArrayList = function() {

  /**
   * The internal javascript array object to hold the elements.
   * @type array
   * @private
   */      
  this.items = [];
  
  /**
   * Internal size counter.
   * @type number
   * @private
   */           
  this.count = 0;
}

/**
 * @description Appends an item at the end of the list.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {value} item The item to be appended.
 * @since version 1.0
 */      
jsgl.util.ArrayList.prototype.add = function(item) {

  if(typeof(item)=='undefined') return;

  this.insertAt(item,this.count);
}

/**
 * @description Removes items in the ArrayList with respect to provided filter
 * function. If no filter function is provided, all the elements are removed
 * from the list.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {function} filter The filtering function. The item is removed from
 * the list if filter(item) is truthy.
 * @since version 1.0
 */  
jsgl.util.ArrayList.prototype.clear = function(filter)
{
  var f = filter || jsgl.util.ArrayList.DEFAULT_CLEAR_FILTER;
  
  var j = 0;
  for(var i=0; i<this.count; i++)
  {
    if(f(this.items[i])) delete this.items[i];
    else
    {
      if(i!=j)
      {
        this.items[j] = this.items[i];
        delete this.items[i];
      }
      j++;
    } 
  }
  this.count = j;
}

/**
 * @description Tests whether a given item is present in the list.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {value} item The item to be tested for presence.
 * @since version 1.0
 */  
jsgl.util.ArrayList.prototype.contains = function(item) {

  for(var i=0; i<this.count; i++)
  {
    if(this.items[i]===item) return true;
  }
  return false;

}

/**
 * @description Gets the number of items that are currently contained in the list.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @returns {number}
 * @since version 1.0    
 */ 
jsgl.util.ArrayList.prototype.getCount = function() {

  return this.count;
  
}

/**
 * @description Default filter function to be used by the <code>clear()</code>
 * method if no filter is provided.
 * @private
 * @static
 * @field
 * @memberOf jsgl.util.ArrayList
 * @since version 1.0
 */       
jsgl.util.ArrayList.DEFAULT_CLEAR_FILTER = function() {
  return true;
}

/**
 * @description Gets an item present at the specified index in the list.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {number} index Index of the item to be returned, starting from 0.
 * @returns {value}
 * @since version 1.0
 */     
jsgl.util.ArrayList.prototype.get = function(index) {

  if((index >= 0) && (index < this.count)) return this.items[index];
  else return null;
  
}

/**
 * @description Sets an item at specified index. If any item is already present
 * at the index, it will be replaced.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {value} item The item to be placed at the index. 
 * @param {number} index Index of the item to be set.
 * @since version 1.0
 */       
jsgl.util.ArrayList.prototype.setAt = function(item, index) {

  if(typeof(item)=='undefined' || index<0) return;

  this.items[index] = item;

  if(index >= this.count) this.count = index + 1;
}

/**
 * @description Inserts and item at the specified index. All the elements starting
 * at the index up to the end of the list are shifted right.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {value} item The item to be inserted into the list.
 * @param {number} index Index where the item shall be inserted at.
 * @since version 1.0
 */   
jsgl.util.ArrayList.prototype.insertAt = function(item, index) {
  if(typeof(item)=='undefined' || index<0) return;
  
  for(var i=this.count; i>index; i--)
  {
    this.items[i] = this.items[i-1];
  }
  
  for(var i=this.count; i<index; i++)
  {
    this.items[i] = null;
  }

  this.items[index] = item;
  
  if(index > this.count) this.count = index + 1;
  else this.count ++;
}

/**
 * @description Removes an item at the specified index from the list. The rest
 * of the list is shifted left after the element is removed. 
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {value} index The index of the item to be removed.
 * @since version 1.0
 */   
jsgl.util.ArrayList.prototype.removeAt = function(index) {

  if(index<0 || index>=this.count) return;
  for(var i=index+1;i<this.count;i++)
  {
    this.items[i-1] = this.items[i];
  }
  this.items[this.count-1]=null;
  this.count--;
  
}

/**
 * @description Removes all the items that are equal to <code>item</code> from
 * the list.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {value} item The item whose all occurances will be removed from the list.
 * @since version 1.0
 */      
jsgl.util.ArrayList.prototype.remove = function(item) {

  this.clear(function(_item) { return _item === item });
  
}

/**
 * @description Reverses the ordering of items in the list. 
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @since version 2.0
 */    
jsgl.util.ArrayList.prototype.reverse = function() {

  this.items.reverse();
}

/**
 * @description Sorts the list according to a given comparator function. If no
 * comparator is given, default comparison is used.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @param {function(a,b)} The comparator function to be used for sorting.
 * @since version 1.0
 */  
jsgl.util.ArrayList.prototype.sort = function(comparator)
{
  var cmp = function(a,b)
  {
    var result = (comparator || jsgl.util.ArrayList.DEFAULT_COMPARATOR)(a,b);
    return (typeof(result) == "number" ? result : 0)
  }
  var c = true;
  while(c)
  {
    c = false;
    for(var i=1;i<this.count;i++)
    {
      if(cmp(this.items[i-1],this.items[i]) < 0)
      {
        c = true;
        var temp = this.items[i-1];
        this.items[i-1] = this.items[i];
        this.items[i] = temp;
      }
    }
  }
}

/**
 * @description Default comparator function to be used by the <code>sort()</code>
 * method if no comparator is provided.
 * @private
 * @static
 * @field
 * @memberOf jsgl.util.ArrayList
 * @since version 1.0
 */       
jsgl.util.ArrayList.DEFAULT_COMPARATOR = function(a,b) {

  return b - a;

}

/**
 * @description Returns the ArrayList as string.
 * @public
 * @methodOf jsgl.util.ArrayList#
 * @returns string
 * @since version 1.0
 */     
jsgl.util.ArrayList.prototype.toString = function(index) {

  var itemsStr = "";
  for(var i=0; i<this.count; i++)
  {
    if(i!=0) itemsStr += ",";
    itemsStr += i + ":" + this.items[i];
  }
  return "ArrayList(count=" + this.count + ",items=[" + itemsStr + "])";

}
