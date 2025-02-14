import { PropsForm } from "@/types/global";

export function useSendEmail() {
  const sendEmail = async (form: PropsForm) => {
    const res = await fetch("/api/node_mailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    return data;
  };

  return { sendEmail };
}
