import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Aarovia Group | Premium Real Estate Company in Bangalore",
  description: "Get in touch with Aarovia Group for luxury apartments, villas, villa plots, and real estate investment opportunities in Bangalore.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />








      <div className="hero hero-video">

      <div className="hero-bg-video">


      <video autoPlay id="myVideo" loop muted playsInline poster="/images/page-header-bg.webp">
      <source src="/videos/inspaire-video-6.mp4" type="video/mp4" />
      </video>




      </div>

      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-10">

      <div className="hero-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  contact Aarovia Group
                              </h3>
      <h1 className="text-anime-style-2" data-cursor="-opaque">
                                  Connect with our real estate experts for{" "}
                                  <span>trusted property guidance</span>
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Whether you are searching for premium apartments, villa plots, 
                                  gated community homes, farm lands, or high-return investment properties, 
                                  the AAROVIA team is here to assist you. Contact us for property consultations, 
                                  site visit scheduling, legal verification support, pricing details, and 
                                  complete end-to-end real estate solutions across Bangalore.
                              </p>
      </div>


      <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
      <a className="btn-default" href="/contact">
                                  get in touch
                              </a>
      <a className="btn-default btn-highlighted" href="/contact">
                                  explore properties
                              </a>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="page-contact-us">
      <div className="container">
      <div className="row">
      <div className="col-lg-6">

      <div className="contact-us-image">
      <figure className="image-anime reveal">
      <img alt="" src="/images/contact-us-image.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="contact-us-form">

      <div className="section-title">
      <h3 className="wow fadeInUp">contact aarovia</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">Let’s discuss your next <span>property investment</span></h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">Get in touch with Aarovia Group for apartments, villa plots, farm lands, investment properties, site visits, and expert real estate consultation across Bangalore.</p>
      </div>


      <div className="contact-form">

      <ContactForm />

      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="google-map">
      <div className="container">
      <div className="row">
      <div className="col-lg-12">

      <div className="section-title">
      <h3 className="wow fadeInUp">contact aarovia</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">Connect with our real estate experts</h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">Reach out to Aarovia Group for premium apartments, villa plots, gated community homes, farm lands, and investment property opportunities across Bangalore. Our team is ready to assist you with site visits, property consultation, pricing details, and complete buying support.</p>
      </div>

      </div>
      <div className="col-lg-12">

      <div className="google-map-iframe">
      <iframe allowFullScreen height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.568142420285!2d77.62398727484302!3d13.063138187260693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19deea3466ef%3A0x6eefefe978e32b99!2sArkavathy%20Layout%2C%20Rachenahalli%2C%20Thanisandra%2C%20Bengaluru%2C%20Karnataka%20560077!5e0!3m2!1sen!2sin!4v1778774343559!5m2!1sen!2sin" style={{border: '0'}} width="600"></iframe>
      </div>

      </div>
      </div>
      <div className="row">
      <div className="col-lg-12">

      <div className="contact-info-box">

      <div className="contact-info-item wow fadeInUp">

      <div className="icon-box">
      <i className="fa-solid fa-phone"></i>
      </div>


      <div className="contact-info-content">
      <h3>call our team</h3>
      <p>+91 8062179342</p>
      </div>

      </div>


      <div className="contact-info-item wow fadeInUp" data-wow-delay="0.2s">

      <div className="icon-box">
      <i className="fa-regular fa-envelope"></i>
      </div>


      <div className="contact-info-content">
      <h3>email support</h3>
      <p>connect@aaroviagroup.com</p>
      </div>

      </div>


      <div className="contact-info-item wow fadeInUp" data-wow-delay="0.4s">

      <div className="icon-box">
      <i className="fa-solid fa-house"></i>
      </div>


      <div className="contact-info-content">
      <h3>aarovia office</h3>
      <p>4th Floor, Samhita Aspire, 1st Main, Old Madras Rd, Pai Layout, Bengaluru, Karnataka 560016</p>
      </div>

      </div>

      </div>

      </div>
      </div>
      </div>
      </div>






































      <Footer />
    </>
  );
}
