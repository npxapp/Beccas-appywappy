// ./src/pages/components/CursorRetro.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, TextField } from '@mui/material';

const CursorRetro = ({
  value: externalValue,
  onChange,
  rows = 8,
  fullWidth = true,
  currentLineIndex,
  repositionSignal = false,
  onReposition,
  interruptSignal = false,
  debug = false
}) => {
  // State management
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(true);
  const [displayText, setDisplayText] = useState(() => externalValue);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [displayState, setDisplayState] = useState({
    text: externalValue,
    position: 0,
    isTyping: false
  });

  // Refs
  const textAreaRef = useRef(null);
  const displayRef = useRef(null);
  const isFirstMountRef = useRef(true);
  const debugLogsRef = useRef([]);

  // Enhanced logging function with cursor position tracking
  const logDebug = useCallback((message, data = {}) => {
    if (!debug) return;

    const currentChar = displayState.text[cursorPosition] || ' ';
    const lineInfo = calculateLineAndCharPosition(cursorPosition);
    
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      message,
      cursorInfo: {
        position: cursorPosition,
        character: currentChar,
        line: lineInfo.line,
        column: lineInfo.column
      },
      ...data
    };
    
    debugLogsRef.current.push(logEntry);
    if (debugLogsRef.current.length > 20) {
      debugLogsRef.current.shift();
    }
  }, [debug, cursorPosition, displayState.text]);

  // Calculate line and character position
  const calculateLineAndCharPosition = useCallback((position) => {
    const textBeforeCursor = displayState.text.substring(0, position);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    return { line, column };
  }, [displayState.text]);

  // Single useEffect for cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Combined text update handler
  const handleTextUpdate = useCallback((newText, newPosition, source = 'input') => {
    setDisplayState(prev => ({
      text: newText,
      position: newPosition,
      isTyping: true
    }));
    
    setDisplayText(newText);
    setCursorPosition(newPosition);
    
    logDebug('Text Update', {
      source,
      newText,
      newPosition,
      prevPosition: cursorPosition
    });
    
    if (onChange) {
      const syntheticEvent = {
        target: { value: newText, selectionStart: newPosition }
      };
      onChange(syntheticEvent);
    }
  }, [onChange, cursorPosition, logDebug]);

  // Unified input handler
  const handleInputEvent = useCallback((e) => {
    const newText = e.target.value;
    const newPosition = e.target.selectionStart;
    
    handleTextUpdate(newText, newPosition, e.type);
  }, [handleTextUpdate]);

  // Enhanced click handler with position calculation
  const handleClick = useCallback((e) => {
    const position = calculateCursorPosition(e);
    if (position !== undefined) {
      handleTextUpdate(displayState.text, position, 'click');
      
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(position, position);
      }
    }
  }, [calculateCursorPosition, displayState.text, handleTextUpdate]);

  // Backspace handler
  const handleBackspace = useCallback((e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      const newText = displayState.text.slice(0, cursorPosition - 1) + 
                     displayState.text.slice(cursorPosition);
      const newPosition = Math.max(0, cursorPosition - 1);
      
      handleTextUpdate(newText, newPosition, 'backspace');
    }
  }, [cursorPosition, displayState.text, handleTextUpdate]);

  // Calculate cursor position (Euclidean geometry)
  const calculateCursorPosition = useCallback((e) => {
    if (!displayRef.current) return;
    
    const rect = displayRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const temp = document.createElement('span');
    temp.style.font = window.getComputedStyle(displayRef.current).font;
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'pre';
    document.body.appendChild(temp);

    const computedStyles = window.getComputedStyle(displayRef.current);
    logDebug('Initial Styles', {
      font: computedStyles.font,
      lineHeight: computedStyles.lineHeight,
      fontSize: computedStyles.fontSize,
      fontFamily: computedStyles.fontFamily,
      containerWidth: displayRef.current.clientWidth - 28,
      containerHeight: displayRef.current.clientHeight,
    });

    const containerWidth = displayRef.current.clientWidth - 28;
    const lineHeight = parseFloat(computedStyles.lineHeight);

    let bestDistance = Infinity;
    let bestPosition = 0;
    let currentLineStart = 0;
    let currentY = 0;

    logDebug('Initial Measurements', {
      containerWidth,
      lineHeight,
      clickX,
      clickY
    });

    while (currentLineStart <= displayState.text.length) {
      let lineEnd = currentLineStart;
      let currentLineWidth = 0;
      let lastValidBreak = currentLineStart;

      while (lineEnd <= displayState.text.length) {
        const textSegment = displayState.text.substring(currentLineStart, lineEnd + 1);
        temp.textContent = textSegment;
        currentLineWidth = temp.getBoundingClientRect().width;

        if (displayState.text[lineEnd] === '\n') {
          lineEnd++;
          break;
        }

        if (/\s/.test(displayState.text[lineEnd])) {
          lastValidBreak = lineEnd;
        }

        if (currentLineWidth > containerWidth) {
          lineEnd = lastValidBreak > currentLineStart ? lastValidBreak : lineEnd;
          break;
        }

        lineEnd++;
      }

      const lineText = displayState.text.substring(currentLineStart, lineEnd);
      temp.textContent = lineText;
      const lineWidth = temp.getBoundingClientRect().width;

      logDebug('Line Measurements', {
        lineNumber: currentY / lineHeight,
        lineStart: currentLineStart,
        lineEnd,
        lineWidth,
        currentY,
        lineText,
        lineHeight
      });

      for (let i = 0; i <= lineText.length; i++) {
        temp.textContent = lineText.substring(0, i);
        const charX = temp.getBoundingClientRect().width;
        
        const distance = Math.sqrt(
          Math.pow(charX - clickX, 2) + 
          Math.pow(currentY - clickY, 2)
        );

        if (distance < bestDistance) {
          bestDistance = distance;
          bestPosition = currentLineStart + i;
          
          logDebug('New Best Position', {
            position: bestPosition,
            character: displayState.text[bestPosition] || 'space',
            distance: bestDistance,
            charX,
            currentY
          });
        }
      }

      currentY += lineHeight;
      currentLineStart = lineEnd;

      if (currentY > clickY + lineHeight) break;
    }

    document.body.removeChild(temp);
    
    logDebug('Final Cursor Position', {
      bestPosition,
      bestDistance,
      character: displayState.text[bestPosition] || 'space',
      lineInfo: calculateLineAndCharPosition(bestPosition)
    });
    
    return bestPosition;
  }, [displayState.text, logDebug, calculateLineAndCharPosition]);

  return (
    <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto', cursor: 'text' }} onClick={handleClick}>
      <Box
        ref={displayRef}
        sx={{
          position: 'relative',
          fontFamily: 'monospace',
          fontSize: '1.8rem',
          backgroundColor: 'black',
          color: 'white',
          padding: '16.5px 14px',
          borderRadius: '40px',
          minHeight: `${rows * 1.5}em`,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowY: 'auto',
          textShadow: '0 0 5px white, 0 0 10px white, 0 0 20px white, 0 0 40px white',
        }}
      >
        {displayText.substring(0, cursorPosition)}
        {isFocused && (
          <Box
            component="span"
            sx={{
              position: 'relative',
              display: 'inline-block',
              width: '0.6em',
              height: '1.4em',
              backgroundColor: 'white',
              verticalAlign: 'text-bottom',
              visibility: cursorVisible ? 'visible' : 'hidden',
              boxShadow: '0 0 5px white, 0 0 10px white, 0 0 20px white',
            }}
          />
        )}
        {displayText.substring(cursorPosition)}
      </Box>

      <TextField
        inputRef={textAreaRef}
        multiline
        rows={rows}
        value={displayText}
        onChange={handleInputEvent}
        onKeyDown={handleBackspace}
        onKeyUp={handleInputEvent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: `${rows * 1.5}em`,
          height: 'auto',
          opacity: 0,
          zIndex: 1,
          fontFamily: 'monospace',
          fontSize: '1.8rem',
          padding: '16.5px 14px',
        }}
      />

      {debug && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#baf397',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            padding: '8px',
            marginTop: '8px',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Debug Logs:
          {debugLogsRef.current.map((log, index) => (
            <div key={index}>
              [{log.timestamp}] {log.message}
              {Object.entries(log)
                .filter(([key]) => key !== 'timestamp' && key !== 'message')
                .map(([key, value], idx) => (
                  <div key={idx}>{key}: {JSON.stringify(value)}</div>
                ))}
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CursorRetro;