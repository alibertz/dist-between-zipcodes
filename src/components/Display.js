import React from 'react';

const Display = (props) => {
    return (
        <div id="displayContainer">
            <h4 id="distance">{props.distance + ' '}{props.distance ? props.unit : ''}</h4>
            <h5 id="errorMsg">{props.error}</h5>
        </div>
    );
};

export default Display;