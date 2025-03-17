export const validateShippingDetails = (details) => {
  const errors = {};

  if (!details.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!details.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(details.email)) {
    errors.email = 'Invalid email address';
  }

  if (!details.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^(0|\+234)[0-9]{10}$/.test(details.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Invalid Nigerian phone number (e.g., 08012345678 or +2348012345678)';
  }

  if (!details.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!details.city.trim()) {
    errors.city = 'City is required';
  }

  if (!details.state.trim()) {
    errors.state = 'State is required';
  }

  // Only validate ZIP code if it's not empty
  if (details.zipCode.trim() !== '' && !/^\d{1,6}$/.test(details.zipCode.trim())) {
    errors.zipCode = 'Postal code should be up to 6 digits (optional)';
  }

  return errors;
}; 