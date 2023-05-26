import { FC, useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar";

import "./style.desktop.css";
import "./style.mobile.css";

const Section2 = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const TOTALPAGE = 3;

  const changePage = (newPage: number) => setCurrentPage(newPage);

  return (
    <section id="section2">
      <div className="stacked_wrapper">
        <div className="stacked_head">
          <div className="">
            <div className="workflow">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginTop: "3px" }}
              >
                <path
                  d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
                  fill="#A594FD"
                ></path>
              </svg>
              <h4>Workflow</h4>
            </div>
            <h2>Create at the speed of thought.</h2>
            <p>
              Focus on your getting your thoughts out and crafting the best
              message while Chronicle does the heavy lifting for you
            </p>
          </div>
        </div>
        <DesktopView
          currentPage={currentPage}
          totalPage={TOTALPAGE}
          changePage={changePage}
        />
        <MobileView
          currentPage={currentPage}
          totalPage={TOTALPAGE}
          changePage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default Section2;

interface PageViewProps {
  currentPage: number;
  totalPage: number;
  changePage: (number) => void;
}
const DesktopView: FC<PageViewProps> = ({
  currentPage,
  totalPage,
  changePage,
}) => {
  const progressBar = useRef<HTMLDivElement>();
  const stackedContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    function switchBox() {
      if (document.body.offsetWidth < 860) return;
      if (!stackedContainer.current || !progressBar.current) return;

      const container = stackedContainer.current;
      const y = window.scrollY - container.offsetTop;

      // not scrolled enough
      if (y < 0) return;
      const newY = Math.min((y / (container.offsetHeight - 400)) * 100, 100);
      const newCurrentPage = Math.min(
        Math.floor(newY / (100 / totalPage)) + 1,
        3
      );
      changePage(newCurrentPage);
      progressBar.current.style.height = newY + "%";

      const boxes: NodeListOf<HTMLDivElement> =
        stackedContainer.current.querySelectorAll(".box_wrapper");
      boxes.forEach((box, idx) => {
        if (currentPage - 1 === idx) {
          box.style.opacity = "1";
          box.style.translate = "0";
          box.style.scale = "1";
          return;
        }

        box.style.opacity = "0";
        box.style.translate = "0 250px";
        box.style.scale = "0.6";
      });
    }

    window.addEventListener("scroll", switchBox);
    window.addEventListener("resize", switchBox);
    return () => {
      window.removeEventListener("scroll", switchBox);
      window.removeEventListener("resize", switchBox);
    };
  }, [currentPage]);

  return (
    <div ref={stackedContainer} className="stacked_stack_desktop">
      <div className="container">
        <div className="box_wrapper">
          <div className="box">
            <div className="box_head"></div>
            <div className="box_body">
              <h3>
                A keyboard <br /> first experience.
              </h3>
              <p>
                Powerful shortcuts and a keyboard-first workflow means you will
                get to your finish line in no time!
              </p>
            </div>
          </div>
        </div>
        <div className="box_wrapper">
          <div className="box">
            <div className="box_head"></div>
            <div className="box_body">
              <h3>
                Bullets to visuals <br /> in a click.
              </h3>
              <p>
                Transform any block to any other and try different options
                without any design hassle
              </p>
            </div>
          </div>
        </div>
        <div className="box_wrapper">
          <div className="box">
            <div className="box_head"></div>
            <div className="box_body">
              <h3>
                A powerful assistant <br /> just a click away
              </h3>
              <p>
                Insert blocks, perform powerful actions and leverage the
                limitless power of AI - all without leaving your keyboard
              </p>
            </div>
          </div>
        </div>

        <ProgressBar
          ref={progressBar}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

const MobileView: FC<PageViewProps> = ({
  currentPage,
  totalPage,
  changePage,
}) => {
  const boxesRef = useRef<HTMLDivElement>();
  const prev = () => {
    if (currentPage === 1) return;
    if (!boxesRef.current) return;

    boxesRef.current.style.transform = `translate(calc(${
      totalPage - (currentPage - 1) - 1
    }*100%), 0)`;
    changePage(currentPage - 1);
  };

  const next = () => {
    if (currentPage === totalPage) return;
    if (!boxesRef.current) return;

    boxesRef.current.style.transform = `translate(calc(${
      totalPage - (currentPage + 1) - 1
    }*100%), 0)`;
    changePage(currentPage + 1);
  };

  return (
    <div className="stacked_stack_mobile">
      <div className="container">
        <div ref={boxesRef} className="boxes">
          <div className="box_wrapper">
            <div className="box">
              <div className="box_head"></div>
              <div className="box_body">
                <h3>
                  A keyboard <br /> first experience.
                </h3>
                <p>
                  Powerful shortcuts and a keyboard-first workflow means you
                  will get to your finish line in no time!
                </p>
              </div>
            </div>
          </div>
          <div className="box_wrapper">
            <div className="box">
              <div className="box_head"></div>
              <div className="box_body">
                <h3>
                  Bullets to visuals <br /> in a click.
                </h3>
                <p>
                  Transform any block to any other and try different options
                  without any design hassle
                </p>
              </div>
            </div>
          </div>
          <div className="box_wrapper">
            <div className="box">
              <div className="box_head"></div>
              <div className="box_body">
                <h3>
                  A powerful assistant <br /> just a click away
                </h3>
                <p>
                  Insert blocks, perform powerful actions and leverage the
                  limitless power of AI - all without leaving your keyboard
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-navigation">
          <button
            className="swiper-button-prev"
            disabled={currentPage === 1}
            onClick={prev}
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="nonej"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7839 13.0898C11.7263 10.8726 13.0745 9.27999 14.4164 8.15476L0.000399147 8.15476L0.000399349 5.84475L14.4164 5.84475C13.0745 4.71952 11.7263 3.12687 10.7839 0.909713L12.8896 -0.000244683C14.5478 3.90108 17.7442 5.39197 19.0913 5.84475L19.0913 8.15476C17.7442 8.60754 14.5478 10.0984 12.8896 13.9998L10.7839 13.0898Z"></path>
            </svg>
          </button>
          <button
            className="swiper-button-next"
            disabled={currentPage === totalPage}
            onClick={next}
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7839 13.0898C11.7263 10.8726 13.0745 9.27999 14.4164 8.15476L0.000399147 8.15476L0.000399349 5.84475L14.4164 5.84475C13.0745 4.71952 11.7263 3.12687 10.7839 0.909713L12.8896 -0.000244683C14.5478 3.90108 17.7442 5.39197 19.0913 5.84475L19.0913 8.15476C17.7442 8.60754 14.5478 10.0984 12.8896 13.9998L10.7839 13.0898Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
