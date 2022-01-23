class Pen{
  constructor(){
    this.drawing = false;
    this.color = "black";
    this.width = 5;
    this.flag= false;
  }
}
class Shuchusen{
  constructor(){
    this.flag = false;
    this.x=0;
    this.y=0;
    this.r=200;
    this.inr=0.01;
  }
}
class Canvas{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.borderWidth=1;
    this.x=0;
    this.y=0;
    this.startX = c.width/2;
    this.startY = c.height/2;
    this.flag = false;
    this.ratio=1;
  }

  setpoint(e){
    if(window.innerWidth>600){
      this.ratio=3;
    }else{
      this.ratio=4.5;
    }
    var rect = e.target.getBoundingClientRect();
    this.startX = (e.clientX - rect.left - this.borderWidth)*this.ratio;
    this.startY = (e.clientY - rect.top - this.borderWidth)*this.ratio;
    return [this.startX,this.startY];
  }
  trackpoint(e){
    var rect = e.target.getBoundingClientRect();
    this.x = e.clientX - rect.left - this.borderWidth;
    this.y = e.clientY - rect.top - this.borderWidth;
  }
  dot(){
    this.ctx.beginPath();
    this.ctx.arc(this.startX,this.startY,2,0,Math.PI*2,false);
    this.ctx.fill();
  }
  drawstroke(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX,this.startY);
    this.ctx.lineTo(this.x,this.y);
    this.ctx.stroke();
    this.startX = this.x;
    this.startY = this.y;
    return;
  }
  setpen(pen){
    this.ctx.lineWidth = pen.width;
    this.ctx.strokeStyle = pen.color;
    this.ctx.fillStyle = pen.color;
  }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
  drawuserImage(img,img2){
    this.ctx.drawImage(img,0,0,this.canvaelm.width,this.canvaelm.height);

  }
  drawshuchu(tx,ty,r,inr){
    var x,y;
    var startang=0;
    var endang=0.2*Math.PI*i;
    var gradobj = this.ctx.createRadialGradient(tx,ty,0,tx,ty,r);
    var d = 1000;
    var f = true;
    var si = 0;
    var csi = 0;
    gradobj.addColorStop(inr,'rgba(0,0,0,0)');
    gradobj.addColorStop(1.0,'rgba(0,0,0,1)');
    this.ctx.fillStyle=gradobj;
    for(var i=0;i<d;i++){
      startang = 2*Math.PI*i/d;
      endang =   2*Math.PI*(i+1)/d;
      si = Math.random();
      csi=Math.random();

      if(si>0.9){
        f=true;
      }else{
        f=false;
      }
      if(f){
        gradobj.addColorStop(inr,'rgba(0,0,0,0)');
        this.ctx.beginPath();
        this.ctx.arc(tx,ty,200,startang,endang,false);
        this.ctx.lineTo(tx,ty);
        this.ctx.closePath();
        this.ctx.fill();
      }
    }
  }
}
class Wave{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.flag=false;
  }
  drawrandomwave(){
    let x=Math.ceil(Math.random()*this.canvaelm.width);
    let y=Math.ceil(Math.random()*this.canvaelm.height);
    let r=Math.random()*this.canvaelm.height/2;
    let grad=this.ctx.createRadialGradient(x,y,0,x,y,r);
    let a = Math.random();
    let w=`rgb(0,0,0,${a})`;
    let b="rgba(0,0,0,0)";
    grad.addColorStop(0,w);
    /*grad.addColorStop(0.2,b);
    grad.addColorStop(0.4,w);
    grad.addColorStop(0.6,b);
    grad.addColorStop(0.8,w);*/
    grad.addColorStop(1,b);
    this.ctx.fillStyle=grad;
    this.ctx.fillRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
  clear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}
class ShuchuCanvas{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.borderWidth=1;
    this.flag = false;
    this.r=c.height;
    this.inr=0.01;
  }
  drawshuchu(tx,ty,r,inr){
    var x,y,rr;
    var startang=0;
    var endang=0.2*Math.PI*i;
    var gradobj = this.ctx.createRadialGradient(tx,ty,0,tx,ty,r);
    var d = 1000;           //線の本数
    var f = true;
    var si = 0;

    gradobj.addColorStop(0.01,'rgba(0,0,0,0)');
    gradobj.addColorStop(1.0,'rgba(254,0,0,1)');
    this.ctx.fillStyle=gradobj;
    for(var i=0;i<d;i++){
      startang = 2*Math.PI*i/d;
      endang =   2*Math.PI*(i+1)/d;
      si = Math.random();
      inr=Math.random();
      rr=Math.random()*r;
      gradobj.addColorStop(inr,'rgba(0,0,0,0)');
      if(si>0.5){
        f=true;
      }else{
        f=false;
      }
      if(f){

        this.ctx.beginPath();
        this.ctx.arc(tx,ty,rr,startang,endang,false);
        this.ctx.lineTo(tx,ty);
        this.ctx.closePath();
        this.ctx.fill();
      }
    }
  }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}



