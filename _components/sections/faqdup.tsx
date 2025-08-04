import React, { useState } from "react";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import { faqs } from "@/lib/constants";
import { Minus, Plus } from "lucide-react";

export default function FaqsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <AnimatedSection className="w-full">
      <section className="mx-auto mb-20 flex w-full max-w-[999px] flex-col gap-6 px-5 lg:mb-30 lg:grid lg:grid-cols-[1fr_2fr]">
        <h2 className="flex gap-1 text-center text-3xl font-semibold italic sm:gap-2 sm:text-5xl md:text-6xl lg:max-w-[294px] lg:flex-col lg:items-start lg:gap-5 lg:text-left lg:leading-[0.9] flex-wrap">
          <span>Frequently </span>
          <span>Asked </span>
          <span>Questions</span>
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className={`flex w-full items-center gap-4 ${
                  openFaq === index ? "rounded-t-lg" : "rounded-2xl"
                } border border-gray-200 bg-gray-50 p-4 text-left focus:outline-none dark:border-white/10 dark:bg-white/5`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    openFaq === index ? "bg-[#0d6fde]" : "bg-green-600"
                  }`}
                >
                  {openFaq === index ? (
                    <Minus className="h-4 w-4 text-white dark:text-black" />
                  ) : (
                    <Plus className="h-4 w-4 text-white dark:text-black" />
                  )}
                </span>
                <span className="text-base font-medium text-black dark:text-white/80">
                  {faq.question}
                </span>
              </button>
              {openFaq === index && (
                <div className="rounded-b-lg bg-white p-4 dark:bg-black/20">
                  <p className="text-gray-600 dark:text-white/70">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
