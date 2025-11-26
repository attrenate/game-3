const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const objects = [];

const gravity = 2;

const swipePoints =[];

class FallingObject{
    constructor(){
        this.x = Math.random() * (canvas.width - 30);
        this.y = -30;
        this.size = 30;
        this.speed = Math.random() * 3 + 2;
        this.cut = false;
    }
    update(){
        this.y += this.speed;
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    checkout(swipe){
        for(let i = 0; i < swipe.length; i++){
            const p = swipe[i];
              if (
        p.x > this.x &&
        p.x < this.x + this.size &&
        p.y > this.y &&
        p.y < this.y + this.size
      ) {
        this.cut = true;
      }
        }
    }
}


function spawnObject(){
    objects.push(new FallingObject());
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    obj.update();
    obj.draw();
    obj.checkCut(swipePoints);

    if (obj.cut || obj.y > canvas.height) {
      objects.splice(i, 1);
    }
  }
   drawSwipe();

  requestAnimationFrame(gameLoop);
}

