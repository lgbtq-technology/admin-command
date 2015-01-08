require "sinatra"
require "net/http"
require "json"

post "/" do
  request.body.rewind
  body_str = request.body.read
  body = body_str.split("\n").map { |line| line.split("=", 2) }.to_h

  p body_str
  p body

  if body["token"] != ENV["INTEGRATION_TOKEN"]
    halt 401
  end

  message = "Message from #{body["user_name"]} in ##{body["channel_name"]}:\n\n#{body["text"]}"

  webhook_body = JSON.dump({ "text" => message })

  Net::HTTP.post_form(ENV["WEBHOOK_URL"], "payload" => webhook_body)

  "Your message has been forwarded to the admins, we'll get in touch as soon as possible."
end

run Sinatra::Application
