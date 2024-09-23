import * as React from "react";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  let splitted = name.split(" ");

  // [0][0]} ${name.split(" ")[1][0]}
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "4rem",
      height: "4rem",
      fontSize: "2rem",
    },
    children: splitted.map((name) => name[0]).join(""),
  };
}

export default function LetterAvatar({ personName = null, imageUrl = "#" }) {
  // const splittedName = personName.split(" ");
  // if (splittedName.length === 1) {
  //   splittedName.push(".");
  // }
  // personName = splittedName.join(" ");
  // console.log(personName);

  if (!personName) {
    return;
  }
  return <Avatar src={imageUrl} {...stringAvatar(personName)} />;
}
