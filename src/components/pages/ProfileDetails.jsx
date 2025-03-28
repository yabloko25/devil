import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`https://nt-devconnector.onrender.com/api/profile/user/${id}`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [id]);

  if (!profile) {
    return <p className="text-center text-gray-500 mt-4">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-[#17a2b8]">{profile.name}</h2>
      <p className="text-lg text-gray-700 mt-2">{profile.githubusername}</p>
      <p className="text-gray-600 mt-2">{profile.bio}</p>
    </div>
  );
}

export default ProfileDetails;
