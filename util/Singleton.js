jsgl.util.singletonInstanceGetter=function()
{
  if(!this.instance)
  {
    this.instance=new this();
  }
  return this.instance;
}