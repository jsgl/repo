
jsgl.path.AbstractEllipticalArc = function(rx, ry, rotation, largeArc, sweep, endX, endY) {

  jsgl.path.AbstractPathSegment.call(this);
  
  this.radii = new jsgl.Vector2D(rx || 0, ry || 0);
  
  this.rotation = rotation || 0;
  
  this.largeArc = !!largeArc;
  
  this.sweep = !!sweep;
  
  this.endPoint = new jsgl.Vector2D(endX || 0, endY || 0);
}
jsgl.path.AbstractEllipticalArc.jsglExtend(
  jsgl.path.AbstractPathSegment);

jsgl.path.AbstractEllipticalArc.prototype.getXRadius = function() {

  return this.radii.X;
}

jsgl.path.AbstractEllipticalArc.prototype.setXRadius = function(newRX) {

  this.radii.X = newRX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getYRadius = function() {

  return this.radii.Y;
}

jsgl.path.AbstractEllipticalArc.prototype.setYRadius = function(newRY) {

  this.radii.Y = newRY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getRadii = function() {

  return jsgl.cloneObject(this.radii);
}

jsgl.path.AbstractEllipticalArc.prototype.setRadii = function(newRadii) {

  this.radii = jsgl.cloneObject(newRadii);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.setRadiiXY = function(newRX, newRY) {

  this.radii = new jsgl.Vector2D(newRX, newRY);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getRotation = function() {

  return this.rotation;
}

jsgl.path.AbstractEllipticalArc.prototype.setRotation = function(newRotation) {

  this.rotation = newRotation;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getLargeArc = function() {

  return this.largeArc;
}

jsgl.path.AbstractEllipticalArc.prototype.setLargeArc = function(largeArc) {

  this.largeArc = !!largeArc;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getSweep = function() {

  return this.sweep;
}

jsgl.path.AbstractEllipticalArc.prototype.setSweep = function(sweep) {

  this.sweep = !!sweep;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getEndX = function() {

  return this.endPoint.X;
}

jsgl.path.AbstractEllipticalArc.prototype.setEndX = function(newX) {

  this.endPoint.X = newX;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getEndY = function() {

  return this.endPoint.Y;
}

jsgl.path.AbstractEllipticalArc.prototype.setEndY = function(newY) {

  this.endPoint.Y = newY;
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.getEndPoint = function() {

  return jsgl.cloneObject(this.endPoint);
}

jsgl.path.AbstractEllipticalArc.prototype.setEndPoint = function(newLocation) {

  this.endPoint = jsgl.cloneObject(newLocation);
  this.onChangeRaiser.raiseEvent();
}

jsgl.path.AbstractEllipticalArc.prototype.setEndPointXY = function(newX, newY) {

  this.endPoint = new jsgl.Vector2D(newX, newY);
  this.onChangeRaiser.raiseEvent();
}

/**
 * @private
 */ 
jsgl.path.AbstractEllipticalArc.prototype.bezierApproximation = function(x1, y1, phi, rx, ry, x2, y2, numInterpols) {

  /* Based on Dr. Olaf Hoffmann's
     http://hoffmann.bplaced.net/svgueb/zeig.php?was=ellipse05.php */
  
  var rx = Math.abs(rx),
      ry = Math.abs(ry),
      phi = Math.PI * phi / 180,
      ca = Math.cos(phi),
      sa = Math.sin(phi);
  
  if((rx == 0 && ry == 0) || (x1 == x2 && y1 == y2)) {
  
    return "l" + x1.jsglVmlize() + "," + y1.jsglVmlize() +
           "," + x2.jsglVmlize() + "," + y2.jsglVmlize();
  }
  
  var xs1 = (ca*(x1-x2) + sa*(y1-y2)) / 2,
      ys1 = (-sa*(x1-x2) + ca*(y1-y2)) / 2,
      lambda = Math.sqrt((xs1 * xs1)/(rx * rx) + (ys1 * ys1)/(ry * ry));
  
  if(lambda > 1) {
    
    rx *= lambda;
    ry *= lambda;
  }
  
  var fA = this.largeArc,
      fS = this.sweep,
      mltp = (fA == fS) ? -1 : 1,
      wt1 = rx*rx*ry*ry;
      wt2 = rx*rx*ys1*ys1 + ry*ry*xs1*xs1,
      root = Math.sqrt(Math.max(0, wt1/wt2-1)),
      cxs = mltp*root*rx*ys1 / ry,
      cys = -mltp*root*ry*xs1 / rx,
      cx = ca*cxs - sa*cys + (x1+x2)/2, 
      cy = sa*cxs + ca*cys + (y1+y2)/2,
      xt1 = ca*(x1-cx) + sa*(y1-cy),
      yt1 = -sa*(x1-cx) + ca*(y1-cy),
      xt2 = ca*(x2-cx) + sa*(y2-cy),
      yt2 = -sa*(x2-cx) + ca*(y2-cy),
      th1 = xt1 / rx,
      th2 = yt1 / ry,
      th3 = xt2 / rx,
      th4 = yt2 / ry,
      vh = (yt1 >= 0 ? 1 : -1),
      vg = (yt2 >= 0 ? 1 : -1),
      theta1 = vh * Math.acos(th1 / Math.sqrt(th1*th1 + th2*th2)),
      theta2 = vg * Math.acos(th3 / Math.sqrt(th3*th3 + th4*th4)),
      dtheta = Math.abs(theta2 - theta1),
      dthetb = Math.abs(dtheta - 2*Math.PI);
      
  if(fA) {

    dtheta = Math.max(dtheta, dthetb);
  }
  else {
  
    dtheta = Math.min(dtheta, dthetb);
  }
  
  if(!fS) {
  
    dtheta *= -1;
  }
  
  
  var dPhi = dtheta / numInterpols,
      data = [];
  
  for(var i=0; i<=numInterpols; i++) {
  
    data[i] = [];
  
    var tt = i * dPhi,
        cpi = Math.cos(tt + theta1),
        spi = Math.sin(tt + theta1),
        xx = rx*cpi,
        yy = ry*spi,
        dx = -dPhi*rx*spi,
        dy = dPhi*ry*cpi;
    
    data[i][0] = ca*xx - sa*yy + cx;
    data[i][1] = sa*xx + ca*yy + cy;
    data[i][2] = ca*dx - sa*dy;
    data[i][3] = sa*dx + ca*dy;
  }
  
  var cpx = data[0][0] + data[0][2] / 3,
      cpy = data[0][1] + data[0][3] / 3;
  
  var cq = [];
  
  for(var i=0; i<=numInterpols; i++) {
  
    cq[i] = { x : data[i][0] - data[i][2] / 3,
              y : data[i][1] - data[i][3] / 3 };
  }
  
  var result = 'l' + data[0][0].jsglVmlize() + ',' + data[0][1].jsglVmlize() +
               'c' + cpx.jsglVmlize() + ',' + cpy.jsglVmlize() + ',' +
               cq[1].x.jsglVmlize() + ',' + cq[1].y.jsglVmlize() + ',' +
               data[1][0].jsglVmlize() + ',' + data[1][1].jsglVmlize();
  
  for(var i=2; i<=numInterpols; i++) {

    result += 'c' + (2*data[i-1][0] - cq[i-1].x).jsglVmlize() +
              ',' + (2*data[i-1][1] - cq[i-1].y).jsglVmlize() + ',' +
              cq[i].x.jsglVmlize() + ',' + cq[i].y.jsglVmlize() + ',' +
              data[i][0].jsglVmlize() + ',' + data[i][1].jsglVmlize();
  }
  
  return result;
}
