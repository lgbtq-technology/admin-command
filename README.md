The `/admin` command hook
=========================

A simple webhook to relay an `/admin` command to a private slack room for the administrators.

Installation
------------

0. clone this repository.
1. Install node 4.x or greater
2. Run `npm install`
3. Set up an incoming webhook in slack that sends to your admin channel. Take note of its url.
4. Set up a slack slash command to send to http://yourserver:portnumber/
5. Start the app with `PORT=8080 INTEGRATION_TOKEN=slackintegrationtoken WEBHOOK_URL=yourhookurl npm start` and check for errors.
6. Add it to your system startup scripts, or a cron @reboot rule: `@reboot cd /path/to/repo; PORT=8080 INTEGRATION_TOKEN=slackintegrationtoken WEBHOOK_URL=yourhookurl npm start`
