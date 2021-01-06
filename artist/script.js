let canvas = document.querySelector('#draw');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round'
ctx.lineWidth = 5;

let lastX = 0, lastY = 0, isDrawing = false;
let hue = 0;
let colorChosed = false, widthChosed = false;

function draw(e){
    if(!isDrawing) return;

    ctx.beginPath();
    if(!colorChosed) ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
    if(!widthChosed && ++ctx.lineWidth > 20){ctx.lineWidth = 5};
    if(!colorChosed && ++hue>360) hue=0;
}

canvas.addEventListener('mousedown', e=>{
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
})
canvas.addEventListener('mousemove', draw)

canvas.addEventListener('mouseout', _=>isDrawing=false);
canvas.addEventListener('mouseup', _=>isDrawing=false);

let colorbox = document.querySelector('input[type=color');
colorbox.addEventListener('change', e=>{
    ctx.strokeStyle = colorbox.value;
    colorChosed = true;
})
let widthBox = document.querySelector('input[type=number');
widthBox.addEventListener('change', e=>{
    ctx.lineWidth = widthBox.value;
    widthChosed = true;
})
