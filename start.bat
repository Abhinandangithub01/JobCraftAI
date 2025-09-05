@echo off
echo ========================================
echo   JobCraft AI - DevNetwork Hackathon 2025
echo   Starting Development Environment
echo ========================================
echo.

echo Installing dependencies...
echo.

echo [1/3] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install root dependencies
    pause
    exit /b 1
)

echo [2/3] Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo [3/3] Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   Dependencies installed successfully!
echo ========================================
echo.

echo Starting JobCraft AI in development mode...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop the application
echo.

start "JobCraft AI" npm run dev

echo.
echo Application started! Check the new window for logs.
pause
