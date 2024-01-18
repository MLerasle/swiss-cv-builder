"use client";

import { useState, useRef } from "react";
import { Button } from "@nextui-org/react";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseTextarea } from "@/components/UI/BaseTextarea";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { scrollToElement } from "@/lib/scroll";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const messageRef = useRef();

  async function sendMessage(event) {
    event.preventDefault();

    const formData = {
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    try {
      setIsLoading(true);
      const response = await fetch("/api/contact", {
        method: "post",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setIsLoading(false);
        setIsFormSubmitted(true);
        throw new Error(`Invalid response: ${response.status}`);
      }
      setIsLoading(false);
      setIsFormSubmitted(true);
      scrollToElement("formContainer");
    } catch (err) {
      scrollToElement("formContainer");
      setIsLoading(false);
      setIsFormSubmitted(true);
      setError(true);
    }
  }

  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8" id="formContainer">
      <div className="mx-auto max-w-2xl text-center">
        {isFormSubmitted && !error && (
          <BaseNotification type="success" className="mb-16 sm:mb-20">
            <p>Votre message a bien été envoyé.</p>
            <p>Nous reviendrons vers vous le plus rapidement possible.</p>
          </BaseNotification>
        )}
        {isFormSubmitted && error && (
          <BaseNotification type="error" className="mb-16 sm:mb-20">
            <p>Une erreur est survenue pendant l'envoi de votre message.</p>
            <p>
              Si celle-ci persiste, vous pouvez nous contacter directement à
              l'adresse contact@swisscvbuilder.ch.
            </p>
          </BaseNotification>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contactez-nous
        </h2>
        <p className="mt-2 sm:mt-4 text-lg leading-8 text-gray-600">
          Si vous rencontrez des problèmes ou souhaitez me soumettre des idées
          d'amélioration, veuillez utiliser le formulaire ci-dessous.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={sendMessage}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <BaseInput
                label="Email"
                autoFocus
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                ref={emailRef}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <BaseTextarea
                label="Message"
                name="message"
                id="message"
                minRows={6}
                ref={messageRef}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Envoyer le message
          </Button>
        </div>
      </form>
    </div>
  );
}
