export default function RegisterNewUser() {
  function handleRegisterWithGoogle() {
    window.location.href = "http://localhost:4000/auth/google";
  }
  return (
    <div className="text-stone-100">
      <div className="text-stone-100">Register</div>
      <button
        onClick={handleRegisterWithGoogle}
        className="border bg-stone-700 p-[.5rem] rounded-md"
      >
        Register With Google
      </button>
    </div>
  );
}
