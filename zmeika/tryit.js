
song = {
    audio:new Audio(),
    audioplus : function() {
        
       song.audio.src = 'Alexis Ffrench - Still Life.mp3'
        song.audio.autoplay = true; 
        song.audio.volume = 0.1
      },
    audiominus:function(){
        song.audio.pause(); 
    } 
}
let record = 0 
let neFood =false
let errortr = null
let newkidQUEST = false 
const medium = {
    showStep : () => {
        document.querySelector('.stop').style.display = 'none'
        document.querySelector('.snake').remove()
    },
}

const underwap1 = document.querySelector('.underwrap1').cloneNode() 
const scoreboard = document.querySelector('.scoreboard').cloneNode(true)
const game = {
    timerIsStarted : false ,
    settime : () => { 
        song.audioplus()
        medium.showStep()
        game.createSnake()
        document.querySelector('.underwrap1').style.opacity = '0'
        let now = new Date()
        let showtime = () => ~~((new Date() - now)/1000)
        game.timerIsStarted = ! game.timerIsStarted
        const timer = document.querySelector('.timer')
        let int = setInterval(()=>{
        
            timer.textContent = showtime();
            try {
                moove.doStep()
                moove.kidstep()
                if(newkidQUEST){
                    
                    game.momsnake.makeKid()
                    newkidQUEST=false
                }
                if(neFood){
                    game.createFood()
                    neFood=false
                }
            } catch (error) {
                song.audiominus()
                record = record<game.momsnake.kids ? game.momsnake.kids : record
                document.getElementById('scoreboardinfo1').textContent = `your score is : ${game.momsnake.kids}`
                document.getElementById('scoreboardinfo2').textContent = `your record is : ${record}`
                console.log(error);
                clearInterval(int)
                document.querySelector('.underwrap1').style.opacity = '1'
                timer.textContent = 'time'
                document.querySelector('.stop').style.display = ''
            }
        },500)
    }, // sekundomer 

    board : document.querySelector('.board'), 
    start : () =>{          
        game.board.innerHTML = ''
    
        for (let i = 0; i < 64; i++) {
          let fill = document.createElement('div')
           fill.setAttribute('id',`a${i}`)
          fill.classList.add('inner')
           game.board.append(fill)  
          
        } 
        game.board.append(underwap1)   
        underwap1.append(scoreboard)
       

    }, // creates game board 

    createFood : () => {
        // let r = ~~(Math.random()*64+0)
        let foodUnit = new Food()
       
        let divs = ()=> document.querySelectorAll('.inner')[foodUnit.location]
       
        
        let span = document.createElement('span')
        span.textContent = foodUnit.apearence 
        divs().append(span)
    }, // creates food 
    createSnake : () => {
        game.momsnake.kids = []
        let babies = document.querySelectorAll('.kid')
        for(let i=0;i<babies.length;i++){
            babies[i].parentNode.firstChild.remove()
        }
        game.momsnake.kids = 0 
        let filled = document.querySelectorAll('.inner')[28]
        let  snake = document.createElement('div')
        snake.classList.add('snake')
        snake.classList.add('last')
        snake.setAttribute('id','s0')
        snake.style.transform = 'rotate(90deg)'
        filled.append(snake)
    },
    momsnake : {
        positionOfLast : () => document.querySelector('.last').parentNode.getAttribute('id').slice(1),
        kids : 0,
        plusKids :()=> {game.momsnake.kids++},
        family : [],
        makeKid : () =>
         { 
            game.momsnake.family.push(document.querySelector('.last'))
            const div=document.createElement('div')
            let litlSnake = new Snake()

           
            div.classList.add('last')
            div.classList.add('s')
            div.setAttribute('id',`s${litlSnake.number}`) 
            div.style.transform = litlSnake.rotation
            game.momsnake.family.push(div)
            document.querySelector('.last').classList.remove('last')
            div.classList.add('kid')
            document.getElementById(`a${litlSnake.pos}`).append(div)
        
            errortr=null
        }
    }

}


class Snake{
    constructor(){
        game.momsnake.plusKids()
        this.number = game.momsnake.kids 
        let tr = document.querySelector('.last').style.transform
        
            switch(tr){
                case 'rotate(0deg)' :if(+game.momsnake.positionOfLast()>55){errortr='top'};this.pos =+game.momsnake.positionOfLast()+8; break;
                case 'rotate(90deg)':if(game.momsnake.positionOfLast()%8===0){errortr='right';};this.pos =+game.momsnake.positionOfLast()-1; ;break;
                case 'rotate(180deg)':if(+game.momsnake.positionOfLast()<8){errortr='down'; };this.pos =+game.momsnake.positionOfLast()-8;break;
                case 'rotate(-90deg)': if((+game.momsnake.positionOfLast()+1)%8===0){errortr='left';};this.pos =+game.momsnake.positionOfLast()+1;break;
            }
        
      
             switch(errortr){
                case 'top': this.pos-=8;this.rotation = this.pos == 56 ? 'rotate(-90deg)':'rotate(90deg)'; this.pos += this.pos==56 ? 1 : -1; break;
                case 'right' : this.pos=1+(+this.pos); this.rotation = this.pos == 56 ? 'rotate(180deg)':'rotate(0deg)'; this.pos += this.pos==56 ? -8 : +8; break;           
                case 'down': this.pos+=8; this.rotation = this.pos==7 ? 'rotate(90deg)' :'rotate(-90deg)' ; this.pos+= this.pos == 7 ? -1 : 1;break; 
                case 'left' : this.pos-=1;this.rotation = this.pos==7 ? 'rotate(0deg)' : 'rotate(180deg)' ;this.pos+=this.pos==7 ? 8:-8;break;
                default :   this.rotation = document.querySelector('.last').style.transform;
            }
                
      
    }
}

