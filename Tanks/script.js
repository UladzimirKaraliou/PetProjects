
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d');
canvas.height = 800
canvas.width = 1000
const eventOBJ = {
    KeyW : false,
    KeyD : false,
    KeyS : false,
    KeyA : false,
    ArrowUp : false,
    ArrowRight:false,
    ArrowDown : false,
    ArrowLeft : false,
    KeyT : false,
    Numpad8 : false,

}

const gameplay= {
    start(){
         tanks = [new tank(100,100,true),new tank(300,300,false)]
    },
    player1Score : document.getElementById('player1'),
    player2Score : document.getElementById('player2')
}
console.log(gameplay.player1Score);
const rotations = {
    top : 'top',
    right : 'right',
    bottom : 'bottom',
    left : 'left'
}
class tank{
    constructor(x,y,isWASD){
        this.spawnCoordinatas = {
          x: x,
          y: y,         
        }
        this.shots = []
        this.shotsLimit = 1
        this.isWASD = isWASD 
        this.isARROWS = !isWASD
        this.isDead = false
        this.width = 50 
        this.gunHeight = this.width/2* (150/100)
        this.height = 30 
        this.weapons = 0 
        this.lifes = 2
        this.speed = 5
        this.rotation = rotations.left
        this.mooveBox
        this.hitBox 
        
    }
    drawBox(){
        context.strokeRect(this.mooveBox.x, this.mooveBox.y,  this.mooveBox.width, this.mooveBox.height);
        
    }
    get hitBox(){
        return( 
                this.rotation===rotations.right||this.rotation===rotations.left ? 
                {
                    x: this.spawnCoordinatas.x,
                    y : this.spawnCoordinatas.y,
                    width : this.width,
                    height : this.height,
                }:
                {
                    x: this.spawnCoordinatas.x,
                    y : this.spawnCoordinatas.y,
                    width : this.height,
                    height : this.width,   
                }
              )
    }
    get mooveBox(){
        return this.rotation===rotations.right||this.rotation===rotations.left ? {
            x : this.spawnCoordinatas.x - 15,
            y : this.spawnCoordinatas.y - 15,
            width: this.width+30,
            height : this.height+30 
        } : 
        {
            x : this.spawnCoordinatas.x - 15,
            y : this.spawnCoordinatas.y - 15,
            width: this.height+30,
            height: this.width+30,

        }
    }
    changeRotation(){        
        let IsNotChanged = true        
        if(this.isWASD){
            if(eventOBJ.KeyA&&IsNotChanged&&this.spawnCoordinatas.x>0){this.rotation=rotations.left ;IsNotChanged=false}
            if(eventOBJ.KeyD&&IsNotChanged&&this.spawnCoordinatas.x<canvas.width-this.width){this.rotation=rotations.right;IsNotChanged=false}
            if(eventOBJ.KeyW&&IsNotChanged&&this.spawnCoordinatas.y>0){this.rotation=rotations.top ;IsNotChanged=false}
            if(eventOBJ.KeyS&&IsNotChanged&&this.spawnCoordinatas.y<canvas.height-this.width){this.rotation=rotations.bottom ;IsNotChanged=false}
        }
        if(this.isARROWS){
            if(eventOBJ.ArrowLeft&&IsNotChanged&&this.spawnCoordinatas.x>0){this.rotation=rotations.left;IsNotChanged=false}
            if(eventOBJ.ArrowRight&&IsNotChanged&&this.spawnCoordinatas.x<canvas.width-this.width){this.rotation=rotations.right;IsNotChanged=false}
            if(eventOBJ.ArrowUp&&IsNotChanged&&this.spawnCoordinatas.y>0){this.rotation=rotations.top;IsNotChanged=false}
            if(eventOBJ.ArrowDown&&IsNotChanged&&this.spawnCoordinatas.y<canvas.height-this.width){this.rotation=rotations.bottom  ;IsNotChanged=false}
        }   
    }

