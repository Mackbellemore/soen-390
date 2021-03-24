import { useState } from 'react';

const useEmailValidation = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  const isAnEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // grabbed from https://emailregex.com/
    return regex.test(email);
  };

  const handleEmailInput = (e) => {
    setIsValidEmail(isAnEmail(e.target.value));
  };

  return { isValidEmail, handleEmailInput, isAnEmail };
};

export default useEmailValidation;
