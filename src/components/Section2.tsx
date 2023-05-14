import { useEffect, useRef, useState } from "react";
import "./Section2.css";

const Section2 = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const progressBar = useRef<HTMLProgressElement>()
  const stackedContainer = useRef<HTMLDivElement>()

  const TOTALPAGE = 3

  useEffect(() => {
    function switchBox() {
        if (document.body.offsetWidth < 1000) return;
        if (!stackedContainer.current || !progressBar.current) return

        const container = stackedContainer.current
        const y = window.scrollY - container.offsetTop;

        // not scrolled enough
        if (y < 0) return
        progressBar.current.value =  Math.min(y / (container.offsetHeight - 800) * 100, 100)
        const newCurrentPage = Math.min(Math.floor(progressBar.current.value/ (100/TOTALPAGE))+1, 3)
        setCurrentPage(newCurrentPage)

        const boxes: NodeListOf<HTMLDivElement> = stackedContainer.current.querySelectorAll('.box_wrapper')
        boxes.forEach((box, idx) => {
          if (currentPage-1 === idx) {
            box.style.opacity = '1';
            box.style.translate = '0';
            return;
          }
          
          box.style.opacity = '0';          
          box.style.translate = '0 100%';
        })
    }

    window.addEventListener('scroll', switchBox)
    return () => {
        window.removeEventListener('scroll', switchBox)
    }
}, [currentPage])

  return (
    <section>
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
                style={{marginTop: '3px'}}
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
        <div ref={stackedContainer} className="stacked_stack">
          <div className="container">
            <div className="box_wrapper">
              <div className="box">
                <div className="box_head">
                  
                </div>
                <div className="box_body">
                  <h3>A keyboard <br /> first experience.</h3>
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
                  <h3>A mouse <br /> first experience.</h3>
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
                  <h3>A screen <br /> first experience.</h3>
                  <p>
                    Powerful shortcuts and a keyboard-first workflow means you
                    will get to your finish line in no time!
                  </p>
                </div>
              </div>
            </div>
            <div className="progress-container">
              <span className="progress-label">0{currentPage}</span>
              <progress ref={progressBar} className="vertical-progress" max="100"></progress>
              <span className="progress-label">0{TOTALPAGE}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
