cd marlin-fe
sudo npm install
sudo grunt uglifyTask
sudo grunt concatTask
nohup sudo node app/server.js &
