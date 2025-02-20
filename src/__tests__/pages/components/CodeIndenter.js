// ./src/pages/components/CodeIndenter.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  Button,
  Box
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { 
  generateCopy,
  generateGitLabConfig,
  generateGitHubConfig,
  generateNpmBuildScript,
  generateWebpackConfig,
  generateNpxCommands,
  generateReactConfig,
  generateEjectScript,
  generateMuiSetup
} from './Utils/CodeUtils';
import CmdInput from './CmdInput';

const CodeIndenter = () => {
  const resetPlaceholder = 'Paste your code here and press start, I can indent up to 1000 max characters and support Bracket-style and Tag Scoped Syntax with partial Declarative and Query language support.';
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [repositionSignal, setRepositionSignal] = useState(false);
  const textAreaRef = useRef(null);
  const isFirstMount = useRef(true);
  const [isInterrupting, setIsInterrupting] = useState(false);  
  
  useEffect(() => {
    if (isFirstMount.current) {
      setInput(resetPlaceholder);
      isFirstMount.current = false;
    }
  }, [resetPlaceholder]); // Including resetPlaceholder avoids the warning
  
  const handleCopy = async () => {
    const success = await generateCopy(input);
    if (!success) {
      console.error("Failed to copy");
    }
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  
  const handleGitLab = () => {
    setInput(generateGitLabConfig());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  
  const handleGitHub = () => {
    setInput(generateGitHubConfig());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  
  const handleNpmBuild = () => {
    setInput(generateNpmBuildScript());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleWebpack = () => {
    setInput(generateWebpackConfig());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleNpx = () => {
    setInput(generateNpxCommands());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleReact = () => {
    setInput(generateReactConfig());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleEject = () => {
    setInput(generateEjectScript());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  
  const handleMui = () => {
    setInput(generateMuiSetup());
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleDockerize = () => {
    if (!input) return;

    const files = {
      'Dockerfile': `FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
      'package.json': JSON.stringify({
        name: 'dockerized-app',
        version: '1.0.0',
        scripts: {
          start: 'node index.js'
        }
      }, null, 2),
      'index.js': input
    };

    const blobParts = [];
    for (const [filename, content] of Object.entries(files)) {
      const header = `--- ${filename} ---\n`;
      blobParts.push(
        new TextEncoder().encode(header),
        new TextEncoder().encode(content),
        new TextEncoder().encode('\n\n')
      );
    }

    const blob = new Blob(blobParts, { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'docker-package.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const detectStructureStart = (line) => {
    const trimmedLine = line.trim();
    return {
      hasTagOpen: trimmedLine.startsWith('<') && !trimmedLine.startsWith('</'),
      hasScopeOpen: /[{([]/.test(trimmedLine),
      endsWithScope: /[{([]/.test(trimmedLine.charAt(trimmedLine.length - 1)),
      hasDeclaration: /^(const|let|var|function|class|export|import)/.test(trimmedLine),
      hasControlFlow: /^(if|for|while|switch|try|do)/.test(trimmedLine)
    };
  };

  const detectStructureEnd = (line) => {
    const trimmedLine = line.trim();
    return {
      hasTagClose: trimmedLine.startsWith('</') || trimmedLine.endsWith('/>'),
      hasScopeClose: /[})\]]/.test(trimmedLine),
      startsWithScope: /[})\]]/.test(trimmedLine.charAt(0))
    };
  };

  const shouldIncrementIndent = (line, structure) => {
    return (
      structure.hasTagOpen ||
      (structure.hasScopeOpen && structure.endsWithScope) ||
      (structure.hasDeclaration && structure.endsWithScope) ||
      (structure.hasControlFlow && structure.endsWithScope)
    );
  };

  const shouldDecrementIndent = (line, structure) => {
    return (
      structure.hasTagClose ||
      (structure.hasScopeClose && structure.startsWithScope)
    );
  };

  const indentCode = () => {
    if (!input || isProcessing) return;

    setIsProcessing(true);
    setIsDone(false);
    setCurrentLineIndex(0);

    const lines = input.split('\n');
    let indentedCode = '';
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      setCurrentLineIndex(i);
      const line = lines[i];
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        indentedCode += '\n';
        continue;
      }

      const structureStart = detectStructureStart(trimmedLine);
      const structureEnd = detectStructureEnd(trimmedLine);

      if (shouldDecrementIndent(trimmedLine, structureEnd)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const currentIndent = '    '.repeat(indentLevel);
      indentedCode += currentIndent + trimmedLine + '\n';

      if (shouldIncrementIndent(trimmedLine, structureStart)) {
        indentLevel++;
      }
    }
    
    setInput(indentedCode.trimEnd());
    setIsProcessing(false);
    setIsDone(true);
  };

  return (
    <Box sx={{ width: '100%', }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: 2, 
          my: 5, 
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="contained"
          onClick={handleCopy}
        >
          Copy
        </Button>
        <Button
          variant="contained"
          onClick={handleFocus}
        >
          Cursor
        </Button>
        <Button
          variant="contained"
          onClick={handleDockerize}
          disabled={!input}
          startIcon={<FolderZipIcon />}
          sx={{ bgcolor: 'success.main' }}
        >
          Dockerize
        </Button>
        <Button
          variant="contained"
          onClick={handleGitLab}
        >
          GitLab
        </Button>
        <Button
          variant="contained"
          onClick={handleGitHub}
        >
          GitHub
        </Button>
        <Button
          variant="contained"
          onClick={handleNpmBuild}
        >
          npm build
        </Button>
        <Button
          variant="contained"
          onClick={handleWebpack}
        >
          Webpack
        </Button>
        <Button
          variant="contained"
          onClick={handleNpx}
        >
          npx
        </Button>
        <Button
          variant="contained"
          onClick={handleReact}
        >
          React.js
        </Button>
        <Button
          variant="contained"
          onClick={handleEject}
        >
          Eject
        </Button>
        <Button
          variant="contained"
          onClick={handleMui}
        >
          Mui
        </Button>
      </Box>
  
      <Box>
        <CmdInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          currentLineIndex={currentLineIndex}
          repositionSignal={repositionSignal}
          onReposition={() => setRepositionSignal(false)}
          interruptSignal={isInterrupting}
          boundingBoxMethod="getBoundingClientRect" // 'getBoundingClientRect', 'offsetPosition', 'scrollOffset', 'intersectionObserver'
          distanceCalculation="euclideanDistance" // 'euclideanDistance', 'manhattanDistance'
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            onClick={indentCode}
            disabled={!input || isProcessing}
            startIcon={<PlayArrowIcon />}
            sx={{ 
              bgcolor: isDone ? 'success.main' : 'initial'
            }}
          >
            {!input ? 'Start' : isProcessing ? 'On' : isDone ? 'Off' : 'Start'}
          </Button>
          
          <Button
            variant="contained"
            onClick={() => {
                setIsInterrupting(true); // Stop current animation
                // Introduce a dummy state change to force a re-render
                setInput(""); // Temporarily clear the input to trigger a state change
                setTimeout(() => {
                  setInput(resetPlaceholder); // Set the input back to the reset value after a brief moment
                }, 0);
                // Reset other states as needed
                setRepositionSignal(true);
            }}
            startIcon={<RotateLeftIcon />}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeIndenter;