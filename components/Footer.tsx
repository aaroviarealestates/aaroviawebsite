import { getSiteSettings } from "@/lib/site-content";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-header">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="footer-logo">
                    <img src={settings.footerLogoUrl} alt={settings.logoAlt} width={200} height={44}  loading="lazy" decoding="async"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-social-links">
                    <div className="footer-social-link-title">
                      <h3>follow aarovia</h3>
                    </div>
                    <ul>
                      {settings.facebookUrl && <li><a href={settings.facebookUrl}><i className="fa-brands fa-facebook-f"></i></a></li>}
                      {settings.linkedinUrl && <li><a href={settings.linkedinUrl}><i className="fa-brands fa-linkedin-in"></i></a></li>}
                      {settings.instagramUrl && <li><a href={settings.instagramUrl}><i className="fa-brands fa-instagram"></i></a></li>}
                      {settings.xUrl && <li><a href={settings.xUrl}><i className="fa-brands fa-x-twitter"></i></a></li>}
                      {settings.youtubeUrl && <li><a href={settings.youtubeUrl}><i className="fa-brands fa-youtube"></i></a></li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-links">
              <h3>quick links</h3>
              <ul>
                <li><a href="/about">about aarovia</a></li>
                <li><a href="/services">our services</a></li>
                <li><a href="/projects">featured properties</a></li>
                <li><a href="/blog">real estate insights</a></li>
                <li><a href="/contact">contact us</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-links">
              <h3>property categories</h3>
              <ul>
                <li><a href="/luxury-apartments">luxury apartments</a></li>
                <li><a href="/villa-plots">villa plots</a></li>
                <li><a href="/farm-lands">farm lands</a></li>
                <li><a href="/premium-villas">premium villas</a></li>
                <li><a href="/residential">residential properties</a></li>
                <li><a href="/commercial">commercial properties</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-contact-box footer-links">
              <h3>contact us</h3>
              <div className="footer-contact-item">
                <div className="icon-box"><i className="fa-solid fa-phone"></i></div>
                <div className="footer-contact-content"><p>{settings.contactPhone}</p></div>
              </div>
              <div className="footer-contact-item">
                <div className="icon-box"><i className="fa-solid fa-envelope"></i></div>
                <div className="footer-contact-content"><p>{settings.contactEmail}</p></div>
              </div>
              <div className="footer-contact-item">
                <div className="icon-box"><i className="fa-solid fa-location-dot"></i></div>
                <div className="footer-contact-content">
                  <p>{settings.contactAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-latest-news footer-links">
              <h3>aarovia support</h3>
              <div className="footer-newsletter-form">
                <ul>
                  <li><a href="/privacy-policy">privacy policy</a></li>
                  <li><a href="/terms-conditions">terms &amp; conditions</a></li>
                  <li><a href="/faqs">faqs</a></li>
                  <li><a href="/help">help &amp; support</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="row">
            <div className="col-md-12">
              <div className="footer-copyright-text">
                <p>{settings.copyrightText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
