import http.server
import socketserver
port = 1234

import fcntl, os, sys, io

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            with open('./rp-html.html', 'rb') as f:
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                while True:
                    f_data = f.read(351)
                    if f_data is None or len(f_data) == 0:
                        break
                    self.wfile.write(f_data)
        if self.path == '/redirect':
            self.send_response(302)
            self.send_header('Location', 
                """https://server.example.com/authorize?
                response_type=code
                &scope=openid%20profile%20email
                &client_id=s6BhdRkqt3
                &state=af0ifjsldkj
                &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb"""
            )
            self.end_headers()

try:
    server = http.server.HTTPServer(('127.0.0.1', port), Handler)
    server.serve_forever()
except KeyboardInterrupt:
    server.socket.close()