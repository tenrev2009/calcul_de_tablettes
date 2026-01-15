@echo off
echo Installing and starting the application...

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Use node directly instead of npm
echo Installing dependencies...
node install

echo Starting the application...
node run dev

pause