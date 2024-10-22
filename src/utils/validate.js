export const checkValidData = (email, password) => {
    
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  
    if (!isEmailValid) {
      if (!email.includes('@')) {
        return 'Email must contain "@" symbol';
      } else if (!email.match(/\.[a-zA-Z]{2,}$/)) {
        return 'Email domain must have at least 2 characters after "."';
      } else {
        return 'Email format is invalid';
      }
    }
  
    if (password.length < 12) {
      return 'Password must be at least 12 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit';
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return 'Password must contain at least one special character';
    }
  
    return null;
  }