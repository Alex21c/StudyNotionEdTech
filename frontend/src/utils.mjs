export function getProjectName() {
  return (
    process.env.REACT_APP_PROJECT_NAME ||
    "alex21c-skyniche-employees-cards-assignment"
  );
}

export function markUserAsLoggedInInsideLocalStorage() {
  // mark user as logged in, inside local storage
  localStorage.setItem(
    `${process.env.REACT_APP_PROJECT_NAME}-stateIsUserLoggedIn`,
    JSON.stringify(true)
  );
}
export function markUserAsLoggedOutInsideLocalStorage() {
  // mark user as logged in, inside local storage
  localStorage.setItem(
    `${process.env.REACT_APP_PROJECT_NAME}-stateIsUserLoggedIn`,
    JSON.stringify(false)
  );
}
