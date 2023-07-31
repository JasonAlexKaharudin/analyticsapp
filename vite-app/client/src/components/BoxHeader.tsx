import {  ReactNode } from 'react';

type Props = {
    title: string;
    value?: string;
    percentage?: string;
    icon?: ReactNode;
}

const BoxHeader = ({ title, value, percentage, icon }: Props) => {
  return (
    <div className='pt-2 pl-3'>
        <h1 className="text-xl text-gray-500">{title}</h1>
        <div className='flex'>
          <p className="text-lg">{value}</p>
          <span className="flex pt-[0.3rem] pl-2">
            <p className="text-[0.6rem] text-green-500">{percentage}</p>
            {icon}
          </span>
        </div>
        
    </div>
  )
}

export default BoxHeader;