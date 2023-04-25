// socket?
let socket = io();
// socket.emit('new data', {'bink': 'bonk'})

document.onmousemove = (event) => {
    // console.log('mx: ' + event.pageX + '\tmy: ' + event.pageY);
    socket.emit('new data', { 'x': event.pageX, 'y': event.pageY })
}