import { createContext, useEffect, useState } from "react";
import apiUrls from "./apiUrls.mjs";
import { getProjectName } from "./utils.mjs";
import validator from "validator";
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
  async function makeApiCallToCheckIsUserLoggedIn() {
    try {
      const apiUrl = apiUrls?.user?.isUserLoggedIn;
      if (!apiUrl) {
        console.log("failed to make api call, Missing isUserLoggedIn");
        return;
      }

      //make an api call to the backend
      if (
        !validator.isURL(process.env.REACT_APP_SERVER_ROOT_URL, {
          require_tld: false,
        })
      ) {
        console.log(
          `failed to make api call, kindly make sure .env contains valid url, process.env.REACT_APP_SERVER_ROOT_URL, ${process.env.REACT_APP_SERVER_ROOT_URL}`
        );

        return;
      }
      const reqUrl = process.env.REACT_APP_SERVER_ROOT_URL + apiUrl;

      const prjName = getProjectName();

      const headers = {
        "Content-Type": "application/json",
      };

      let response = await fetch(reqUrl, {
        method: "GET",
        headers,
        credentials: "include",
      });
      if (!response) {
        throw new Error(
          "Failed to Make Req. with Server! please try again later..."
        );
      }
      response = await response.json();

      if (!response?.success) {
        setStateIsUserLoggedIn(false);
        return;
      }

      // default is
      setStateIsUserLoggedIn(true);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      setStateIsUserLoggedIn(false);
    }
  }

  // setting states
  useEffect(() => {
    makeApiCallToCheckIsUserLoggedIn();
  }, []);

  return (
    <ContextStudyNotionWebApp.Provider value={contextValues}>
      {children}
    </ContextStudyNotionWebApp.Provider>
  );
};

export default ContextProviderStudyNotionWebApp;
