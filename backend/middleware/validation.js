// Email validation pattern
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// URL validation pattern
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Validate email format
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Validate URL format
const validateUrl = (url) => {
  return urlRegex.test(url);
};

// Validate job creation/update
const validateJobData = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Job title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Job title must be at least 3 characters';
  }

  if (!data.company || data.company.trim().length === 0) {
    errors.company = 'Company name is required';
  } else if (data.company.length < 2) {
    errors.company = 'Company name must be at least 2 characters';
  }

  if (!data.location || data.location.trim().length === 0) {
    errors.location = 'Location is required';
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Job description is required';
  } else if (data.description.length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate application submission
const validateApplicationData = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.resumeLink || data.resumeLink.trim().length === 0) {
    errors.resumeLink = 'Resume link is required';
  } else if (!validateUrl(data.resumeLink)) {
    errors.resumeLink = 'Please provide a valid URL for resume';
  }

  if (!data.coverNote || data.coverNote.trim().length === 0) {
    errors.coverNote = 'Cover note is required';
  } else if (data.coverNote.length < 10) {
    errors.coverNote = 'Cover note must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validateUrl,
  validateJobData,
  validateApplicationData,
};
