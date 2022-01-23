
var canvaelm1 = document.getElementById('canvas1');
var canvaelm2 = document.getElementById('shuchucanvas');
var canva1 = new Canvas(canvaelm1);
var shuchucanva = new ShuchuCanvas(canvaelm2);

var pen = new Pen();
var shuchusen = new Shuchusen();
var eraserelm = document.getElementById("eraser");

var ranarc = new Arcron(document.getElementById("ranarc"));
var dousinen = new Dousin(document.getElementById("dousinen"));
var fonttext = new Fonttext(document.getElementById("textcanv"),0,200,100,900);
var subfont = new Fonttext(document.getElementById("subtextcanv"),0,550,500,900);
var thirdfont = new Fonttext(document.getElementById("thirdtextcanv"),0,700,100,900);
var lineran = new Lineran(document.getElementById("linecanv"));
var gradientlayer= new Gradient(document.getElementById("gradientcanv"));
var zukei = new Zukei(document.getElementById("zukei"),document.getElementById("range"));
var wave=new Wave(document.getElementById("wavecanv"));
var tools = [document.getElementById("zukeibtn"),document.getElementById("circlebtn"),document.getElementById("trianglebtn")];
var spring =new Spring(document.getElementById("springcanv"));
var photos=new Photo(document.getElementById("photocanv"));
document.getElementById("file").addEventListener('change',function(e){
    let filedata=e.target.files[0];
    let reader = new FileReader();
    reader.onload=function(){
      photos.allclear();
      photos.img.src=reader.result;
      photos.ctx.drawImage(photos.img,0,0,photos.width,photos.height);
    };
    reader.readAsDataURL(filedata);
  });

document.getElementById("springbtn").addEventListener("click",function(){
  if(!spring.flag){
    spring.flag = true
  var interval = setInterval(function(){
      spring.gradrandom();
      if(!spring.flag){
        clearInterval(interval)
      }
  },1);
}else{
  spring.flag = false
}
});
document.getElementById("dropbtn").addEventListener("click",function(){
  ranarc.flag=!ranarc.flag;
  if(ranarc.flag){
  var interval=setInterval(function(){
       if(ranarc.flag){
         var x=Math.ceil(Math.random()*ranarc.canvaelm.width);
         var y=Math.ceil(Math.random()*ranarc.canvaelm.height);
         ranarc.drawdrop(x,y);
       }else{
         clearInterval(interval);
       }
  },100);
}
});
document.getElementById("wavebtn").addEventListener("click",function(){
  wave.flag=!wave.flag;
  if(wave.flag){
    wave.drawrandomwave();
    //wave.ctx.globalCompositeOperation="source-in";
  var interval=setInterval(function(){
    if(wave.flag){
      wave.drawrandomwave();
    }else{
      clearInterval(interval);
    }
  },100);
}
});
document.getElementById("zukeibtn").addEventListener("click",function(){
  zukei.flag = 1;
  this.classList.toggle("selected");
  tools[1].classList.remove("selected");
  tools[2].classList.remove("selected");
});
document.getElementById("circlebtn").addEventListener("click",function(){
  zukei.flag = 2;
  this.classList.toggle("selected");
  tools[0].classList.remove("selected");
  tools[2].classList.remove("selected");
});
document.getElementById("trianglebtn").addEventListener("click",function(){
  zukei.flag = 3;
  this.classList.toggle("selected");
  tools[0].classList.remove("selected");
  tools[1].classList.remove("selected");
})

document.getElementById("primebtn").addEventListener("click",function(){
  ranarc.flag=!ranarc.flag;
  if(ranarc.flag){
    var interval = setInterval(function(){
      if(ranarc.flag){
      ranarc.drawprimecolor();
      }else{
       clearInterval(interval);
      }
    },100);
  }

});
document.getElementById("readimg").addEventListener("click",function(){
  ranarc.downloadimg();
});

document.getElementById("lineargradientbtn").addEventListener("click",function(){
   gradientlayer.drawgradient();
});
document.getElementById("linebtn").addEventListener("click",function(){
  this.value="止める";
  lineran.flag=!lineran.flag;
  if(lineran.flag){
    var interval=setInterval(function(){
       lineran.drawline();
      if(!lineran.flag){
       clearInterval(interval);
     }
    },100);
}else{
  this.value="線引き";
}
});

