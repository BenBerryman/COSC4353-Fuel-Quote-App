start "Back-end/Database Server" cmd /c "node index.js"
start cmd /c "echo Web server started on port 8000. Press Ctrl-C to exit. & echo To get started, type 'localhost:8000/homepage.html' into your browser of choice. & .\node_modules\.bin\http-server ..\Client -a localhost -s -p 8000"
