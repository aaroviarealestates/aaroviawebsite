import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPoster from "@/components/HeroPoster";
import { getNamedProjects } from "@/lib/featured-projects-data";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  title: "About Aarovia Group | Premium Real Estate Company in Bangalore",
  description: "Learn about Aarovia Group, a trusted premium real estate company in Bangalore specializing in luxury apartments, villas, villa plots, gated communities, farm lands, commercial properties, and high-growth real estate investment opportunities across Bangalore.",
  path: "/about",
});

export default async function Page() {
  const namedProjects = await getNamedProjects();

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
      <h3 className="wow fadeInUp">
                                  about Aarovia Group
                              </h3>
      <h1 className="text-anime-style-2" data-cursor="-opaque">
                                  Building trusted real estate opportunities through{" "}
                                  <span>homes, plots &amp; farmland investments</span>
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group is committed to helping buyers and investors 
                                  discover premium apartments, villa plots, farm lands, and high-growth 
                                  investment properties across Bangalore. With a focus on trust, transparency, 
                                  and customer satisfaction, we deliver complete real estate solutions 
                                  from property discovery to final ownership.
                              </p>
      </div>


      <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
    <a className="btn-default" href="/contact">
                                  explore properties
                              </a>
      <a className="btn-default btn-highlighted" href="/contact">
                                  contact aarovia
                              </a>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="about-us page-about-us">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-6">

      <div className="about-us-images">

      <div className="about-img-1">
      <figure className="image-anime reveal">
      <img alt="Aarovia Group" src="/images/about-img-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>


      <div className="about-img-2">
      <figure className="image-anime reveal">
      <img alt="Premium Properties" src="/images/about-img-2.webp" loading="lazy" decoding="async"/>
      </figure>

      <div className="experience-counter">
      <h3><span className="counter">10</span>+</h3>
      <p>Years of real estate expertise</p>
      </div>

      </div>


      <div className="feedback-counter">
      <p><span className="counter">98</span>%</p>
      <h3>client satisfaction rate</h3>
      </div>

      </div>

      </div>
      <div className="col-lg-6">

      <div className="about-us-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">about aarovia</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Trusted real estate solutions for{" "}
                                  <span>homes, plots &amp; farm lands</span>
      </h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group is dedicated to helping buyers and investors 
                                  discover premium apartments, luxury villas, villa plots, farm lands, 
                                  and commercial properties across Bangalore’s fastest-growing locations. 
                                  Our mission is to provide transparent guidance, trusted property solutions, 
                                  and complete support from property selection to final ownership.
                              </p>
      </div>


      <div className="about-us-content-body">

      <div className="about-us-content-info">

      <div className="about-us-content-list wow fadeInUp" data-wow-delay="0.4s">
      <ul>
      <li>trusted real estate expertise</li>
      <li>customer-focused property solutions</li>
      </ul>
      </div>


      <div className="about-us-content-btn wow fadeInUp" data-wow-delay="0.6s">
      <a className="btn-default" href="/contact">
                                          contact now
                                      </a>
      </div>

      </div>


      <div className="about-us-contact-list">

      <div className="about-contact-item wow fadeInUp" data-wow-delay="0.4s">
      <div className="icon-box" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#d9d9d9", borderRadius: "50%", width: "52px", height: "52px" }}>
      <i className="fa-solid fa-phone" style={{ fontSize: "24px", color: "#fff" }}></i>
      </div>
      <div className="about-contact-content">
      <p>need property assistance?</p>
    <h3>+91 8062179342</h3>
      </div>
      </div>


      <div className="about-contact-item wow fadeInUp" data-wow-delay="0.6s">
      <div className="icon-box">
      <figure className="image-anime">
      <img alt="AAROVIA Team" src="/images/author-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="about-contact-content">
      <h3>Aarovia Group</h3>
      <p>property consultants</p>
      </div>
      </div>

      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-12">

      <div className="about-facility-list">

      <div className="about-facility-item wow fadeInUp">
      <div className="icon-box">
      <img alt="" src="/images/icon-about-facility-1.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="about-facility-content">
      <h3>premium property options</h3>
      <p>
                                      We offer carefully selected apartments, villa plots, 
                                      farm lands, and investment properties in prime locations.
                                  </p>
      </div>
      </div>


      <div className="about-facility-item wow fadeInUp" data-wow-delay="0.2s">
      <div className="icon-box">
      <img alt="" src="/images/icon-about-facility-2.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="about-facility-content">
      <h3>trusted investment guidance</h3>
      <p>
                                      Our expert team helps clients make smart real estate investments 
                                      with strong appreciation and long-term value.
                                  </p>
      </div>
      </div>


      <div className="about-facility-item wow fadeInUp" data-wow-delay="0.4s">
      <div className="icon-box">
      <img alt="" src="/images/icon-about-facility-2.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="about-facility-content">
      <h3>end-to-end support</h3>
      <p>
                                      From site visits and legal verification to documentation 
                                      and registration, we ensure a smooth buying experience.
                                  </p>
      </div>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="vision-mission">
      <div className="container">
      <div className="row section-row align-items-center">
      <div className="col-lg-6">

      <div className="section-title dark-section">
      <h3 className="wow fadeInUp">vision mission</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                              Building trusted real estate experiences for{" "}
                              <span>buyers &amp; investors</span>
      </h2>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="section-title-content dark-section">
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                              Aarovia Group is committed to delivering premium property solutions 
                              including apartments, villa plots, farm lands, and investment opportunities 
                              across Bangalore’s fastest-growing locations.
                          </p>
      </div>

      </div>
      </div>
      <div className="row">
      <div className="col-lg-12">

      <div className="vision-mission-box">

      <div className="vision-mission-item wow fadeInUp">
      <div className="icon-box">
      <img alt="" src="/images/icon-our-vision.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="vision-mission-content">
      <h3>our vision</h3>
      <p>
                                      Our vision is to become one of Bangalore’s most trusted real estate brands 
                                      by helping individuals and investors discover premium homes, villa plots, 
                                      farm lands, and commercial properties with confidence and transparency. 
                                      We aim to create lasting value through quality developments, trusted guidance, 
                                      and customer-focused real estate solutions.
                                  </p>
      </div>
      </div>


      <div className="vision-mission-item wow fadeInUp" data-wow-delay="0.2s">
      <div className="icon-box">
      <img alt="" src="/images/icon-our-mission.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="vision-mission-content">
      <h3>our mission</h3>
      <p>
                                      Our mission is to provide complete real estate support with honesty, 
                                      professionalism, and market expertise. From apartments and luxury villas 
                                      to plotted developments and farm land investments, we are dedicated to 
                                      helping clients make secure and profitable property decisions while ensuring 
                                      a seamless buying experience from start to finish.
                                  </p>
      </div>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="best-selling">
      <div className="container">
      <div className="row">
      <div className="col-lg-6">

      <div className="best-selling-content">

      <div className="best-selling-content-img">
      <figure className="image-anime reveal">
      <img alt="Premium Real Estate" src="/images/best-selling-img-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>


      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  trusted real estate solutions
                              </h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Discover premium properties from{" "}
                                  <span>verified real estate opportunities</span>
      </h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group offers carefully selected apartments, villa plots, 
                                  farm lands, and commercial properties in Bangalore’s prime investment 
                                  locations with complete legal transparency and trusted guidance.
                              </p>
      </div>

      </div>

      </div>
      <div className="col-lg-6">

      <div className="best-selling-iamge">
      <figure className="image-anime reveal">
      <img alt="Luxury Properties" src="/images/best-selling-img-2.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-testimonials">
      <div className="container-fluid">
      <div className="row no-gutters">
      <div className="col-lg-6">

      <div className="our-testimonials-image">
      <figure className="image-anime">
      <img alt="AAROVIA Clients" src="./images/testimonial-img.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="our-testimonial-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  client testimonials
                              </h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Trusted by property buyers, investors &amp;{" "}
                                  <span>real estate clients across Bangalore.</span>
      </h2>
      </div>


      <div className="testimonial-slider">
      <div className="swiper">
      <div className="swiper-wrapper" data-cursor-text="Drag">

      <div className="swiper-slide">
      <div className="testimonial-item">
      <div className="testimonial-rating">
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      </div>
      <div className="testimonial-body">
      <div className="testimonial-content">
      <p>
                                                          AAROVIA helped us find the perfect villa plot in 
                                                          North Bangalore with complete legal clarity and 
                                                          excellent investment potential. Their professional 
                                                          guidance made the entire process smooth and stress-free.
                                                      </p>
      </div>
      </div>
      <div className="testimonial-body">
      <div className="author-image">
      <figure className="image-anime">
      <img alt="Client" src="/images/author-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="author-content">
      <h3>Rahul Sharma</h3>
      <p>property investor</p>
      </div>
      </div>
      </div>
      </div>


      <div className="swiper-slide">
      <div className="testimonial-item">
      <div className="testimonial-rating">
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      </div>
      <div className="testimonial-content">
      <p>
                                                      We were searching for premium farm land near Bangalore 
                                                      and AAROVIA provided excellent options with transparent 
                                                      documentation and expert support. Highly recommended for 
                                                      anyone looking for trusted real estate services.
                                                  </p>
      </div>
      <div className="testimonial-body">
      <div className="author-image">
      <figure className="image-anime">
      <img alt="Client" src="/images/author-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="author-content">
      <h3>Priya Reddy</h3>
      <p>home buyer</p>
      </div>
      </div>
      </div>
      </div>

      </div>
      </div>
      </div>


      <div className="testimonial-rating-counter">
      <div className="rating-counter">
      <h2><span className="counter">4.9</span></h2>
      </div>
      <div className="testimonial-rating-content">
      <div className="testimonial-client-rating">
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      </div>
      <p>3,500+ happy clients</p>
      </div>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-team">
      <div className="container">
      <div className="row section-row align-items-center">
      <div className="col-lg-5">

      <div className="section-title">
      <h3 className="wow fadeInUp">meet our team</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                              Experienced professionals driving{" "}
                              <span>trusted real estate solutions</span>
      </h2>
      </div>

      </div>
      <div className="col-lg-7">

      <div className="section-title-content">
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                              Our dedicated team combines market expertise, property knowledge, 
                              and customer-focused service to help clients discover premium apartments, 
                              villa plots, farm lands, and investment opportunities across Bangalore.
                          </p>
      </div>

      </div>
      </div>
      <div className="row">

      <div className="col-lg-6 col-md-6">
      <div className="team-member-item wow fadeInUp">
      <div className="team-image">
      <a data-cursor-text="View" href="https://www.linkedin.com/in/karishmah-siingh09" target="_blank" rel="noreferrer">
      <figure className="image-anime">
      <img alt="Karishmah Singh" src="/images/team.3.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      <div className="team-readmore-btn">
      <a href="https://www.linkedin.com/in/karishmah-siingh09" target="_blank" rel="noreferrer"><img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/></a>
      </div>
      </div>
      <div className="team-body">
      <div className="team-content">
      <h3>Karishmah Singh</h3>
      <p>CEO</p>
      </div>
      <div className="team-social-list">
      <div className="team-social-icon">
      <ul>
      <li><a href="https://www.linkedin.com/in/karishmah-siingh09" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></li>
      </ul>
      </div>
      </div>
      </div>
      </div>
      </div>

      <div className="col-lg-6 col-md-6">
      <div className="team-member-item wow fadeInUp" data-wow-delay="0.2s">
      <div className="team-image">
      <a data-cursor-text="View" href="https://www.linkedin.com/in/vivek-hangal-27b3698" target="_blank" rel="noreferrer">
      <figure className="image-anime">
      <img alt="Vivek Hangal" src="/images/team.2.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      <div className="team-readmore-btn">
      <a href="https://www.linkedin.com/in/vivek-hangal-27b3698" target="_blank" rel="noreferrer"><img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/></a>
      </div>
      </div>
      <div className="team-body">
      <div className="team-content">
      <h3>Vivek Hangal</h3>
      <p>Managing Director</p>
      </div>
      <div className="team-social-list">
      <div className="team-social-icon">
      <ul>
      <li><a href="https://www.linkedin.com/in/vivek-hangal-27b3698" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></li>
      </ul>
      </div>
      </div>
      </div>
      </div>
      </div>

      </div>
      </div>
      </div>


      <div className="how-we-work">
      <div className="container">
      <div className="row section-row align-items-center">
      <div className="col-lg-6">

      <div className="section-title dark-section">
      <h3 className="wow fadeInUp">how we work</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">From property search to <span>final ownership</span></h2>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="section-title-content dark-section">
      <p className="wow fadeInUp" data-wow-delay="0.2s">Our streamlined process ensures a smooth real estate journey, helping you find, evaluate, and secure the right property in Bangalore with confidence.</p>
      </div>

      </div>
      </div>
      <div className="row">
      <div className="col-lg-12">

      <div className="how-we-work-list">

      <div className="how-we-work-item wow fadeInUp">
      <div className="icon-box">
      <img alt="" src="/images/icon-how-we-work-1.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="how-we-work-content">
      <h3>01. requirement analysis</h3>
      <p>We understand your budget, preferred location, and property goals to shortlist the best options.</p>
      </div>
      </div>


      <div className="how-we-work-item wow fadeInUp" data-wow-delay="0.2s">
      <div className="icon-box">
      <img alt="" src="/images/icon-how-we-work-2.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="how-we-work-content">
      <h3>02. property shortlisting</h3>
      <p>We present verified apartments, villas, and investment options that match your exact needs.</p>
      </div>
      </div>


      <div className="how-we-work-item wow fadeInUp" data-wow-delay="0.4s">
      <div className="icon-box">
      <img alt="" src="/images/icon-how-we-work-3.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="how-we-work-content">
      <h3>03. site visits &amp; evaluation</h3>
      <p>We arrange site visits and provide expert insights to help you make an informed decision.</p>
      </div>
      </div>


      <div className="how-we-work-item wow fadeInUp" data-wow-delay="0.6s">
      <div className="icon-box">
      <img alt="" src="/images/icon-how-we-work-4.svg" loading="lazy" decoding="async"/>
      </div>
      <div className="how-we-work-content">
      <h3>04. booking &amp; documentation</h3>
      <p>We assist with negotiations, legal checks, and documentation to ensure a secure purchase.</p>
      </div>
      </div>

      </div>


      <div className="how-work-company-slider">
      <div className="swiper">
      <div className="swiper-wrapper">
      {namedProjects.filter((project) => project.logo).map((project) => (
        <div className="swiper-slide" key={project.name}>
          <div className="company-logo">
            <img src={project.logo} alt={`${project.name} logo`} loading="lazy" decoding="async"/>
          </div>
        </div>
      ))}

      </div>
      </div>
      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-faqs">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-7">

      <div className="our-faqs-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  frequently asked questions
                              </h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Have any questions about{" "}
                                  <span>real estate investments?</span>
      </h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group helps buyers and investors make confident property 
                                  decisions with trusted guidance for apartments, villa plots, farm lands, 
                                  and premium investment opportunities across Bangalore.
                              </p>
      </div>


      <div className="faq-accordion" id="accordion">

      <div className="accordion-item wow fadeInUp">
      <h2 className="accordion-header" id="heading1">
      <button aria-controls="collapse1" aria-expanded="true" className="accordion-button" data-bs-target="#collapse1" data-bs-toggle="collapse" type="button">
      <span>1.</span>
                                          What types of properties does AAROVIA offer?
                                      </button>
      </h2>
      <div aria-labelledby="heading1" className="accordion-collapse collapse show" data-bs-parent="#accordion" id="collapse1">
      <div className="accordion-body">
      <p>
                                              We offer premium apartments, luxury villas, villa plots, 
                                              gated community projects, farm lands, and commercial investment 
                                              properties in Bangalore’s prime locations.
                                          </p>
      </div>
      </div>
      </div>


      <div className="accordion-item wow fadeInUp" data-wow-delay="0.2s">
      <h2 className="accordion-header" id="heading2">
      <button aria-controls="collapse2" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapse2" data-bs-toggle="collapse" type="button">
      <span>2.</span>
                                          Does AAROVIA provide legal verification for properties?
                                      </button>
      </h2>
      <div aria-labelledby="heading2" className="accordion-collapse collapse" data-bs-parent="#accordion" id="collapse2">
      <div className="accordion-body">
      <p>
                                              Yes, our team assists clients with property verification, 
                                              documentation checks, and legal guidance to ensure safe and 
                                              transparent real estate transactions.
                                          </p>
      </div>
      </div>
      </div>


      <div className="accordion-item wow fadeInUp" data-wow-delay="0.4s">
      <h2 className="accordion-header" id="heading3">
      <button aria-controls="collapse3" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapse3" data-bs-toggle="collapse" type="button">
      <span>3.</span>
                                          Are farm lands and plotted developments available for investment?
                                      </button>
      </h2>
      <div aria-labelledby="heading3" className="accordion-collapse collapse" data-bs-parent="#accordion" id="collapse3">
      <div className="accordion-body">
      <p>
                                              Absolutely. AAROVIA specializes in premium plotted developments 
                                              and farm land investment opportunities with strong appreciation 
                                              potential near Bangalore’s growth corridors.
                                          </p>
      </div>
      </div>
      </div>


      <div className="accordion-item wow fadeInUp" data-wow-delay="0.6s">
      <h2 className="accordion-header" id="heading4">
      <button aria-controls="collapse4" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapse4" data-bs-toggle="collapse" type="button">
      <span>4.</span>
                                          How does the property buying process work with AAROVIA?
                                      </button>
      </h2>
      <div aria-labelledby="heading4" className="accordion-collapse collapse" data-bs-parent="#accordion" id="collapse4">
      <div className="accordion-body">
      <p>
                                              Our process includes property consultation, site visits, 
                                              project shortlisting, legal support, booking assistance, 
                                              and final registration to provide a smooth and hassle-free experience.
                                          </p>
      </div>
      </div>
      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-5">

      <div className="our-faqs-image">
      <figure className="image-anime reveal">
      <img alt="AAROVIA FAQ" src="/images/faqs-image.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-clients">
      <div className="container">
      <div className="row">
      <div className="col-lg-12">
      <div className="our-clients-box">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  our clients
                              </h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                                  Helping hundreds of buyers &amp; investors find trusted real estate opportunities
                              </h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Aarovia Group has helped property buyers, investors, and families 
                                  discover premium apartments, villa plots, farm lands, and investment properties 
                                  across Bangalore. Our customer-focused approach ensures transparency, trusted 
                                  guidance, and long-term value in every real estate transaction.
                              </p>
      </div>


      <div className="our-client-slider">
      <div className="swiper">
      <div className="swiper-wrapper">

      <div className="swiper-slide">
      <div className="client-logo">
      <img alt="" src="/images/client-logo.svg" loading="lazy" decoding="async"/>
      </div>
      </div>


      <div className="swiper-slide">
      <div className="client-logo">
      <img alt="" src="/images/client-logo-2.svg" loading="lazy" decoding="async"/>
      </div>
      </div>


      <div className="swiper-slide">
      <div className="client-logo">
      <img alt="" src="/images/client-logo-3.svg" loading="lazy" decoding="async"/>
      </div>
      </div>


      <div className="swiper-slide">
      <div className="client-logo">
      <img alt="" src="/images/client-logo-4.svg" loading="lazy" decoding="async"/>
      </div>
      </div>


      <div className="swiper-slide">
      <div className="client-logo">
      <img alt="" src="/images/client-logo.svg" loading="lazy" decoding="async"/>
      </div>
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
