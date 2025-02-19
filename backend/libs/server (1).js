// ./src/server.js
import Express from "express";
import morgan from "morgan";
import * as http from "http";
import * as os from "os";
import l from "./common/logger.js";
import passport from "passport";
import compression from "compression";
import { handleException } from "./common/exceptions.js";
import cors from "cors";
import { setLang } from "./middlewares/lang.middleware.js";
import cron from "node-cron";
import SubscriptionService from "./api/subscriptions/subscription.service.js";

import "./common/passport.js";

const app = new Express();

// Define corsOptions at module level so it's available throughout the class
const ALLOWED_ORIGINS = [
  'http://localhost:5000',
  'http://localhost:3010',
  'http://0.0.0.0:5000',
  'http://0.0.0.0:3010',
  'http://startersoft.io:5000'
];

const corsOptions = {
  origin: function(origin, callback) {
    console.log('CORS Origin Check:', {
      requestOrigin: origin,
      allowedOrigins: ALLOWED_ORIGINS,
      isAllowed: !origin || ALLOWED_ORIGINS.includes(origin)
    });

    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.error('CORS blocked:', origin);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 3600
};

export default class ExpressServer {
  constructor() {
    // Apply CORS first
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));

    // Request logging middleware (before other middleware)
    app.use((req, res, next) => {
      console.log('Request Details:', {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        path: req.path,
        origin: req.headers.origin,
        referer: req.headers.referer,
        host: req.headers.host,
        fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        headers: req.headers
      });
      next();
    });

    // Standard middleware
    if (process.env.ENABLE_HTTP_LOGGER === "true") {
      app.use(morgan('combined'));
    }

    app.use(Express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      }
    }));
    
    app.use(Express.urlencoded({ extended: false }));
    app.use(compression());
    app.use(setLang());
    app.use(passport.initialize());

    // Custom middleware for additional processing
    app.use((req, res, next) => {
      // Add request timestamp
      req.requestTime = Date.now();
      next();
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Express error:', {
        message: err.message,
        stack: err.stack,
        type: err.name,
        url: req.url,
        method: req.method,
        headers: req.headers
      });

      if (err.name === 'Error' && err.message.includes('CORS')) {
        return res.status(403).json({
          error: 'CORS Error',
          message: err.message,
          origin: req.headers.origin
        });
      }

      handleException(req, res, err);
    });
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () => {
      l.info(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
      l.info(`Server listening on port: ${p}`);
      l.info(`Server hostname: ${os.hostname()}`);
      l.info(`CORS enabled for origins: ${ALLOWED_ORIGINS.join(', ')}`);
    };

    http.createServer(app).listen(port, welcome(port));
    return this;
  }

  initCron() {
    cron.schedule(
      "1 0 * * *",
      () => {
        SubscriptionService.runNotifyExpiringTrials();
        SubscriptionService.runNotifyPaymentFailed();
      },
      {
        scheduled: true,
      }
    );
    return this;
  }
}