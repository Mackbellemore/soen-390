const usePasswordValidation = () => {
  const isGoodPassword = (pass) => {
    // min 8 characters one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    return regex.test(pass);
  };

  return { isGoodPassword };
};

export default usePasswordValidation;
