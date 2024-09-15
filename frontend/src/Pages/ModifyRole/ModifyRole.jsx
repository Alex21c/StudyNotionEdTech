import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export default function ModifyRole() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  // update local storage with the authToken
  localStorage.setItem("Authorization", `Bearer ${token}`);

  async function handleFormSubmit(event) {
    event.preventDefault();
    // make an api call to the backend to update the profile role
    try {
      await fetch()
    } catch (error) {
      
    }
  }
  let [stateRole, setStateRole] = useState("student");

  // show radio dialog and submit button
  return (
    <div className="text-stone-100">
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Select a role for yours profile</legend>
          <div>
            <input
              type="radio"
              id="student"
              name="role"
              defaultValue="Student"
              onChange={() => setStateRole("student")}
              defaultChecked
            />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input
              type="radio"
              id="educator"
              name="role"
              defaultValue="Educator"
              onChange={() => setStateRole("educator")}
            />
            <label htmlFor="educator">Educator</label>
          </div>
        </fieldset>
        <button>Submit</button>
      </form>
    </div>
  );
}
