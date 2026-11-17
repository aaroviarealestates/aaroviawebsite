import FeaturedProjects from "@/components/FeaturedProjects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPoster from "@/components/HeroPoster";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  title: "Projects | Aarovia Group",
  description: "Explore Aarovia Group premium real estate projects in Bangalore including luxury apartments, villas, villa plots, farm lands, commercial spaces, and investment properties.",
  path: "/projects",
});

export default async function ProjectsPage() {
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
                  <h3 className="wow fadeInUp">aarovia featured projects</h3>
                  <h1 className="text-anime-style-2" data-cursor="-opaque">
                    Discover premium apartments, villa plots &amp; <span>farm land investment opportunities</span>
                  </h1>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    Explore AAROVIA&apos;s curated portfolio of luxury apartments, premium villas, gated community homes,
                    plotted developments, and farm lands across Bangalore. Our featured projects are selected for their
                    prime locations, future growth potential, modern infrastructure, and long-term investment value.
                  </p>
                </div>
                <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
                  <a href="/projects" className="btn-default">explore projects</a>
                  <a href="/contact" className="btn-default btn-highlighted">schedule site visit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProjects />
      <Footer />
    </>
  );
}
