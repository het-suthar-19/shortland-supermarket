@echo off
echo Installing dependencies...
call npm install
echo.
echo Generating Prisma Client...
call npm run prisma:generate
echo.
echo Starting server...
call npm run dev
pause

