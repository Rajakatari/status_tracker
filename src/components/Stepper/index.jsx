/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import "./index.css";
import { TiTickOutline } from "react-icons/ti";
// import { PropTypes } from "prop-types";

const Stepper = ({ stepsConfig = [] }) => {
  // const text = step >= data.id ? <TiTickOutline /> : data.id;
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  const calculateProgressBarWidth = () => {
    const width = ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
    return width;
  };
  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  const onClickHandler = () => {
    setCurrentStep((prevStep) => {
      if (prevStep < stepsConfig.length) {
        return prevStep + 1;
      } else if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      }
    });
  };

  return (
    <>
      <div className="step-list">
        {stepsConfig.map((step, index) => {
          const stepClassName = currentStep === index + 1 ? "current-step" : "";
          const completedStyle =
            currentStep > index + 1 || isComplete ? "completed-step" : "";
          return (
            <div
              key={index + 1}
              className="step-card"
              ref={(e) => (stepRef.current[index] = e)}
            >
              <div className={`${stepClassName} ${completedStyle} step`}>
                {currentStep > index + 1 || isComplete ? (
                  <TiTickOutline />
                ) : (
                  index + 1
                )}
              </div>
              <p>{step.name}</p>
            </div>
          );
        })}
      </div>
      <div
        className="progress-bar"
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
      >
        <div
          className="progress"
          style={{ width: `${calculateProgressBarWidth()}%` }}
        ></div>
      </div>
      <ActiveComponent />
      {!isComplete && (
        <button type="button" onClick={() => onClickHandler()}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

// Stepper.PropTypes = {
//   stepsConfig: PropTypes.array,
// };

export default Stepper;
