# hilan-bot
bot to fill the hours in hilannet

### Getting started
clone or fork the repo 


1. replace .env.example file and name it .env
2. fill in your username, password and org domain in env file.
3. run `npm install`
4. run `npm start`

you can replace your working hours in config/default.yaml

Also, the plugin only fills days without reports. If you have days where you only need to fill your exit time or your entry time make sure you do it in advance. If you have sick days to report make sure you do it in advance.
If you have sick days waiting for approval change the first day the bot will work on to the first item in the list without reports. For example, if you have 2 sick days pending approval set `startingDayIndex: 3` in `config/default.yaml`
