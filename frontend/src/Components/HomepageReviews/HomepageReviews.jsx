import SkeletonReview from "../SkeletonReview/SkeletonReview";
import CourseReview from "../CourseReview/CourseReview";
import { useEffect, useState } from "react";
export default function HomepageReviews() {
  let [stateReviewsHaveBeenFetched, setStateReviewsHaveBeenFetched] =
    useState(false);
  function fetchReviews() {
    setTimeout(() => {
      setStateReviews([1, 2, 3]);
      setStateReviewsHaveBeenFetched(true);
    }, 1000);
  }
  useEffect(() => {
    fetchReviews();
  }, []);
  let [stateReviews, setStateReviews] = useState([]);
  return (
    <section className="flex gap-[1.5rem] justify-center">
      <h2 className="displayNone">Homepage Reviews</h2>
      {stateReviewsHaveBeenFetched === false ? (
        <>
          <SkeletonReview />
          <SkeletonReview />
          <SkeletonReview />
        </>
      ) : (
        stateReviews.map((review) => {
          return <CourseReview />;
        })
      )}
    </section>
  );
}
