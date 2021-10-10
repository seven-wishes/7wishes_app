import React from 'react';

const Alert = (props) => {
    const onClickHandler = (e) => {
        props.alert_remove()
    }
    return (
        <div className="alert">
            <div className="alert__wrap">
                {props.alert ? <div className="alert__content" onClick={onClickHandler}>{props.alert}</div> : ''}
            </div>
        </div>
    );
};

export default Alert;