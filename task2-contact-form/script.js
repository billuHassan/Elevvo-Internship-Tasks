/**
 * Task 2: Contact Form Validation & Submission
 * Features:
 * - Real-time and on-submit JavaScript validation (Bonus)
 * - Strict RFC-compliant email regex verification
 * - Dynamic character counter for message textarea
 * - Asynchronous simulated API submission with button spinner
 * - Visual status feedback alert banner and auto-clear
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const btnIcon = submitBtn.querySelector('.btn-icon');
  const statusAlert = document.getElementById('statusAlert');
  const alertTitle = document.getElementById('alertTitle');
  const alertMessage = document.getElementById('alertMessage');
  const alertIcon = document.getElementById('alertIcon');

  const fields = {
    fullName: {
      input: document.getElementById('fullName'),
      group: document.getElementById('group-fullName'),
      error: document.getElementById('error-fullName'),
      validate: (val) => {
        if (!val.trim()) return 'Full name is required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters long.';
        if (!/^[a-zA-Z\s.'-]+$/.test(val.trim())) return 'Please enter a valid name using letters.';
        return null;
      },
    },
    email: {
      input: document.getElementById('email'),
      group: document.getElementById('group-email'),
      error: document.getElementById('error-email'),
      validate: (val) => {
        if (!val.trim()) return 'Email address is required.';
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email address (e.g. name@domain.com).';
        return null;
      },
    },
    subject: {
      input: document.getElementById('subject'),
      group: document.getElementById('group-subject'),
      error: document.getElementById('error-subject'),
      validate: (val) => {
        if (!val.trim()) return 'Subject is required.';
        if (val.trim().length < 4) return 'Subject must be at least 4 characters long.';
        return null;
      },
    },
    message: {
      input: document.getElementById('message'),
      group: document.getElementById('group-message'),
      error: document.getElementById('error-message'),
      validate: (val) => {
        if (!val.trim()) return 'Message cannot be empty.';
        if (val.trim().length < 15) return 'Please provide more details (at least 15 characters).';
        return null;
      },
    },
  };

  // Live Character Counter
  const messageInput = fields.message.input;
  const charCount = document.getElementById('charCount');
  messageInput.addEventListener('input', () => {
    const len = messageInput.value.length;
    charCount.textContent = `${len} / 500`;
    if (len >= 480) {
      charCount.style.color = '#ef4444';
      charCount.style.fontWeight = '700';
    } else {
      charCount.style.color = '';
      charCount.style.fontWeight = '';
    }
  });

  // Validate single field helper
  function validateField(fieldName, isTouched = true) {
    const item = fields[fieldName];
    const val = item.input.value;
    const errorMsg = item.validate(val);

    if (errorMsg) {
      if (isTouched) {
        item.group.classList.add('has-error');
        item.group.classList.remove('is-valid');
        item.error.textContent = errorMsg;
        item.input.setAttribute('aria-invalid', 'true');
      }
      return false;
    } else {
      if (isTouched) {
        item.group.classList.remove('has-error');
        item.group.classList.add('is-valid');
        item.error.textContent = '';
        item.input.removeAttribute('aria-invalid');
      }
      return true;
    }
  }

  // Attach live blur & input listeners
  Object.keys(fields).forEach((key) => {
    const item = fields[key];

    item.input.addEventListener('blur', () => {
      validateField(key, true);
    });

    item.input.addEventListener('input', () => {
      if (item.group.classList.contains('has-error')) {
        validateField(key, true);
      }
    });
  });

  // Display status banner
  function showStatusAlert(type, title, message) {
    statusAlert.className = `status-alert ${type}`;
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertIcon.textContent = type === 'success' ? '✓' : '⚠️';
    statusAlert.classList.remove('hidden');

    if (type === 'success') {
      setTimeout(() => {
        statusAlert.classList.add('hidden');
      }, 6000);
    }
  }

  // Form submission handling
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidField = null;

    Object.keys(fields).forEach((key) => {
      const valid = validateField(key, true);
      if (!valid) {
        isFormValid = false;
        if (!firstInvalidField) {
          firstInvalidField = fields[key].input;
        }
      }
    });

    if (!isFormValid) {
      showStatusAlert('error', 'Form Incomplete', 'Please correct the highlighted errors before submitting.');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Set Loading State
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnSpinner.classList.remove('hidden');
    btnIcon.style.display = 'none';

    // Simulate Network Request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Success
      showStatusAlert('success', 'Message Sent!', 'Thank you! Your message has been received. Our team will contact you shortly.');
      form.reset();
      charCount.textContent = '0 / 500';

      // Clear valid classes
      Object.keys(fields).forEach((key) => {
        fields[key].group.classList.remove('is-valid', 'has-error');
        fields[key].error.textContent = '';
      });
    } catch (err) {
      showStatusAlert('error', 'Submission Failed', 'Something went wrong while sending your message. Please try again.');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnSpinner.classList.add('hidden');
      btnIcon.style.display = '';
    }
  });
});

