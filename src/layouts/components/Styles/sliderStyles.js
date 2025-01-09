// src/styles/sliderStyles.js

export const sliderStyles = (darkMode) => `
  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100% !important;
  }
  .slick-slide {
    height: 660px !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .slick-slide > div {
    width: 100%;
  }
  .slick-dots {
    bottom: 10px;
  }
  .slick-dots li button:before {
    color: ${darkMode ? "#fff" : "#000"};
    font-size: 12px;
  }
  .slick-dots li.slick-active button:before {
    color: ${darkMode ? "#1abc9c" : "#000"};
  }
`;

