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
            personName={`${review?.writtenByUser?.firstName} ${review?.writtenByUser?.lastName}`}
            imageUrl={
              review?.writtenByUser?.googleProfileImage ||
              review?.writtenByUser?.profileImage?.url
            }
          />
          <div>
            <h3 className="font-semibold text-[1.3rem]">{`${review?.writtenByUser?.firstName} ${review?.writtenByUser?.lastName}`}</h3>
            <div className="text-stone-300">{review?.writtenByUser?.about}</div>
          </div>
        </div>
        <div>
          <Rating
            name="read-only"
            value={review.rating}
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
            {review?.belongsToCourseId?.courseName}
          </Link>
          <p className="text-stone-300">{review?.review}</p>
        </div>
      </div>
    </section>
  );
}
