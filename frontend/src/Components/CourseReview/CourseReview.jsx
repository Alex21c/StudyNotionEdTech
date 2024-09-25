import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import LetterAvatar from "../MUI/Snackbar/LetterAvatar/LetterAvatar";
export default function CourseReview({ review }) {
  return (
    <section className="w-[25rem] border-slate-500 border-[.1rem] p-[1rem] rounded-xl bg-slate-700">
      {/* Review */}
      <div className="flex flex-col gap-[.5rem]">
        <div className="flex gap-[1rem]">
          <LetterAvatar
            personName={"Abhishek kumar"}
            imageUrl="https://mui.com/static/images/adfvatar/1.jpg"
          />
          <div>
            <h3 className="font-semibold text-[1.3rem]">Abhishek kumar</h3>
            <div className="text-stone-300">MERN Stack Developer</div>
          </div>
        </div>
        <div>
          <Rating
            name="read-only"
            value={4}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ color: "#e7e5e4", opacity: 0.75 }}
                fontSize="inherit"
              />
            }
          />
        </div>
        <div>
          <Link to="/" className="hover:underline text-blue-300  font-medium">
            ABC Course
          </Link>
          <p className="text-stone-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, amet
            voluptate quo odit explicabo et doloribus suscipit asperiores
            placeat nisi!
          </p>
        </div>
      </div>
    </section>
  );
}
