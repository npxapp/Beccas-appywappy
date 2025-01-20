export const createStyles = (darkMode) => {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('id', 'demo-pro-styles');
  
  styleElement.textContent = `
    .demo-pro-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 1rem;
      background-color: ${darkMode ? '#000000' : '#FFFFFF'};
      color: #007FFF;
    }
    .demo-pro-tab {
      padding: 0.75rem 1.5rem;
      margin: 0 0.25rem;
      cursor: pointer;
      color: #FFFFFF;
      background-color: #007FFF;
      border: none;
      border-radius: 8px 8px 0 0;
      font-size: 1.1rem;
    }
    .demo-pro-activeTab {
      background-color: #0056b3;
    }
    .demo-pro-icon {
      font-size: 2rem !important;
      margin-right: 0.5rem;
    }
    .demo-pro-webhook-input {
      width: 100%;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 20px;
      border: 1px solid #007FFF;
      background-color: ${darkMode ? '#000000' : '#FFFFFF'};
      color: #007FFF;
      font-size: 1.1rem;
    }
    .demo-pro-trace-container {
      padding: 1rem;
      margin: 1rem 0;
      border: 1px solid #007FFF;
      border-radius: 8px;
      background-color: ${darkMode ? '#000000' : '#FFFFFF'};
    }
    .demo-pro-uptime-card {
      display: flex;
      align-items: center;
      padding: 1rem;
      margin: 1rem 0;
      border: 1px solid #007FFF;
      border-radius: 8px;
      background-color: ${darkMode ? '#000000' : '#FFFFFF'};
    }
    .demo-pro-robot-icon {
      font-size: 3rem !important;
      margin-right: 1rem;
    }
  `;
  return styleElement;
};

