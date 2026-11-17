@echo off
title Mahadharshni Herblab - rebuild preview
setlocal enabledelayedexpansion
cd /d "%~dp0client"

echo.
echo Installing dependencies (only does real work the first time)...
call npm install
if errorlevel 1 goto :fail

echo.
echo Building the site from client\src ...
call npm run build
if errorlevel 1 goto :fail

if not exist "dist\assets" (
  echo Could not find dist\assets - build did not produce output.
  goto :fail
)

set "JSFILE="
set "CSSFILE="
for %%F in (dist\assets\*.js) do set "JSFILE=%%F"
for %%F in (dist\assets\*.css) do set "CSSFILE=%%F"

if "%JSFILE%"=="" goto :fail
if "%CSSFILE%"=="" goto :fail

copy /y "%JSFILE%" "..\preview\site\app.js" >nul
copy /y "%CSSFILE%" "..\preview\site\app.css" >nul
copy /y "%JSFILE%" "..\preview\site\offline.js" >nul
copy /y "%CSSFILE%" "..\preview\site\offline.css" >nul

echo.
echo Done. The preview site has been updated with the latest changes.
echo Now run START-PREVIEW.bat (close any old copy first) to see it.
pause
exit /b 0

:fail
echo.
echo Something went wrong - see the messages above.
pause
exit /b 1
