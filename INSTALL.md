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
  svg-loaders-react \
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
  util \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event \
  web-vitals


npx create-react-app beccas-appywappy-main           
cd beccas-appywappy-main
npm install react@18 react-dom@18
npm dedupe
npm install web-vitals
npm install react-app-rewired

--no-audit
--save-dev

npx create-react-app beccas-appywappy-main
cd beccas-appywappy-main
npm install react@18 react-dom@18
npm dedupe
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
  svg-loaders-react \
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
  util \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event \
  web-vitals
rm -rf node_modules package-lock.json
npm install
nano config-overrides.js
npm start
npm uninstall react-app-rewired
rm -rf node_modules package-lock.json
npm install
npm start

npm install -g \
  pm2
pm2 -v
pm2 start npm \
  --name development \
  -- run start
pm2 start node \
  --name frontend \
  -- server.js
pm2 start node \
  --name backend \
  -- index.js


