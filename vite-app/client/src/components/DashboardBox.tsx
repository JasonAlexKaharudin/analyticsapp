import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const DashboardBox: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full px-2 pt-2 pb-3 rounded-md shadow-sm shadow-slate-200">
        {children}
    </div>
  )
}

export default DashboardBox;