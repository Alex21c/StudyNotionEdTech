import { createContext, useEffect, useState } from "react";
export const ContextStudyNotionWebApp = createContext(null);

const ContextProviderStudyNotionWebApp = ({ children }) => {
  let [stateWhoIsCurrentPage, setStateWhoIsCurrentPage] = useState(null);
  let [stateIsUserLoggedIn, setStateIsUserLoggedIn] = useState(false);
  const contextValues = {
    stateWhoIsCurrentPage,
    setStateWhoIsCurrentPage,
    stateIsUserLoggedIn,
    setStateIsUserLoggedIn,
  };
  // setting states
  useEffect(() => {
    const isUserLoggedIn = JSON.parse(
      localStorage.getItem(
        `${process.env.REACT_APP_PROJECT_NAME}-stateIsUserLoggedIn`
      )
    );
    if (isUserLoggedIn) {
      setStateIsUserLoggedIn(isUserLoggedIn);
    }
  }, []);
  return (
    <ContextStudyNotionWebApp.Provider value={contextValues}>
      {children}
    </ContextStudyNotionWebApp.Provider>
  );
};

export default ContextProviderStudyNotionWebApp;
