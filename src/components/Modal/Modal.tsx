import "./Modal.css";

type ModalProps = {
  toggleModal: () => void;
  emailValue: string;
};

const Modal = ({ toggleModal, emailValue }: ModalProps) => {
  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <img src="/images/message.svg" alt="email sent" className="message" />
        <h2>Please verify your email</h2>
        <p>You're almost there! We sent an email to</p>
        <h3>{emailValue}</h3>

        <p>
          Just click on the link in that email to confirm your order. If you
          don't see it, you may need to
          <span> check your spam</span> folder
        </p>

        <p className="recovery">Still can't find the email? No problem.</p>
        <button className="recoveryBtn">Resend Verification Email</button>
        <button className="close-modal" onClick={toggleModal}>
          <img src="/images/closebtn.png" alt="close button" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
