require 'sinatra'
require 'mongoid'
require 'digest'
require 'json'

Mongoid.load!(File.join(File.dirname(__FILE__), 'config', 'mongoid.yml'))

require './models/shortened_link'

set :bind, '0.0.0.0'

# Allow-all preflight CORS settings
configure do
  enable :cross_origin
end
before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end
options "*" do
  response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end

post '/' do
  request_payload = JSON.parse request.body.read
  puts "Request payload: #{request_payload}"
  url_to_shorten = request_payload["url"]
  puts "URL to shorten: #{url_to_shorten}"
  
  halt 400, "Malformed URL" unless url_to_shorten =~ URI::regexp # Possibly raise here instead

  link = ShortenedLink.find_or_create_by(url_to_shorten)

  JSON.generate({ 
    id: Time.now.to_i,
    slug: link[:slug],
    originalUrl: url_to_shorten
  })
end

get "/lookup/:slug" do
  content_type :json
  puts "Incoming #{params.to_s}"

  link = ShortenedLink.where(slug: params["slug"]).first
  if link
    puts "Found #{link.inspect}"
    JSON.generate({ target_url: link["target_url"] })
  else
    puts "Couldn't process #{params.to_s}"
    404
  end
end