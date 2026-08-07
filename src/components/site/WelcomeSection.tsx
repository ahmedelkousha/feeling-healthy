'use client'
import { motion } from "framer-motion";

export function WelcomeSection() {
  return (
    <motion.section
      initial={{ backgroundColor:"#ffffff", opacity:0 }}
      whileInView={{ backgroundColor:"#fddb04", opacity:1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, margin: "-100px" }}
      className="relative overflow-hidden bg-brand py-18 text-brand-foreground md:py-12"
    >
      {/* Decorative Blobs matching CTA section */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 sm:size-80 size-70 blob-alt bg-brand-foreground/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-6rem] sm:size-96 size-70 blob bg-brand-foreground/[0.07]"
      />

      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, margin: "-100px" }}
      className="container-page relative text-center">
        <div className="mx-auto max-w-3xl">
          <p className="script-accent text-2xl">Welcome to our Wellness Hub</p>
          
          <h2 className="mt-4 text-2xl sm:text-3xl leading-[1.08] font-semibold md:text-4xl">
            Renew &amp; Refresh Your Vitality
          </h2>

          <p className="mt-6 text-xs sm:text-sm md:text-base text-brand-foreground/90 leading-relaxed max-w-2xl mx-auto font-medium">
            Feeling Healthy is a Wellness Hub – located in Tweed Heads, only steps away from Coolangatta. We are passionate about quality therapeutic services, tailored to achieving your health and wellness goals.
          </p>

          {/* <div className="mt-8 p-6 md:p-8 max-w-2xl mx-auto">
            <p className="script-accent text-xl text-ink mb-2">Our Mission</p>
            <p className="text-base font-medium text-brand-foreground leading-relaxed">
              "Our mission is to help you feel renewed and refreshed by giving you the tools to live life to the fullest."
            </p>
          </div> */}
        </div>
      </motion.div>
    </motion.section>
  );
}