class Arcron{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.cw = c.width;
    this.ch = c.height;
    this.flag=false;
  }
  drawarc(){
    var x=Math.random()*this.cw;
    var y=Math.random()*this.ch;
    var r = Math.random()*this.ch;
    var redval=Math.floor(Math.random()*255);
    var blueval=Math.floor(Math.random()*255);
    var greenval=Math.floor(Math.random()*255);
    var aval=Math.floor(Math.random()*10)/10;
    var textrgba="rgba("+redval+","+greenval+","+blueval+","+1+")";
    this.ctx.fillStyle=textrgba;
    this.ctx.beginPath();
    this.ctx.arc(x,y,r,0,2*Math.PI,false);
    this.ctx.fill();
  }
　　drawprimecolor(){
      var x=Math.random()*this.cw;
      var y=Math.random()*this.ch;
      var r = Math.random()*100;
      var color= Math.random();
      //var aval=Math.floor(Math.random()*10)/10;
      if(color>0.66){
        var textrgba="rgba("+255+","+0+","+0+","+1+")";
      }else if(color>0.33){
        var textrgba="rgba("+255+","+255+","+0+","+1+")";
      }else{
        var textrgba="rgba("+0+","+0+","+255+","+1+")";
      }
      this.ctx.fillStyle=textrgba;
      this.ctx.beginPath();
      this.ctx.arc(x,y,r,0,2*Math.PI,false);
      this.ctx.fill();
  }
  drawdrop(x,y){
    var a=Math.random()*this.canvaelm.height;   //三角形の高さ
    var a2=Math.sqrt(3)*a/2;
    var r=Math.ceil(Math.random()*360);   //回転角度
    var rad1=r*Math.PI/180;
    var rad2=(r+30)*Math.PI/180;
    var rad3=(r+60)*Math.PI/180;
    var x2=Math.cos(rad1)*a+x;
    var y2=Math.sin(rad1)*a+y;
    var x2c=Math.cos(rad2)*a2+x;
    var y2c=Math.sin(rad2)*a2+y;
    var x2b=Math.cos(rad3)*a+x;
    var y2b=Math.sin(rad3)*a+y;
    var rn=Math.ceil(Math.random()*255);
    var gn=Math.ceil(Math.random()*255);
    var bn=Math.ceil(Math.random()*255);
    this.ctx.fillStyle=`rgb(${rn},${gn},${bn})`;
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.quadraticCurveTo(x2,y2,x2c,y2c);
    this.ctx.quadraticCurveTo(x2b,y2b,x,y);
    this.ctx.fill();
  }

  downloadimg(){
     var pngdata = this.canvaelm.toDataURL();
     var link = document.createElement("a");
     link.setAttribute("href",pngdata);
     link.setAttribute("download","mypng.png");
     var val=document.createTextNode("ダウンロード");
     link.appendChild(val);
     document.getElementById("load").appendChild(link);
  };
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}

class Dousin{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.x=c.width/2;
    this.y=c.height/2;
  }
  drawen(){
    var r=Math.random()*this.y;
    this.ctx.beginPath();
    this.ctx.lineWidth=10;
    this.ctx.arc(this.x,this.y,r,0,2*Math.PI,false);
    this.ctx.stroke();
  }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}

class Fonttext{
  constructor(c,x,y,size,w){
    this.canvaelm=c;
    this.ctx = c.getContext('2d');
    this.flag=false;
    this.size=size;
    this.x=x;
    this.y=y;
    this.txt="";
    this.fw=w;
  }

  drawtext(){
    this.ctx.font=this.fw+"\t"+this.size+"px"+" arial";
    this.ctx.fillText(this.txt,this.x,this.y);
  }

  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }

}

class Lineran{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.flag=false;
  }
  drawline(){
    var y1 = Math.random()*this.canvaelm.height;
    var y2 = Math.random()*this.canvaelm.height;
    this.ctx.beginPath();
    this.ctx.moveTo(0,y1);
    this.ctx.lineTo(this.canvaelm.width,y2);
    this.ctx.stroke();
  }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}
