# SushiHome API Server

This project is meant to run in production under private ip and access via proxy.
Built with Express.js, Mongoose and Boom

## Quick Start

Recommended running on Node v8+

```sh
# Install dependencies and build assets
npm install
npm run build

# Add your MongoDB Atlas connection string to MLAB_MONGO_DB env var
echo 'export MLAB_MONGO_DB="mongodb+srv://user:pass@proj.mongodb.net/dbname?retryWrites=true"' >> ~/.bash_profile

# Serve production server
NODE_ENV=production PORT=8000 npm start
```

The server should start at http://localhost:5000/.

## Development

```sh
# Start dev server
npm run dev
```

#### Emails

Production Env in AWS uses [`SES`](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html) to send emails to customers and notifications.
Development Env in Heroku uses SendGrid service.
