import "./style.css";
import { ReactNode, useEffect, useRef } from "react";

const Span = (props: { children: ReactNode }) => <span {...props} />;

const Section1 = () => {
  const textReavelContainer = useRef<HTMLDivElement>();

  const text =
    "In Chronicle everything is made with Blocks that come with pixel perfect design, interactivity and motion out of the box. Instead of designing from scratch, simply choose the right one from our library of blocks and see the magic unfold.";
  const wordCount = text.split(" ").length;

  useEffect(() => {
    function revealText() {
      if (!textReavelContainer.current) return;

      const container = textReavelContainer.current;
      const y = window.scrollY - container.offsetTop;

      // not scrolled enough
      if (y < 0) return;

      const scrolledPercentage = y / (container.offsetHeight - 200);
      const nWordsToReveal = Math.floor(scrolledPercentage * wordCount * 2);

      const words: NodeListOf<HTMLSpanElement> =
        textReavelContainer.current.querySelectorAll(`p span`);
      words.forEach((word, idx) => {
        if (idx < nWordsToReveal) word.style.opacity = "1";
        else word.style.opacity = "0.4";
      });
    }

    window.addEventListener("scroll", revealText);
    return () => {
      window.removeEventListener("scroll", revealText);
    };
  }, []);

  return (
    <section id="section1">
      <div ref={textReavelContainer} className="textreveal_wrapper">
        <div className="textreveal_container">
          <p>
            {text.split(" ").map((word, idx) => (
              <Span key={idx} children={word + " "} />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section1;
