import "./style.css";
import { forwardRef } from "react";

interface IProps {
  currentPage: number;
  totalPage: number;
}

const ProgressBar = forwardRef<HTMLDivElement, IProps>(
  ({ currentPage, totalPage }, ref) => {
    return (
      <div className="progress-container">
        <span className="progress-label">0{currentPage}</span>
        <div className="vertical-progress">
          <div ref={ref}></div>
        </div>
        <span className="progress-label">0{totalPage}</span>
      </div>
    );
  }
);

export default ProgressBar;
