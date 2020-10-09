# URL Shortener App

This is the repo for Vlad's URL shortener app as per the interview code sample doc. The goal was to make a functional app vaguely resembling bit.ly

## General Stuff

### Running the App

The app is hosted on Heroku over at [kazoo.vlad.ai](https://kazoo.vlad.ai/)

If you'd like to run the app locally, I've included a `docker-compose.yml` file which should allow the app to be accessible locally on port `3000`. Disclaimer: To my shame, I haven't had the opportunity to work with Docker until now so I rate the probability of success at 50/50.

Besides that, the React and Sinatra apps can be launched for development in their respective folders with `npm i && npm start` and `bundle install && bundle exec rackup app.rb -p 4567` respectively

### An exceptionally ugly diagram

![diagram](https://i.imgur.com/qmfkprt.jpg)

This app features a `create-react-app`-based React application which communicates with a Sinatra API server and uses MongoDB for persistence. 

A user is prompted to provide a url to minify. React frontend communicates with the API to either create or look up a hash corresponding to a particular URL and returns it to the user. 

When landing a path other than root, the frontend looks up the slug from the url path and either redirects or displays a 404 page.

The frontend can display a rudimentary error message (though, the check happens server-side)

### App Design

There was no particular reason for choosing Sinatra over Node/Express other than I felt like it would be a bit easier on the eyes given that API piece is lean. In the same vein, MongoDB is easy to bootstrap with no need for migrations as the data model isn't complicated.

If this was a real app, an argument could be made for using Express.js for the backend and something like Redis for persistence - that combo would substantially improve concurrency. If the app would ever need authentication and subsequent persistence more complex than a key-value store, a cache like Redis wouldn't be a good choice. 

That being said, at scale, Redis would work well as a LRU cache for quick lookup of most commonly minified URLs.

### URL Minifier Gotchas

Hashing a URL for retrieval opens up the door for hash collisions (however unlikely). Shortening the URL to only a few hashed characters further increases the likelyhood. A naive approach at handling this is to simply check if the entry with the same hash already exists in the DB.

At scale it's worth noting that running multiple instances of the app could create a situation where the same slug is generated and saved for two distinct URLs. This can avoided with an elaborate solution involving multiple redundant services guaranteeing a unique ID, but certainly out of scope for this demo app.

### Notes on deployment & security

As it stands, the API server is out in the wild and not protected from unauthorized access. In a real world scenario it'd be wise to deploy a reverse proxy between the internet and the frontend(s) and hide the API server / DB on a local-only network.

### Misc

In no particular order, some thoughts, notes and omissions:

- ENV vars overwrite API location for production deployment with hardcoded localhost backups
- No Redux - the state is not complex enough to benefit from Redux
- No PropTypes - not enough complexity to justify adding
- API CORS settings allow-all for painless demo deployment, but should be tightened up in a real app
...