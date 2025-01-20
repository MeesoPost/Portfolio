import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { Article, Heading1, Paragraph } from '@utrecht/component-library-react';
import { IconExclamationCircle, IconCheck } from '@tabler/icons-react';
import { validateField } from './validation';
import { Button } from '../Button/Button';

// Initialize EmailJS
emailjs.init('Bp6pwc2EkjNGUBYox');

// Define types for form fields
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

    // Set all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    // Validate all fields
    const nameError = validateAndUpdateField('name', formData.name);
    const emailError = validateAndUpdateField('email', formData.email);
    const messageError = validateAndUpdateField('message', formData.message);

    if (nameError || emailError || messageError) {
      setStatus({
        type: 'error',
        message: 'Controleer de invoervelden en probeer het opnieuw.',
      });
      return;
    }

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
    <Article className="contact_article">
      <Heading1 className="heading-title-small">Contact Me</Heading1>

      <Paragraph className="mb-8">
        Feel free to reach out! Whether you want to discuss a project, ask about my experience, or
        just say hello, I'd love to hear from you.
      </Paragraph>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block mb-2 text-white font-medium" htmlFor="name">
            Naam
            <span className="text-red-500 ml-1">*</span>
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
            <div
              id="name-error"
              className="flex items-center mt-2 text-red-500 text-sm"
              role="alert"
            >
              <IconExclamationCircle />
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="block mb-2 text-white font-medium" htmlFor="email">
            E-mail
            <span className="text-red-500 ml-1">*</span>
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
            <div
              id="email-error"
              className="flex items-center mt-2 text-red-500 text-sm"
              role="alert"
            >
              <IconExclamationCircle className="w-4 h-4 mr-2" />
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="block mb-2 text-white font-medium" htmlFor="message">
            Bericht
            <span className="text-red-500 ml-1">*</span>
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
            <div
              id="message-error"
              className="flex items-center mt-2 text-red-500 text-sm"
              role="alert"
            >
              <IconExclamationCircle className="w-4 h-4 mr-2" />
              {errors.message}
            </div>
          )}
        </div>

        {status.message && (
          <div
            className={`flex items-center p-4 rounded-lg ${
              status.type === 'sent'
                ? 'bg-green-100 text-green-800 border border-green-500'
                : 'bg-red-100 text-red-800 border border-red-500'
            }`}
            role="alert"
          >
            {status.type === 'sent' ? (
              <IconCheck className="w-5 h-5 mr-2" />
            ) : (
              <IconExclamationCircle className="w-5 h-5 mr-2" />
            )}
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
