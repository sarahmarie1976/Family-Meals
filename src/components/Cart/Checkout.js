import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    state: true,
    zip: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const stateInputRef = useRef();
  const cityInputRef = useRef();
  const zipInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredState = stateInputRef.current.value;
    const enteredZip = zipInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStateIsValid = !isEmpty(enteredState);
    const enteredZipIsValid = isFiveChars(enteredZip);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      state: enteredStateIsValid,
      zip: enteredZipIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredZipIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      state: enteredState,
      zip: enteredZip,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;
  const stateControlClasses = `${classes.control} ${
    formInputsValidity.state ? '' : classes.invalid
  }`;
  const zipControlClasses = `${classes.control} ${
    formInputsValidity.zip ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Provide Name</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor='street'>Street Address</label>
        <input type='text' id='street' ref={streetInputRef} />
      </div>
      {!formInputsValidity.street && <p>Please Provide Street</p>}

      <div className={cityControlClasses}>
        <label htmlFor='city'>Your City</label>
        <input type='text' id='city' ref={cityInputRef} />
      </div>
      {!formInputsValidity.city && <p>Please Provide City</p>}

      <div className={stateControlClasses}>
        <label htmlFor='state'>State</label>
        <input type='text' id='state' ref={stateInputRef} />
      </div>
      {!formInputsValidity.state && <p>Please Provide State</p>}

      <div className={zipControlClasses}>
        <label htmlFor='zip'>Zip Code</label>
        <input type='text' id='zip' ref={zipInputRef} />
      </div>
      {!formInputsValidity.zip && <p>Please Provide Zip (5 Characters Long)</p>}

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
