"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useInView from "@/src/hooks/useInView";
import { Button } from "@/src/components/ui/button";

/* ─── Form Types ─── */
type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  gst: string;
  type: string;
  message: string;
};

type FormErrors = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  city?: string;
  gst?: string;
  type?: string;
  message?: string;
};

type FieldProps = {
  label: string;
  id: keyof FormData;
  type?: string;
  placeholder: string;
  half?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

/* ─── Field Component ─── */
const Field: React.FC<FieldProps> = ({ label, id, type = "text", placeholder, half, value, onChange, error }) => (
  <div className={half ? "col-span-1" : "col-span-2"}>
    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">{label}</label>
    <input
      type={type}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? "border-destructive bg-destructive/10" : "border-border bg-muted hover:border-primary/30"}`}
    />
    {error && <p className="text-destructive text-xs mt-1">{error}</p>}
  </div>
);

/* ─── Form State ─── */
function PartnerForm() {
  const [form, setForm] = useState<FormData>({ name: "", company: "", email: "", phone: "", city: "", gst: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "10-digit number required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.type) e.type = "Please select";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">Application Received!</h3>
      <p className="text-muted-foreground text-sm max-w-xs">Our partnerships team will reach out to you within 2 business days.</p>
      <Button
        onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", city: "", gst: "", type: "", message: "" }); }}
        className="mt-6 text-primary text-sm font-medium hover:underline"
      >
        Submit another application
      </Button>
    </div>
  );

  
  const businessTypes = [
    "System Integrator",
    "Reseller / VAR",
    "IT Distributor",
    "Retail Chain",
    "Enterprise / End User",
    "Other",
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <Field 
        label="Full Name" 
        id="name" 
        placeholder="Rahul Sharma" 
        half 
        value={form.name || ''}
        onChange={e => {
          setForm(f => ({ ...f, name: e.target.value }));
          setErrors(er => ({ ...er, name: undefined }));
        }}
        error={errors.name}
      />
      <Field 
        label="Company Name" 
        id="company" 
        placeholder="Acme Networks Pvt. Ltd." 
        half 
        value={form.company || ''}
        onChange={e => {
          setForm(f => ({ ...f, company: e.target.value }));
          setErrors(er => ({ ...er, company: undefined }));
        }}
        error={errors.company}
      />
      <Field 
        label="Email Address" 
        id="email" 
        type="email" 
        placeholder="rahul@company.com" 
        half 
        value={form.email || ''}
        onChange={e => {
          setForm(f => ({ ...f, email: e.target.value }));
          setErrors(er => ({ ...er, email: undefined }));
        }}
        error={errors.email}
      />
      <Field 
        label="Phone Number" 
        id="phone" 
        type="tel" 
        placeholder="98765 43210" 
        half 
        value={form.phone || ''}
        onChange={e => {
          setForm(f => ({ ...f, phone: e.target.value }));
          setErrors(er => ({ ...er, phone: undefined }));
        }}
        error={errors.phone}
      />
      <Field 
        label="City" 
        id="city" 
        placeholder="Mumbai" 
        half 
        value={form.city || ''}
        onChange={e => {
          setForm(f => ({ ...f, city: e.target.value }));
          setErrors(er => ({ ...er, city: undefined }));
        }}
        error={errors.city}
      />
      <div className="col-span-1">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">GST Number <span className="text-muted-foreground/60 font-normal normal-case">(optional)</span></label>
        <input
          name="gst"
          value={form.gst || ''}
          onChange={e => setForm(f => ({ ...f, gst: e.target.value }))}
          placeholder="22AAAAA0000A1Z5"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm text-foreground placeholder-muted-foreground outline-none hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Business Type</label>
        <div className="flex flex-wrap gap-2">
          {businessTypes.map(t => (
            <Button
            variant="outline"
              key={t}
              onClick={() => { setForm(f => ({ ...f, type: t })); setErrors(er => ({ ...er, type: undefined })); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${form.type === t ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-primary"}`}
            >
              {t}
            </Button>
          ))}
        </div>
        {errors.type && <p className="text-destructive text-xs mt-1">{errors.type}</p>}
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Message <span className="text-muted-foreground/60 font-normal normal-case">(optional)</span></label>
        <textarea
          name="message"
          value={form.message || ''}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your business and how you'd like to partner with us..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm text-foreground placeholder-muted-foreground outline-none hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
        />
      </div>
      <div className="col-span-2">
        <div className="flex justify-center ">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-bold py-3 transition-all duration-200 text-sm tracking-wide"
        >
          {loading ? "Sending..." : "Submit Partnership Application"}
        </Button>
        </div>
        <p className="text-center text-muted-foreground text-xs mt-3">We'll respond within 2 business days. No spam, ever.</p>
      </div>
    </div>
  );
}

export default function GetStarted() {
  const [formRef, formVisible] = useInView();
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => formSectionRef.current?.scrollIntoView({ behavior: "smooth" });  

  return (
    <section id="get-started" ref={formRef} className="bg-primary py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/80 opacity-50 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary/80 opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — pitch */}
          <div className={`transition-all duration-700 ${formVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>          
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary-foreground/30 rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary-foreground">
                Get Started
              </span>
              <div className="w-10 h-0.5 bg-primary-foreground/30 rounded-[2px]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-5 leading-tight">
              Become an Authorised<br />
              <span className="text-primary-foreground/90">Ajunet Distributor</span>
            </h2>
            <p className="text-primary-foreground/80 text-base leading-relaxed mb-10">
              Fill in the form and our partnerships team will evaluate your application and reach out within 2 business days with a tailored onboarding plan.
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-5">
              {[
                { step: "01", title: "Submit Application", desc: "Fill in your business details below." },
                { step: "02", title: "Team Review", desc: "Our team evaluates your profile within 48 hours." },
                { step: "03", title: "Onboarding Call", desc: "We walk you through pricing, terms, and products." },
                { step: "04", title: "Start Selling", desc: "Get access to inventory, support, and partner portal." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/20 border border-primary-foreground/40 text-primary-foreground text-xs font-bold flex items-center justify-center">{step}</span>
                  <div>
                    <p className="text-primary-foreground font-semibold text-sm">{title}</p>
                    <p className="text-primary-foreground/70 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div
            ref={formSectionRef}
            className={`bg-card rounded-3xl p-8 shadow-2xl transition-all duration-700 delay-200 ${formVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <h3 className="text-foreground font-bold text-lg mb-1">Partner Application</h3>
            <p className="text-muted-foreground text-sm mb-6">All fields marked are required unless stated optional.</p>
            <PartnerForm />
          </div>

        </div>
      </div>
    </section>
  );
}
