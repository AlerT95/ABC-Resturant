
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-alt fw-medium">
      <span className="text-dark-emphasis">
        {currentYear} © ABC - Theme by ICBT
      </span>
    </footer>
  );
};

export default Footer;