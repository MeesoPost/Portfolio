import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { Article, Heading1, Paragraph, Textarea, Textbox } from '@utrecht/component-library-react';

// Initialize EmailJS
emailjs.init('Bp6pwc2EkjNGUBYox');

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'sending' | 'sent' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'sending' });

    try {
      await emailjs.send('service_2oankle', 'template_hkqpaip', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'mail@meespost.nl',
      });

      setFormData({ name: '', email: '', message: '' });
      setStatus({
        type: 'sent',
        message: "Thank you! I'll get back to you soon.",
      });

      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus({
        type: 'error',
        message: 'Sorry, there was a problem sending your message. Please try again.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <label className="block mb-2 text-gray-700 font-medium" htmlFor="name">
            Name
          </label>
          <Textbox
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg retro-input"
            required
            disabled={status.type === 'sending'}
          />
        </div>

        <div className="form-group">
          <label className="block mb-2 text-gray-700 font-medium" htmlFor="email">
            Email
          </label>
          <Textbox
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg retro-input"
            required
            disabled={status.type === 'sending'}
          />
        </div>

        <div className="form-group">
          <label className="block mb-2 text-gray-700 font-medium" htmlFor="message">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg retro-textarea"
            rows={4}
            required
            disabled={status.type === 'sending'}
          />
        </div>

        {status.message && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              status.type === 'sent' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-2 text-black font-medium rounded-lg retro-button"
          disabled={status.type === 'sending'}
        >
          {status.type === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </Article>
  );
};

export default Contact;
