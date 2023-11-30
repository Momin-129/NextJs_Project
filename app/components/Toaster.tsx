// Toast.tsx
import React, { useEffect } from 'react';

interface ToastProps {
    isVisible: boolean;
    type: string;
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isVisible, type, message, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 6000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isVisible, onClose]);
    return (
        <>
            {isVisible && (
                <div className={"toast toast-top toast-end"}>
                    <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span className={`${type == 'success' ? 'text-black' : 'text-white'} font-bold`}>
                            {message.split('\n').map((msg, index) =>
                                <p key={index}>{msg}<br /></p>
                            )}
                        </span>
                        <button className="close-button text-white" onClick={onClose}>
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Toast;
