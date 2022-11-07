import React, { useState } from 'react';
import Modal from './components/Modal';

const customStyles = {};


const App = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const modalHeader = null;

    return (
        <div className="container">
            <button
                onClick={() => setModalIsOpen(true)}
            >
                open modal
            </button>
            <Modal
                isOpen={modalIsOpen}
                onClose={closeModal}
                customStyles={customStyles}
                header={modalHeader}
            />
        </div>
    );
}

export default App;
