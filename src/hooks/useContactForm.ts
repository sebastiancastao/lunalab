import { useState } from "react";

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  currentUrl: string;
  projectType: string;
  budget?: string;
};

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
};

const createInitialFormData = (): ContactFormData => ({
  name: "",
  email: "",
  subject: "Website contact form",
  message: "",
  currentUrl: typeof window !== "undefined" ? window.location.href : "",
  projectType: "",
  budget: "",
});

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(createInitialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        currentUrl: formData.currentUrl,
        projectType: formData.projectType,
        budget: formData.budget,
      };

      const res = await fetch("/api/email/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        setFormData(createInitialFormData());
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Error al enviar el formulario",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit,
    setFormData,
  };
};