class Food{
    constructor(){
        do {
            this.location = ~~(Math.random()*(64-0)+0)
        } while (document.getElementById(`a${this.location}`).firstChild);
      
        this.apearence = '!'
    }
}

const moove = {
    mainDirection : () => document.querySelector('.snake').style.transform,
    changeMainDirection : (e) => {
        let head = game.momsnake.kids ===0 ? '' : document.getElementById('s1').style.transform
        let newDirect = +(e.classList['1'].slice(-1));
        switch(newDirect){
            case 1: if(head!='rotate(180deg)')document.querySelector('.snake').style.transform = 'rotate(0deg)' ;break;
            case 3:if(head!='rotate(-90deg)') document.querySelector('.snake').style.transform = 'rotate(90deg)';break;
            case 2:if(head!='rotate(90deg)') document.querySelector('.snake').style.transform = 'rotate(-90deg)';break;
            case 4:if(head!='rotate(0deg)') document.querySelector('.snake').style.transform = 'rotate(180deg)';break;
        }
    },
    doStep : () => { 
        const head = document.querySelector('.snake')
        const direct = head.style.transform
        let now = head.parentNode.getAttribute('id').slice(1)
        switch(direct){
            case 'rotate(0deg)' : document.getElementById(`a${now-8}`).appendChild(head);break;
            case 'rotate(90deg)': if((now-7)%8!=0){ document.getElementById(`a${+now+1}`).appendChild(head)}else{throw'LOOSE.BORDER.RIGHT'};break;
            case 'rotate(180deg)':  document.getElementById(`a${+now+8}`).appendChild(head);break;
            case 'rotate(-90deg)':  if(now%8!=0){document.getElementById(`a${now-1}`).appendChild(head)}else{throw'LOOSE.BORDER.LEFT'};break;
        }
        let doINeedRestart = (Boolean(head.parentNode.querySelector('.s')));
        let doIneedNewFood = Boolean(head.parentNode.querySelector('span'))
        if(doINeedRestart){
           throw'test'
        }
        if (doIneedNewFood) {
           newkidQUEST = true
            game.board.querySelector('span').remove()
            neFood = true
        }
    },
    kidstep:()=>{
        const s = document.querySelectorAll('.s')
        const step = (obj) => {
            let objDir = obj.style.transform
            let objPos = obj.parentNode.getAttribute('id').slice(1)
            switch(objDir){
                case 'rotate(0deg)': ;(document.getElementById(`a${objPos-8}`)).appendChild(obj);; break;
                case 'rotate(90deg)': ;(document.getElementById(`a${+objPos+1}`).appendChild(obj));break;
                case 'rotate(-90deg)': ;(document.getElementById(`a${objPos-1}`)).appendChild(obj);break;
                case 'rotate(180deg)':;(document.getElementById(`a${+objPos+8}`)).appendChild(obj);break;
            }
            
        }
        if(s.length)
        {
            let  mDir = moove.mainDirection()
            for(let i=0;i<s.length;i++)    {
                let nowKid = document.getElementById(`s${i+1}`)
                let lDir = nowKid.style.transform
                step(nowKid)
            if(nowKid.style.transform==mDir){
            
            }else{
             
                nowKid.style.transform = mDir
                
            }
            mDir = lDir
        }}

    }
    
    
}

game.start()
game.createSnake()
game.createFood()

game.momsnake.positionOfLast()
document.addEventListener('keydown',function(e){
    let code = e.code 
    let head = game.momsnake.kids ===0 ? '' : document.getElementById('s1').style.transform
    switch(code){
        case 'KeyW':   if(head!='rotate(180deg)') {document.querySelector('.snake').style.transform = 'rotate(0deg)'} ;break;
        case 'KeyD':if(head!='rotate(-90deg)'){ document.querySelector('.snake').style.transform = 'rotate(90deg)'};break;
        case 'KeyA': if(head!='rotate(90deg)'){document.querySelector('.snake').style.transform = 'rotate(-90deg)'};break;
        case 'KeyS':if(head!='rotate(0deg)'){ document.querySelector('.snake').style.transform = 'rotate(180deg)'};break;
    }
})

