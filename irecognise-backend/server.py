from flask import Flask

app = Flask(__name__)

# API routes
@app.route('/blacklist')
def get_blacklist():
    return {
        "blacklist": ['Josephine', 'Agatha', 'Hemingway']
    }

if __name__ == '__main__':
    app.run(debug=True, threaded=True)