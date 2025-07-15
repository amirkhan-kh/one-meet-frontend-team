import React, { useState } from 'react';

const ContactSupport = () => {
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/movlqeqa', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.ok || response.status === 200) {
        setStatus('success');
        setForm({ email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

 const subjectOptions = [
  'Issue with Interview Process',
  'Problem Accessing My Account',
  'Recruiter or Company Setup Help',
  'Question About Credits or Billing',
  'Bug Report or Technical Error',
  'General Feedback or Feature Request',
  'Other Issue',
];


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background text-foreground">
      <div className="bg-card text-card-foreground shadow-xl rounded-xl p-8 w-full max-w-xl border border-border">
        <h1 className="text-2xl font-bold mb-4">Contact Support</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Facing an issue or have a question? Fill out the form and our team will respond shortly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email Address"
            required
            className="px-4 py-3 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-input bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select a subject</option>
            {subjectOptions.map(option => (
              <option key={option} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your issue..."
            rows="5"
            required
            className="px-4 py-3 rounded-lg border border-input bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-primary text-primary-foreground font-semibold py-3 rounded-lg transition hover:opacity-90"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-sm mt-2">✅ Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-sm mt-2">❌ Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactSupport;
