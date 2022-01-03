const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');

let pixel = ''; 
let gridSize = 16;

const drawGrid = (screenSize) => {
  for(i = 0; i < screenSize ** 2; i++) {
    pixel = document.createElement('div')
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = '#ffffff';
    screen.appendChild(pixel);
  }
  screen.style.gridTemplateColumns =  `repeat(${screenSize}, auto)`;
  screen.style.gridTemplateRows =  `repeat(${screenSize}, auto)`;
}

drawGrid(gridSize);

const clear = (request) => {
  if(request === 'resize'){  
    document.getElementById('resize').onclick= function() {
      let newSize = document.getElementById('demo').value;
      gridSize = newSize;
      if(gridSize > 100 || gridSize === null){
      gridSize = 100; 
     }
    }
  }
  screen.textContent = '';
  drawGrid(gridSize);
  active();
}

let currentMode = 'black';
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'resize' || button.id === 'clear'){
      clear(button.id);
    }
    else{
      currentMode = button.id;
      clear(button.id);
    }
  });
});

const randomColor = () => {
  let color = 'rgba(';
  for(let i = 0; i< 3; i++){
    color += Math.floor(Math.random() * 255) + ',';
  }
  return color + '1)';
}

const shading = (newColor) => {
  let color = 'rgba(';
  newColor = parseInt(newColor.substr(4, newColor.indexOf(',') - 4));
  if(newColor === 255){
    newColor = 100;
  }
  else if(newColor > 0){
    newColor -= 5;
  }
  for(let i = 0;i< 3;i++){
    color += newColor + ',';
  }
  return color + '1)';
}

const active = () => {
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach(newPixel => { 
    newPixel.addEventListener('mouseover', (e) => {
      let curentColor = getComputedStyle(newPixel, null).getPropertyValue('background-color');
      switch(currentMode){
        case 'black':
          e.target.style.backgroundColor = 'rgba(0,0,0)';
          break;
        case 'colors':
          e.target.style.backgroundColor = randomColor();
          break;
        case 'shading':
          e.target.style.backgroundColor = shading(curentColor);
      }
    });
  });
}
active();
