@echo off
title Mahadharshni Herblab preview
cd /d "%~dp0preview"
start "" http://localhost:4173
node preview-server.mjs
pause
