import { useState } from "react";

const fields = ['cardNumber', 'name', 'month', 'year', 'cvv'];

const validations = {
  cardNumber: {
    length: 16,
    regex: "^[0-9]+$",
  },
  name: {
    regex: "^[a-zA-Z ]+$",
  },
  month: {
    length: 2,
    regex: "^[0-9]+$",
    funct: (value) => {
      const month = Number.parseInt(value);
      return 1 <= month && month <= 12;
    },
  },
  year: {
    length: 4,
    regex: "^[0-9]+$",
    funct: (value) => {
      const year = Number.parseInt(value);
      return year >= new Date().getFullYear() && year <= new Date().getFullYear() + 3;
    },
  },
  cvv: {
    length: 3,
    regex: "^[0-9]+$",
  }
}

export default function usePaymentValidation() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    name: '',
    month: '',
    year: '',
    cvv: '',
  });

  const onChange = (event) => {
    setCardDetails({
      ...cardDetails,
      [event.target.name]: event.target.value,
    });
  };

  const validateFields = () => {
    const invalidFieldsObj = fields.reduce((obj, field) => {
      const value = cardDetails[field];
      const conditions = validations[field];
      if (conditions.length && conditions.length !== value.length) {
        obj[field] = true
        return obj;
      }
      if (conditions.regex && !(new RegExp(conditions.regex).test(value))) {
        obj[field] = true
        return obj;
      }
      if (conditions.funct && !conditions.funct(value)) {
        obj[field] = true
        return obj;
      }
      return obj;
    }, {});
    return invalidFieldsObj;
  }

  return {
    cardDetails,
    validateFields,
    onChange,
  };
}