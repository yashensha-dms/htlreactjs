import React, { useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    try {
      console.log('Form Submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', email: '', service: '', phone: '', message: '' });
      }, 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-elevation-4 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-red transition-colors text-2xl"
        >
          &times;
        </button>

        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-2">Build a solution for your business</h2>
          <p className="text-gray-500 mb-8">Get expert advice tailored to your needs.</p>

          {status === 'success' ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Message Sent!</h3>
              <p className="text-gray-500">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <select
                    name="service"
                    aria-label="Select Service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all appearance-none text-gray-600"
                  >
                    <option value="">Select Service</option>
                    <option value="HVAC">HVAC</option>
                    <option value="MEP">MEP</option>
                    <option value="Base Build">Base Build</option>
                    <option value="Cleanrooms">Cleanrooms</option>
                    <option value="Interior Fit-out">C&I & Interior Fit-out</option>
                    <option value="Virtual PM">Virtual Project Management</option>
                    <option value="O&M">Operations & Maintenance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact Number"
                    aria-label="Contact Number"
                    required
                    pattern="[0-9]{7,15}"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <textarea
                  name="message"
                  placeholder="Tell us about your project"
                  aria-label="Tell us about your project"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-xs text-gray-400">*All fields are mandatory</p>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary min-w-[200px]"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
