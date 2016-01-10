The `/admin` command hook
=========================

A simple webhook to relay an `/admin` command to a private slack room for the administrators.

Installation
------------

0. clone this repository.
1. Install ruby 2.2.0
2. Install bundler
3. Run `bundle install`
4. Set up an incoming webhook in slack that sends to your admin channel. Take note of its url.
7. Set up a slack slash command to send to http://yourserver:portnumber/
4. Start the app with `INTEGRATION_TOKEN=slackintegrationtoken WEBHOOK_URL=yourhookurl bundle exec rackup -o :: -p portnumber` and check for errors.
6. Add it to your system startup scripts, or a cron @reboot rule: `@reboot cd /path/to/repo; INTEGRATION_TOKEN=slackintegrationtoken WEBHOOK_URL=yourhookurl bundle exec rackup -o :: -p portnumber`
