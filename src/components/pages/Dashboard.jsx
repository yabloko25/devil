import React from 'react';

function Dashboard() {
  return (
    <div className="ml-[300px] mt-[20px]">
      <h1 className="font-bold text-[#17a2b8] text-[48px] leading-[58px]">
        Dashboard
      </h1>

      <h3 className="font-normal text-[24px] leading-[38px] mt-[20px]">
        <i className="fa-solid fa-circle-user mr-[10px]"></i>Welcome...
      </h3>

      <h4 className="font-normal text-[16px] leading-[38px] mt-[15px]">
        You have not yet set up a profile, please add some info.
      </h4>

      <button className="bg-[#17a2b8] w-[150px] h-[40px] text-white rounded-[2px] mt-[20px]">
        Create Profile
      </button>
    </div>
  );
}

export default Dashboard;
