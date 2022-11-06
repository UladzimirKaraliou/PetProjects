const players= (confirm('2 игрока ? '));
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d');
const width = canvas.width
const height = canvas.height
const gamePlay = {
    isCrossTurn : true,
    makeNet : () => {
        gamePlay.isCrossTurn = true
        gamePlay.board = [null,null,null,null,null,null,null,null,null,]
        gamePlay.boxes = []
        context.beginPath();
        context.clearRect(0, 0, width, height);
        context.strokeStyle='black';
        let x = 0
        let y = 0 
        for(let i=1;i<=9;i++){
            
            gamePlay.boxes.push(new box(x,y,i-1))
            context.strokeRect(x, y, x+100, y+100);
            y+= i%3===0 ? 100 : 0 
            x = i%3===0 ? 0 : x+100
            
        }
        context.closePath();
        
        console.log(gamePlay.boxes); 
    },
    boxes : [],
    board : [null,null,null,null,null,null,null,null,null,],
    winModels : [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ],
    clickEvent : (e) =>{
        console.log(e.clientX);
        console.log(e.clientY);
        gamePlay.boxes.forEach(
            box=>{
                if(!gamePlay.board[box.id]&&box.x<e.clientX&&e.clientX<box.width&&box.y<e.clientY&&e.clientY<box.height){
                    context.beginPath();
                    let center = [box.width - (box.width-box.x)/2,box.height-(box.height-box.y)/2]
                    if(gamePlay.isCrossTurn){   
                        const x=center[0]
                        const y=center[1]
                        context.moveTo(x, y);
                        context.lineTo(x+35, y+35);
                        context.lineTo(x-35, y-35);
                        context.moveTo(x, y);
                        context.lineTo(x-35, y+35);
                        context.lineTo(x+35, y-35);
                        gamePlay.board[box.id] = 1
                    }else{
                        context.arc(center[0], center[1], 35, Math.PI / 180 * 0, Math.PI / 180 * 360, false);                        
                        gamePlay.board[box.id] = 2
                    }
                    gamePlay.isCrossTurn = !gamePlay.isCrossTurn
                    context.stroke();
                    context.closePath();
                    console.log(gamePlay.board);
                    
                    for(let i=0;i<gamePlay.winModels.length;i++){
                        const model = gamePlay.winModels[i]
                        const box = [
                            gamePlay.board[model[0]],
                            gamePlay.board[model[1]],
                            gamePlay.board[model[2]],
                        ]
                        const isNotNull = box.every(x=>Boolean(x))
                        const isSimilar = box[0]===box[1]&&box[0]===box[2]&&box[1]===box[2]

                        if (isNotNull&&isSimilar) {
                           let winner =!gamePlay.isCrossTurn ? 'Крестики' : 'Нолики'
                           setTimeout(() => {
                            alert(`${winner} победили`)
                           
                           gamePlay.makeNet()
                           
                           }, 100);
                           
                           return 
                        }
                    }
                    if(gamePlay.board.every(x=>x!=null)){setTimeout(() => {
                        alert('Ничья');
                        gamePlay.makeNet()
                    }, 100);}


                }
            }
        )
    }
}
class box{
    constructor(x,y,id){
        this.x = x 
        this.y = y 
        this.width = x+100
        this.height = y+100
        this.id = id
    }
}

gamePlay.makeNet()
if(players){
    document.addEventListener('click',gamePlay.clickEvent)
}else{
    document.addEventListener('click',gamePlay.clickEvent)
}


    