import Footer from "../../Components/Footer/Footer";
import LinkButton from "../../Components/LinkButton/LinkButton";
import { ContextStudyNotionWebApp } from "../../Context";
import { Link } from "react-router-dom";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { getProjectName } from "../../utils.mjs";
import heroSectionImage1 from "../../Assests/Images/Homepage/HeroSection/1.jpg";
import heroSectionImage2 from "../../Assests/Images/Homepage/HeroSection/2.jpg";
import heroSectionImage3 from "../../Assests/Images/Homepage/HeroSection/3.jpg";
import heroSectionImage4 from "../../Assests/Images/Homepage/HeroSection/4.jpg";
import heroSectionImage5 from "../../Assests/Images/Homepage/HeroSection/5.jpg";
import heroSectionImage6 from "../../Assests/Images/Homepage/HeroSection/6.jpeg";
import heroSectionImage7 from "../../Assests/Images/Homepage/HeroSection/7.jpg";
import heroSectionImage8 from "../../Assests/Images/Homepage/HeroSection/8.jpeg";
import heroSectionImage9 from "../../Assests/Images/Homepage/HeroSection/9.jpg";
import heroSectionImage10 from "../../Assests/Images/Homepage/HeroSection/10.jpg";
import heroSectionImage11 from "../../Assests/Images/Homepage/HeroSection/11.jpg";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";
import HomepageReviews from "../../Components/HomepageReviews/HomepageReviews";
const heroSectionImages = [
  heroSectionImage1,
  heroSectionImage2,
  heroSectionImage3,
  heroSectionImage4,
  heroSectionImage5,
  heroSectionImage6,
  heroSectionImage7,
  heroSectionImage8,
  heroSectionImage9,
  heroSectionImage10,
  heroSectionImage11,
];

export default function Homepage() {
  let [stateRandomBgImage, setStateRandomBgImage] = useState("#");

  function generateRandomImage(heroSectionImages) {
    const idx = Math.floor(Math.random() * heroSectionImages.length);
    const randomImage = heroSectionImages[idx];
    setStateRandomBgImage(randomImage);
  }

  let { stateWhoIsCurrentPage, setStateWhoIsCurrentPage } = useContext(
    ContextStudyNotionWebApp
  );
  useEffect(() => {
    setStateWhoIsCurrentPage("Homepage");
    generateRandomImage(heroSectionImages);
  }, []);
  const navigate = useNavigate();
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });

  return (
    <div className="text-stone-100">
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <Header />
      <div className="flex flex-col gap-[2rem] items-center">
        <div className="flex flex-col items-center h-[35rem] overflow-hidden relative w-[100%]">
          <div className="absolute top-0  bg-gradient-to-br from-slate-800 to-slate-950 w-[100%] h-[100%]  opacity-[.6]"></div>
          <img
            src={stateRandomBgImage}
            className="object-cover w-[100%] h-[100%]"
          />
          <div className="absolute flex flex-col gap-[1.5rem] w-[50rem] h-[100%] items-center justify-center ">
            <h2 className="text-[2.3rem] font-semibold">
              Empower Your Future with{" "}
              <span className="bg-gradient-to-r  from-sky-400 to-sky-300 text-transparent bg-clip-text">
                Coding Skills
              </span>
            </h2>
            <p className="text-[1.3rem] text-stone-200">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </p>
            <div className="flex gap-[2rem]">
              <LinkButton btnLabel="Upskill Yourself" to="/register-new-user" />
              <LinkButton
                btnLabel="Become an Instructor"
                to="/register-new-user"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-[5rem] justify-center">
          <div className="flex flex-col gap-[1.5rem] max-w-[35rem] h-[100%] items-center justify-center  ">
            <h2 className="text-[2.3rem] font-semibold leading-[2.5rem]">
              Unlock Your{" "}
              <span className="bg-gradient-to-r  from-sky-400 to-sky-300 text-transparent bg-clip-text">
                coding potential
              </span>{" "}
              with our online courses
            </h2>
            <p className="text-[1.3rem] text-stone-200">
              Our courses are designed and taught by industry experts who have
              years of experience in coding and are passionate about sharing
              their knowledge with you.
            </p>
            <div className="flex gap-[2rem]">
              <LinkButton btnLabel="Try it Yourself" to="/" />
            </div>
          </div>
          <div
            className="flex gap-[1rem] p-[1rem] border-[.10rem] border-stone-300  bg-gradient-to-br from-green-700 to-green-800  w-[30rem] rounded-xl
          shadow-md shadow-stone-400
          "
          >
            <div>
              <ul className="flex flex-col text-right text-[.8rem] pt-[.2rem] leading-[1.5rem]">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
              </ul>
            </div>
            <div>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  '<!DOCTYPE html>\n <html lang="en">\n <head>\n     <meta charset="UTF-8">\n     <meta name="viewport" content="width=device-width, initial-scale=1.0">\n     <title>Document</title>\n </head>\n <body>\n     <h1>Hello World!</h1>\n     <p>Welcome to my website.</p>\n </body>\n </html>',
                  1000,
                  "",
                ]}
                wrapper="code"
                speed={50}
                style={{
                  whiteSpace: "pre-line",
                  fontSize: ".8rem",
                }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-[5rem] justify-center mt-[2rem]">
          <div className="flex gap-[1rem] p-[1rem] border-[.10rem] border-stone-300  bg-gradient-to-br from-sky-700 to-sky-800  w-[30rem] rounded-xl shadow-md shadow-stone-400">
            <div>
              <ul className="flex flex-col text-right text-[.8rem] pt-[.2rem] leading-[1.5rem]">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
              </ul>
            </div>
            <div>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "import React from 'react';\n import ReactDOM from 'react-dom';\n import './index.css';\n function App() {\n   return (\n     <div>\n       <h1>Hello, React!</h1>\n       <p>Welcome to your first app.</p>\n     </div>\n   );\n }\n ReactDOM.render(<App />, document.getElementById('root'));",
                  1000,
                  "",
                ]}
                wrapper="code"
                speed={50}
                style={{
                  whiteSpace: "pre-line",
                  fontSize: ".8rem",
                }}
                repeat={Infinity}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[1.5rem] max-w-[35rem] h-[100%] items-center justify-center  ">
            <h2 className="text-[2.3rem] font-semibold leading-[2.5rem]">
              Get the Skills you need for a{" "}
              <span className="bg-gradient-to-r  from-sky-400 to-sky-300 text-transparent bg-clip-text">
                Job that is in demand
              </span>
            </h2>
            <p className="text-[1.3rem] text-stone-200">
              Upskill yourself and get placed in IT Company as SDE, MERN Stack
              Developer.
            </p>
            <div className="flex gap-[2rem]">
              <LinkButton btnLabel="Upskill Yourself" to="/register-new-user" />
            </div>
          </div>
        </div>
        <div className="flex gap-[1rem] flex-col">
          <h2 className="text-[2.3rem] font-semibold">
            Reviews from other Learners
          </h2>
          <HomepageReviews />
        </div>
      </div>
      <div className="mt-[2rem]">
        <Footer />
      </div>
    </div>
  );
}
