import React from "react";

import NoImage from "../../images/NoImage.png";
const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original";

const CrewCard = ({ id, original_name, department, profile_path }) => {
  const profileURL = profile_path
    ? `${IMAGE_ENDPOINT}/${profile_path}`
    : NoImage;
  return (
    <div>
      <div className="bg-gray-900 text-white rounded-lg drop-shadow-2xl ">
        <img
          src={profileURL}
          alt={original_name}
          className="rounded-lg w-full h-[200px] xs:h-[300px] sm:h-[410px] md:h-[300px]  lg:h-[200px] xl:h-[280px]"
          loading="lazy"
        />
        <div className="p-[.5rem] ">
          <h1 className="font-bold text-sm mb-[.3rem] line-clamp-1">
            {original_name}
          </h1>
          <h1 className="text-gray-400 text-xs truncate">{department}</h1>
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
