import type { Metadata } from "next";
import FeaturedProjects from "@/components/FeaturedProjects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPoster from "@/components/HeroPoster";
import IntroVideo from "@/components/IntroVideo";
import { getNamedProjects } from "@/lib/featured-projects-data";
import { getSiteSettings } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.defaultSeoTitle,
    description: settings.defaultSeoDescription,
    alternates: { canonical: "https://www.aaroviagroup.com" },
    openGraph: { title: settings.defaultSeoTitle, description: settings.defaultSeoDescription, images: [settings.defaultOgImage] },
  };
}

export default async function HomePage() {
  const [settings, namedProjects] = await Promise.all([getSiteSettings(), getNamedProjects()]);
  return (
    <>
      <Header />








      <div className="hero hero-video">
      <HeroPoster src={settings.homeHeroPoster} />

      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-10">

      <div className="hero-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">{settings.homeHeroEyebrow}</h3>
      <h1 className="text-anime-style-2" data-cursor="-opaque">
                                  {settings.homeHeroTitle}{" "}
                                  <span>{settings.homeHeroHighlight}</span>
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  {settings.homeHeroDescription}
                              </p>
      </div>


      <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
      <a className="btn-default" href={settings.homeHeroPrimaryUrl}>{settings.homeHeroPrimaryLabel}</a>
    <a className="btn-default btn-highlighted" href={settings.homeHeroSecondaryUrl}>
                                  {settings.homeHeroSecondaryLabel}
                              </a>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="about-us">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-6">

      <div className="about-us-images">

      <div className="about-img-1">
      <figure className="image-anime reveal">
      <img alt="" src={settings.homeAboutImage} loading="lazy" decoding="async"/>
      </figure>
      </div>


      <div className="about-img-2">
      <figure className="image-anime reveal">
      <img alt="" src="/images/3958.webp" loading="lazy" decoding="async"/>
      </figure>

      <div className="experience-counter">
      <h3><span className="counter">10</span>+</h3>
      <p>Years in real estate</p>
      </div>

      </div>


      <div className="feedback-counter">
      <p><span className="counter">98</span>%</p>
      <h3>client satisfaction</h3>
      </div>

      </div>

      </div>
      <div className="col-lg-6">

      <div className="about-us-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">about aarovia</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">{settings.homeAboutHeading} <span>{settings.homeAboutHighlight}</span></h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">{settings.homeAboutDescription}</p>
      </div>


      <div className="about-us-content-body">

      <div className="about-us-content-info">

      <div className="about-us-content-list wow fadeInUp" data-wow-delay="0.4s">
      <ul>
      <li>verified properties &amp; trusted developers</li>
      <li>investment-focused property guidance</li>
      </ul>
      </div>


      <div className="about-us-content-btn wow fadeInUp" data-wow-delay="0.6s">
      <a className="btn-default" href="/about">read more</a>
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
      <div className="icon-box" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", overflow: "hidden", borderRadius: "50%" }}>
      <figure className="image-anime" style={{ margin: 0, width: "100%", height: "100%" }}>
      <img alt="" src="/images/author-1.webp" style={{ width: "100%", height: "100%", objectFit: "cover" }}  loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="about-contact-content">
      <h3>aarovia team</h3>
      <p>real estate experts</p>
      </div>
      </div>

      </div>

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
      <h3 className="wow fadeInUp">why choose aarovia</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">A smarter way to invest in <span>Bangalore real estate</span></h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">From property discovery to final deal closure, AAROVIA ensures a seamless, transparent, and profitable real estate experience in Bangalore’s top locations.</p>
      </div>


      <div className="why-choose-item-list">

      <div className="why-choose-item wow fadeInUp" data-wow-delay="0.4s">

      <div className="icon-box">
      <img alt="" src="/images/icon-why-choose-1.svg" loading="lazy" decoding="async"/>
      </div>


      <div className="why-choose-item-content">
      <h3>verified premium properties</h3>
      <p>We offer handpicked apartments and villas from trusted developers in Bangalore’s prime locations.</p>
      </div>

      </div>


      <div className="why-choose-item wow fadeInUp" data-wow-delay="0.6s">

      <div className="icon-box">
      <img alt="" src="/images/icon-why-choose-2.svg" loading="lazy" decoding="async"/>
      </div>


      <div className="why-choose-item-content">
      <h3>end-to-end property assistance</h3>
      <p>From site visits to documentation and final purchase, we manage the entire process smoothly.</p>
      </div>

      </div>


      <div className="why-choose-item wow fadeInUp" data-wow-delay="0.8s">

      <div className="icon-box">
      <img alt="" src="/images/icon-why-choose-3.svg" loading="lazy" decoding="async"/>
      </div>


      <div className="why-choose-item-content">
      <h3>high ROI investment guidance</h3>
      <p>Our experts help you choose properties with strong appreciation potential and rental returns.</p>
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
      <img alt="" src="/images/188686.webp" loading="lazy" decoding="async"/>
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
      <img alt="" src="/images/30046.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-services">
      <div className="container">

      <div className="row section-row align-items-center">
      <div className="col-lg-6">

      <div className="section-title">
      <h3 className="wow fadeInUp">our services</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">
                              Complete real estate solutions for{" "}
                              <span>homes, plots &amp; farmland investments</span>
      </h2>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="section-title-content">
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                              Aarovia Group offers premium property solutions in Bangalore including 
                              residential apartments, villa plots, farmland investments, commercial properties, 
                              and complete end-to-end real estate guidance for buyers and investors.
                          </p>
      </div>

      </div>
      </div>

      <div className="row">

      <div className="col-lg-4 col-md-6">
      <div className="service-item wow fadeInUp">

      <div className="service-image">
      <a data-cursor-text="View" href="/service-single">
      <figure className="image-anime">
      <img alt="Residential Properties" src="/images/service-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/service-single">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/service-single">
                                      residential properties
                                  </a>
      </h3>
      <p>
                                  Explore premium apartments, luxury villas, gated communities, 
                                  and ready-to-move homes in Bangalore’s top investment locations.
                              </p>
      </div>

      </div>
      </div>

      <div className="col-lg-4 col-md-6">
      <div className="service-item wow fadeInUp" data-wow-delay="0.2s">

      <div className="service-image">
      <a data-cursor-text="View" href="/service-single">
      <figure className="image-anime">
      <img alt="Plots and Villa Sites" src="/images/2249.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/service-single">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/service-single">
                                      plots &amp; villa sites
                                  </a>
      </h3>
      <p>
                                  Invest in premium residential plots, gated layouts, and villa sites 
                                  with excellent connectivity and high future appreciation potential.
                              </p>
      </div>

      </div>
      </div>

      <div className="col-lg-4 col-md-6">
      <div className="service-item wow fadeInUp" data-wow-delay="0.4s">

      <div className="service-image">
      <a data-cursor-text="View" href="/service-single">
      <figure className="image-anime">
      <img alt="Farmland Investments" src="/images/9227.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/service-single">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/service-single">
                                      farmland investments
                                  </a>
      </h3>
      <p>
                                  Discover secure farmland and agricultural land opportunities 
                                  ideal for eco living, long-term wealth creation, and weekend retreats.
                              </p>
      </div>

      </div>
      </div>

      <div className="col-lg-4 col-md-6">
      <div className="service-item wow fadeInUp" data-wow-delay="0.6s">

      <div className="service-image">
      <a data-cursor-text="View" href="/service-single">
      <figure className="image-anime">
      <img alt="Commercial Properties" src="/images/3953.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/service-single">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/service-single">
                                      commercial properties
                                  </a>
      </h3>
      <p>
                                  Find strategically located office spaces, retail shops, 
                                  commercial plots, and income-generating investment properties.
                              </p>
      </div>

      </div>
      </div>

      <div className="col-lg-4 col-md-6">
      <div className="service-item wow fadeInUp" data-wow-delay="0.8s">

      <div className="service-image">
      <a data-cursor-text="View" href="/service-single">
      <figure className="image-anime">
      <img alt="Investment Advisory" src="/images/189140.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/service-single">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/service-single">
                                      investment advisory
                                  </a>
      </h3>
      <p>
                                  Get expert guidance on high ROI property investments, 
                                  market trends, legal verification, and future growth opportunities.
                              </p>
      </div>

      </div>
      </div>

      <div className="col-lg-4 col-md-6">
      <div className="service-item wow fadeInUp" data-wow-delay="1s">

      <div className="service-image">
      <a data-cursor-text="View" href="/service-single">
      <figure className="image-anime">
      <img alt="Buying Support" src="/images/service-3.webp" loading="lazy" decoding="async"/>
      </figure>
      </a>
      </div>


      <div className="service-btn">
      <a href="/service-single">
      <img alt="" src="/images/arrow-white.svg" loading="lazy" decoding="async"/>
      </a>
      </div>


      <div className="service-content">
      <h3>
      <a href="/service-single">
                                      end-to-end buying support
                                  </a>
      </h3>
      <p>
                                  From property selection and site visits to documentation, 
                                  registration, and final handover, we ensure a seamless experience.
                              </p>
      </div>

      </div>
      </div>

      <div className="col-lg-12">
      <div className="all-services-btn wow fadeInUp" data-wow-delay="1.2s">
      <a className="btn-default" href="/services">
                              explore all services
                          </a>
      </div>
      </div>

      </div>
      </div>
      </div>


      <IntroVideo />


      <FeaturedProjects />


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
            <img src={project.logo} alt={`${project.name} logo`}  loading="lazy" decoding="async"/>
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


      <div className="our-skill">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-6">

      <div className="our-skill-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">our expertise</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">Expertise that helps you find your <span>perfect property</span></h2>
      <p className="wow fadeInUp" data-wow-delay="0.2s">Our experienced team combines market knowledge, data insights, and strong developer networks to help you make the best real estate decisions in Bangalore.</p>
      </div>


      <div className="our-skillbar">

      <div className="skills-progress-bar">

      <div className="skillbar" data-percent="95%">
      <div className="skill-data">
      <div className="skill-title">property market analysis</div>
      <div className="skill-no">95%</div>
      </div>
      <div className="skill-progress">
      <div className="count-bar"></div>
      </div>
      </div>

      </div>


      <div className="skills-progress-bar">

      <div className="skillbar" data-percent="90%">
      <div className="skill-data">
      <div className="skill-title">investment advisory &amp; ROI planning</div>
      <div className="skill-no">90%</div>
      </div>
      <div className="skill-progress">
      <div className="count-bar"></div>
      </div>
      </div>

      </div>


      <div className="skills-progress-bar">

      <div className="skillbar" data-percent="85%">
      <div className="skill-data">
      <div className="skill-title">legal support &amp; documentation</div>
      <div className="skill-no">85%</div>
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


      <div className="our-testimonials">
      <div className="container-fluid">
      <div className="row no-gutters">
      <div className="col-lg-6">

      <div className="our-testimonials-image">
      <figure className="image-anime">
      <img alt="" src="./images/testimonial-img.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="our-testimonial-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">client testimonials</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque">Trusted by homebuyers &amp; <span>real estate investors</span></h2>
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
      <p>AAROVIA helped me find the perfect apartment in Bangalore within my budget. Their team handled everything from site visits to final documentation smoothly.</p>
      </div>
      </div>
      <div className="testimonial-body">
      <div className="author-image">
      <figure className="image-anime">
      <img alt="" src="/images/author-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="author-content">
      <h3>Rahul Sharma</h3>
      <p>IT Professional</p>
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
      <p>Excellent investment guidance! I purchased a property through AAROVIA that is already giving great rental returns. Highly professional and transparent service.</p>
      </div>
      <div className="testimonial-body">
      <div className="author-image">
      <figure className="image-anime">
      <img alt="" src="/images/author-1.webp" loading="lazy" decoding="async"/>
      </figure>
      </div>
      <div className="author-content">
      <h3>Anita Verma</h3>
      <p>Business Owner</p>
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
      <p>3,200+ satisfied clients</p>
      </div>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>


      <div className="our-blog">
      <div className="container">
      <div className="row section-row align-items-center">
      <div className="col-lg-6">

      <div className="section-title">
      <h3 className="wow fadeInUp">latest insights</h3>
      <h2 className="text-anime-style-2" data-cursor="-opaque"><span>Your guide to</span> Bangalore real estate</h2>
      </div>

      </div>
      <div className="col-lg-6">

      <div className="section-title-content">
      <p className="wow fadeInUp" data-wow-delay="0.2s">Stay updated with property trends, investment tips, and expert insights to make smarter real estate decisions in Bangalore.</p>
      </div>

      </div>
      </div>
      <div className="row">
      <div className="col-lg-4 col-md-6">

      <div className="post-item wow fadeInUp">

      <div className="post-featured-image">
      <figure>
      <a className="image-anime" data-cursor-text="View" href="/blog/best-areas-in-bangalore-for-real-estate-investment-in-2026">
      <img alt="" src="/images/post-1.webp" loading="lazy" decoding="async"/>
      </a>
      </figure>
      </div>


      <div className="post-item-body">

      <div className="post-item-content">
      <h3><a href="/blog/best-areas-in-bangalore-for-real-estate-investment-in-2026">Best Areas in Bangalore for Real Estate Investment in 2026</a></h3>
      </div>


      <div className="post-item-btn">
      <a className="post-btn" href="/blog/best-areas-in-bangalore-for-real-estate-investment-in-2026">read more</a>
      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="post-item wow fadeInUp" data-wow-delay="0.2s">

      <div className="post-featured-image">
      <figure>
      <a className="image-anime" data-cursor-text="View" href="/blog/why-villa-plots-are-becoming-the-top-choice-for-investors">
      <img alt="" src="/images/post-2.webp" loading="lazy" decoding="async"/>
      </a>
      </figure>
      </div>


      <div className="post-item-body">

      <div className="post-item-content">
      <h3><a href="/blog/why-villa-plots-are-becoming-the-top-choice-for-investors">Why Villa Plots Are Becoming the Top Choice for Investors</a></h3>
      </div>


      <div className="post-item-btn">
      <a className="post-btn" href="/blog/why-villa-plots-are-becoming-the-top-choice-for-investors">read more</a>
      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-4 col-md-6">

      <div className="post-item wow fadeInUp" data-wow-delay="0.4s">

      <div className="post-featured-image">
      <figure>
      <a className="image-anime" data-cursor-text="View" href="/blog/complete-guide-to-buying-farm-lands-near-bangalore">
      <img alt="" src="/images/post-3.webp" loading="lazy" decoding="async"/>
      </a>
      </figure>
      </div>


      <div className="post-item-body">

      <div className="post-item-content">
      <h3><a href="/blog/complete-guide-to-buying-farm-lands-near-bangalore">Complete Guide to Buying Farm Lands Near Bangalore</a></h3>
      </div>


      <div className="post-item-btn">
      <a className="post-btn" href="/blog/complete-guide-to-buying-farm-lands-near-bangalore">read more</a>
      </div>

      </div>

      </div>

      </div>
      <div className="col-lg-12">

      <div className="our-blog-footer wow fadeInUp" data-wow-delay="0.6s">
      <a className="btn-default" href="/blog">See All Blogs</a>
      </div>

      </div>
      </div>
      </div>
      </div>





      <a className="floating-whatsapp" href="https://wa.me/918062179342" target="_blank">
      <i className="fab fa-whatsapp"></i>
      <span>Get in Touch</span>
      </a>


































      <Footer />
    </>
  );
}
