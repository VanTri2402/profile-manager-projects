import React from "react";
import {
  FaLanguage,
  FaBook,
  FaChartLine,
  FaPlus,
  FaEnvelope,
  FaGithub,
  FaTwitter,
  FaHeart,
  FaGraduationCap,
  FaInfoCircle,
  FaUsers,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-br from-primary-400 to-primary-800 text-white py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Branding & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaLanguage className="text-3xl text-accent" aria-hidden="true" />
              <h2 className="text-2xl font-bold">NHVT_cx</h2>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed max-w-xs flex items-start gap-2">
              <FaHeart
                className="text-sm text-accent mt-1"
                aria-hidden="true"
              />
              Your personal Chinese learning companion, offering tailored
              flashcards, vocabulary, and progress tracking to master Chinese at
              your own pace.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
                aria-label="Visit our GitHub page"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
                aria-label="Visit our Twitter page"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="mailto:support@nhvtcx.com"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
                aria-label="Email us"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>

          {/* Column 2: Learning Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaGraduationCap
                className="text-lg text-accent"
                aria-hidden="true"
              />
              Learning Tools
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="/vocabulary"
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                  aria-label="Go to Vocabulary section"
                >
                  <FaBook className="text-sm" />
                  Vocabulary
                </a>
              </li>
              <li>
                <a
                  href="/flashcard"
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                  aria-label="Go to Flashcard section"
                >
                  <FaLanguage className="text-sm" />
                  Flashcards
                </a>
              </li>
              <li>
                <a
                  href="/addword"
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                  aria-label="Go to Add Word section"
                >
                  <FaPlus className="text-sm" />
                  Add Word
                </a>
              </li>
              <li>
                <a
                  href="/progress"
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                  aria-label="Go to Progress section"
                >
                  <FaChartLine className="text-sm" />
                  Progress
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaInfoCircle
                className="text-lg text-accent"
                aria-hidden="true"
              />
              Resources
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="/blog"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="Read our blog"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="View FAQs"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/tutorials"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="Watch tutorials"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                  aria-label="Join our community"
                >
                  <FaUsers className="text-sm" />
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaPhone className="text-lg text-accent" aria-hidden="true" />
              Get in Touch
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="mailto:support@nhvtcx.com"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="Email support"
                >
                  support@nhvtcx.com
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="Submit feedback"
                >
                  Feedback
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="Read privacy policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-accent transition-colors duration-200"
                  aria-label="Read terms of service"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-600" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} NHVT_cx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
