#!/usr/bin/env python3
"""
Simple HTTP server with clean URL routing for the birthday website.
Serves files without .html extensions for a professional experience.
"""

import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # Define route mappings
        routes = {
            "/": "index.html",
            "/countdown": "countdown.html",
            "/wishes": "wishes.html",
        }

        # Check if it's a direct route request
        if path in routes:
            # Serve the mapped HTML file
            self.path = "/" + routes[path]
            return super().do_GET()

        # Check if it's a file request (has extension)
        if "." in os.path.basename(path):
            # Special handling for PDF files
            if path.endswith(".pdf"):
                self.send_response(200)
                self.send_header("Content-Type", "application/pdf")
                self.send_header("Content-Disposition", "inline")
                self.end_headers()

                try:
                    with open(path.lstrip("/"), "rb") as f:
                        self.wfile.write(f.read())
                except FileNotFoundError:
                    self.send_error(404)
                return

            return super().do_GET()

        # If no extension and not in routes, try adding .html
        html_path = path.rstrip("/") + ".html"
        if os.path.exists(html_path.lstrip("/")):
            self.path = html_path
            return super().do_GET()

        # Default behavior for other requests
        return super().do_GET()

    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def run_server(port=8000):
    """Start the development server with clean URL routing."""

    # Change to the directory containing the website files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    try:
        with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
            print(f"🎂 Guy's Birthday Website Server")
            print(f"🌐 Serving at http://localhost:{port}")
            print(f"📁 Directory: {os.getcwd()}")
            print(f"\n🔗 Available routes:")
            print(f"   • http://localhost:{port}/           (Landing page)")
            print(f"   • http://localhost:{port}/countdown   (Countdown & Game)")
            print(f"   • http://localhost:{port}/wishes      (Birthday Wishes)")
            print(f"\n✨ Clean URLs enabled - no .html extensions needed!")
            print(f"🔄 Press Ctrl+C to stop the server\n")

            httpd.serve_forever()

    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped. Thanks for celebrating Guy's birthday! 🎉")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python server.py --port 8001")
        else:
            print(f"❌ Server error: {e}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Guy's Birthday Website Server")
    parser.add_argument(
        "--port", type=int, default=8000, help="Port to serve on (default: 8000)"
    )

    args = parser.parse_args()
    run_server(args.port)
