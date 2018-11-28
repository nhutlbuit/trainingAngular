echo off
title Building agentProfileApi-18.2.1.1.war file...
color 2
ng build --prod --env=prod  && ^
echo Done && ^
pause
