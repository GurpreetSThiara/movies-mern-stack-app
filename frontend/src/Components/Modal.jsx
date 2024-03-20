const Modal = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-500">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute   bg-white p-8 rounded-lg z-10 text-right">
            <button
                className="text-black font-semibold hover:text-gray-700 focus:outline-none border  p-2"
                onClick={onClose}
              >
              {'close '}  
              </button>
            {children}
             
            
            </div>
          </div>
        )}
      </>
    );
  };
  export default Modal;