class Gradient{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
  }
  drawgradient(){
    var gradobj=this.ctx.createLinearGradient(this.canvaelm.width,0,0,0);
    gradobj.addColorStop(0,'rgba(0,0,0,0)');
    gradobj.addColorStop(0.5,'rgba(0,0,0,0.5)');
    gradobj.addColorStop(1,'rgba(0,0,0,1)');
    this.ctx.fillStyle=gradobj;
    this.ctx.fillRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}
class Spring{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.flag = false
  }
  gradrandom(sx,sy){
    var y;
    var x;
    sx=this.canvaelm.width/2;
    sy=this.canvaelm.height/2;
    y=Math.random()*Math.pow(this.canvaelm.width,3);
    x=this.canvaelm.width-Math.pow(y,0.33);
    var r=Math.random()*Math.PI*2;
    var rx=Math.cos(r)*x;
    var ry=Math.sin(r)*x;
    var cp=Math.pow(y,0.33)/this.canvaelm.width*255;
    var cp1=Math.random()*255;
    var cp2=Math.random()*255;
    var colors=`rgba(${cp},${cp1},${cp2},0.1)`;
    this.ctx.beginPath();
    this.ctx.fillStyle=colors;
    this.ctx.arc(rx+sx,ry+sy,10,0,2*Math.PI,false);   //円型
    //this.ctx.arc(x,this.canvaelm.height/2,10,0,2*Math.PI,false);  //直線
    this.ctx.fill();
  }
}
class Zukei{
  constructor(c,r){
    this.rangeelm=r;
    this.canvaelm=c;
    this.rctx=r.getContext('2d');
    this.ctx=c.getContext('2d');
    this.flag=0;
    this.vector=0;
    this.startX=0;
    this.startY=0;
    this.rowside=0;
    this.colside=0;
    this.x=0;
    this.y=0;
    this.borderWidth=1;
    this.ratio=1;
     }
  setStartpoint(e){
    if(window.innerWidth>600){
      this.ratio=3;
    }else{
      this.ratio=4.5;
    }
    var rect = e.target.getBoundingClientRect();
    this.startX=(e.clientX-rect.left-this.borderWidth)*this.ratio;
    this.startY=(e.clientY-rect.top-this.borderWidth)*this.ratio;
  }
  selectrange(e){
    this.rctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
    var rect = e.target.getBoundingClientRect();
    this.x = (e.clientX-rect.left-this.borderWidth)*this.ratio;
    this.y = (e.clientY-rect.top-this.borderWidth)*this.ratio;
    this.rctx.strokeStyle="black";
    this.rctx.beginPath();
    //this.rctx.setLineDash(10,5,10,5);

    if(this.flag == 1){
      if(this.x-this.startX>0){
        if(this.y-this.startY>0){
          this.rctx.rect(this.startX,this.startY,this.x-this.startX,this.y-this.startY);
        }else{
          this.rctx.rect(this.startX,this.y,this.x-this.startX,this.startY-this.y);
        }
      }else{
        if(this.y-this.startY>0){
          this.rctx.rect(this.x,this.startY,this.startX-this.x,this.y-this.startY);
        }else{
          this.rctx.rect(this.x,this.y,this.startX-this.x,this.startY-this.y);
        }
      }
    }else if(this.flag == 2){
      let halfx,halfy;
      if(this.x-this.startX>0){
        if(this.y-this.startY>0){
            halfx=(this.x-this.startX)/2+this.startX;
            halfy=(this.y-this.startY)/2+this.startY;
        }else{
          halfx=(this.x-this.startX)/2+this.startX;
          halfy=(this.startY-this.y)/2+this.y;
        }
      }else{
        if(this.y-this.startY>0){
          halfx=(this.startX-this.x)/2+this.x;
          halfy=(this.y-this.startY)/2+this.startY;
        }else{
          halfx=(this.startX-this.x)/2+this.x;
          halfy=(this.startY-this.y)/2+this.y;
        }
      }
      this.rctx.beginPath();
      this.rctx.moveTo(this.startX,halfy);
      this.rctx.quadraticCurveTo(this.startX,this.y,halfx,this.y);
      this.rctx.quadraticCurveTo(this.x,this.y,this.x,halfy);
      this.rctx.quadraticCurveTo(this.x,this.startY,halfx,this.startY);
      this.rctx.quadraticCurveTo(this.startX,this.startY,this.startX,halfy);
    }else if(this.flag == 3){
      var halfx;
      if((this.x-this.startX)>0){
         halfx=(this.x-this.startX)/2+this.startX;
      }else{
         halfx=(this.startX-this.x)/2+this.x;
      }
      this.rctx.beginPath();
      this.rctx.fillStyle="rgba(0,0,0,1)";
      this.rctx.moveTo(halfx,this.startY);
      this.rctx.lineTo(this.startX,this.y);
      this.rctx.lineTo(this.x,this.y);
      this.rctx.closePath();
    }
    this.rctx.stroke();
  }
  drawsikaku(){
    this.rctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
    if(this.x-this.startX>0){
      if(this.y-this.startY>0){
        this.ctx.fillRect(this.startX,this.startY,this.x-this.startX,this.y-this.startY);
      }else{
        this.ctx.fillRect(this.startX,this.y,this.x-this.startX,this.startY-this.y);
      }
    }else{
      if(this.y-this.startY>0){
        this.ctx.fillRect(this.x,this.startY,this.startX-this.x,this.y-this.startY);
      }else{
        this.ctx.fillRect(this.x,this.y,this.startX-this.x,this.startY-this.y);
      }
    }
  }
  drawcircle(){
    this.rctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
    /*let halfx,halfy;
    if(this.x-this.startX>0){
      if(this.y-this.startY>0){
          halfx=(this.x-this.startX)/2+this.startX;
          halfy=(this.y-this.startY)/2+this.startY;
      }else{
        halfx=(this.x-this.startX)/2+this.startX;
        halfy=(this.startY-this.y)/2+this.y;
      }
    }else{
      if(this.y-this.startY>0){
        halfx=(this.startX-this.x)/2+this.x;
        halfy=(this.y-this.startY)/2+this.startY;
      }else{
        halfx=(this.startX-this.x)/2+this.x;
        halfy=(this.startY-this.y)/2+this.y;
      }
    }
    this.ctx.beginPath();
    this.ctx.fillStyle="rgba(0,0,0,1)";
    this.ctx.moveTo(this.startX,halfy);
    this.ctx.quadraticCurveTo(this.startX,this.y,halfx,this.y);
    this.ctx.quadraticCurveTo(this.x,this.y,this.x,halfy);
    this.ctx.quadraticCurveTo(this.x,this.startY,halfx,this.startY);
    this.ctx.quadraticCurveTo(this.startX,this.startY,this.startX,halfy);
    this.ctx.fill();*/
    this.ctx.beginPath();
    this.ctx.scale()
    this.ctx.arc()
  }

