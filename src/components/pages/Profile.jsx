import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://nt-devconnector.onrender.com/api/profile", {
        headers: { "x-auth-token": token },
      })
      .then((res) => setProfiles(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-[45px] font-bold text-[#17a2b8] ml-[30px]">Developers</h1>
      <p className="text-[24px] text-[#333] ml-[30px]">Browse and connect with developers</p>

      {profiles.map((profile) => (
        <div key={profile._id} className="p-6 rounded-lg bg-[#f5f5f5] m-2 ml-[30px] shadow-md">
          <p className="font-bold text-[24px] text-[#333]">{profile.githubusername}</p>
          <p className="text-[16px] text-[#333] leading-[29px]">{profile.bio}</p>
          <p className="text-[16px] text-[#333] leading-[29px] mt-[10px]">{profile.company}</p>
          <p className="text-[20px] text-[#17a2b8] flex items-center gap-2">
            <i className="fa-solid fa-check"></i> {profile.skills.join(", ")}
          </p>
          <Link to={`/profile/${profile.user?._id}`}>
            <button className="bg-[#17a2b8] w-[150px] h-[40px] text-white rounded-md mt-[10px]">
              View Profile
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Profile;
