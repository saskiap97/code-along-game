class Game {
    constructor(){
        this.player = null; //will store an instance of the class Player
        this.obstacles = []; //will store instance of the class obstacle
    }

    start(){
        this.player = new Player();
        this.attachEventListeners();

         //create new obstacle
         setInterval(() => {
           
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        }, 2000);
        

   //move obstacles
   setInterval(() => {
    this.obstacles.forEach( (obstacleInstance) => {

        //move
       obstacleInstance.moveDown();

        //detect collision
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ) {
            location.href = "gameover.html"
        }

    });
}, 60);

       
    }


    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            }else if(event.key === "ArrowRight"){
                this.player.moveRight();
            }
        });
    }
}


class Player {
    constructor(){
        this.positionX = 50;
        this.positionY = 0;
        this.width = 20;
        this.height = 10;
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        // create dom element
        this.domElement = document.createElement('img');
        this.domElement.setAttribute("src", "/images/Chicken_cartoon_04.svg.png")


        // set id and css
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveLeft(){
        this.positionX-=2;
        if(this.positionX < 0){this.positionX = 0}
        this.domElement.style.left = this.positionX + "vw";
        

     

    }
    moveRight(){
        this.positionX+=2;
        if(this.positionX > 80){this.positionX = 80}
        this.domElement.style.left = this.positionX + "vw";
        ;
    }
}

class Obstacle {
    constructor(){
        this.positionX =Math.floor(Math.random() * 70);
        this.positionY = 90;
        this.width = 10;
        this.height = 10;
        this.domElement = null;
        this.createDomElement()
    }
    createDomElement(){
        // create dom element
        this.domElement = document.createElement('img');
        this.domElement.setAttribute("src", "/images/egg.png")

        // set id and css
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }


    moveDown(){
        this.positionY-=2;
        this.domElement.style.bottom = this.positionY + "vh";

    }
    
}









const game = new Game();
game.start();


