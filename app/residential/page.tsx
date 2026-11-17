import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPoster from "@/components/HeroPoster";

export const metadata: Metadata = {
  title: 'Aarovia Residential Properties | Luxury Apartments & Villas in Bangalore',
  description: 'Explore premium residential properties by AAROVIA Group in Bangalore including luxury apartments, gated communities, premium villas, villa plots, smart homes, and high-return residential investment opportunities in prime locations.',
  alternates: { canonical: "/residential" },
};

export default function Page() {
  return (
    <>
      <Header />








      <div className="hero hero-video">

      <HeroPoster />

      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-10">

      <div className="hero-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">luxury residential properties in bangalore</h3>
      <h1 className="text-anime-style-2" data-cursor="-opaque">
                                  Premium apartments, villas &amp; gated community homes by{" "}
                                  <span>Aarovia Group</span>
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Find your perfect residential property with Aarovia Group. 
                                  Explore luxury apartments, independent villas, gated community homes, 
                                  villa plots, and modern family residences across Bangalore’s prime 
                                  locations with world-class amenities, excellent connectivity, and 
                                  long-term investment value.
                              </p>
      </div>


      <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
      <a className="btn-default" href="/about">about aarovia</a>
      <a className="btn-default btn-highlighted" href="/contact">
                                  view residential projects
                              </a>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="page-project-single">
      <div className="container">
      <div className="row">
      <div className="col-lg-4">

      <div className="project-single-sidebar">

      <div className="project-detail-list wow fadeInUp">

      <div className="project-detail-item">
      <div className="icon-box">
      <i className="fa-regular fa-calendar"></i>
      </div>
      <div className="project-detail-content">
      <h3>project launch:</h3>
      <p>10 january, 2026</p>
      </div>
      </div>


      <div className="project-detail-item">
      <div className="icon-box">
      <i className="fa-regular fa-clock"></i>
      </div>
      <div className="project-detail-content">
      <h3>project status:</h3>
      <p>ready to move &amp; booking open</p>
      </div>
      </div>


      <div className="project-detail-item">
      <div className="icon-box">
      <i className="fa-regular fa-circle-check"></i>
      </div>
      <div className="project-detail-content">
      <h3>property category:</h3>
      <p>premium residential apartments</p>
      </div>
      </div>


      <div className="project-detail-item">
      <div className="icon-box">
      <i className="fa-regular fa-user"></i>
      </div>
      <div className="project-detail-content">
      <h3>developer:</h3>
      <p>Aarovia Group</p>
      </div>
      </div>


      <div className="project-detail-item">
      <div className="icon-box">
      <i className="fa-solid fa-location-dot"></i>
      </div>
      <div className="project-detail-content">
      <h3>project location:</h3>
      <p>jakkur, north bangalore</p>
      </div>
      </div>

      </div>


      <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.2s">

      <div className="sidebar-cta-image">
      <div className="image-anime">
      <img alt="" src="/images/sidebar-cta-img.webp" loading="lazy" decoding="async"/>
      </div>
      </div>


      <div className="sidebar-cta-Body">

      <div className="sidebar-cta-content">
      <h3>book your site visit</h3>
      <p>Connect with AAROVIA for residential property details, pricing, and expert consultation.</p>
      </div>


      <div className="sidebar-cta-contact">

      <div className="sidebar-cta-contact-item">
      <div className="icon-box">
      <img alt="" src="/images/icon-phone-dark.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="cta-contact-item-content">
      <p>+91 8062179342</p>
      </div>
      </div>


      <div className="sidebar-cta-contact-item">
      <div className="icon-box">
      <img alt="" src="/images/icon-mail.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="cta-contact-item-content">
      <p>connect@aaroviagroup.com</p>
      </div>
      </div>

      </div>

      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-8">

      <div className="project-single-content">

      <div className="project-single-image">
      <figure className="image-anime reveal">
      <img alt="" src="/images/project-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>


      <div className="project-entry">

      <div className="project-info">
      <h2 className="text-anime-style-2">Property overview</h2>
      <p className="wow fadeInUp">
                                      This premium residential project by Aarovia Group offers modern apartments 
                                      designed for comfortable family living in one of Bangalore’s fastest-growing 
                                      locations. The project combines elegant architecture, smart space planning, 
                                      landscaped surroundings, and premium lifestyle amenities to create a perfect 
                                      urban living experience.
                                  </p>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                      Located near key business hubs, schools, hospitals, and upcoming infrastructure 
                                      developments, the property provides excellent connectivity and strong investment 
                                      potential. Every apartment is thoughtfully designed with spacious interiors, 
                                      natural lighting, modern fittings, and quality construction standards to ensure 
                                      long-term value for homeowners and investors.
                                  </p>
      </div>


      <div className="project-design-info">
      <h2 className="text-anime-style-2">Property highlights</h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                      The residential project includes carefully planned amenities, modern infrastructure, 
                                      and premium lifestyle features that enhance everyday living while delivering excellent 
                                      future appreciation value in Bangalore’s real estate market.
                                  </p>
      <ul className="wow fadeInUp" data-wow-delay="0.4s">
      <li>Premium 2 BHK and 3 BHK apartments with modern floor plans and spacious balconies.</li>
      <li>Located in a high-growth residential zone with excellent road connectivity and future development potential.</li>
      <li>Gated community with 24/7 security, CCTV surveillance, and controlled access entry.</li>
      <li>World-class lifestyle amenities including clubhouse, swimming pool, gym, children’s play area, and landscaped gardens.</li>
      <li>Close proximity to schools, IT parks, shopping malls, hospitals, and Bangalore airport connectivity routes.</li>
      </ul>
      </div>


      <div className="project-gallery gallery-items">
      <h2 className="text-anime-style-2">Property gallery</h2>
      <div className="project-gallery-images">

      <div className="project-gallery-img wow fadeInUp" data-cursor-text="View">
      <a href="/images/gallery-7.webp">
      <figure className="image-anime reveal">
      <img alt="" src="/images/gallery-7.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="project-gallery-img wow fadeInUp" data-cursor-text="View">
      <a href="/images/gallery-1.webp">
      <figure className="image-anime reveal">
      <img alt="" src="/images/gallery-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="project-gallery-img wow fadeInUp" data-cursor-text="View">
      <a href="/images/gallery-3.webp">
      <figure className="image-anime reveal">
      <img alt="" src="/images/gallery-3.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="project-gallery-img wow fadeInUp" data-cursor-text="View">
      <a href="/images/gallery-5.webp">
      <figure className="image-anime reveal">
      <img alt="" src="/images/gallery-5.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>

      </div>
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
