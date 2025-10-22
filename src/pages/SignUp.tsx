import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Backend signup API
const signupApi = async (name: string, email: string, password: string) => {
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const res = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password, profile: { name } })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Signup failed");
  }
  return await res.json();
};

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', agreeToTerms: false });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { [k: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Accept terms';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setPending(true);
    try {
      await signupApi(formData.name, formData.email, formData.password);
      navigate('/signin');
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Signup failed' });
    } finally { setPending(false); }
  };

  return (
    <div className="min-h-screen flex bg-white pb-24">
      {/* Left side - Sign up form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#80C342] to-[#FFC400] bg-clip-text text-transparent">Get Started Now</h1>
            <p className="text-sm text-muted-foreground">Create an account to access personalized health insights</p>
            <div className="p-3 rounded-md bg-gradient-to-r from-[#80C342]/10 to-[#FFC400]/10 border border-[#80C342]/20">
              <p className="text-sm text-muted-foreground">
                <strong className="font-medium text-[#2F6F10]">Note: </strong>
                To view the institution dashboard sign up with an <span className="font-semibold text-primary">@vitalyze.ac.in</span> email
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{errors.general}</div>}
            <div className="space-y-2">
              <Label htmlFor="name" className="bg-gradient-to-r from-[#80C342] to-[#FFC400] bg-clip-text text-transparent">Name</Label>
              <Input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))} className={cn('h-11 bg-background border-input', errors.name && 'border-red-500')} />
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="bg-gradient-to-r from-[#80C342] to-[#FFC400] bg-clip-text text-transparent">Email address</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))} className={cn('h-11 bg-background border-input', errors.email && 'border-red-500')} />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="bg-gradient-to-r from-[#80C342] to-[#FFC400] bg-clip-text text-transparent">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password (min 6 characters)" value={formData.password} onChange={(e) => setFormData(f => ({ ...f, password: e.target.value }))} className={cn('h-11 bg-background border-input', errors.password && 'border-red-500')} />
              {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
            </div>
            {/* Terms and Privacy agreement */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(v) => setFormData(f => ({ ...f, agreeToTerms: Boolean(v) }))}
                />
                <Label htmlFor="agree" className="text-sm text-muted-foreground">
                  I agree to the Terms and Privacy Policy
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-xs text-red-600">{errors.agreeToTerms}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className={cn(
                'w-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200',
                pending && 'opacity-50 cursor-not-allowed'
              )}
              style={{ background: '#F7CB05' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#52F705'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#F7CB05'}
            >
              {pending ? 'Creating account...' : 'Sign Up'}
            </Button>
            {/* Social login removed as requested */}
            <div className="text-center text-sm"><span className="text-muted-foreground">Have an account? </span><Link to="/signin" className="text-primary hover:underline font-medium">Sign in</Link></div>
          </form>
        </div>
      </div>
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <video
            src="/assests/signup.mp4"
            className="w-[95%] h-auto max-h-[700px] object-cover"
            autoPlay
            loop
            muted
          />
        </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-white w-full absolute bottom-0 left-0">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Rishabh Kumar Jha Productions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
