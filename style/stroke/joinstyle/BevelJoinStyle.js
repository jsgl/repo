jsgl.stroke.BevelJoinStyle=function()
{
}
jsgl.stroke.BevelJoinStyle.jsglExtend(jsgl.stroke.AbstractJoinStyle);

jsgl.stroke.BevelJoinStyle.prototype.applyToSvgElement=function(svgElement)
{
  svgElement.style.setProperty("stroke-linejoin","bevel",null);
}

jsgl.stroke.BevelJoinStyle.prototype.applyToVmlStrokeElement=function(strokeElement)
{
  strokeElement.joinstyle="bevel";
}

jsgl.stroke.BevelJoinStyle.prototype.containsPointStrokeTest=function(
  point,vertexLocation,orientationA,orientationB,strokeWidth)
{
  var u1=Math.cos(orientationA+Math.PI/2)*strokeWidth/2,
      u2=Math.sin(orientationA+Math.PI/2)*strokeWidth/2,
      v1=Math.cos(orientationB-Math.PI/2)*strokeWidth/2,
      v2=Math.sin(orientationB-Math.PI/2)*strokeWidth/2,
      w1=point.X-vertexLocation.X,
      w2=point.Y-vertexLocation.Y;
  
  var t=(u1*w2 - u2*w1)/(u1*v2 - u2*v1),
      s=(w1-v1*t)/u1;
  
  return (s >= 0) && (t >= 0) && (s + t <= 1);  
}

jsgl.stroke.BevelJoinStyle.getInstance=jsgl.util.singletonInstanceGetter;