export const formatPhoneNumber = (number) => {
  const cleaned = number.replace(/\D/g, '');
  if (!cleaned) return null;

  const areaCode = cleaned.slice(0, 3);
  const midSection = cleaned.slice(3, 6);
  const lastSection = cleaned.slice(6, 10);

  return areaCode
    ? `(${areaCode}) ${midSection}${lastSection ? `-${lastSection}` : ''}`
    : null;
};

const updateSlideState = (slideAssetsNumbers, slideAssets, prevStates, slideIndex, enteredNumber) => {
  const matchIndex = slideAssetsNumbers.findIndex(assetNumber => assetNumber === enteredNumber);

  return prevStates.map((state, index) => 
    index === slideIndex 
      ? {
          ...state,
          enteredNumber,
          localIsMatch: matchIndex !== -1,
          matchedAsset: matchIndex !== -1 ? slideAssets[matchIndex] : null,
        }
      : state
  );
};

export const handleNumberClick = (
  number,
  slideIndex,
  slideAssetsNumbers,
  slideAssets,
  setCurrentSlideStates,
  triggerVibration
) => {
  triggerVibration();
  setCurrentSlideStates((prevStates) => {
    const currentState = prevStates[slideIndex];
    const newNumber = (currentState.enteredNumber + number).slice(0, 10);
    return updateSlideState(slideAssetsNumbers, slideAssets, prevStates, slideIndex, newNumber);
  });
};

export const handleBackspace = (
  slideIndex,
  slideAssetsNumbers,
  slideAssets,
  setCurrentSlideStates,
  setDialerCode,
  triggerVibration
) => {
  triggerVibration();
  setCurrentSlideStates((prevStates) => {
    const currentState = prevStates[slideIndex];
    const newNumber = currentState.enteredNumber.slice(0, -1);
    const updatedStates = updateSlideState(
      slideAssetsNumbers,
      slideAssets,
      prevStates,
      slideIndex,
      newNumber
    );

    if (!newNumber || updatedStates[slideIndex].localIsMatch === false) {
      setDialerCode(null);
    }

    return updatedStates;
  });
};

export const handleCall = (
  slideIndex,
  currentSlideStates,
  setCurrentSlideStates,
  setDialerCode,
  setLoading
) => {
  const currentState = currentSlideStates[slideIndex];
  if (currentState.localIsMatch) {
    setCurrentSlideStates(prevStates => {
      const newStates = [...prevStates];
      newStates[slideIndex] = {
        ...currentState,
        callCount: (currentState.callCount || 0) + 1,
      };
      return newStates;
    });
    setDialerCode(currentState.enteredNumber);
    setLoading(true);
  }
};