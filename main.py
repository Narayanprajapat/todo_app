from app import create_app

app = create_app()

app.config['CORS-HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
