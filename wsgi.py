from app import app
if __name__ == "__main__":    
    from waitress import serve  
    serve(app, host='127.0.0.1', port=5500)

