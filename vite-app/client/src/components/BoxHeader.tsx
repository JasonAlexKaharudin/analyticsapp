import {  ReactNode } from 'react';

type Props = {
    title: string;
    value?: number;
    percentage?: string;
    icon?: ReactNode;
}

const BoxHeader = ({ title, value, percentage, icon }: Props) => {
  return (
    <div className='pt-2 pl-3'>
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
  )
}

export default BoxHeader;