"use client";

import { Chip } from "@nextui-org/react";
import { IconContext } from "react-icons";
import { AiFillLinkedin } from "react-icons/ai";
import { HiEnvelope, HiPhone, HiMapPin, HiGlobeAlt } from "react-icons/hi2";

export default function Preview({ data }) {
  return (
    <div className="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 my-8">
      <header className="bg-slate-700 text-white sm:rounded-t-xl">
        <div className="px-4 py-6 sm:p-8">
          <h1 className="font-bold leading-6 text-3xl">
            {data.personalData.name}
          </h1>
          <h2 className="mt-2 font-semibold text-xl text-cyan-500">
            {data.personalData.title}
          </h2>
          <p className="mt-4 font-medium">{data.summary}</p>
        </div>
        <div className="bg-slate-900 py-4">
          <ul className="flex items-center justify-center space-x-12 font-medium text-sm">
            <li className="flex items-center">
              <IconContext.Provider value={{ size: "1.2rem" }}>
                <HiEnvelope />
              </IconContext.Provider>
              <span className="ml-2">{data.personalData.email}</span>
            </li>
            <li className="flex items-center">
              <IconContext.Provider value={{ size: "1.2rem" }}>
                <HiPhone />
              </IconContext.Provider>
              <span className="ml-2">{data.personalData.tel}</span>
            </li>
            {/* Faire une lib pour renvoyer l'adresse au bon format en fonction des données présentes */}
            <li className="flex items-center">
              <IconContext.Provider value={{ size: "1.2rem" }}>
                <HiMapPin />
              </IconContext.Provider>
              <span className="ml-2">
                {data.personalData.address
                  ? `${data.personalData.address},`
                  : ""}
                {data.personalData.nip ? `${data.personalData.nip},` : ""}
                {data.personalData.city ? `${data.personalData.city},` : ""}
                {data.personalData.country
                  ? ` ${data.personalData.country}`
                  : ""}
              </span>
            </li>
            <li className="flex items-center">
              <IconContext.Provider value={{ size: "1.2rem" }}>
                <HiGlobeAlt />
              </IconContext.Provider>
              <span className="ml-2">
                {data.personalData.nationality}, {data.personalData.permit}
              </span>
            </li>
            <li className="flex items-center">
              <IconContext.Provider value={{ size: "1.2rem" }}>
                <AiFillLinkedin />
              </IconContext.Provider>
              <span className="ml-2">{data.personalData.linkedinUrl}</span>
            </li>
          </ul>
        </div>
      </header>
      <main className="px-4 py-6 sm:p-8">
        <section>
          <h3 className="inline-block font-bold text-2xl text-cyan-600 uppercase border-b-3 border-cyan-600">
            Compétences
          </h3>
          <div className="mt-6 flex gap-4">
            {data.skills.map((skill) => (
              <Chip size="lg">{skill}</Chip>
            ))}
          </div>
        </section>
        <section className="mt-10">
          <h3 className="inline-block font-bold text-2xl text-cyan-600 uppercase border-b-3 border-cyan-600">
            Expériences Professionnelles
          </h3>
          <ul>
            {data.experiences.map((experience) => (
              <li className="mt-6">
                <h4 className="font-bold text-xl text-gray-900">
                  {experience.title}
                </h4>
                <h5 className="font-medium text-lg text-gray-800">
                  {experience.company}
                </h5>
                <div className="flex justify-between items-center text-cyan-600 italic text-sm mt-1">
                  <p>
                    {experience.fromMonth}/{experience.fromYear} -{" "}
                    {experience.current
                      ? "Maintenant"
                      : `${experience.toMonth}/${experience.toYear}`}
                  </p>
                  <p>
                    {experience.city ? `${experience.city},` : ""}{" "}
                    {experience.country}
                  </p>
                </div>
                <p className="text-gray-500 italic text-sm">
                  {experience.companyDesc}
                </p>
                <ul className="mt-2 space-y-1">
                  {experience.description.map((desc) => (
                    <li className="flex items-center space-x-2">
                      <span className="block h-1.5 w-1.5 rounded-full bg-cyan-600" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h3 className="inline-block font-bold text-2xl text-cyan-600 uppercase border-b-3 border-cyan-600">
            Formation
          </h3>
          <ul>
            {data.education.map((ed) => (
              <li className="mt-6">
                <h4 className="font-bold text-xl text-gray-900">
                  {ed.degree} {ed.field}
                </h4>
                <h5 className="font-medium text-lg text-gray-800">
                  {ed.school}
                </h5>
                <div className="flex justify-between items-center text-cyan-600 italic text-sm mt-1">
                  <p>
                    {ed.fromMonth}/{ed.fromYear} - {ed.toMonth}/{ed.toYear}
                  </p>
                  <p>
                    {ed.city ? `${ed.city}, ` : ""}
                    {ed.country}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h3 className="inline-block font-bold text-2xl text-cyan-600 uppercase border-b-3 border-cyan-600">
            Certifications
          </h3>
          <ul>
            {data.certifications.map((certification) => (
              <li className="mt-6">
                <span className="font-semibold">{certification.title}</span> -{" "}
                {certification.issuer} ({certification.month}/
                {certification.year})
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h3 className="inline-block font-bold text-2xl text-cyan-600 uppercase border-b-3 border-cyan-600">
            Langues
          </h3>
          <ul className="grid grid-cols-4">
            {data.personalData.languages.map((l) => (
              <li className="mt-6">
                <h4>{l.language}</h4>
                <p className="text-cyan-600 italic text-sm">{l.level}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h3 className="inline-block font-bold text-2xl text-cyan-600 uppercase border-b-3 border-cyan-600">
            Références
          </h3>
          <ul className="grid grid-cols-4">
            {data.references.map((reference) => (
              <li className="mt-6">
                <h4>{reference.name}</h4>
                <p className="text-cyan-600 italic text-sm">
                  {reference.position} chez {reference.company}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
