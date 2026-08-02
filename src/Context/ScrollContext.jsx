import { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

const sectionPositions = [
  0.00, // Home
  0.093, // About
  0.213, // Skills
  0.340, // Projects
  0.630, // Experience
  0.820, // Activities
  0.965, // Contact
];


export function ScrollProvider({ children }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollElement, setScrollElement] = useState(null);

  const value = {
    currentSection,
    setCurrentSection,

    scrollElement,
    setScrollElement,

    sectionPositions,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}

export function usePortfolioScroll() {
  return useContext(ScrollContext);
}
