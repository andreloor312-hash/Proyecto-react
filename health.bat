@echo off
REM health.bat — project health check for agent-harness-kit
setlocal DisableDelayedExpansion
set "LOG_FILE=%TEMP%\ahk-health-%RANDOM%-%RANDOM%.log"
call :checks > "%LOG_FILE%" 2>&1
set "STATUS=%ERRORLEVEL%"
if "%STATUS%"=="0" (powershell -NoProfile -Command "Get-Content -LiteralPath $env:LOG_FILE -Tail 10") else (powershell -NoProfile -Command "Get-Content -LiteralPath $env:LOG_FILE -Tail 100")
echo Full health log: %LOG_FILE% 1>&2
exit /b %STATUS%
:checks
echo [health] npm run build
call npm run build
if errorlevel 1 exit /b 1
echo [health] npm run lint
call npm run lint
if errorlevel 1 exit /b 1
exit /b 0
