import { getSiteSettings } from "@/lib/site-content";

export default async function MobileBottomNav() {
  const settings = await getSiteSettings();
  const phone = settings.contactPhone.replace(/[^0-9+]/g, "");

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile quick actions">
      <a href="/contact" className="mobile-bottom-nav-item">
        <i className="fa-solid fa-calendar-check" aria-hidden="true"></i>
        <span>Property Visit</span>
      </a>
      <a href="/contact" className="mobile-bottom-nav-item">
        <i className="fa-solid fa-house" aria-hidden="true"></i>
        <span>Property Advice</span>
      </a>
      <a href={settings.whatsappUrl} className="mobile-bottom-nav-item" target="_blank" rel="noreferrer">
        <i className="fa-solid fa-comments" aria-hidden="true"></i>
        <span>Live Chat</span>
      </a>
      <a href={`tel:${phone}`} className="mobile-bottom-nav-item">
        <i className="fa-solid fa-phone" aria-hidden="true"></i>
        <span>Call</span>
      </a>
      <a href="/services" className="mobile-bottom-nav-item">
        <i className="mobile-more-icon" aria-hidden="true"><span></span><span></span><span></span></i>
        <span>More</span>
      </a>
    </nav>
  );
}
