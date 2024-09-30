import { Link } from "react-router-dom";
export default function LinkButton({ btnLabel, to }) {
  return (
    <Link
      to={to}
      className="px-[1rem] py-[.5rem] bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md hover:scale-[.95] transition text-slate-900 font-medium hover:from-yellow-500 hover:to-yellow-300"
    >
      {btnLabel}
    </Link>
  );
}
