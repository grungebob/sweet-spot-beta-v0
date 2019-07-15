import React from 'react';
const Stepper = props => {
    const steps = React.Children.map(props.children, (step, index) => (props.step === index + 1) && React.cloneElement(step));
    return <>{steps}</>;
};
export default Stepper;