import { useTheme } from '@mui/material/styles';

export const useIconUtils = () => {
  const theme = useTheme();

  const calculatePercentage = (iconData) => {
    const scoreTable = iconData.reduce((acc, { pass, unknown }) => {
      acc.passScore += pass ? 1 : 0;
      acc.unknownScore += unknown ? 1 : 0;
      return acc;
    }, { passScore: 0, unknownScore: 0 });

    const totalScore = scoreTable.passScore + (scoreTable.unknownScore * 0.5);
    const percentage = Math.round((totalScore / iconData.length) * 100);

    return {
      percentage,
      scoreTable
    };
  };

  const getIconColor = (pass, unknown) => {
    if (!pass && unknown) return theme.palette.error.light;
    if (!pass && !unknown) return theme.palette.error.light;
    if (pass && unknown) return theme.palette.success.light;
    if (pass) return theme.palette.success.main;
    return 'lightgray';
  };

  const getIconComponent = (pass, originalIcon) => {
    return (!pass) ? originalIcon : originalIcon;
  };

  const getBouncingButtonStyle = (index, pass, unknown) => {
    let opacity = 0.9;
    let backgroundColor = theme.palette.success.light;

    if (!pass && !unknown) {
      backgroundColor = theme.palette.success.light;
      opacity = 0.7;
    }

    if (unknown) {
      opacity = 0.3;
    }

    return { 
      position: 'absolute', 
      [index % 2 === 0 ? 'left' : 'right']: '10%', 
      width: '100px', 
      height: '100px', 
      borderRadius: '50%', 
      backgroundColor: backgroundColor, 
      opacity: opacity,
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      cursor: 'pointer', 
      color: 'white', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      padding: 0 
    };
  };

  return {
    calculatePercentage,
    getIconColor,
    getIconComponent,
    getBouncingButtonStyle
  };
};