document.getElementById("ranarcbtn").addEventListener("click",function(){
  var count=0;
  ranarc.flag=!ranarc.flag;
  var arctimer = setInterval(function(){
    ranarc.drawarc();
    count++;
    if((count > 100)||!ranarc.flag){
      clearInterval(arctimer);
    }
  },100);
});
document.getElementById("cleararc").addEventListener("click",function(){
  ranarc.allclear();
});
document.getElementById("clearshuchu").addEventListener("click",function(){
  shuchucanva.allclear();
});
document.getElementById("clearen").addEventListener("click",function(){
  dousinen.allclear();
});

document.getElementById("text").addEventListener("input",function(){

      fonttext.allclear();
      fonttext.txt=this.value;
      fonttext.drawtext();

});
document.getElementById("stext").addEventListener("input",function(){

      subfont.allclear();
      subfont.txt=this.value;
      subfont.drawtext();

});
document.getElementById("ttext").addEventListener("input",function(){

      thirdfont.allclear();
      thirdfont.txt=this.value;
      thirdfont.drawtext();

});



document.getElementById("tx").addEventListener("input",function(){
     fonttext.x=this.value;
     fonttext.allclear();
     fonttext.drawtext();
});
document.getElementById("ty").addEventListener("input",function(){
    fonttext.y=this.value;
    fonttext.allclear();
    fonttext.drawtext();
});
document.getElementById("tsize").addEventListener("input",function(){
    fonttext.size=this.value;
    fonttext.allclear();
    fonttext.drawtext();
});

document.getElementById("stx").addEventListener("input",function(){
     subfont.x=this.value;
     subfont.allclear();
     subfont.drawtext();
});
document.getElementById("sty").addEventListener("input",function(){
    subfont.y=this.value;
    subfont.allclear();
    subfont.drawtext();
});
document.getElementById("stsize").addEventListener("input",function(){
    subfont.size=this.value;
    subfont.allclear();
    subfont.drawtext();
});

document.getElementById("ttx").addEventListener("input",function(){
     thirdfont.x=this.value;
     thirdfont.allclear();
     thirdfont.drawtext();
});
document.getElementById("tty").addEventListener("input",function(){
    thirdfont.y=this.value;
    thirdfont.allclear();
    thirdfont.drawtext();
});
document.getElementById("ttsize").addEventListener("input",function(){
    thirdfont.size=this.value;
    thirdfont.allclear();
    thirdfont.drawtext();
});

eraserelm.addEventListener("click",function(){
    pen.color = "white";
    pen.width = 20;
    canva1.setpen(pen);
});
var picker=document.getElementById("colorpicker");
picker.addEventListener("change",function(){
  pen.color=this.value;
  canva1.setpen(pen);
  canva1.setpen(pen);
});
var img = new Image();
img.src="ikemen2.png";
var img2 = new Image;
img2.src = "001_line.png";
document.getElementById("insertimg").addEventListener("click",function(){
  canva1.drawuserImage(img);
});
function plotdata(imgdata){
  var w=imgdata.width;
  var h=imgdata.height;
}
document.getElementById("screenbtn").addEventListener('click',function(){
   var cw=canvaelm1.width;
   var ch=canvaelm1.height;
   var maindata=photos.ctx.getImageData(0,0,cw,ch);
   var colordata=ranarc.ctx.getImageData(0,0,cw,ch);
   for(var i=0,len=cw*ch;i<len;i++){
     maindata.data[i*4]=maindata.data[i*4]+colordata.data[i*4];
     maindata.data[i*4+1]=maindata.data[i*4+1]+colordata.data[i*4+1];
     maindata.data[i*4+2]=maindata.data[i*4+2]+colordata.data[i*4+2];
   }
   ranarc.allclear();
   photos.ctx.putImageData(maindata,0,0);
});
document.getElementById("domask").addEventListener("click",function(){

     var canvw=canvaelm1.width;
     var canvh=canvaelm1.height;
     var imgdata = ranarc.ctx.getImageData(0,0,canvw,canvh);
     var maindata=ranarc.ctx.getImageData(0,0,canvw,canvh);
     var shuchudata=shuchucanva.ctx.getImageData(0,0,canvw,canvh);
     var endata=dousinen.ctx.getImageData(0,0,canvw,canvh);
     var textdata = fonttext.ctx.getImageData(0,0,canvw,canvh);
     var subtext = subfont.ctx.getImageData(0,0,canvw,canvh);
     var thirdtext = thirdfont.ctx.getImageData(0,0,canvw,canvh);
     var linedata = lineran.ctx.getImageData(0,0,canvw,canvh);
     var gradata = gradientlayer.ctx.getImageData(0,0,canvw,canvh);
     var zukeidata = zukei.ctx.getImageData(0,0,canvw,canvh);
     var wavedata = wave.ctx.getImageData(0,0,canvw,canvh);
     for(var i=0,len=canvw*canvh;i<len;i++){
          imgdata.data[i*4]=maindata.data[i*4];
          imgdata.data[i*4+1]=maindata.data[i*4+1];
          imgdata.data[i*4+2]=maindata.data[i*4+2];
          var d = shuchudata.data[i*4+3]+endata.data[i*4+3]+textdata.data[i*4+3]+subtext.data[i*4+3]+thirdtext.data[i*4+3]+linedata.data[i*4+3]
          +gradata.data[i*4+3]+zukeidata.data[i*4+3]+wavedata.data[i*4+3];
          imgdata.data[i*4+3]=(d>0&&maindata.data[i*4+3]>0)?d:0;
     }
     shuchucanva.allclear();
     dousinen.allclear();
     fonttext.allclear();
     subfont.allclear();
     thirdfont.allclear();
     lineran.allclear();
     gradientlayer.allclear();
     ranarc.ctx.putImageData(imgdata,0,0);
     zukei.allclear();
     wave.clear();
});
document.getElementById("dousinbtn").addEventListener("click",function(){
        dousinen.drawen();
});
//マウスの座標を取得
/*var mouse = {
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  color: "black",
  isDrawing: false
};
var borderWidth = 1;
*/

  /*	ctx.beginPath();

マウスを押したら、描画OK(myDrawをtrue)*/
let penelm = document.getElementById("pen");
penelm.addEventListener("click",function(){
  initflags();
  pen.flag = true;
  pen.color=picker.value;
  pen.width=5;
  canva1.setpen(pen);
});
canvaelm1.addEventListener("mousedown",function(e){          //クリックした時

  canva1.setpoint(e);
  canva1.flag = true;
  if(pen.flag){
    canva1.dot();
  }
  if(shuchucanva.flag){
  shuchucanva.drawshuchu(canva1.startX,canva1.startY,shuchusen.r,shuchusen.inr);
}
if(zukei.flag>0){
  zukei.setStartpoint(e);
}

});



