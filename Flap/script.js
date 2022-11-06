const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');
canvas.width = '800'
canvas.height = '600'
const width = canvas.width
const height = canvas.height
const mooveConsts = {
    gravity : 4 ,
    jumpSpeed : 6,
    jumpHihg : 80,

}
const bird = {
    x : 155,
    y : 300 ,
    create  () {
        context.fillRect(bird.x,bird.y,35,35);
        
        
    },
    aim : 0 ,
    flying(){
        if(this.y<=0||this.y>550){
            setTimeout(() => {
                this.loose()

            }, 1000);
            board.completed = -1
            return
        }
       if(this.aim!=0&&this.y<this.aim){
        this.aim = 0 
       }
       if(this.aim===0){
        this.y+=mooveConsts.gravity
       }else{this.y-=mooveConsts.jumpSpeed}
    },
    loose(){
        board.completed = 0 
        this.y = 300
        this.aim = 0
        board.levels[0] = new level()
    }
}   
document.addEventListener('keyup',(e)=>{
    
    if(e.code==='Space'&&board.isgameon===true){
        bird.aim=bird.y-mooveConsts.jumpHihg
    }    
    if(e.code==='Escape'){
        board.isgameon = !board.isgameon
    }
})


class level{
    constructor(){
        this.freeSpace = Math.floor(Math.random()*(240-160)+160)
        this.proporcion = [Math.floor(Math.random()*101)]
        this.proporcion[1] = (100-this.proporcion[0])
        this.x = board.etap.x
        this.area = {
            begin : null,
            end : null,
        }
    }
    mooveIt(){
        console.log(board.completed);
        this.x-= board.completed*0.3+1
        if(this.x<=-50){
            board.levels[0]=new level();
          
            board.completed++
            console.log(board.completed);
    }
    }
    create(){
        
        const recting = (x) => {
            context.strokeRect(x, height, 20, -(height-this.freeSpace)*this.proporcion[1]/100);
            context.strokeRect(x, 0, 20, (height-this.freeSpace)*this.proporcion[0]/100);
            this.area.begin = 0 +(height-this.freeSpace)*this.proporcion[0]/100
            this.area.end = height-(height-this.freeSpace)*this.proporcion[1]/100
           
        }
       recting(this.x) 
    }
    check(){
        if((bird.x>this.x&&bird.x<this.x+20)&&(bird.y<this.area.begin||bird.y>this.area.end)){
           
            alert('loose!')
            bird.loose()
        }
    }
}


const board = {
    levels : [],
    isgameon : true,
    drawAll(){
        bird.create()
        board.levels[0].create()
        board.levels[0].check()
    },
    start: setInterval(() => {
        context.clearRect(0, 0, width, height);
        board.drawAll()
        if(board.isgameon){
            bird.flying()
            board.levels[0].mooveIt()
        }
            
    }, 1000/60),  
    completed : 0,
   
    etap : {
        x:810
    },
}



bird.create()
board.levels.push(new level())
board.levels.push(new level())