   drawtriangle(){
     this.rctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
     var halfx;
     if((this.x-this.startX)>0){
        halfx=(this.x-this.startX)/2+this.startX;
     }else{
        halfx=(this.startX-this.x)/2+this.x;
     }
     this.ctx.beginPath();
     this.ctx.fillStyle="rgba(0,0,0,1)";
     this.ctx.moveTo(halfx,this.startY);
     this.ctx.lineTo(this.startX,this.y);
     this.ctx.lineTo(this.x,this.y);
     this.ctx.closePath();
     this.ctx.fill();
   }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}
/*class Drop{
  constructor(c){
    this.canvaelm=c;
    this.ctx=c.getContext('2d');
    this.flag=false;
  }
  drawdrop(x,y){
    var a=Math.random()*this.canvaelm.height;   //三角形の高さ
    var a2=Math.sqrt(3)*a/2;
    var r=Math.ceil(Math.random()*360);   //回転角度
    var rad1=r*Math.PI/180;
    var rad2=(r+30)*Math.PI/180;
    var rad3=(r+60)*Math.PI/180;
    var x2=Math.cos(rad1)*a+x;
    var y2=Math.sin(rad1)*a+y;
    var x2c=Math.cos(rad2)*a2+x;
    var y2c=Math.sin(rad2)*a2+y;
    var x2b=Math.cos(rad3)*a+x;
    var y2b=Math.sin(rad3)*a+y;
    var rn=Math.ceil(Math.random()*255);
    var gn=Math.ceil(Math.random()*255);
    var bn=Math.ceil(Math.random()*255);
    this.ctx.fillStyle=`rgb(${rn},${gn},${bn})`;
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.quadraticCurveTo(x2,y2,x2c,y2c);
    this.ctx.quadraticCurveTo(x2b,y2b,x,y);
    this.ctx.fill();
  }
  allclear(){
    this.ctx.clearRect(0,0,this.canvaelm.width,this.canvaelm.height);
  }
}*/

class Photo{
  constructor(c){
    this.ctx=c.getContext('2d');
    this.img=document.createElement("img");
    this.width=c.width;
    this.height=c.height;
  }
  allclear(){
    this.ctx.clearRect(0,0,this.width,this.height);
  }
}
