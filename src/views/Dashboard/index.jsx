import React, { useEffect, useState } from 'react'
import Dashboard2 from '@assets/dashboard2.svg'
import { getCookies } from '@global/helper/cookie';
import { decodeData } from '@global/helper/jwt';
import chart from '@assets/chart.png'
import { formatCurrency } from '@global/helper/formatCurrency';
import { IoTrendingUpOutline } from 'react-icons/io5';
import Icon from '@assets/icons/coin.svg'

const Dashboard = () => {

  const [loginData, setLoginData] = useState({});
  useEffect(() => {
    const get = async () => {
      // const decode = await decodeData(localStorage.getItem('loginData'));
      const decode = await decodeData(getCookies('loginData'));
      setLoginData(decode);
    };
    get();
  }, []);

  return (
    <>
      {/* punya master adi */}
      {/* <div className="p-4 bg-gray-100">
        <div className="flex flex-wrap items-center justify-between mb-6 bg-gray-800 text-white rounded-lg">
          <Dashboard2 />
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Hi, {loginData?.NAMA} <span role="img" aria-label="wave">👋</span></h1>
            <p>Welcome back, Let's get back to work.</p>
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
      </div> */}
      {/* punya master adi */}
      <div className='flex min-[1280px]:flex-row min-[320px]:flex-wrap bg-gray-800 m-4 rounded-[15px] justify-between'>
        <div className='flex flex-row'>
          <img src={Dashboard2} className='rounded-l-[15px] h-full' />
          <div className="flex items-center justify-center">
            <div className='flex flex-col text-white'>
              <div className='flex max-w-60'>
                <h1 className="min-[1280px]:text-2xl min-[640px]:text-md font-bold text-wrap">Hi, {loginData?.NAMA} <span role="img" aria-label="wave">👋</span></h1>
              </div>
              <div className='min-[1280px]:text-md min-[640px]:text-xs pr-3'>
                <p>Welcome back, Let's get back to work.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-nowrap overflow-x-auto min-[1280px]:w-[55%] gap-3 m-4 items-center'>
          <div className='p-4 text-white gap-2 flex flex-col rounded-[10px] bg-sky-600 min-w-[200px]' style={CardStyle}>
            <div className='text-md flex flex-row gap-3'><img src={Icon} /> Overall</div>
            <div className='text-lg font-bold'>{formatCurrency(500000000, 0)}</div>
            <hr className='border-t-2' />
            <div className='flex flex-row gap-4 items-center'>
              <div className='bg-opacity-50 rounded-full py-1 px-2 bg-zinc-300'>+ 10%</div>
              <div className='bg-white p-1 rounded-full text-primary'><IoTrendingUpOutline /></div>
            </div>
          </div>
          <div className='p-4 text-white gap-2 flex flex-col rounded-[10px] bg-green-500 min-w-[200px]' style={CardStyle}>
            <div className='text-md flex flex-row gap-3'><img src={Icon} /> PYMAD</div>
            <div className='text-lg font-bold'>{formatCurrency(500000000, 0)}</div>
            <hr className='border-t-2' />
            <div className='flex flex-row gap-4 items-center'>
              <div className='bg-opacity-50 rounded-full py-1 px-2 bg-zinc-300'>+ 10%</div>
              <div className='bg-white p-1 rounded-full text-primary'><IoTrendingUpOutline /></div>
            </div>
          </div>
          <div className='p-4 text-white gap-2 flex flex-col rounded-[10px] bg-yellow-400 min-w-[200px]' style={CardStyle}>
            <div className='text-md flex flex-row gap-3'><img src={Icon} /> Piutang</div>
            <div className='text-lg font-bold'>{formatCurrency(500000000, 0)}</div>
            <hr className='border-t-2' />
            <div className='flex flex-row gap-4 items-center'>
              <div className='bg-opacity-50 rounded-full py-1 px-2 bg-zinc-300'>+ 10%</div>
              <div className='bg-white p-1 rounded-full text-primary'><IoTrendingUpOutline /></div>
            </div>
          </div>
          <div className='p-4 text-white gap-2 flex flex-col rounded-[10px] bg-red-500 min-w-[200px]' style={CardStyle}>
            <div className='text-md flex flex-row gap-3'><img src={Icon} /> Cash In</div>
            <div className='text-lg font-bold'>{formatCurrency(500000000, 0)}</div>
            <hr className='border-t-2' />
            <div className='flex flex-row gap-4 items-center'>
              <div className='bg-opacity-50 rounded-full py-1 px-2 bg-zinc-300'>+ 10%</div>
              <div className='bg-white p-1 rounded-full text-primary'><IoTrendingUpOutline /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CardStyle = {
  backgroundImage: `url(${chart})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right bottom'
};

// const Card = ({ title, amount, icon, change, arrow, color }) => {
//   return (
//     <div className={`flex flex-col items-center p-2 rounded-lg text-white transition-transform transform hover:scale-105 ${color} w-48`}>
//       <div className="flex items-center mb-4">
//         <img src={icon} alt={title} className="w-6 h-6 mr-2" />
//         <span className="text-sm font-bold">{title}</span>
//       </div>
//       <p className="text-md mb-2">{amount}</p>
//       <div className="flex items-center">
//         <span className={`text-lg ${arrow === 'up' ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
//         <span className={`ml-2 ${arrow === 'up' ? 'arrow-up' : 'arrow-down'}`}></span>
//       </div>
//     </div>
//   );
// };

export default Dashboard