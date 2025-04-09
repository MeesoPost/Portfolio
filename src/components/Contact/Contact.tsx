import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { Article, Heading1, Paragraph } from '@utrecht/component-library-react';
import { validateField } from './validation';
import { Button } from '../Button/Button';
import InformatieIcon from '../../assets/Informatie.svg?react';
import VergunningAlgemeen from '../../assets/VergunningAlgemeen.svg?react';

// Initialize EmailJS
emailjs.init('Bp6pwc2EkjNGUBYox');

type FormField = 'name' | 'email' | 'message';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormTouched {
  name: boolean;
  email: boolean;
  message: boolean;
}

interface FormErrors {
  name: string | null;
  email: string | null;
  message: string | null;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    email: null,
    message: null,
  });

  // NEW: State to track if submission attempt resulted in errors
  const [submittedWithError, setSubmittedWithError] = useState<boolean>(false);

  const [status, setStatus] = useState<{
    type: 'idle' | 'sending' | 'sent' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const validateAndUpdateField = (name: FormField, value: string) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    return error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched on submit attempt
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    // Validate all fields
    const nameError = validateAndUpdateField('name', formData.name);
    const emailError = validateAndUpdateField('email', formData.email);
    const messageError = validateAndUpdateField('message', formData.message);

    const hasErrors = !!(nameError || emailError || messageError);

    setSubmittedWithError(hasErrors); // Set state for error summary box

    if (hasErrors) {
      // No generic status message needed if we show the summary box
      setStatus({ type: 'idle' });
      return;
    }

    // Clear summary box state if submission proceeds
    setSubmittedWithError(false);
    setStatus({ type: 'sending' });

    try {
      await emailjs.send('service_2oankle', 'template_hkqpaip', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'mail@meespost.nl',
      });

      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setErrors({ name: null, email: null, message: null });
      setStatus({
        type: 'sent',
        message: 'Bedankt! Ik neem zo snel mogelijk contact met je op.',
      });

      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      // Keep generic error for actual send failures
      setStatus({
        type: 'error',
        message: 'Er is iets misgegaan bij het versturen van je bericht. Probeer het opnieuw.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as FormField]: value,
    }));

    // Validate field if it's been touched
    if (touched[name as FormField]) {
      validateAndUpdateField(name as FormField, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name as FormField]: true,
    }));
    validateAndUpdateField(name as FormField, value);
  };

  const getInputClasses = (fieldName: FormField) => {
    const baseClasses = 'w-full px-4 py-3 bg-transparent rounded-lg transition-all duration-200';
    return `${baseClasses} retro-input${touched[fieldName] && errors[fieldName] ? ' error' : ''}`;
  };

  return (
    <Article className="contact-article">
      <Heading1 className="heading-title-small">Contact Me</Heading1>

      <Paragraph className="mb-8">
        Feel free to reach out! Whether you want to discuss a project, ask about my experience, or
        just say hello, I'd love to hear from you.
      </Paragraph>

      {/* Error Summary Box */}
      {submittedWithError && Object.values(errors).some((e) => e !== null) && (
        <div className="error-summary-box mb-6" role="alert">
          <div className="error-summary-header">
            <InformatieIcon className="error-summary-icon" />
            <h2 className="error-summary-title">Verbeter de fouten voor u verder gaat</h2>
          </div>
          <ul className="error-summary-list">
            {Object.entries(errors).map(([field, error]) =>
              error ? (
                <li key={field}>
                  <a href={`#${field}`} className="error-summary-link">
                    {error} (Veld: {field.charAt(0).toUpperCase() + field.slice(1)})
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block mb-2 text-white font-medium" htmlFor="name">
            Naam
            <span className="required-indicator-wcag ml-1">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('name')}
            disabled={status.type === 'sending'}
            aria-invalid={touched.name && errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <div id="name-error" className="field-error-message" role="alert">
              <InformatieIcon />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="block mb-2 text-white font-medium" htmlFor="email">
            E-mail
            <span className="required-indicator-wcag ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('email')}
            disabled={status.type === 'sending'}
            aria-invalid={touched.email && errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {touched.email && errors.email && (
            <div id="email-error" className="field-error-message" role="alert">
              <InformatieIcon />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="block mb-2 text-white font-medium" htmlFor="message">
            Bericht
            <span className="required-indicator-wcag ml-1">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className={getInputClasses('message')}
            disabled={status.type === 'sending'}
            aria-invalid={touched.message && errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {touched.message && errors.message && (
            <div id="message-error" className="field-error-message" role="alert">
              <InformatieIcon />
              <span>{errors.message}</span>
            </div>
          )}
        </div>

        {status.message && (
          <div
            className={`flex items-center p-4 rounded-lg gap-2 ${
              status.type === 'sent'
                ? 'bg-green-100 text-green-800 border border-green-500'
                : 'bg-red-100 text-red-800 border border-red-500'
            }`}
            role="alert"
          >
            {status.type === 'sent' ? <VergunningAlgemeen /> : <InformatieIcon />}
            {status.message}
          </div>
        )}

        <Button type="submit" disabled={status.type === 'sending'}>
          {status.type === 'sending' ? (
            <span className="flex items-center">Verzenden...</span>
          ) : (
            'Verstuur bericht'
          )}
        </Button>
      </form>
    </Article>
  );
};

export default Contact;
