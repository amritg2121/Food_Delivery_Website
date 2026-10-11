import React from 'react'
import ReactDom from 'react-dom'

// Styles live in responsive.css (.app-modal*) so they can adapt to phones.
export default function Modal({ children, onClose }) {

    return ReactDom.createPortal(
        <>
            <div className="app-modal-overlay" />
            <div className="app-modal">
                <div className="app-modal-header">
                    <button className='btn bg-danger fs-4' onClick={onClose}> X </button>
                </div>
                <div className="app-modal-body">
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('cart-root')
    )
}
