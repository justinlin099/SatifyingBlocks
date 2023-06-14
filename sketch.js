// 設定畫布大小
const canvasWidth = 1280;
const canvasHeight = 720;
let squares=[];
let columnNum=4;
columnMargin=20;


function preload(){
  
}

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  for(var i=0;i<=columnNum;i++){
    squares[i]=[];
    for(var j=0;j<30;j++){
      let c;
      let square;
      if((j+1)%2==0){
        c=color(255);//間隔的顏色
        //間隔
        square=new Square(0,0,(canvasWidth-(columnNum-1)*columnMargin)/columnNum,random(20,40),c);
      }else{
        //方塊的顏色
        if(floor(random(3))==1){
          c=color('#C8C8C8');
        }else{
          c=color('#67E4FF');
        }
        //方塊
        square=new Square(0,0,(canvasWidth-(columnNum-1)*columnMargin)/columnNum,random(10,200),c);
      }
      
      squares[i].push(square);
    }
  }
  
  

}

function draw() {
  background(255);
  push();
  translate((windowWidth-canvasWidth)/2,(windowHeight-canvasHeight)/2)
  for(var i=0;i<squares.length;i++){
    translate(0,100*sin((squares[i][3].timer)/2)-90);
    for(var j=0;j<squares[i].length;j++){
      squares[i][j].display();
      if(i==0 && j==0){
        squares[i][j].update(0,0,0,0,0);
      }else if(j==0){
        squares[i][j].update(squares[i-1][0].x+squares[i-1][0].width+columnMargin,0,0,0,0);
      }else{
        squares[i][j].update(squares[i][j-1].x,squares[i][j-1].y,squares[i][j-1].width,squares[i][j-1].height,squares[i][j-1].timer);
      }
    }
  }
  pop();
  fill(255);//遮罩顏色
  rect(0,0,windowWidth,(windowHeight-canvasHeight)/2);//up
  rect(0,(windowHeight-canvasHeight)/2+canvasHeight,windowWidth,(windowHeight-canvasHeight)/2);//down
  rect(0,0,(windowWidth-canvasWidth)/2,windowHeight);//left
  rect((windowWidth-canvasWidth)/2+canvasWidth,0,(windowWidth-canvasWidth)/2,windowHeight);//right
}

class Square {
  constructor(x,y,width,height,color) {
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.timer=random(360);
    this.color=color;
    
    
  }
  update(lastX,lastY,lastWidth,lastHeight,lastTimer) {
    if(this.timer>=1440){
      this.timer=0;
    }else{
      this.timer++;
    }
    
    this.y=lastY+lastHeight+lastHeight/2*sin(lastTimer);
    this.x=lastX;
    
    
  }
  display() {
    fill(this.color);
    angleMode(DEGREES);
    rect(this.x,this.y,this.width,(this.height+this.height/2*sin(this.timer)));
    
    
  }
}