    create(){
    
    
        let x = null
        let y = null
        let width = null
        let height = null
        switch(this.rotation){
            case rotations.top : {
                x = this.spawnCoordinatas.x
                y = this.spawnCoordinatas.y
                width = this.height
                height = this.width
                
                
            }break;
            case rotations.right: {
                x = this.spawnCoordinatas.x
                y =  this.spawnCoordinatas.y
                width = this.width
                height = this.height
            }break;
            case rotations.bottom: {
                x = this.spawnCoordinatas.x
                y = this.spawnCoordinatas.y
                width = this.height
                height = this.width
            }break;
            case rotations.left: {
                x = this.spawnCoordinatas.x+this.width
                y = this.spawnCoordinatas.y 
                width = -this.width
                height = this.height
            }

        }
        const center = {
            x: x+width/2,
            y: y+height/2
        }
        context.strokeRect(x, y, width, height);
        context.beginPath();
        context.arc(center.x, center.y, 5, Math.PI / 180 * 0, Math.PI / 180 * 360, true);
        context.moveTo(center.x, center.y);
        switch(this.rotation){
            case rotations.top:{
                context.lineTo(center.x, center.y-this.gunHeight);
                
            }break;
            case rotations.right:{
                context.lineTo(center.x+this.gunHeight, center.y);
                
            }break;
            case rotations.bottom:{
                 context.lineTo(center.x, center.y+this.gunHeight);
                
            }break;
            case rotations.left:{
                context.lineTo(center.x-this.gunHeight, center.y);
                
            }break;
        }
        context.fillStyle= this.isWASD ? '#ff00ff' : '#ffff00'
        context.fill();
        context.closePath();
        context.stroke();
        
        
   
    }
    moove(){
        let IsNotMooved = true
        let canItmoove = true
        const opositeTank = this.isWASD ? tanks[1] : tanks[0]
        switch(this.rotation){
            case rotations.right:{
                if( 
                    this.spawnCoordinatas.x < opositeTank.mooveBox.x
                    &&this.spawnCoordinatas.x+this.width+this.speed>opositeTank.mooveBox.x
                    &&((this.spawnCoordinatas.y>opositeTank.mooveBox.y&&this.spawnCoordinatas.y<opositeTank.mooveBox.y+opositeTank.mooveBox.height)
                    ||(this.spawnCoordinatas.y+this.height>opositeTank.mooveBox.y)&&this.spawnCoordinatas.y<opositeTank.mooveBox.y+opositeTank.mooveBox.height)
                    ) {canItmoove=false}break;
            }
            case rotations.left:{
               if(
                    this.spawnCoordinatas.x > opositeTank.mooveBox.x
                    &&this.spawnCoordinatas.x-this.speed <opositeTank.mooveBox.x+opositeTank.mooveBox.width
                    &&((this.spawnCoordinatas.y>opositeTank.mooveBox.y&&this.spawnCoordinatas.y<opositeTank.mooveBox.y+opositeTank.mooveBox.height)
                    ||(this.spawnCoordinatas.y+this.height>opositeTank.mooveBox.y)&&this.spawnCoordinatas.y<opositeTank.mooveBox.y+opositeTank.mooveBox.height)
                    )canItmoove=false;break;
            }
            case rotations.bottom : {
                if(
                    this.spawnCoordinatas.y < opositeTank.spawnCoordinatas.y
                    &&this.spawnCoordinatas.y+this.width+this.speed > opositeTank.mooveBox.y  
                    &&((this.spawnCoordinatas.x>opositeTank.mooveBox.x&&this.spawnCoordinatas.x<opositeTank.mooveBox.x+opositeTank.mooveBox.width)
                    ||(this.spawnCoordinatas.x+this.height>opositeTank.mooveBox.x)&&this.spawnCoordinatas.x<opositeTank.mooveBox.x+opositeTank.mooveBox.width)
                ){canItmoove=false}break;
            }
            case rotations.top :{
                if(
                    this.spawnCoordinatas.y > opositeTank.spawnCoordinatas.y
                    &&this.spawnCoordinatas.y-this.speed < opositeTank.mooveBox.y+opositeTank.mooveBox.height
                    &&((this.spawnCoordinatas.x>opositeTank.mooveBox.x&&this.spawnCoordinatas.x<opositeTank.mooveBox.x+opositeTank.mooveBox.width)
                    ||(this.spawnCoordinatas.x+this.height>opositeTank.mooveBox.x)&&this.spawnCoordinatas.x<opositeTank.mooveBox.x+opositeTank.mooveBox.width) 
                ){{canItmoove=false}break;}
            }
            }
        
       if(canItmoove) 
      {  if(this.isWASD&&!(eventOBJ.KeyA&&eventOBJ.KeyD)&&!(eventOBJ.KeyW&&eventOBJ.KeyS)){
            if(eventOBJ.KeyA&&IsNotMooved&&this.spawnCoordinatas.x>0){this.mooveLeft() ;IsNotMooved=false}
            if(eventOBJ.KeyD&&IsNotMooved&&this.spawnCoordinatas.x<canvas.width-this.width){this.mooveRight() ;IsNotMooved=false}
            if(eventOBJ.KeyW&&IsNotMooved&&this.spawnCoordinatas.y>0){this.mooveTop() ;IsNotMooved=false}
            if(eventOBJ.KeyS&&IsNotMooved&&this.spawnCoordinatas.y<canvas.height-this.width){this.mooveBottom() ;IsNotMooved=false}
        }
        if(this.isARROWS&&!(eventOBJ.ArrowUp&&eventOBJ.ArrowDown)&&!(eventOBJ.ArrowLeft&&eventOBJ.ArrowRight)){
            if(eventOBJ.ArrowLeft&&IsNotMooved&&this.spawnCoordinatas.x>0){this.mooveLeft() ;IsNotMooved=false}
            if(eventOBJ.ArrowRight&&IsNotMooved&&this.spawnCoordinatas.x<canvas.width-this.width){this.mooveRight() ;IsNotMooved=false}
            if(eventOBJ.ArrowUp&&IsNotMooved&&this.spawnCoordinatas.y>0){this.mooveTop() ;IsNotMooved=false}
            if(eventOBJ.ArrowDown&&IsNotMooved&&this.spawnCoordinatas.y<canvas.height-this.width){this.mooveBottom() ;IsNotMooved=false}
        }}
    }
    mooveRight(){
        this.spawnCoordinatas.x+=this.speed
    }
    mooveLeft(){
        this.spawnCoordinatas.x-=this.speed
    }
    mooveTop(){
        this.spawnCoordinatas.y-=this.speed
    }
    mooveBottom(){
        this.spawnCoordinatas.y+=this.speed
    }
    atack(){
        this.shots.forEach(shot=>{
            shot.drawIt() 
            const opositeTank = shot.parent.isWASD ? tanks[1] : tanks[0]
            console.log(shot.hitBox,opositeTank.hitBox);
            if(
                shot.hitBox.x>opositeTank.hitBox.x
                &&shot.hitBox.x<opositeTank.hitBox.x+opositeTank.hitBox.width
                &&shot.hitBox.y>opositeTank.hitBox.y
                &&shot.hitBox.y < opositeTank.hitBox.y + opositeTank.hitBox.height
            ){
                shot.parent.shots.shift()
                console.log(true);
                opositeTank.lifes-=1 
                if(opositeTank.lifes===0){
                    if(opositeTank.isWASD){
                        gameplay.player2Score.textContent++
                    }else{
                        gameplay.player1Score.textContent++
                    }
                   gameplay.start()
                }
            
            }
            
            shot.flyTo()
            
        })
    }
}


    
class weapon{
    constructor(parent){
        this.parent = parent
        this.direction = parent.rotation
        this.spawnCoordinatas = {x : this.parent.spawnCoordinatas.x, y: this.parent.spawnCoordinatas.y}
        this.speed = 6
        this.damage = 0 
        this.flightdistance = 0  
        this.range = 150
        this.radius = 5 
        this.hitBox 
    }
   
