/**
 * @fileOverview Sugar code for object inheritance, cloning, and working with
 * functions.
 * @author Tomas Rehorek
 * @since version 1.0
 */    

Function.prototype.jsglExtend = function(ancestor) {

  function F() {};
  F.prototype = ancestor.prototype;
  this.prototype = new F();
  this.prototype.constructor=this;
  this.base = F.prototype;
  this.base.constructor = ancestor;
}

Number.prototype.jsglVmlize = function() {

  return Math.round(this*1000);
}

jsgl.util.delegate = function(object, method) {

  return function() {
  
    return method.apply(object, arguments);
  }
}

/**
 * @deprecated
 */
jsgl.cloneObject=function(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor();
    for(var key in obj)
        temp[key] = jsgl.cloneObject(obj[key]);

    return temp;
}

jsgl.util.clone=function(obj)
{
  if(obj == null || typeof(obj) != "object")
  {
    return obj;
  }

  var temp = new obj.constructor();  
  for(var key in obj)
  {
    temp[key] = jsgl.util.clone(obj[key]);
  }

  return temp;
}

if(navigator.userAgent.indexOf("MSIE 5.0") > 0)
{
  Function.prototype.call = function(obj)
  {
    obj.__fnc = this;
    var __args = "";
    for(var i=1;i<arguments.length;i++)
    {
      __args += (i == 1 ? "" : ",") + "arguments[" + i + "]";
    }
    return eval("obj.__fnc(" + __args + ")");
  }

  Function.prototype.apply = function(obj,args)
  {
    obj.__fnc = this;
    var __args = "";
    for(var i=0;i<args.length;i++)
    {
      __args += (i == 0 ? "" : ",") + "args[" + i + "]"
    };
    return eval("obj.__fnc(" + __args + ")");
  }
}