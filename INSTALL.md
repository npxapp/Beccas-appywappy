npx create-react-app .
npm install \
  axios \
  multer \
  @mui/material \
  @mui/x-data-grid \
  @emotion/react \
  @emotion/styled \
  @mui/lab \
  @opentelemetry/api \
  @opentelemetry/sdk-trace-web \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/sdk-trace-base \
  @opentelemetry/semantic-conventions \
  @opentelemetry/exporter-jaeger \
  react-force-graph \
  react-router-dom \
  react-slick \
  @mui/icons-material \
  @mui/x-tree-view \
  @hookform/resolvers \
  yup \
  react-query \
  react-hook-form \
  @stripe/stripe-js \
  @stripe/react-stripe-js \
  moment \
  react-confirm-alert \
  react-i18next \
  i18next@23.7.11 \
  papaparse \
  lodash \
  @fortawesome/free-solid-svg-icons \
  @fortawesome/react-fontawesome \
  mathjs
npm install --save-dev \
  react-app-rewired \
  process \
  stream-browserify \
  stream-http \
  https-browserify \
  url \
  buffer \
  assert \
  browserify-zlib \
  util

npm install -g pm2
pm2 -v
pm2 start npm --name development -- run start
pm2 start node --name frontend -- server.js
pm2 start node --name backend -- index.js



