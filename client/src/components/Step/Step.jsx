import React from 'react';

const Step = ({ headerRender, children }) => {
    return (
        <div className="step">
            {headerRender}
            {children}
        </div>
    );
};

export default Step;