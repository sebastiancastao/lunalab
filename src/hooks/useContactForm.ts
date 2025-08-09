import { baseUrl } from "@/config/constants";
import { useState } from "react";

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  currentUrl: string;
  projectType: string;
  budget?: string;
  company?: string;
};

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "Consulta general",
    message: "Project Details",
    currentUrl: typeof window !== "undefined" ? window.location.href : "",
    projectType: "",
    budget: "",
    company: "Luna Labs",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Construir el mensaje combinado
      const combinedMessage = `
${formData.message}

-----------------------------
🔹 Empresa: ${formData.company || "N/A"}
🔹 Tipo de proyecto: ${formData.projectType || "N/A"}
🔹 Presupuesto: ${formData.budget || "N/A"}
-----------------------------
`;

      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: combinedMessage.trim(),
        currentUrl: formData.currentUrl,
      };

      const res = await fetch(baseUrl + "/api/email/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          currentUrl: window.location.href,
          projectType: "",
          budget: "",
          company: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Error al enviar el formulario",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Hubo un error. Intenta nuevamente más tarde.",
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
