interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div
      className={`${isOpen ? "fixed" : "hidden"} z-10 inset-0 overflow-y-auto`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <button
          onClick={onClose}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></button>
        &#8203;
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className={`${
            isOpen ? "inline-block" : "hidden"
          } align-bottom bg-white py-6 px-10 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-3xl w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
