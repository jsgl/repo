jsgl.util.SortedList=function(comparator)
{
  if(comparator) this.comparator = comparator;
  this.items=[];
  this.count=0;
}

/* Default comparator. */
jsgl.util.SortedList.prototype.comparator = function(a,b)
{
  if(b > a) return 1;
  if(b < a) return -1;
  return 0;
}

jsgl.util.SortedList.prototype.setComparator = function(comparator)
{
  if(comparator)
  {
    this.comparator = comparator;
  }
  else
  {
    delete this.comparator;
  }
}

// prepsat na binarni hledani!
jsgl.util.SortedList.prototype.add = function(item)
{
  var pos;
  if(this.count == 0)
  {
    pos = 0;
  }
  else
  {
    var i=this.count;
    while((i > 0) && (this.comparator(this.items[i-1], item) < 0))
    {
      i--;
    }
    pos = i;
    for(var i=this.count; i>=pos; i--)
    {
      this.items[i+1] = this.items[i];
    }
  }
  
  this.items[pos] = item;
  this.count++;
}

jsgl.util.SortedList.prototype.contains = function(item)
{
  for(var i=0; i<this.count; i++)
  {
    if(this.items[i]==item) return true;
  }
  return false;
}

jsgl.util.SortedList.prototype.get = function(index)
{
  return this.items[index];
}

jsgl.util.SortedList.prototype.getCount = function()
{
  return this.count;
}

jsgl.util.SortedList.prototype.remove = function(obj)
{
  if(this.count==0) return;
  for(var i=0; i<this.count; i++)
  {
    if(this.items[i] == obj)
    {
      for(var j=i; j<this.count-1; j++)
      {
        this.items[j]=this.items[j+1];
      }
      this.items[this.count-1] = null;
      this.count--;
      
      break; // remove one element at most
    }
  }
}

jsgl.util.SortedList.prototype.removeAt = function(index)
{
  if(index < 0 || index >= this.count) return;
  for(var i=index; i<this.count-1; i++)
  {
    this.items[i]=this.items[i+1];
  }
  this.items[this.count-1] = null;
  this.count--;
}

jsgl.util.SortedList.prototype.toString = function()
{
  var itemsString = "";
  for(var i=0;i<this.count;i++)
  {
    if(i!=0) itemsString += ",";
    itemsString += this.items[i];
  }
  return "SortedList(count=" + this.count + ",items=[" + itemsString + "])";
}
