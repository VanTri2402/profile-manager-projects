import React from "react";
import {
  BookOpen,
  Github,
  Twitter,
  Mail,
  Heart,
  GraduationCap,
  BookText,
  Plus,
  BarChart,
  Info,
  Users,
  Phone,
  Globe,
} from "lucide-react";

// Link component for reusability
const FooterLink = ({ href, children, ariaLabel }) => (
  <li>
    <a
      href={href}
      aria-label={ariaLabel}
      className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors duration-200"
    >
      {children}
    </a>
  </li>
);

const Footer = () => {
  return (
    <footer
      className="bg-slate-50 font-sans border-t border-slate-200"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Branding & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-slate-900" />
              <h2 className="text-xl font-bold text-slate-900">ChineseApp</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 max-w-xs flex items-start gap-2">
              <Heart className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
              <span>
                Your personal Chinese learning companion, offering tailored
                flashcards, vocabulary, and progress tracking.
              </span>
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Visit our GitHub page"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@chineseapp.com"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Learning Features */}
          <div className="space-y-4">
            <h3 className=" font-semibold text-lg text-slate-900 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-500" />
              Learning Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/vocabulary" ariaLabel="Go to Vocabulary">
                <BookText className="h-4 w-4" /> Vocabulary
              </FooterLink>
              <FooterLink href="/flashcard" ariaLabel="Go to Flashcards">
                <Globe className="h-4 w-4" /> Flashcards
              </FooterLink>
              <FooterLink href="/addword" ariaLabel="Go to Add Word">
                <Plus className="h-4 w-4" /> Add Word
              </FooterLink>
              <FooterLink href="/progress" ariaLabel="Go to Progress">
                <BarChart className="h-4 w-4" /> Progress
              </FooterLink>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/blog" ariaLabel="Read our blog">
                Blog
              </FooterLink>
              <FooterLink href="/faq" ariaLabel="View FAQs">
                FAQs
              </FooterLink>
              <FooterLink href="/tutorials" ariaLabel="Watch tutorials">
                Tutorials
              </FooterLink>
              <FooterLink href="/community" ariaLabel="Join our community">
                <Users className="h-4 w-4" /> Community
              </FooterLink>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-500" />
              Get in Touch
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink
                href="mailto:support@chineseapp.com"
                ariaLabel="Email support"
              >
                support@chineseapp.com
              </FooterLink>
              <FooterLink href="/feedback" ariaLabel="Submit feedback">
                Feedback
              </FooterLink>
              <FooterLink href="/privacy" ariaLabel="Read privacy policy">
                Privacy Policy
              </FooterLink>
              <FooterLink href="/terms" ariaLabel="Read terms of service">
                Terms of Service
              </FooterLink>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-slate-200" />

        {/* Copyright */}
        <div className="text-center text-sm text-slate-600">
          <p>
            © {new Date().getFullYear()} ChineseApp by NHVT. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
