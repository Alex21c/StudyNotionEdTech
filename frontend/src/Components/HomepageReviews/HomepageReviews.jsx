import SkeletonReview from "../SkeletonReview/SkeletonReview";
import CourseReview from "../CourseReview/CourseReview";
import { useEffect, useState } from "react";
import apiUrls from "../../apiUrls.mjs";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";
import validator from "validator";
import { getProjectName } from "../../utils.mjs";
export default function HomepageReviews() {
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });
  let [stateReviewsHaveBeenFetched, setStateReviewsHaveBeenFetched] =
    useState(false);
  async function fetchReviews() {
    try {
      const apiUrl = apiUrls["ratings-and-reviews"]["get-reviews-for-homepage"];
      if (!apiUrl) {
        console.log(`missing: get-reviews-for-homepage`);
        showErrorMsg(
          "Failed to fetch course reviews, kindly try again later",
          setSnackbarState,
          setOpen
        );
        return;
      }

      //make an api call to the backend
      if (
        !validator.isURL(process.env.REACT_APP_SERVER_ROOT_URL, {
          require_tld: false,
        })
      ) {
        console.log(`invalid url : ${process.env.REACT_APP_SERVER_ROOT_URL}`);
        showErrorMsg(
          "Failed to fetch course reviews, kindly try again later",
          setSnackbarState,
          setOpen
        );
        return;
      }
      const reqUrl = process.env.REACT_APP_SERVER_ROOT_URL + apiUrl;

      const prjName = getProjectName();

      let response = await fetch(reqUrl, {
        method: "GET",
        credentials: "include",
      });
      if (!response) {
        throw new Error(
          "Failed to Make Req. with Server! please try again later..."
        );
      }
      response = await response.json();
      if (!response?.success) {
        throw new Error(
          "Failed to fetch course reviews! please try again later..."
        );
      }

      setStateReviews(response?.data);
      setStateReviewsHaveBeenFetched(true);
    } catch (error) {
      showErrorMsg(error.message, setSnackbarState, setOpen);
    }
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
          <SkeletonReview key={"skeleton-1"} />
          <SkeletonReview key={"skeleton-2"} />
          <SkeletonReview key={"skeleton-3"} />
        </>
      ) : (
        stateReviews.map((review) => {
          return <CourseReview key={review?._id} review={review} />;
        })
      )}
    </section>
  );
}
