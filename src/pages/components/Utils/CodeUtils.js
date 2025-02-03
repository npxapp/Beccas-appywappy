export const generateCopy = async (text) => {
  try {
    // Primary method using Clipboard API
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      document.body.removeChild(textArea);
      return false;
    }
  } catch (err) {
    console.error('Copy failed', err);
    return false;
  }
};

export const generateGitLabConfig = () => {
  return `# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - build/

test:
  stage: test
  script:
    - npm run test

deploy:
  stage: deploy
  script:
    - echo "Deploying application..."
  only:
    - main`;
};

export const generateGitHubConfig = () => {
  return `# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install Dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Test
      run: npm test`;
};

export const generateNpmBuildScript = () => {
  return `{
  "name": "your-project",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:prod": "NODE_ENV=production npm run build",
    "build:staging": "NODE_ENV=staging npm run build",
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  }
}`;
};

export const generateWebpackConfig = () => {
  return `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    static: './dist',
    hot: true,
  },
};`;
};

export const generateNpxCommands = () => {
  return `# Common NPX Commands

# Create a new React application
npx create-react-app my-app

# Create a Next.js application
npx create-next-app@latest

# Create a Vite project
npx create-vite@latest

# Initialize a new Node.js project
npx init

# Run TypeScript compiler
npx tsc

# Create a new Gatsby site
npx gatsby new

# Execute Jest tests
npx jest

# Run ESLint
npx eslint .

# Format code with Prettier
npx prettier --write .`;
};

export const generateReactConfig = () => {
  return `// React Component Structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Component lifecycle logic
    const fetchData = async () => {
      try {
        const response = await fetch('api/data');
        const data = await response.json();
        setValue(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>My React Component</h1>
      <p>Value: {value}</p>
    </div>
  );
};

MyComponent.propTypes = {
  initialValue: PropTypes.string.isRequired,
};

export default MyComponent;`;
};

export const generateEjectScript = () => {
  return `# Steps to eject from Create React App

# 1. Run eject command
npm run eject

# 2. New directories and files created:
# - config/
#   - webpack.config.js
#   - webpackDevServer.config.js
#   - jest/
#   - env.js
# - scripts/
#   - build.js
#   - start.js
#   - test.js

# 3. Modified package.json with all configurations

# 4. New dependencies added:
# - babel-preset-react-app
# - webpack
# - webpack-dev-server
# - babel-loader
# - css-loader
# - style-loader
# - file-loader
# - eslint-loader

# Note: This operation is permanent!
# Make sure to commit your changes before ejecting.`;
};

export const generateMuiSetup = () => {
  return `// Material-UI Setup and Theme Configuration
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Custom theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// App wrapper with MUI theme
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app components */}
    </ThemeProvider>
  );
};

export default App;`;
};

