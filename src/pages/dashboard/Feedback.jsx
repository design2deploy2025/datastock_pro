import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    category: '',
    subject: '',
    desc: ''
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category?.trim()) newErrors.category = 'Please select a category';
    if (!formData.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData.desc?.trim()) newErrors.desc = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return formData.category && formData.subject && formData.desc;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission (no backend)
    console.log('🎯 Feedback Submitted:', {
      category: formData.category,
      subject: formData.subject,
      desc: formData.desc,
      timestamp: new Date().toISOString(),
      user: user?.email || 'anonymous'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ category: '', subject: '', desc: '' });
    }, 5000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1">
          {/* Feedback Form UI */}
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-4">
                Submit Feedback
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                Help us improve DataStock Pro. Your input shapes our roadmap.
              </p>
            </div>

            {/* Form + Sidebar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Main Form */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Feedback Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full bg-slate-900/80 backdrop-blur-xl border rounded-xl px-4 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition-all shadow-md ${
                        errors.category 
                          ? 'border-red-400/50 ring-red-400/30 shadow-red-500/20' 
                          : 'border-white/20 hover:border-white/30 focus:border-purple-400/50 shadow-purple-500/10'
                      }`}
                    >
                      <option value="">Select category...</option>
                      <option value="Bug">🐛 Bug Report</option>
                      <option value="Feature Request">🚀 Feature Request</option>
                      <option value="UI/UX">🎨 UI/UX Improvement</option>
                      <option value="Performance">⚡ Performance</option>
                      <option value="Other">💡 Other</option>
                    </select>
                    {errors.category && <p className="text-red-400 text-sm mt-2 font-medium ml-2">{errors.category}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 4.03 9 8z" />
                      </svg>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      maxLength={100}
                      className={`w-full bg-slate-900/80 backdrop-blur-xl border rounded-xl px-4 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all shadow-md pr-10 ${
                        errors.subject 
                          ? 'border-red-400/50 ring-red-400/30 shadow-red-500/20' 
                          : 'border-white/20 hover:border-white/30 focus:border-emerald-400/50 shadow-emerald-500/10'
                      }`}
                      placeholder="Brief summary of your feedback..."
                    />
                    <p className="text-slate-500 text-xs mt-1 ml-1">{formData.subject.length}/100</p>
                    {errors.subject && <p className="text-red-400 text-sm mt-2 font-medium ml-2">{errors.subject}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 10v2a2 2 0 01-2 2H9a2 2 0 01-2-2V11a2 2 0 012-2h2" />
                      </svg>
                      Description
                    </label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full bg-slate-900/80 backdrop-blur-xl border rounded-xl px-4 py-3 text-sm text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all resize-vertical shadow-lg font-normal ${
                        errors.desc 
                          ? 'border-red-400/50 ring-red-400/30 shadow-red-500/20' 
                          : 'border-white/20 hover:border-white/30 focus:border-blue-400/50 shadow-blue-500/10'
                      }`}
                      placeholder="Provide detailed description of your feedback..."
                    />
                    {errors.desc && <p className="text-red-400 text-sm mt-2 font-medium ml-2">{errors.desc}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600/90 via-emerald-500/90 to-teal-500/90 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-400 disabled:from-emerald-700/60 disabled:to-teal-600/60 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/40 hover:border-emerald-400/60 flex items-center justify-center gap-2 group lg:self-start hover:-translate-y-0.5"
                  >
                    <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Feedback
                  </button>
                </form>

                {submitted && (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-xl animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-emerald-500/20 rounded-xl border border-emerald-400/40">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-300 mb-1">Thank you!</h3>
                        <p className="text-base text-emerald-200 leading-tight">Received! We'll review within 48 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="lg:sticky lg:top-24 lg:h-fit space-y-6">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4 text-center">
                    📞 Support
                  </h3>
                  
                  {/* Response Time */}
                  <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-slate-800/40 rounded-xl border border-white/10">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1">Response Time</p>
                      <p className="text-2xl font-black text-emerald-400">24-48h</p>
                      <p className="text-emerald-300/90 text-xs mt-1 font-medium">Priority: Bugs first</p>
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="space-y-4">
                    <a 
                      href="https://instagram.com/datastockpro" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full block group p-4 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/40 hover:border-pink-400/60 rounded-xl transition-all backdrop-blur-sm shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 mb-1.5">
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.921.146-6.462 2.556-6.61 6.611-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.148 4.955 2.683 6.611 6.61 6.61 1.28.059 1.688.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.924-.146 6.464-2.541 6.61-6.61.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.146-4.92-2.556-6.61-6.611-6.61-1.28-.059-1.689-.073-4.948-.073z"/>
                          <path d="M12 5.839c-2.847 0-5.158 2.311-5.158 5.158s2.311 5.158 5.158 5.158 5.158-2.311 5.158-5.158-2.311-5.158-5.158-5.158z"/>
                          <path d="M15.663 11.998h-1.68v-1.679h2.928v1.679h-1.248v3.553h-1.001V11.998z"/>
                        </svg>
                        <span className="text-base font-semibold text-white group-hover:text-pink-100">@datastockpro</span>
                      </div>
                      <p className="text-slate-300 text-xs">DM us directly</p>
                    </a>

                    <a 
                      href="mailto:support@datastockpro.com" 
                      className="w-full block group p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/40 hover:border-blue-400/60 rounded-xl transition-all backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 mb-1.5">
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 6.15A2 2 0 0012 15.5a2 2 0 001.73-.82L21 8M3 8h18M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" />
                        </svg>
                        <span className="text-base font-semibold text-white group-hover:text-blue-100">support@datastockpro.com</span>
                      </div>
                      <p className="text-slate-300 text-xs">Email support</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;

