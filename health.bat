@echo off
REM health.bat — project health check for agent-harness-kit
REM AHK_HEALTH_CHECK_PLACEHOLDER — replace this marker when implementing real checks.
setlocal DisableDelayedExpansion
set "LOG_FILE=%TEMP%\ahk-health-%RANDOM%-%RANDOM%.log"
call :checks > "%LOG_FILE%" 2>&1
set "STATUS=%ERRORLEVEL%"
if "%STATUS%"=="0" (powershell -NoProfile -Command "Get-Content -LiteralPath $env:LOG_FILE -Tail 10") else (powershell -NoProfile -Command "Get-Content -LiteralPath $env:LOG_FILE -Tail 100")
echo Full health log: %LOG_FILE% 1>&2
exit /b %STATUS%
:checks
echo health.bat not implemented yet.
echo Edit this file with your project's health checks.
echo It must exit 0 for agents to start working.
exit /b 1
