import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Aarovia Group Services | Luxury Real Estate Services & Property Solutions in Bangalore',
  description: 'Explore premium real estate services by Aarovia Group in Bangalore including luxury apartments, villas, villa plots, farm lands, gated communities, commercial properties, property investment consultation, project management, legal assistance, and property advisory solutions.',
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <>
      <Header />








      <div className="hero hero-video">

      <div className="hero-bg-video">


      <video autoPlay id="myVideo" loop muted playsInline poster="/images/page-header-bg.webp">
      <source src="/videos/inspaire-video-3.mp4" type="video/mp4" />
      </video>




      </div>

      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-10">

      <div className="hero-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  Aarovia Group services
                              </h3>
      <h1 className="text-anime-style-2" data-cursor="-opaque">
                                  Complete real estate solutions for{" "}
                                  <span>homes, plots &amp; farm land investments</span>
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group offers trusted real estate services across Bangalore, 
                                  helping clients discover premium apartments, luxury villas, villa plots, 
                                  farm lands, and investment properties. From property consultation and site 
                                  visits to legal verification and final registration, we provide end-to-end 
                                  support for buyers and investors.
                              </p>
      </div>


      <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
    <a className="btn-default" href="/contact">
                                  view properties
                              </a>
      <a className="btn-default btn-highlighted" href="/contact">
                                  get consultation
                              </a>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="page-services">
      <div className="container">
      <div className="row">
      <div className="col-lg-4 col-md-6">

      <div className="service-item wow fadeInUp">

      <div className="service-image">
      <a data-cursor-text="View" href="/luxury-apartments">
      <figure className="image-anime">
      <img alt="" src="/images/service-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/luxury-apartments">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/luxury-apartments">
                                      luxury apartments
                                  </a>
      </h3>
      <p>
                                  Explore premium luxury apartments in Bangalore featuring modern architecture, 
                                  world-class amenities, gated security, and prime city connectivity for elevated urban living.
                              </p>
      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="service-item wow fadeInUp">

      <div className="service-image">
      <a data-cursor-text="View" href="/villa-plots">
      <figure className="image-anime">
      <img alt="" src="/images/service-2.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/villa-plots">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/villa-plots">
                                      villa plots
                                  </a>
      </h3>
      <p>
                                  Invest in premium villa plots with excellent appreciation potential, 
                                  strategic locations, legal approvals, and future-ready infrastructure developments.
                              </p>
      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="service-item wow fadeInUp" data-wow-delay="0.2s">

      <div className="service-image">
      <a data-cursor-text="View" href="/farm-lands">
      <figure className="image-anime">
      <img alt="" src="/images/service-3.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/farm-lands">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/farm-lands">
                                      farm lands
                                  </a>
      </h3>
      <p>
                                  Discover premium farm lands near Bangalore ideal for long-term investment, 
                                  nature-inspired living, agricultural opportunities, and future development growth.
                              </p>
      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="service-item wow fadeInUp" data-wow-delay="0.4s">

      <div className="service-image">
      <a data-cursor-text="View" href="/premium-villas">
      <figure className="image-anime">
      <img alt="" src="/images/service-4.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/premium-villas">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/premium-villas">
                                      premium villas
                                  </a>
      </h3>
      <p>
                                  Experience luxurious independent villas designed with spacious interiors, 
                                  private landscapes, premium amenities, and modern family lifestyle features.
                              </p>
      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="service-item wow fadeInUp" data-wow-delay="0.6s">

      <div className="service-image">
      <a data-cursor-text="View" href="/residential">
      <figure className="image-anime">
      <img alt="" src="/images/service-5.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/residential">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/residential">
                                      residential properties
                                  </a>
      </h3>
      <p>
                                  Find premium residential properties including apartments, villas, and 
                                  gated communities across Bangalore’s most promising residential locations.
                              </p>
      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="service-item wow fadeInUp" data-wow-delay="0.8s">

      <div className="service-image">
      <a data-cursor-text="View" href="/commercial">
      <figure className="image-anime">
      <img alt="" src="/images/service-6.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/commercial">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/commercial">
                                      commercial properties
                                  </a>
      </h3>
      <p>
                                  Explore commercial office spaces, retail outlets, business parks, 
                                  and investment-ready commercial properties in Bangalore’s growth corridors.
                              </p>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="why-choose-us">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-5">

      <div className="why-choose-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  why choose aarovia
                              </h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Your trusted partner for{" "}
                                  <span>real estate investments</span>
      </h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  From premium apartments and luxury villas to plotted developments 
                                  and farm lands, Aarovia Group delivers trusted property solutions 
                                  backed by transparency, market expertise, and customer-focused service.
                              </p>
      </div>


      <div className="why-choose-item-list">

      <div className="why-choose-item wow fadeInUp" data-wow-delay="0.4s">

      <div className="icon-box">
      <img alt="" src="/images/icon-why-choose-1.svg" loading="lazy" decoding="async"/>
      </div>


      <div className="why-choose-item-content">
      <h3>
                                          premium property options
                                      </h3>
      <p>
                                          We offer carefully selected apartments, villa plots, farm lands, 
                                          and investment properties in Bangalore’s prime growth locations.
                                      </p>
      </div>

      </div>


      <div className="why-choose-item wow fadeInUp" data-wow-delay="0.6s">

      <div className="icon-box">
      <img alt="" src="/images/icon-why-choose-2.svg" loading="lazy" decoding="async"/>
      </div>


      <div className="why-choose-item-content">
      <h3>
                                          end-to-end buying support
                                      </h3>
      <p>
                                          From property shortlisting and site visits to legal verification 
                                          and registration, we ensure a seamless buying experience.
                                      </p>
      </div>

      </div>


      <div className="why-choose-item wow fadeInUp" data-wow-delay="0.8s">

      <div className="icon-box">
      <img alt="" src="/images/icon-why-choose-3.svg" loading="lazy" decoding="async"/>
      </div>


      <div className="why-choose-item-content">
      <h3>
                                          trusted investment guidance
                                      </h3>
      <p>
                                          Our experienced team helps clients identify high ROI real estate 
                                          opportunities with long-term appreciation potential.
                                      </p>
      </div>

      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-7">

      <div className="why-choose-images">

      <div className="why-choose-img-box-1">

      <div className="why-choose-img-1">
      <figure className="image-anime reveal">
      <img alt="" src="/images/why-choose-img-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>


      <div className="why-choose-img-2">
      <figure className="image-anime reveal">
      <img alt="" src="/images/why-choose-img-2.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>


      <div className="why-choose-img-box-2">

      <div className="why-choose-img-3">
      <figure className="image-anime reveal">
      <img alt="" src="/images/why-choose-img-3.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>


      <div className="why-choose-img-4">
      <figure className="image-anime reveal">
      <img alt="" src="/images/why-choose-img-4.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-skill">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-6">

      <div className="our-skill-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  our expertise
                              </h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Expertise that helps you secure{" "}
                                  <span>the right property investment</span>
      </h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group combines market knowledge, legal support, 
                                  and investment expertise to help buyers and investors confidently 
                                  choose apartments, villa plots, farm lands, and premium properties 
                                  across Bangalore.
                              </p>
      </div>


      <div className="our-skillbar">

      <div className="skills-progress-bar">

      <div className="skillbar" data-percent="95%">
      <div className="skill-data">
      <div className="skill-title">
                                              property investment guidance
                                          </div>
      <div className="skill-no">
                                              95%
                                          </div>
      </div>
      <div className="skill-progress">
      <div className="count-bar"></div>
      </div>
      </div>

      </div>


      <div className="skills-progress-bar">

      <div className="skillbar" data-percent="90%">
      <div className="skill-data">
      <div className="skill-title">
                                              legal verification &amp; documentation
                                          </div>
      <div className="skill-no">
                                              90%
                                          </div>
      </div>
      <div className="skill-progress">
      <div className="count-bar"></div>
      </div>
      </div>

      </div>


      <div className="skills-progress-bar">

      <div className="skillbar" data-percent="88%">
      <div className="skill-data">
      <div className="skill-title">
                                              plots &amp; farm land opportunities
                                          </div>
      <div className="skill-no">
                                              88%
                                          </div>
      </div>
      <div className="skill-progress">
      <div className="count-bar"></div>
      </div>
      </div>

      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-6">

      <div className="our-skill-image">
      <div className="our-skill-img-1">
      <figure className="image-anime reveal">
      <img alt="" src="/images/our-skill-img-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="our-skill-img-2">
      <figure className="image-anime reveal">
      <img alt="" src="/images/our-skill-img-2.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="our-skill-img-3">
      <figure className="image-anime reveal">
      <img alt="" src="/images/our-skill-img-3.webp" loading="lazy" decoding="async"/>
      </figure>
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
