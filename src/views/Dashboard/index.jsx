import { useEffect, useState } from 'react'
import Dashboard2 from '../../assets/dashboard2.svg'
import { getCookies } from '../../global/helper/cookie';
import { decodeData } from '../../global/helper/jwt';

const Dashboard = () => {

  const [loginData, setLoginData] = useState({});
  useEffect(() => {
    console.log("masuk dasboard");
    const get = async () => {
      // const decode = await decodeData(localStorage.getItem('loginData'));
      const decode = await decodeData(getCookies('loginData'));
      setLoginData(decode);
    };
    get();
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex flex-wrap items-center justify-between mb-6 bg-gray-800 text-white rounded-lg">
        {/* <Dashboard2 /> */}
        <img src={Dashboard2} width={'-webkit-fill-available'}></img>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Hi, {loginData?.NAMA} <span role="img" aria-label="wave">👋</span></h1>
          <p>Welcome back, Let&apos;s get back to work.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 m-4">
          <Card
            title="Overall"
            amount="Rp. 500.000.000"
            icon="/path/to/overall-icon.png"
            change="+10%"
            arrow="up"
            color="bg-blue-500"
          />
          <Card
            title="PYMAD"
            amount="Rp. 500.000.000"
            icon="/path/to/pymad-icon.png"
            change="+10%"
            arrow="up"
            color="bg-green-500"
          />
          <Card
            title="Piutang"
            amount="Rp. 150.000.000"
            icon="/path/to/piutang-icon.png"
            change="-2%"
            arrow="down"
            color="bg-yellow-500"
          />
          <Card
            title="Cash In"
            amount="Rp. 800.000.000"
            icon="/path/to/cashin-icon.png"
            change="+10%"
            arrow="up"
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Card = ({ title, amount, icon, change, arrow, color }) => {
  return (
      <div className={`flex flex-col items-center p-2 rounded-lg text-white transition-transform transform hover:scale-105 ${color} w-48`}>
          <div className="flex items-center mb-4">
              <img src={icon} alt={title} className="w-6 h-6 mr-2" />
              <span className="text-sm font-bold">{title}</span>
          </div>
          <p className="text-md mb-2">{amount}</p>
          <div className="flex items-center">
              <span className={`text-lg ${arrow === 'up' ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
              <span className={`ml-2 ${arrow === 'up' ? 'arrow-up' : 'arrow-down'}`}></span>
          </div>
      </div>
  );
};

export default Dashboard