import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button, SearchableSelect, Input } from '../components/shared';
import { mockEmails } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { login, user } = useApp();

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleEmailContinue = () => {
    if (email) {
      setStep('otp');
    }
  };

  const handleLogin = () => {
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo/Title */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">OCR/KIE App</h1>
          </div>

          {step === 'email' ? (
            /* Email Step */
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Welcome back</h2>
                <p className="text-sm text-slate-500">Sign in to continue to your account</p>
              </div>

              <SearchableSelect
                label="Email Address"
                value={email}
                onChange={setEmail}
                options={mockEmails}
                placeholder="Select or type your email"
                required
              />

              <Button
                fullWidth
                size="lg"
                onClick={handleEmailContinue}
                disabled={!email}
              >
                Continue
              </Button>
            </div>
          ) : (
            /* OTP Step */
            <div className="space-y-6">
              <button
                onClick={() => setStep('email')}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Enter verification code</h2>
                <p className="text-sm text-slate-500">OTP sent to {email}</p>
              </div>

              <Input
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />

              <Button
                fullWidth
                size="lg"
                onClick={handleLogin}
              >
                Login
              </Button>

              <p className="text-center text-sm text-slate-400">
                For demo purposes, click Login without entering OTP
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
