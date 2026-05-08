"use client";

import React, { useEffect, useRef, useState } from "react";
import useInView from "@/src/hooks/useInView";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";

/* ─── Types ─── */
type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};


/* ─── Contact Form ── */
function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subjects = [
    "General Inquiry",
    "Sales & Pricing",
    "Technical Support",
    "Partnership",
    "RMA / Replacement",
    "Other",
  ];

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) {
      e.name = "Name is required";
    } else if (form.name.trim().length < 3) {
      e.name = "Name must be at least 3 characters";
    }
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email required";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "10-digit number required";
    }
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) {
      e.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      e.message = "Message must be at least 10 characters";
    }
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 text-green-600"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 text-sm mb-6">
          We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
          }}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors({ ...errors, name: undefined });
            }}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.name
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
              } outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setErrors({ ...errors, email: undefined });
            }}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.email
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
              } outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setForm({ ...form, phone: value });
              setErrors({ ...errors, phone: undefined });
            }}
            placeholder="9876543210"
            className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.phone
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
              } outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subject
          </label>
          <Select
            value={form.subject}
            onValueChange={(value) => {
              setForm({ ...form, subject: value });
              setErrors({ ...errors, subject: undefined });
            }}
          >
            <SelectTrigger className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.subject
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            setErrors({ ...errors, message: undefined });
          }}
          placeholder="Tell us more about your inquiry..."
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border text-sm resize-none ${errors.message
            ? "border-red-400 bg-red-50"
            : "border-gray-200 bg-gray-50 hover:border-gray-300"
            } outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
        size="lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
}

export default function SendMessage() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section ref={ref}>
      <div
        className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <ContactForm />
      </div>
    </section>
  );
}
