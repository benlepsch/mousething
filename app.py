from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'balls'
socketio = SocketIO(app)

@app.route('/')
@app.route('/index')
def index():
    print('im losing it')
    return render_template('index.html')

points = []

def remove_point(id):
    for p in points:
        if p[2] == id:
            points.remove(p)
            return 1
    return 0

@socketio.on('new data')
def take_data(message):
    print(message)


if __name__ == '__main__':
    socketio.run(app)
