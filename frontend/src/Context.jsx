import { createContext, useState } from "react";
export const ContextStudyNotionWebApp = createContext(null);

const ContextProviderStudyNotionWebApp = ({ children }) => {
  let [stateWhoIsCurrentPage, setStateWhoIsCurrentPage] = useState(null);
  const contextValues = {
    stateWhoIsCurrentPage,
    setStateWhoIsCurrentPage,
  };

  return (
    <ContextStudyNotionWebApp.Provider value={contextValues}>
      {children}
    </ContextStudyNotionWebApp.Provider>
  );
};

export default ContextProviderStudyNotionWebApp;
