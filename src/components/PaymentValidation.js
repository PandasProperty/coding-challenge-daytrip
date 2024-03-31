import React from "react";
import "./PaymentValidation.css";
import usePaymentValidation from "./usePaymentValidation";

const PaymentValidation = () => {
  const {
    cardDetails,
    onChange,
    validateFields,
  } = usePaymentValidation();

  const invalidFieldsObj = validateFields();

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">XXXXXXXXXXXXXXXX</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">HOLDER NAME</span>
              <span className="debit-card-date">MM/YYYY</span>
              <span className="debit-card-cvv">CVV</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="layout-column mb-15">
                <input
                  type="text"
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  value={cardDetails.cardNumber}
                  name="cardNumber"
                  required
                  onChange={onChange}
                />
                {invalidFieldsObj['cardNumber'] && (
                  <p className="invalid-text" data-testid="numberInputError">
                    Invalid Card Number
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  type="text"
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  value={cardDetails.name}
                  name="name"
                  onChange={onChange}
                />
                {invalidFieldsObj['name'] && (
                  <p className="invalid-text" data-testid="nameInputError">
                    Invalid Card Name
                  </p>
                )}
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    input={cardDetails.month}
                    name="month"
                    onChange={onChange}
                  />
                  {invalidFieldsObj['month'] && (
                    <p className="invalid-text" data-testid="monthInputError">
                      Invalid Month
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    input={cardDetails.year}
                    name="year"
                    onChange={onChange}
                  />
                  {invalidFieldsObj['year'] && (
                    <p className="invalid-text" data-testid="yearInputError">
                      Invalid Year
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="CVV"
                    data-testid="cvvInput"
                    input={cardDetails.cvv}
                    name="cvv"
                    onChange={onChange}
                  />
                  {invalidFieldsObj['cvv'] && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      Invalid CVV
                    </p>
                  )}
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={!!Object.keys(invalidFieldsObj).length}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
