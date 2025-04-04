import React from "react";
import { ArrowRight, Instagram, Youtube, ChevronRight } from "lucide-react";

interface FooterProps {
  companyName?: string;
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "BIBLIOTECA DIGITAL",
  year = new Date().getFullYear(),
}) => {
  return (
    <footer className="bg-gradient-to-r from-stone-900 to-black text-white py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="mb-8 md:mb-0">
          <div className="flex items-center mb-8">
            <div className="mr-3">
              <div className="flex">
                <div className="w-3 h-10 bg-white mr-1"></div>
                <div className="w-3 h-10 bg-white mr-1"></div>
                <div className="w-3 h-10 bg-white"></div>
              </div>
            </div>
            <div>
              <div className="text-xl font-serif italic">Telepathic</div>
              <div className="text-xl font-serif font-semibold">
                Instruments
              </div>
            </div>
          </div>
          <div className="text-sm text-white/60">
            © {year} {companyName}
          </div>
        </div>

        <div className="mb-8 md:mb-0 md:w-1/3 md:ml-auto md:mr-8">
          <p className="text-lg mb-6 font-serif ml-8">
            Sign up for the latest updates.
          </p>
          <div className="flex max-w-md mb-4">
            <input
              type="email"
              placeholder="ENTER EMAIL"
              className="w-full py-3 px-6 bg-white/10 text-white border border-white/20 outline-none rounded-l-full placeholder-white/50 focus:border-white/40 transition-all duration-300"
            />
            <button className="bg-white text-black px-6 rounded-r-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300">
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="text-xs text-white/50 ml-8">
            Al suscribirte, aceptas recibir correos de marketing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <LinkGroup title="Políticas">
            <FooterLink href="#" label="RETURNS POLICY" />
            <FooterLink href="#" label="PRIVACY POLICY" />
            <FooterLink href="#" label="TERMS OF SERVICE" />
            <FooterLink href="#" label="WARRANTY" />
          </LinkGroup>

          <LinkGroup title="Síguenos">
            <FooterLink
              href="#"
              label="INSTAGRAM"
              icon={<Instagram size={16} />}
            />
            <FooterLink href="#" label="YOUTUBE" icon={<Youtube size={16} />} />
          </LinkGroup>
        </div>
      </div>

      <div className="container mx-auto mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-white/50 mb-4 md:mb-0">
            Diseñado con pasión en Buenos Aires, Argentina
          </div>
          <div>
            <a
              href="#"
              className="bg-white text-black py-2 px-8 rounded-full text-sm tracking-wider flex items-center transition-all duration-300 hover:bg-gray-200"
            >
              CONTACTO
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LinkGroup: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h3 className="text-sm font-medium uppercase tracking-wider text-white/80 mb-4">
      {title}
    </h3>
    <div className="flex flex-col space-y-3">{children}</div>
  </div>
);

const FooterLink: React.FC<{
  href: string;
  label: string;
  icon?: React.ReactNode;
}> = ({ href, label, icon }) => (
  <a
    href={href}
    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
  >
    {icon}
    {label}
  </a>
);

export default Footer;
