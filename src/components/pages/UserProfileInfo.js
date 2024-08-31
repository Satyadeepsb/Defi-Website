import React, { useEffect, useState } from "react";
import avatarImage from "../../assets/image/user-avatar.jpg";
const UserProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");

  useEffect(() => {
    // Fetching userInfo from localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);

      // Fetching the country flag using REST Countries API
      fetch(`https://restcountries.com/v3.1/name/${parsedUserInfo.country}`)
        .then((response) => response.json())
        .then((data) => {
          setCountryFlag(data[0].flags.svg);
        })
        .catch((error) => console.error("Error fetching country data:", error));
    }
  }, []);

  if (!userInfo) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray shadow-lg rounded-lg bg-gray-50 ">
      <div className="flex flex-col items-center">
        <img
          className="w-20 h-20 lg:w-13 lg:h-13 rounded-full text-center"
          src={avatarImage}
        />
      </div>
      <div className="mt-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-2">{userInfo.email}</h2>
        </div>
        <p className="text-gray-500">
          <strong>Role:</strong>{" "}
          <span className="text-gray-700 font-bold">{userInfo.role}</span>
        </p>
        <div className="flex items-center mt-4">
          <strong className="text-gray-500 mr-2">Country:</strong>
          <br />
          {countryFlag ? (
            <img
              src={countryFlag}
              alt={`${userInfo.country} flag`}
              className="w-6 h-6 mr-2"
            />
          ) : (
            <p className="text-gray-700">Loading flag...</p>
          )}
          <span className="text-gray-700 font-bold">
            {userInfo.country === "IN" ? "India" : userInfo.country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
