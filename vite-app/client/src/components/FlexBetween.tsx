import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const FlexBetween: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-between align-center">
      {children}
    </div>
  )
}

export default FlexBetween;