    create(){
        
        if(this.parent.shots.length < this.parent.shotsLimit){
            this.parent.shots.push(this)
        }
    }  
    drawIt(){
        let x = null
        let y = null 
        switch(this.direction){
            case rotations.right : {
                x = this.spawnCoordinatas.x+this.parent.width/2+this.parent.gunHeight + this.flightdistance+this.radius
                y = this.spawnCoordinatas.y+this.parent.height/2    
            }break;
            case rotations.top : {
                x = this.spawnCoordinatas.x + this.parent.height/2 
                y = this.spawnCoordinatas.y - this.parent.gunHeight - this.flightdistance-this.radius
            }break;
            case rotations.left : { 
                x = this.spawnCoordinatas.x-this.parent.width/2 - this.flightdistance-this.radius
                y = this.spawnCoordinatas.y+this.parent.height/2
            }break;
            case rotations.bottom :{
                x = this.spawnCoordinatas.x+this.parent.height/2
                y = this.spawnCoordinatas.y + this.parent.width/2+this.parent.gunHeight+this.flightdistance+this.radius
            }
        }
        context.beginPath();
                context.arc(x, y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, true);
                context.closePath();
                context.stroke();
    }        
    flyTo(){
        if(Math.abs(this.flightdistance)<this.range){
            this.flightdistance += this.speed
        }else{
            this.parent.shots.shift()
        }
    } 
    get hitBox(){
      switch(this.direction){
        case rotations.right : {
            return{
                x : this.spawnCoordinatas.x+this.parent.width/2+this.parent.gunHeight + this.flightdistance,
                y : this.spawnCoordinatas.y+this.parent.height/2
            }
        }
        case rotations.left:{
            return {
                x : this.spawnCoordinatas.x+this.parent.width/2+this.parent.gunHeight - this.flightdistance,
                y : this.spawnCoordinatas.y+this.parent.height/2
            }
        }
        case rotations.top:{
            return{
                x : this.spawnCoordinatas.x + this.parent.height/2 ,
                y : this.spawnCoordinatas.y - this.parent.gunHeight - this.flightdistance
            }
        }
        case rotations.bottom:{
            return{
                x : this.spawnCoordinatas.x + this.parent.height/2 ,
                y : this.spawnCoordinatas.y + this.parent.gunHeight + this.flightdistance
            }
        }
      }
    }
}

const animate = setInterval(function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    tanks.forEach(tank=>{
        tank.changeRotation()
        tank.moove()
        tank.create()
        tank.atack()
    })
},1000/60
    
)

document.addEventListener('keydown',function(e){
    eventOBJ[e.code] = true
    if(eventOBJ.KeyT){
        const shot = new weapon(tanks[0])
        shot.create()
    }
    if(eventOBJ.Numpad8){
        const shot = new weapon(tanks[1])
        shot.create()
    }
})
document.addEventListener('keyup',function(e){
   
    eventOBJ[e.code] = false
  
})



let tanks = [new tank(100,100,true),new tank(300,300,false)]

