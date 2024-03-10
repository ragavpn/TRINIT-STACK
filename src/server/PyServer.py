from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import base64
from PIL import Image
import base64
from io import BytesIO

def base64_to_image(data, output_filename):
    bytes_decoded = base64.b64decode(data)
    img = Image.open(BytesIO(bytes_decoded))
    out_jpg = img.convert("RGB")
    out_jpg.save("saved_img.jpg")

def caption_image(caption):
    # This is a placeholder function
    # Implement your captioning logic here
    base64_to_image(caption)
    
    return "hi!"  # For example, let's make the caption uppercase

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/caption':
            query_parameters = parse_qs(parsed_path.query)
            caption = query_parameters.get('caption', [''])[0]
            if caption:
                captioned_text = caption_image(caption)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"caption": captioned_text}).encode())
            else:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing 'caption' query parameter"}).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=3301):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
