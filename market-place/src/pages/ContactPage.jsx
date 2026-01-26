import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent! We will get back to you soon.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      title: 'Email Us',
      detail: 'support@marketplace.com',
      icon: <Mail className="text-blue-600" />,
      desc: 'Typical response within 24 hours'
    },
    {
      title: 'Call Us',
      detail: '+1 (555) 123-4567',
      icon: <Phone className="text-purple-600" />,
      desc: 'Available Mon-Fri, 9am - 6pm'
    },
    {
      title: 'Our Office',
      detail: '123 Market St, San Francisco, CA',
      icon: <MapPin className="text-red-600" />,
      desc: 'Visit us for local partnership'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or feedback? We'd love to hear from you.
            Our team is always here to help you with anything you need.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            {contactMethods.map((method, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{method.title}</h4>
                  <p className="text-blue-600 font-bold mb-1">{method.detail}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{method.desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <Clock className="text-blue-400 mb-4" size={32} />
                <h4 className="font-bold text-xl mb-2">Live Support</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Chat with our experts instantly during business hours.
                  Best for order tracking and urgent issues.
                </p>
                <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Start Live Chat
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 text-white/5 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Globe size={200} />
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required={true}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required={true}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 font-bold"
                  >
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Selling on MarketPlace</option>
                    <option>Technical Issue</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required={true}
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;