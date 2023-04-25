// socket?
let socket = io();

socket.on('boo', (msg) => {
    // console.log(msg);
    let dot = document.getElementById(msg.id);
    if (dot === null) {
        // create dot
        dot = document.createElement('div');
        dot.id = msg.id;
        dot.style.display = 'block';
        dot.style.position = 'absolute';
        dot.style.height = '20px';
        dot.style.width = '20px';
        dot.style.backgroundColor = 'blue';
        dot.style.borderRadius = '50%';
        document.body.append(dot);
    }

    dot.style.left = (msg.x - 10) + 'px';
    dot.style.top = (msg.y - 10) + 'px';


});

let mx = 0;
let my = 0;

document.onmousemove = (event) => {
    // console.log('mx: ' + event.pageX + '\tmy: ' + event.pageY);
    mx = event.pageX;
    my = event.pageY;
}

let fpsInterval, startTime, then;

function start(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    run();
}

function run() {
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        socket.emit('new data', { 'x': mx, 'y': my })
    }
    
    requestAnimationFrame(run);
}

start(30);