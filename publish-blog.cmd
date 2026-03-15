@echo off
setlocal
pushd "%~dp0"

echo Blog publish helper
echo.

if "%~1"=="" (
  node scripts\import-and-publish.mjs
) else (
  node scripts\import-and-publish.mjs %*
)

set EXIT_CODE=%ERRORLEVEL%

if not "%EXIT_CODE%"=="0" (
  echo.
  echo Publish failed. Check the message above.
) else (
  echo.
  echo Publish command finished.
)

if "%COPILOT_NO_PAUSE%"=="" pause

popd
exit /b %EXIT_CODE%