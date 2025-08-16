import Hero from "@/components/Hero";
import GoogleReviews from "@/components/GoogleReviews";
import Featured from "@/components/Featured";
import Portfolio from "@/components/Portfolio";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GoogleReviews />
      <Featured />
      <Portfolio />
      <ContactForm />
    </>
  );
}

