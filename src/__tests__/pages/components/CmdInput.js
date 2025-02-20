// ./src/pages/components/CmdInput.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, TextField } from '@mui/material';

const CmdInput = ({
  value: externalValue,
  onChange,
  rows = 8,
  fullWidth = true,
  currentLineIndex,
  repositionSignal = false,
  onReposition,
  interruptSignal = false,
  boundingBoxMethod = 'getBoundingClientRect', // Options: 'getBoundingClientRect', 'offsetPosition', 'scrollOffset', 'intersectionObserver'
  distanceCalculation = 'euclideanDistance', // Options: 'euclideanDistance', 'manhattanDistance'
  debug = false
}) => {

  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(true);
  const [displayText, setDisplayText] = useState(() => externalValue);
  const [cursorPosition, setCursorPosition] = useState(0);
  // Add these state variables at the top of your component
  const [hasAnimated, setHasAnimated] = useState(false);
  const textAreaRef = useRef(null);
  const displayRef = useRef(null);
  const isFirstMountRef = useRef(true);
  const debugLogsRef = useRef([]);
  
  const logDebug = useCallback((message, data = {}) => {
    if (!debug) return;

    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, ...data };
    debugLogsRef.current.push(logEntry);

    if (debugLogsRef.current.length > 20) {
      debugLogsRef.current.shift();
    }
  }, [debug]);
  
    useEffect(() => {
      if (externalValue !== displayText && !hasAnimated) {
        setHasAnimated(true);
        let index = -1;  // Start at -1 so first increment puts us at 0
        
        const applyNextCharacter = () => {
          index++;
          if (index <= externalValue.length) {
            setDisplayText(externalValue.substring(0, index));
            setCursorPosition(index);
            if (index < externalValue.length) {
              setTimeout(applyNextCharacter, 100);
            } else {
              setHasAnimated(false); // Reset after animation completes
            }
          }
        };
        
        applyNextCharacter();
      }
    }, [externalValue, interruptSignal, displayText, hasAnimated]); //Add displayText
  
  useEffect(() => {
    let cursorInterval;
    if (isFocused) {
      cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 530);
    }
    return () => clearInterval(cursorInterval);
  }, [isFocused, displayText]); //Add displayText

  useEffect(() => {
    if (textAreaRef.current) {
      const currentValue = displayText;
      let targetPosition = cursorPosition;

      if (cursorPosition === 0 && currentLineIndex !== undefined) {
        targetPosition = currentLineIndex;
      }

      if (debug) {
        logDebug('Positioning Effect Triggered', {
          currentValue,
          currentLineIndex,
          repositionSignal,
          isFirstMount: isFirstMountRef.current
        });
      }
      
      const isAccordionClick = document.activeElement?.closest('.MuiAccordionSummary-root');
      if (isAccordionClick) return;

      if (isFirstMountRef.current || repositionSignal || currentLineIndex !== undefined) {
        if (isFirstMountRef.current) {
          targetPosition = displayText.length;
        }
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(targetPosition, targetPosition);
        if (cursorPosition !== targetPosition) {
          setCursorPosition(targetPosition);
        }
        if (debug) {
          logDebug('Cursor Positioning', {
            targetPosition,
            isFirstMount: isFirstMountRef.current
          });
        }

        if (isFirstMountRef.current) {
          isFirstMountRef.current = false;
        }

        if (onReposition) {
          onReposition();
        }
      }
    }
  }, [displayText, currentLineIndex, repositionSignal, onReposition, debug, logDebug, cursorPosition]); //Add cursorPosition
  
    /**
     * Sets up an IntersectionObserver for the displayRef element when using the
     * intersectionObserver bounding box method.
     * 
     * @param {React.RefObject} displayRef - Reference to the display element
     * @param {string} boundingBoxMethod - Current bounding box calculation method
     */
    useEffect(() => {
      if (boundingBoxMethod === 'intersectionObserver' && displayRef.current) {
        // Create observer instance
        const observer = new IntersectionObserver((entries) => {
          if (entries[0]) {
            // Store the observed rect directly on the element
            displayRef.current._observedRect = entries[0].boundingClientRect;
          }
        }, {
          // Configure observer options
          threshold: 1.0,
          root: null,
          rootMargin: '0px'
        });
    
        // Start observing our display element
        observer.observe(displayRef.current);
    
        // Cleanup function to disconnect observer
        return () => {
          if (observer) {
            observer.disconnect();
          }
        };
      }
    }, [boundingBoxMethod]);
      
    /**
     * Calculates the cursor position based on click coordinates within a text display area.
     * 
     * @param {MouseEvent} e - The click event object
     * @param {Object} options - Configuration options
     * @param {string} options.boundingBoxMethod - Method to calculate bounding box:
     *   - 'getBoundingClientRect' (default) - Uses element.getBoundingClientRect()
     *   - 'offsetPosition' - Uses element offset positions
     *   - 'scrollOffset' - Uses scroll-aware offset calculation
     *   - 'intersectionObserver' - Uses stored IntersectionObserver data
     * @param {string} options.distanceCalculation - Method to calculate character distances:
     *   - 'euclideanDistance' (default) - Uses Euclidean distance formula
     *   - 'manhattanDistance' - Uses Manhattan/taxicab distance
     * @param {string} options.displayText - The current text content being displayed
     * @param {boolean} options.debug - Whether to log debug information
     * @returns {number} The calculated cursor position index
     */
    const calculateCursorPosition = useCallback((e) => {
      if (!displayRef.current) return;
    
      // Get position based on selected bounding box method
      let rect;
      
      if (boundingBoxMethod === 'offsetPosition') {
        rect = {
          left: displayRef.current.offsetLeft,
          top: displayRef.current.offsetTop
        };
      } else if (boundingBoxMethod === 'scrollOffset') {
        rect = {
          left: displayRef.current.offsetLeft - displayRef.current.scrollLeft + document.documentElement.scrollLeft,
          top: displayRef.current.offsetTop - displayRef.current.scrollTop + document.documentElement.scrollTop
        };
      } else if (boundingBoxMethod === 'intersectionObserver') {
        // Using stored intersection observer data if available, fallback to getBoundingClientRect
        rect = displayRef.current._observedRect || displayRef.current.getBoundingClientRect();
      } else {
        // Default to getBoundingClientRect
        rect = displayRef.current.getBoundingClientRect();
      }
    
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
    
      const temp = document.createElement('span');
      temp.style.font = window.getComputedStyle(displayRef.current).font;
      temp.style.visibility = 'hidden';
      temp.style.position = 'absolute';
      temp.style.whiteSpace = 'pre';
      document.body.appendChild(temp);
    
      const computedStyles = window.getComputedStyle(displayRef.current);
      const containerWidth = displayRef.current.clientWidth - 28;
      const lineHeight = parseFloat(computedStyles.lineHeight);
    
      let bestDistance = Infinity;
      let bestPosition = 0;
      let currentLineStart = 0;
      let currentY = 0;
    
      while (currentLineStart <= displayText.length) {
        let lineEnd = currentLineStart;
        let currentLineWidth = 0;
        let lastValidBreak = currentLineStart;
    
        while (lineEnd <= displayText.length) {
          const textSegment = displayText.substring(currentLineStart, lineEnd + 1);
          temp.textContent = textSegment;
          currentLineWidth = temp.getBoundingClientRect().width;
    
          if (displayText[lineEnd] === '\n') {
            lineEnd++;
            break;
          }
    
          if (/\s/.test(displayText[lineEnd])) {
            lastValidBreak = lineEnd;
          }
    
          if (currentLineWidth > containerWidth) {
            lineEnd = lastValidBreak > currentLineStart ? lastValidBreak : lineEnd;
            break;
          }
    
          lineEnd++;
        }
    
        const lineText = displayText.substring(currentLineStart, lineEnd);
        temp.textContent = lineText;
    
        // Calculate best position using selected distance method
        for (let i = 0; i <= lineText.length; i++) {
          temp.textContent = lineText.substring(0, i);
          const charX = temp.getBoundingClientRect().width;
          
          let distance;
          if (distanceCalculation === 'manhattanDistance') {
            distance = Math.abs(charX - clickX) + Math.abs(currentY - clickY);
          } else {
            // Default to euclideanDistance
            distance = Math.sqrt(
              Math.pow(charX - clickX, 2) + 
              Math.pow(currentY - clickY, 2)
            );
          }
    
          if (distance < bestDistance) {
            bestDistance = distance;
            bestPosition = currentLineStart + i;
          }
        }
    
        currentY += lineHeight;
        currentLineStart = lineEnd;
    
        if (currentY > clickY + lineHeight) break;
      }
    
      document.body.removeChild(temp);
      
      if (debug) {
        console.log('Cursor Position Calculation:', {
          boundingBoxMethod,
          distanceCalculation,
          clickX,
          clickY,
          bestPosition,
          bestDistance
        });
      }
    
      return bestPosition;
    }, [displayText, boundingBoxMethod, distanceCalculation, debug]);

  const handleClick = useCallback((e) => {
    const position = calculateCursorPosition(e);
    if (position !== undefined) {
      if (debug) {
        logDebug('Click Handling', { calculatedPosition: position, currentPosition: cursorPosition });
      }

      setCursorPosition(position);
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(position, position);
      }
    }
  }, [calculateCursorPosition, cursorPosition, debug, logDebug]);
  
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    const newPosition = e.target.selectionStart;

    if (debug) {
      logDebug('Change Event', { newValue, newPosition });
    }

    setDisplayText(newValue);
    setCursorPosition(newPosition);

    if (onChange) {
      onChange(e);
    }
  }, [onChange, debug, logDebug]);

  const handleKeyUp = useCallback((e) => {
    const newPosition = e.target.selectionStart;

    if (debug) {
      logDebug('KeyUp Event', { newPosition, currentPosition: cursorPosition });
    }

    setCursorPosition(newPosition);
  }, [cursorPosition, debug, logDebug]);

  

  return (
    <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto', cursor: 'text' }} onClick={handleClick}>
      <Box
        ref={displayRef}
        sx={{
          position: 'relative',
          fontFamily: 'monospace',
          fontSize: '1.8rem',
          backgroundColor: 'black',
          color: '#baf397',
          padding: '16.5px 14px',
          borderRadius: '40px',
          minHeight: `${rows * 1.5}em`,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowY: 'auto',
          textShadow: '0 0 5px #39f095, 0 0 10px #39f095, 0 0 20px #39f095, 0 0 40px #39f095',
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
              backgroundColor: '#39f095',
              verticalAlign: 'text-bottom',
              visibility: cursorVisible ? 'visible' : 'hidden',
              boxShadow: '0 0 5px #39f095, 0 0 10px #39f095, 0 0 20px #39f095',
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
        onChange={handleChange}
        onKeyUp={handleKeyUp}
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

export default CmdInput;