# Analytics Application
Developed a dashboard that tracks interactions with my personal website. I used Recharts to help me present actionable data, including button clicks, browser information, and page view duration, empowering myself to make informed decisions and enhance website interaction and engagement.

Implemented data tracking by attaching scripts to my website on react, which sent the information to a server hosted on fly.io. I set up my endpoints using Express.js to allow data submission, and MongoDB to store and manage the collected data.

## Project Tree
- vite-app
  - client  
  - server
- other
- deprecated

### Client
Vite application deployed on vercel. Displays the data collected from tracking using recharts. 

### Server
deployment url: https://aged-moon-7506.fly.dev/api/analytics
try out and append these endpoints: `/browser-statistics`, `/button-clicks`, `/button-clicks-stats`, `/average-page-views`

Server holds the node express application that is deployed to fly.io. It receives data from my [personal website](https://github.com/JasonAlexKaharudin/portfolio) and sets up endpoints for the client application to query the relavant data.

#### Others
old collector.js script to how to approach some tracking.

#### deprecated
an old approaching using express but with an apache server that I do not have running anymore.