canvaelm1.addEventListener("mousemove",function(e){
  canva1.trackpoint(e);
  if(canva1.flag){
    if(pen.flag){
       canva1.drawstroke();
   }
   if(zukei.flag>0){
      zukei.selectrange(e);
   }
}
});





canvaelm1.addEventListener("mouseup",function(){
  if(zukei.flag==1){
    zukei.drawsikaku();
  }else if(zukei.flag == 2){
    zukei.drawcircle();
  }else if(zukei.flag == 3){
    zukei.drawtriangle();
  }
  canva1.flag=false;
});
canvaelm1.addEventListener("mouseleave",function(){
  canva1.flag=false;
});


document.getElementById("clear").addEventListener("click",function(){
  canva1.allclear();
});


document.getElementById("clearline").addEventListener("click",function(){
  lineran.allclear();
});

    var v=[];

     document.getElementById("shuchubtn1").addEventListener("mousedown",function(){
     initflags();
     shuchusen.flag=true;
     var k = parseInt(this.id.slice(-1))-1;
     var interval=setInterval(function(){
       if(shuchusen.flag){
       shuchucanva.drawshuchu(canva1.startX,canva1.startY,shuchusen.r,shuchusen.inr);
     }else{
       clearInterval(interval);
     }
   },10);
 });
   document.getElementById("shuchubtn1").addEventListener("mouseup",function(){
     shuchusen.flag=false;
   });

/*document.getElementById("shuchubtn1").addEventListener("click",function(){   //layer1
  initflags();
  shuchusen.flag=!shuchusen.flag;
  shuchucanva.drawshuchu(canva1.startX,canva1.startY,shuchusen.r,shuchusen.inr);
});*/
document.getElementById("shuchur1").addEventListener("input",function(e){
  if(shuchusen.flag){
  shuchucanva.allclear();
  shuchusen.r=this.value;
  shuchucanva.drawshuchu(canva1.startX,canva1.startY,shuchusen.r,shuchusen.inr);
}
});
document.getElementById("shuchuinr1").addEventListener("input",function(){
  if(shuchusen.flag){
  shuchucanva.allclear();
  shuchusen.inr=this.value;
  shuchucanva.drawshuchu(canva1.startX,canva1.startY,shuchusen.r,shuchusen.inr);
}
});



function initflags(){
  pen.flag=false;
  shuchusen.flag=false;
}
