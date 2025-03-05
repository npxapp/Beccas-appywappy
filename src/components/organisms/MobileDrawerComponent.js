import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Slider,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Grid,
  InputAdornment
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';
import { useDrawerComponent } from './DrawerComponentContext';

// Helper to convert hex to rgba
const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return '';
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Convert hex to rgb
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Helper to convert rgba to hex (approximate)
const rgbaToHex = (rgba) => {
  if (!rgba) return '#61dafb';
  
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
  if (!match) return '#61dafb';
  
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  
  return `#${r}${g}${b}`;
};

const MobileDrawerComponent = ({ open, onClose }) => {
  const { settings, updateSetting, resetSettings } = useDrawerComponent();
  
  // Local state for color pickers
  const [colorPickerStates, setColorPickerStates] = useState({
    buttonBackground: false,
    buttonHover: false,
    buttonActive: false,
    buttonColor: false,
    paperBackground: false,
  });
  
  // Extract color values without alpha for color pickers
  const [colorValues, setColorValues] = useState({
    buttonBackground: rgbaToHex(settings.buttonBackgroundColor),
    buttonHover: rgbaToHex(settings.buttonHoverColor),
    buttonActive: rgbaToHex(settings.buttonActiveColor),
    buttonColor: settings.buttonColor ? rgbaToHex(settings.buttonColor) : '#61dafb',
    paperBackground: settings.paperBackgroundColor ? rgbaToHex(settings.paperBackgroundColor) : '#ffffff'
  });
  
  // Alpha values for rgba colors
  const [alphaValues, setAlphaValues] = useState({
    buttonBackground: 0.2,
    buttonHover: 0.6,
    buttonActive: 0.6,
    buttonColor: 1,
    paperBackground: 1
  });
  
  // Toggle color picker visibility
  const toggleColorPicker = (name) => {
    setColorPickerStates(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  // Update color and apply to settings
  const handleColorChange = (name, color) => {
    setColorValues(prev => ({
      ...prev,
      [name]: color
    }));
    
    // Apply rgba with current alpha for the right setting
    if (name === 'buttonBackground') {
      updateSetting('buttonBackgroundColor', hexToRgba(color, alphaValues.buttonBackground));
    } else if (name === 'buttonHover') {
      updateSetting('buttonHoverColor', hexToRgba(color, alphaValues.buttonHover));
    } else if (name === 'buttonActive') {
      updateSetting('buttonActiveColor', hexToRgba(color, alphaValues.buttonActive));
    } else if (name === 'buttonColor') {
      updateSetting('buttonColor', hexToRgba(color, alphaValues.buttonColor));
    } else if (name === 'paperBackground') {
      updateSetting('paperBackgroundColor', hexToRgba(color, alphaValues.paperBackground));
    }
  };
  
  // Handle alpha change
  const handleAlphaChange = (name, value) => {
    setAlphaValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Apply rgba with new alpha
    if (name === 'buttonBackground') {
      updateSetting('buttonBackgroundColor', hexToRgba(colorValues.buttonBackground, value));
    } else if (name === 'buttonHover') {
      updateSetting('buttonHoverColor', hexToRgba(colorValues.buttonHover, value));
    } else if (name === 'buttonActive') {
      updateSetting('buttonActiveColor', hexToRgba(colorValues.buttonActive, value));
    } else if (name === 'buttonColor') {
      updateSetting('buttonColor', hexToRgba(colorValues.buttonColor, value));
    } else if (name === 'paperBackground') {
      updateSetting('paperBackgroundColor', hexToRgba(colorValues.paperBackground, value));
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1400 }}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '500px',
          padding: 2,
          overflowY: 'auto'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Drawer Component Settings
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Success Code Input */}
        <Typography variant="h6" gutterBottom>
          Keypad Settings
        </Typography>
        
        <TextField
          label="Success Code"
          fullWidth
          value={settings.successCode}
          onChange={(e) => updateSetting('successCode', e.target.value)}
          margin="normal"
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={settings.enableVibration}
              onChange={(e) => updateSetting('enableVibration', e.target.checked)}
            />
          }
          label="Enable Vibration"
          sx={{ my: 1, display: 'block' }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={(e) => updateSetting('darkMode', e.target.checked)}
            />
          }
          label="Dark Mode"
          sx={{ my: 1, display: 'block' }}
        />
        
        <Divider sx={{ my: 2 }} />
        
        {/* Button Size Settings */}
        <Typography variant="h6" gutterBottom>
          Button Size
        </Typography>
        
        <Typography gutterBottom>
          Button Width: {settings.buttonWidth}px
        </Typography>
        <Slider
          value={settings.buttonWidth}
          onChange={(_, value) => updateSetting('buttonWidth', value)}
          min={40}
          max={120}
          step={1}
          valueLabelDisplay="auto"
          aria-labelledby="button-width-slider"
          sx={{ mb: 3 }}
        />
        
        <Typography gutterBottom>
          Button Height: {settings.buttonHeight}px
        </Typography>
        <Slider
          value={settings.buttonHeight}
          onChange={(_, value) => updateSetting('buttonHeight', value)}
          min={40}
          max={120}
          step={1}
          valueLabelDisplay="auto"
          aria-labelledby="button-height-slider"
          sx={{ mb: 3 }}
        />
        
        <Typography gutterBottom>
          Button Border Radius
        </Typography>
        <Slider
          value={settings.buttonBorderRadius === '50%' ? 50 : parseInt(settings.buttonBorderRadius)}
          onChange={(_, value) => {
            // If value is 50, use '50%' for perfect circle, otherwise use pixels
            updateSetting('buttonBorderRadius', value === 50 ? '50%' : `${value}px`);
          }}
          min={0}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value === 50 ? '50%' : `${value}px`}
          aria-labelledby="button-radius-slider"
          sx={{ mb: 3 }}
        />
        
        <Typography gutterBottom>
          Button Border Width
        </Typography>
        <Slider
          value={parseInt(settings.buttonBorder.split(' ')[0])}
          onChange={(_, value) => {
            // Maintain the color portion of the border
            const borderParts = settings.buttonBorder.split(' ');
            borderParts[0] = `${value}px`;
            updateSetting('buttonBorder', borderParts.join(' '));
          }}
          min={0}
          max={10}
          step={1}
          valueLabelDisplay="auto"
          aria-labelledby="button-border-width-slider"
          sx={{ mb: 3 }}
        />
        
        <Divider sx={{ my: 2 }} />
        
        {/* Button Font Settings */}
        <Typography variant="h6" gutterBottom>
          Font Size
        </Typography>
        
        <Typography gutterBottom>
          Font Size (rem)
        </Typography>
        <Slider
          value={parseFloat(settings.buttonFontSize.includes('clamp') 
            ? settings.buttonFontSize.match(/clamp\((.+)rem/)[1]
            : settings.buttonFontSize.replace('rem', ''))}
          onChange={(_, value) => {
            // Maintain the clamp structure if it exists
            if (settings.buttonFontSize.includes('clamp')) {
              const parts = settings.buttonFontSize.match(/clamp\((.+)rem, (.+), (.+)rem\)/);
              if (parts) {
                updateSetting('buttonFontSize', `clamp(${value}rem, ${parts[2]}, ${parts[3]}rem)`);
              } else {
                updateSetting('buttonFontSize', `${value}rem`);
              }
            } else {
              updateSetting('buttonFontSize', `${value}rem`);
            }
          }}
          min={0.5}
          max={3}
          step={0.1}
          valueLabelDisplay="auto"
          aria-labelledby="font-size-slider"
          sx={{ mb: 3 }}
        />
        
        <Divider sx={{ my: 2 }} />
        
        {/* Color Settings */}
        <Typography variant="h6" gutterBottom>
          Colors
        </Typography>
        
        <Grid container spacing={2}>
          {/* Button Background Color */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              Button Background Color
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: settings.buttonBackgroundColor,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mr: 2,
                  cursor: 'pointer'
                }}
                onClick={() => toggleColorPicker('buttonBackground')}
              />
              <TextField
                value={settings.buttonBackgroundColor}
                onChange={(e) => updateSetting('buttonBackgroundColor', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            
            {colorPickerStates.buttonBackground && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker 
                  color={colorValues.buttonBackground} 
                  onChange={(color) => handleColorChange('buttonBackground', color)} 
                />
                <Typography gutterBottom sx={{ mt: 1 }}>
                  Opacity: {alphaValues.buttonBackground}
                </Typography>
                <Slider
                  value={alphaValues.buttonBackground}
                  onChange={(_, value) => handleAlphaChange('buttonBackground', value)}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelDisplay="auto"
                />
              </Box>
            )}
          </Grid>
          
          {/* Button Hover Color */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              Button Hover Color
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: settings.buttonHoverColor,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mr: 2,
                  cursor: 'pointer'
                }}
                onClick={() => toggleColorPicker('buttonHover')}
              />
              <TextField
                value={settings.buttonHoverColor}
                onChange={(e) => updateSetting('buttonHoverColor', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            
            {colorPickerStates.buttonHover && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker 
                  color={colorValues.buttonHover} 
                  onChange={(color) => handleColorChange('buttonHover', color)} 
                />
                <Typography gutterBottom sx={{ mt: 1 }}>
                  Opacity: {alphaValues.buttonHover}
                </Typography>
                <Slider
                  value={alphaValues.buttonHover}
                  onChange={(_, value) => handleAlphaChange('buttonHover', value)}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelDisplay="auto"
                />
              </Box>
            )}
          </Grid>
          
          {/* Button Active Color */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              Button Active Color
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: settings.buttonActiveColor,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mr: 2,
                  cursor: 'pointer'
                }}
                onClick={() => toggleColorPicker('buttonActive')}
              />
              <TextField
                value={settings.buttonActiveColor}
                onChange={(e) => updateSetting('buttonActiveColor', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            
            {colorPickerStates.buttonActive && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker 
                  color={colorValues.buttonActive} 
                  onChange={(color) => handleColorChange('buttonActive', color)} 
                />
                <Typography gutterBottom sx={{ mt: 1 }}>
                  Opacity: {alphaValues.buttonActive}
                </Typography>
                <Slider
                  value={alphaValues.buttonActive}
                  onChange={(_, value) => handleAlphaChange('buttonActive', value)}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelDisplay="auto"
                />
              </Box>
            )}
          </Grid>
          
          {/* Button Text Color */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              Button Text Color
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: settings.buttonColor || (settings.darkMode ? '#61dafb' : '#007fff'),
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mr: 2,
                  cursor: 'pointer'
                }}
                onClick={() => toggleColorPicker('buttonColor')}
              />
              <TextField
                value={settings.buttonColor || (settings.darkMode ? '#61dafb' : '#007fff')}
                onChange={(e) => updateSetting('buttonColor', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            
            {colorPickerStates.buttonColor && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker 
                  color={colorValues.buttonColor} 
                  onChange={(color) => handleColorChange('buttonColor', color)} 
                />
              </Box>
            )}
          </Grid>
          
          {/* Button Border Color */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              Button Border Color
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: 'transparent',
                  border: settings.buttonBorder,
                  borderRadius: 1,
                  mr: 2,
                  cursor: 'pointer'
                }}
              />
              <TextField
                value={settings.buttonBorder.split(' ').slice(2).join(' ')}
                onChange={(e) => {
                  const borderParts = settings.buttonBorder.split(' ');
                  const borderWidth = borderParts[0];
                  const borderStyle = borderParts[1];
                  updateSetting('buttonBorder', `${borderWidth} ${borderStyle} ${e.target.value}`);
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
          </Grid>
          
          {/* Paper Background Color */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              Drawer Background Color
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: settings.paperBackgroundColor || 
                    (settings.darkMode ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'),
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mr: 2,
                  cursor: 'pointer'
                }}
                onClick={() => toggleColorPicker('paperBackground')}
              />
              <TextField
                value={settings.paperBackgroundColor || 
                  (settings.darkMode ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)')}
                onChange={(e) => updateSetting('paperBackgroundColor', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            
            {colorPickerStates.paperBackground && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker 
                  color={colorValues.paperBackground} 
                  onChange={(color) => handleColorChange('paperBackground', color)} 
                />
                <Typography gutterBottom sx={{ mt: 1 }}>
                  Opacity: {alphaValues.paperBackground}
                </Typography>
                <Slider
                  value={alphaValues.paperBackground}
                  onChange={(_, value) => handleAlphaChange('paperBackground', value)}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelDisplay="auto"
                />
              </Box>
            )}
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" onClick={resetSettings}>
            Reset to Defaults
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

MobileDrawerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MobileDrawerComponent;

