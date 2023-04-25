from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'balls'
socketio = SocketIO(app)

@app.route('/')
@app.route('/index')
def index():
    # print('im losing it')
    return render_template('index.html')

points = {}

@socketio.on('new data')
def take_data(msg):
    points[request.sid] = (msg['x'], msg['y'])

    emit('boo', {
            'id': request.sid, 
            'x': msg['x'], 
            'y': msg['y']
        }, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
