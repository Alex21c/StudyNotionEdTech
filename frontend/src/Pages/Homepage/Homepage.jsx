import LinkButton from "../../Components/Button/Button";
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
    const idx = Math.floor(Math.random(heroSectionImages.length) * 10);
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
  const handleType = (count) => {
    // access word count number
    console.log(count);
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <div className="text-stone-100">
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <Header />
      <div className="flex flex-col items-center h-[35rem] overflow-hidden relative ">
        <div className="absolute top-0  bg-gradient-to-br from-slate-800 to-slate-950 w-[100%] h-[100%]  opacity-[.6]"></div>
        <img
          src={stateRandomBgImage}
          className="object-cover w-[100%] h-[100%]"
        />
        <div className="absolute flex flex-col gap-[1.5rem] w-[50rem] h-[100%] items-center justify-center ">
          <h2 className="text-[2.3rem] font-semibold">
            Empower Your Future with Coding Skills
          </h2>
          <p className="text-[1.3rem] text-stone-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
          <div className="flex gap-[2rem]">
            <LinkButton btnLabel="Upskill Yourself" to="/" />
            <LinkButton btnLabel="Become an Instructor" to="/" />
          </div>
        </div>
      </div>

      <div className="flex gap-[1rem] p-[1rem] border-[.10rem] border-stone-300  bg-gradient-to-br from-green-700 to-green-800  w-[35rem] rounded-xl">
        <div>
          <ul className="flex flex-col text-right">
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
            }}
            repeat={Infinity}
          />
        </div>
      </div>
      <div className="flex gap-[1rem] p-[1rem] border-[.10rem] border-stone-300  bg-gradient-to-br from-sky-700 to-sky-800  w-[35rem] rounded-xl">
        <div>
          <ul className="flex flex-col text-right">
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
            }}
            repeat={Infinity}
          />
        </div>
      </div>
    </div>
  );
}
