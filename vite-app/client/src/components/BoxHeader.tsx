import {  ReactNode } from 'react';

type Props = {
    title: string;
    value?: number;
    percentage?: string;
    icon?: ReactNode;
    secondHeader?: boolean;
    secondTitle?: string;
    secondValue?: number;
}

const BoxHeader = ({ title, value, percentage, icon, secondHeader, secondTitle, secondValue }: Props) => {
  return (
    <div className='flex justify-between w-full pt-2 pl-3'>
      <div className='flex'>
        <div>
          <h1 className="text-lg text-gray-500">{title}</h1>
          <div className='flex'>
            <p className="text-3xl">{value}</p>
            <span className="flex pt-[0.5rem] pl-2">
              <p className="text-[1rem] text-green-500">{percentage}</p>
              <span className='pt-[0.1rem]'>
                {icon}
              </span>
            </span>
          </div>
        </div>

        {
          secondHeader &&
          <div className='pl-7'>
            <h1 className="text-lg text-gray-500">{secondTitle}</h1>
            <div className='flex'>
              <p className="text-3xl">{secondValue}</p>
            </div>
          </div>
        }
      </div>

      <h2 className="pt-[0.2rem] pr-3 text-gray-400 pl-3text-sm">7 days</h2>
    </div>
  )
}

export default BoxHeader;