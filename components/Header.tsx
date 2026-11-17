import { getSiteSettings } from "@/lib/site-content";

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
                <ul className="navbar-nav mr-auto" id="menu">
                  <li className="nav-item"><a className="nav-link" href="/">HOME</a></li>
                  <li className="nav-item"><a className="nav-link" href="/about">ABOUT US</a></li>
                  <li className="nav-item"><a className="nav-link" href="/services">SERVICES</a></li>
                  <li className="nav-item"><a className="nav-link" href="/projects">PROJECTS</a></li>
                  <li className="nav-item"><a className="nav-link" href="/properties">PROPERTIES</a></li>
                  <li className="nav-item"><a className="nav-link" href="/blog">BLOG</a></li>
                  <li className="nav-item"><a className="nav-link" href="/contact">CONTACT US</a></li>
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

            <div className="navbar-toggle"></div>
          </div>
        </nav>
        <div className="responsive-menu"></div>
      </div>
    </header>
  );
}
