@echo off
title Mahadharshni Herblab - local website
cd /d "%~dp0"
set "NODE=node"
where node >nul 2>&1 || set "NODE=%ProgramFiles%\nodejs\node.exe"
"%NODE%" run-all.mjs
echo.
echo The servers have stopped.
pause
