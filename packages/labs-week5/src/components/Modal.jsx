import React, { useRef } from 'react';

function Modal(props) {
    const modalContentRef = useRef(null);
    
    if(!props.open){
        return null;
    }
    
    const handleOverlayClick = (e) => {
       if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            props.onCloseRequested();
        }
    };

    return (
        <div 
            className="fixed inset-0 w-full h-full bg-gray-500/75 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div 
                ref={modalContentRef} 
                className="bg-white rounded-lg p-6 shadow-xl"
            >
                <header className="flex justify-between items-center">
                    <span>{props.headerLabel}</span>
                    <button onClick={props.onCloseRequested} aria-label="Close">X</button>
                </header>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;