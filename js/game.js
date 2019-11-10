var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d"); 

var garip = new Image(); 
var bg = new Image();
var fg = new Image(); 
var pipe = new Image(); 
var end = new Image(); 

garip.src = "img/telo.png"; 
bg.src = "img/bg.jpg";
fg.src = "img/fg.png";
pipe.src = "img/pipe.png";
end.src = "img/end.png";

var fuckyou = new Audio();
var jumpSound = new Audio();

fuckyou.src = "audio/FUCKYOU.mp3";
jumpSound.src = "audio/jumpSound.mp3";


// Движение
document.addEventListener("keydown", jumpForward);

function down() {
    yPos +=190;
}

function jumpForward(){
    if(event.code == 'ArrowUp' || event.code == 'KeyW'){
    yPos -=190;
    xPos += 300;
    setTimeout(down,100);
    jumpSound.play();
    }
}

document.addEventListener("keydown", jumpBack);

function jumpBack(){
    if(event.code == 'ArrowDown' || event.code == 'KeyS'){
    yPos -=190;
    xPos -= 300;
    setTimeout(down,100);
    jumpSound.play();
    }
}

// Создание блоков
var pipes = [];

pipes[0] = {
    x : cvs.width,
    y : 420,
};


// Позиция Гарипа
var xPos = 10;
var yPos = 170;
var movement = 1;

// Выход из функции

function exit(){
    
}

//рисуем объекты
function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i=0; i < pipes.length; i++) {// для дивжения вперед
        ctx.drawImage(pipe, pipes[i].x, pipes[i].y); // берем координаты из массива  

        pipes[i].x = pipes[i].x - 3.5 ; // берем элемент из массива и уменьшаем его по x на 1. Теперь блоки двигаются
    
    if(pipes[i].x == 650){ // каждый раз создаем новое препятствие
        pipes.push({ 
            x : cvs.width, // препятсвие создается за пределами экрана
            y : 420, 
        });
    }

    // Отслеживание столкновений
    if(xPos + garip.width - 70 >= pipes[i].x  
        && xPos <= pipes[i].x + pipe.width
        && (yPos + 800 <= pipes[i].y + pipe.height
            || yPos + garip.height >= pipes[i].y + pipe.height)){

                fuckyou.play();
                ctx.drawImage(end, 0 , 0);
                window.cancelAnimationFrame();
                
            }


}
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(garip, xPos, yPos);

    requestAnimationFrame(draw);

    xPos += movement;
}

pipe.onload = draw;

