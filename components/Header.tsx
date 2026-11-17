import { getSiteSettings } from "@/lib/site-content";
import { propertiesEnabled } from "@/lib/features";

const navigationLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/services", label: "SERVICES" },
  { href: "/projects", label: "PROJECTS" },
  ...(propertiesEnabled ? [{ href: "/properties", label: "PROPERTIES" }] : []),
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACT US" },
];

export default async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="main-header">
      <div className="header-sticky">
        <nav className="container">
          <div className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
              <img src={settings.logoUrl} alt={settings.logoAlt} width={200} height={44} />
            </a>

            <div className="collapse navbar-collapse main-menu">
              <div className="nav-menu-wrapper">
                <ul className="navbar-nav mr-auto">
                  {navigationLinks.map((item) => (
                    <li className="nav-item" key={item.href}>
                      <a className="nav-link" href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-now-box d-inline-flex">
                <div className="icon-box">
                  <img src={settings.headerPhoneIcon} alt="" />
                </div>
                <div className="contact-now-box-content">
                  <p>{settings.headerPhoneLabel}</p>
                  <h3><a href={`tel:${settings.headerPhone.replace(/[^0-9+]/g, "")}`}>{settings.headerPhone}</a></h3>
                </div>
              </div>
            </div>

            <div className="mobile-nav">
              <details>
                <summary aria-label="Toggle site navigation">
                  <span />
                  <span />
                  <span />
                </summary>
                <nav aria-label="Mobile navigation">
                  <ul>
                    {navigationLinks.map((item) => (
                      <li key={item.href}><a href={item.href}>{item.label}</a></li>
                    ))}
                  </ul>
                </nav>
              </details>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
