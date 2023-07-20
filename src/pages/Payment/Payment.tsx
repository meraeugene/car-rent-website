import { useLocation } from "react-router-dom";
import "./Payment.css";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useState, useContext } from "react";

// formik and yup
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../../components/Modal/Modal";
import { DarkModeContext } from "../../context/DarkModeContext";

const Payment = () => {
  const location = useLocation();
  const cardData = location.state && location.state.cardData;
  const { name, images, price } = cardData;
  const { view1 } = images;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  // modal
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email address"),
    address: Yup.string().required("Address is required"),
    pickup_location: Yup.string().required("Pick-Up Location is required"),
    drop_location: Yup.string().required("Drop-Off Location is required"),
    pickup_date: Yup.date().required("Pick-Up Date is required"),
    drop_date: Yup.date().required("Drop-Off Date is required"),
    pickup_time: Yup.string().required("Pick-Up Time is required"),
    drop_time: Yup.string().required("Drop-Off Time is required"),
    cardNumber: Yup.number().required("Card Number is required"),
    expirationDate: Yup.date().required("Expiration Date is required"),
    cardHolder: Yup.string().required("Card Holder is required"),
    cvc: Yup.number().required("CVC is required"),
    paymentMethod: Yup.string().required("Please select a payment method"),
    agreeTerms: Yup.boolean()
      .oneOf(
        [true],
        "Please agree to the terms and conditions and privacy policy"
      )
      .required("Please agree to the terms and conditions and privacy policy"),
  });

  // dark mode
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    // Handle the case where the context is undefined
    return null;
  }

  const { isActive } = darkModeContext;

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        address: "",
        email: "",
        pickup_location: "",
        drop_location: "",
        pickup_date: "",
        drop_date: "",
        pickup_time: "",
        drop_time: "",
        cardNumber: "",
        expirationDate: "",
        cardHolder: "",
        cvc: "",
        paymentMethod: "",
        agreeTerms: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormSubmitted(true);
        setEmailValue(values.email); // Save the email value in the state variable
        toggleModal();
      }}
    >
      <Form>
        <div className={`payment-flex ${isActive ? "darkmode" : ""}`}>
          <div className="payment__grid-container">
            <div className="billing-info__container">
              <div className="billing-info__header">
                <h1>Billing Info</h1>
                <div className="flex-between">
                  <p>Please enter your billing info</p>
                  <span>Step 1 of 4</span>
                </div>
              </div>
              <div className="billing-info__body">
                <div className="input-box">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    autoComplete="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="phone">Phone Number</label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    autoComplete="tel-national"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="address">Address</label>
                  <Field type="text" name="address" placeholder="Address" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            </div>

            <div className="rental-info__container">
              <div className="rental-info__header">
                <h1>Rental Info</h1>
                <div className="flex-between">
                  <p>Please select your rental date</p>
                  <span>Step 2 of 4</span>
                </div>
              </div>
              <div className="rental-info__body">
                <div className="rental-form__header flex-normal">
                  <div className="rental-form__header-mark">
                    <img src="/images/Ellipse 11.svg" alt="mark" />
                  </div>
                  <h3>Pick-Up</h3>
                </div>
                <div className="user-details">
                  <div className="input-box">
                    <label htmlFor="pickup_location">Locations</label>
                    <Field name="pickup_location" as="select">
                      <option hidden>Select your city</option>
                      <option value="manila">Manila</option>
                      <option value="cebu">Cebu</option>
                      <option value="cagayan">Cagayan de oro</option>
                      <option value="davao">Davao</option>
                      <option value="baguio">Baguio</option>
                    </Field>
                    <ErrorMessage
                      name="pickup_location"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="pickup_date">Date</label>
                    <Field type="date" name="pickup_date" />
                    <ErrorMessage
                      name="pickup_date"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="pickup_time">Time</label>
                    <Field type="time" name="pickup_time" />
                    <ErrorMessage
                      name="pickup_time"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="rental-form__header flex-normal">
                  <div className="rental-form__header-mark">
                    <img src="/images/Ellipse 11.svg" alt="mark" />
                  </div>
                  <h3>Drop-Off</h3>
                </div>

                <div className="user-details">
                  <div className="input-box">
                    <label htmlFor="drop_location">Locations</label>
                    <Field name="drop_location" as="select">
                      <option hidden>Select your city</option>
                      <option value="manila">Manila</option>
                      <option value="cebu">Cebu</option>
                      <option value="cagayan">Cagayan de oro</option>
                      <option value="davao">Davao</option>
                      <option value="baguio">Baguio</option>
                    </Field>
                    <ErrorMessage
                      name="drop_location"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="drop_date">Date</label>
                    <Field type="date" name="drop_date" />
                    <ErrorMessage
                      name="drop_date"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="drop_time">Time</label>
                    <Field type="time" name="drop_time" />
                    <ErrorMessage
                      name="drop_time"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-method__container">
              <div className="payment-method__header">
                <h2>Payment Method</h2>
                <div className="flex-between">
                  <p>Please enter your payment method</p>
                  <span>Step 3 of 4</span>
                </div>
              </div>
              <div className="payment-method__credit-card">
                <div className="flex-between">
                  <div className="flex-normal">
                    <div className="rental-form__header-mark">
                      <img src="/images/Ellipse 11.svg" alt="mark" />
                    </div>
                    <h3>Credit Card</h3>
                  </div>
                  <div className="flex-normal">
                    <img src="/images/visa.svg" alt="visa" />
                    <img src="/images/mc.svg" alt="mc" />
                  </div>
                </div>
                <div className="user-details">
                  <div className="input-box">
                    <label htmlFor="card-number">Card Number</label>
                    <Field
                      type="number"
                      name="cardNumber"
                      placeholder="Card Number"
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="expiration-date">Expiration Date</label>
                    <Field type="date" name="expirationDate" />
                    <ErrorMessage
                      name="expirationDate"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="card-holder">Card Holder</label>
                    <Field
                      type="text"
                      name="cardHolder"
                      placeholder="Card Holder"
                    />
                    <ErrorMessage
                      name="cardHolder"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="CVC">CVC</label>
                    <Field type="number" name="cvc" placeholder="CVC" />
                    <ErrorMessage
                      name="cvc"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
              </div>

              <div className="paypal__container">
                <div className="flex-between">
                  <div className="flex-normal">
                    <Field type="radio" value="paypal" name="paymentMethod" />
                    <label htmlFor="paypal">Paypal</label>
                  </div>
                  <img src="/images/PayPal.svg" alt="paypal" />
                </div>
              </div>

              <div className="bitcoin__container">
                <div className="flex-between">
                  <div className="flex-normal">
                    <Field type="radio" value="bitcoin" name="paymentMethod" />
                    <label htmlFor="bitcoin">Bitcoin</label>
                  </div>
                  <img src="/images/Bitcoin.svg" alt="bitcoin" />
                </div>
              </div>
              <ErrorMessage
                name="paymentMethod"
                component="div"
                className="error-message"
              />
            </div>

            <div className="confirmation__container">
              <div className="confirmation__header">
                <h2>Confirmation</h2>
                <div className="flex-between">
                  <p>
                    We are getting to the end. Just few clicks and your rental
                    is ready!
                  </p>
                  <span>Step 4 of 4</span>
                </div>
              </div>
              <div className="confirmation__content">
                <div className="agree-market">
                  <div className="flex-normal">
                    <Field
                      type="checkbox"
                      name="agreeMarket"
                      id="agreeMarket"
                    />
                    <label htmlFor="checkbox">
                      I agree with sending Marketing and newsletter emails.
                    </label>
                  </div>
                </div>
                <div className="agree-terms">
                  <div className="flex-normal">
                    <Field type="checkbox" name="agreeTerms" id="agreeTerms" />
                    <label htmlFor="agreeTerms">
                      I agree with our terms and conditions and privacy policy.
                    </label>
                  </div>
                </div>
                <ErrorMessage
                  component="div"
                  name="agreeTerms"
                  className="error-message"
                />
                <button
                  className="rentnowbutton"
                  type="submit"
                  style={{ cursor: "pointer" }}
                >
                  Rent Now
                </button>

                {formSubmitted && modal && (
                  <Modal toggleModal={toggleModal} emailValue={emailValue} />
                )}
              </div>

              <div className="confirmation__footer">
                <img src="/images/secure.png" alt="secure" />
                <h4>All your data are safe</h4>
                <p>
                  We are using the most advanced security to provide you the
                  best experience ever.
                </p>
              </div>
            </div>
          </div>
          <div className="rental-summary__container">
            <div className="rental-summary__content">
              <div className="rental-summary__header">
                <h2>Rental Summary</h2>
                <p>
                  Prices may change depending on the length of the rental and
                  the price of your rental car.
                </p>
              </div>
              <div className="rental-img__container">
                <div className="car-image">
                  <img src={view1} alt={name} />
                </div>
                <div className="car-desc">
                  <h1>{name}</h1>
                  <div className="flex-nogap">
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star-empty.png" alt="star" />
                    <span>440+ Reviewer</span>
                  </div>
                </div>
              </div>

              <div className="dash"></div>

              <div className="flex-between">
                <span>Subtotal</span>
                <p>{formatCurrency(price)}</p>
              </div>

              <div className="flex-between">
                <span>Tax</span>
                <p>{formatCurrency(0)}</p>
              </div>

              <div className="promo-code">
                <input type="text" placeholder="Promo Code" />
                <button>Apply Now</button>
              </div>

              <div className="total-rental-price flex-between">
                <div className="total-rental-price__desc">
                  <h2>Total Rental Price</h2>
                  <span>Overall price and includes rental discount</span>
                </div>
                <h1>{formatCurrency(price)}</h1>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Payment;
