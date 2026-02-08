// Theme configurations for different departments
export const departmentThemes = {
  default: {
    name: "Brancha",
    logo: "/Brancha_Wordmark_logo.webp",
    logoWithTagline: "/Brancha_logo_with_tagline-png.webp",
    primaryColor: "#e2493b",
    primaryHover: "#C94A3F",
    accentColor: "#e35342",
    backgroundColor: "#FAF9F7",
    navbarBgColor: "#FFFFFF", // White navbar for default theme
    footerBgColor: "#FAF9F7", // Light background for footer
    navLinks: [
      { name: "Home", path: "/" },
      { name: "Departments", path: "/departments" },
      { name: "About", path: "/about" },
      { name: "Process", path: "/process" },
      { name: "Contact", path: "/contact" },
    ],
    footerDescription:
      "Brancha is a niche-specialist tech company that helps gyms, real estate firms, clinics, and education institutions grow through premium websites and lead systems.",
    tagline: "Where Brands Grow",
    ctaText: "Get Started",
    contactInfo: {
      whatsapp: "+919219917186",
      phone: "+919825883015",
      email: "support@brancha.in",
      partnershipEmail: "workwithbrancha@gmail.com",
      location: "Vadodara, Gujarat, India",
    },
    socialLinks: {
      instagram: "https://instagram.com/growwithbrancha",
      linkedin: "https://www.linkedin.com/company/brancha/",
      facebook: "https://www.facebook.com/profile.php?id=61586163604676",
      youtube: "https://youtube.com/@growwithbrancha",
      twitter: "https://x.com/growwithbrancha",
      threads: "https://threads.net/@growwithbrancha",
    },
    policyLinks: {
      privacy: "/privacy-policy",
      terms: "/terms-of-service",
      cookies: "/cookie-policy",
    },
    footerLinks: {
      Departments: [
        { name: "Fitness & Gym", path: "/gym" },
        { name: "Real Estate", path: "/real-estate" },
        { name: "Healthcare", path: "/healthcare" },
        { name: "Education", path: "/education" },
      ],
      Services: [
        { name: "Foundation Package", path: "/services" },
        { name: "Monthly Care Package", path: "/services" },
        { name: "Complete System", path: "/services" },
      ],
      Company: [
        { name: "About Us", path: "/about" },
        { name: "How We Work", path: "/process" },
        { name: "Contact", path: "/contact" },
      ],
      Support: [
        { name: "Common Questions", path: "/contact" },
        { name: "Get Started", path: "/contact" },
      ],
    },
  },

  gym: {
    name: "Brancha Gym",
    logo: "/gym-logo.webp",
    logoWithTagline: "/gym-logo.webp",
    primaryColor: "#FF464A",
    primaryHover: "#d93d42",
    accentColor: "#FF464A",
    backgroundColor: "#0A0A0A",
    secondaryBackground: "#2B2B2B",
    lightBackground: "#F2F2F2",
    navbarBgColor: "#0A0A0A", // Dark navbar to match gym theme
    footerBgColor: "#0A0A0A", // Dark footer to match gym theme
    textPrimary: "#F2F2F2",
    textSecondary: "#9CA3AF",
    navLinks: [
      { name: "Home", path: "/gym" },
      { name: "About", path: "/gym/about" },
      { name: "Services", path: "/gym/services" },
      { name: "Process", path: "/gym/process" },
      { name: "Portfolio", path: "/gym/portfolio" },
      { name: "Blog", path: "/gym/blog" },
      { name: "Contact", path: "/gym/contact" },
    ],
    footerDescription:
      "Brancha Fitness specializes in helping gyms and fitness studios grow through conversion-focused websites and WhatsApp lead systems that turn trial bookings into paying members. Get maximum conversion rate with our proven systems.",
    tagline: "Where Fitness Brands Grow",
    ctaText: "Book Strategy Call",
    contactInfo: {
      whatsapp: "+919219917186",
      phone: "+919825883015",
      email: "support@brancha.in",
      partnershipEmail: "workwithbrancha@gmail.com",
      location: "Vadodara, Gujarat, India",
    },
    socialLinks: {
      instagram: "https://instagram.com/branchaforgym",
      linkedin: "https://www.linkedin.com/company/brancha-gyms-department",
      facebook: "https://www.facebook.com/profile.php?id=61587972351123",
      youtube: "https://youtube.com/@branchaforgym",
      twitter: "https://x.com/growwithbrancha",
      threads: "https://threads.net/growwithbrancha",
    },
    policyLinks: {
      privacy: "/privacy-policy",
      terms: "/terms-of-service",
      cookies: "/cookie-policy",
    },
    footerLinks: {
      "What We Do": [
        { name: "Website Design", path: "/gym/services" },
        { name: "Lead Generation", path: "/gym/services" },
        { name: "WhatsApp Automation", path: "/gym/services" },
        { name: "Member Tracking", path: "/gym/services" },
      ],
      Company: [
        { name: "Home", path: "/gym" },
        { name: "About", path: "/gym/about" },
        { name: "Services", path: "/gym/services" },
        { name: "Process", path: "/gym/process" },
        { name: "Portfolio", path: "/gym/portfolio" },
        { name: "Contact", path: "/gym/contact" },
      ],
      Resources: [
        { name: "Blog", path: "/gym/blog" },
        { name: "Case Studies", path: "/gym/portfolio" },
        { name: "Free Consultation", path: "/gym/contact" },
      ],
    },
  },

  realestate: {
    name: "Brancha Real Estate",
    logo: "/real-estate-logo.webp",
    logoWithTagline: "/real-estate-logo.webp",
    primaryColor: "#C9A24D", // Gold as primary (sophisticated, premium)
    primaryHover: "#B8924A", // Darker gold for hover
    accentColor: "#F1464A", // Red accent (used very sparingly)

    backgroundColor: "#1C1F26", // Main dark surface
    secondaryBackground: "#2E3440", // Elevated sections / cards
    lightBackground: "#F7F9FA", // Clean light sections (if needed)
    navbarBgColor: "#1C1F26", // Dark navbar to match the launching soon page
    footerBgColor: "#1C1F26", // Dark footer to match theme

    textPrimary: "#F2F2F2", // High-contrast text
    textSecondary: "#9CA3AF", // Muted supporting text

    navLinks: [
      { name: "Home", path: "/real-estate" },
      { name: "About", path: "/real-estate/about" },
      { name: "Services", path: "/real-estate/services" },
      { name: "Process", path: "/real-estate/process" },
      { name: "Portfolio", path: "/real-estate/portfolio" },
      { name: "Blog", path: "/real-estate/blog" },
      { name: "Contact", path: "/real-estate/contact" },
    ],
    footerDescription:
      "Brancha Real Estate builds RERA-compliant websites and CRM systems that measure Cost Per Site Visit, not just Cost Per Lead. Clear ROI tracking for developers and brokers.",
    tagline: "Where Properties Sell",
    ctaText: "Book Consultation",
    contactInfo: {
      whatsapp: "+919219917186",
      phone: "+919825883015",
      email: "support@brancha.in",
      partnershipEmail: "workwithbrancha@gmail.com",
      location: "Vadodara, Gujarat, India",
    },
    socialLinks: {
      instagram: "https://instagram.com/branchaforrealestate",
      linkedin: "https://www.linkedin.com/company/brancha-real-estate-department",
      facebook: "https://www.facebook.com/profile.php?id=61587914843699",
      youtube: "https://youtube.com/@branchaforrealestate",
      twitter: "https://x.com/growwithbrancha",
      threads: "https://threads.net/@growwithbrancha",
    },
    policyLinks: {
      privacy: "/privacy-policy",
      terms: "/terms-of-service",
      cookies: "/cookie-policy",
    },
    footerLinks: {
      "Real Estate Services": [
        { name: "RERA Websites", path: "/real-estate/services#rera" },
        { name: "CRM Systems", path: "/real-estate/services#crm" },
        { name: "Lead Tracking", path: "/real-estate/services#tracking" },
        { name: "ROI Analytics", path: "/real-estate/services#analytics" },
      ],
      "Property Types": [
        { name: "Residential", path: "/real-estate/portfolio#residential" },
        { name: "Commercial", path: "/real-estate/portfolio#commercial" },
        { name: "Luxury", path: "/real-estate/portfolio#luxury" },
        { name: "Plots", path: "/real-estate/portfolio#plots" },
      ],
      Company: [
        { name: "About Us", path: "/real-estate/about" },
        { name: "Our Process", path: "/real-estate/process" },
        { name: "Portfolio", path: "/real-estate/portfolio" },
        { name: "Contact", path: "/real-estate/contact" },
      ],
      Resources: [
        { name: "Blog", path: "/real-estate/blog" },
        { name: "Case Studies", path: "/real-estate/portfolio" },
        { name: "Free Consultation", path: "/real-estate/contact" },
      ],
    },
  },

  healthcare: {
    name: "Brancha Healthcare",
    logo: "/healthcare-logo.webp",
    logoWithTagline: "/healthcare-logo.webp",
    primaryColor: "#2FAF7F", // Core health green
    primaryHover: "#25966C", // Darker green for hover (derived)
    accentColor: "#0F4C81", // Trust blue (secondary accent)

    backgroundColor: "#0A0A0A", // Deep dark base (keeps UI premium)
    secondaryBackground: "#1C1F26", // Dark surface / sections
    lightBackground: "#F7F9FA", // Clean light sections
    navbarBgColor: "#FFFFFF", // White navbar for default theme
    footerBgColor: "#FAF9F7", // Light background for footer

    textPrimary: "#F7F9FA", // Primary text on dark
    textSecondary: "#9CA3AF", // Muted supporting text

    navLinks: [
      { name: "Home", path: "/healthcare" },
      { name: "About", path: "/healthcare/about" },
      { name: "Services", path: "/healthcare/services" },
      { name: "Process", path: "/healthcare/process" },
      { name: "Portfolio", path: "/healthcare/portfolio" },
      { name: "Blog", path: "/healthcare/blog" },
      { name: "Contact", path: "/healthcare/contact" },
    ],
    footerDescription:
      "Brancha Healthcare builds DISHA-compliant websites and patient recall automation that increases lifetime value. Lower acquisition costs through better retention for clinics and hospitals.",
    tagline: "Where Health Brands Grow",
    ctaText: "Schedule Consultation",
    contactInfo: {
      whatsapp: "+919219917186",
      phone: "+919825883015",
      email: "support@brancha.in",
      partnershipEmail: "workwithbrancha@gmail.com",
      location: "Vadodara, Gujarat, India",
    },
    socialLinks: {
      instagram: "https://instagram.com/branchaforhealthcare",
      linkedin: "https://www.linkedin.com/company/brancha-healthcare-department/",
      facebook: "http://facebook.com/profile.php?id=61587654332526",
      youtube: "https://youtube.com/@branchaforhealthcare",
      twitter: "https://x.com/growwithbrancha",
      threads: "https://threads.net/@growwithbrancha",
    },
    policyLinks: {
      privacy: "/privacy-policy",
      terms: "/terms-of-service",
      cookies: "/cookie-policy",
    },
    footerLinks: {
      "Healthcare Services": [
        { name: "DISHA Websites", path: "/healthcare/services#disha" },
        { name: "Patient Automation", path: "/healthcare/services#automation" },
        {
          name: "Appointment Systems",
          path: "/healthcare/services#appointments",
        },
        { name: "Patient Retention", path: "/healthcare/services#retention" },
      ],
      "Healthcare Types": [
        { name: "Dental Clinics", path: "/healthcare/portfolio#dental" },
        { name: "Hospitals", path: "/healthcare/portfolio#hospitals" },
        { name: "Specialty Clinics", path: "/healthcare/portfolio#specialty" },
        {
          name: "Diagnostic Centers",
          path: "/healthcare/portfolio#diagnostic",
        },
      ],
      Company: [
        { name: "About Us", path: "/healthcare/about" },
        { name: "Our Process", path: "/healthcare/process" },
        { name: "Portfolio", path: "/healthcare/portfolio" },
        { name: "Contact", path: "/healthcare/contact" },
      ],
      Resources: [
        { name: "Blog", path: "/healthcare/blog" },
        { name: "Case Studies", path: "/healthcare/portfolio" },
        { name: "Free Consultation", path: "/healthcare/contact" },
      ],
    },
  },

  education: {
    name: "Brancha Education",
    logo: "/education-logo.webp",
    logoWithTagline: "/education-logo.webp",
    primaryColor: "#1F3C88", // Core education blue (trust, authority)
    primaryHover: "#182F6E", // Darker blue for hover (derived)
    accentColor: "#4CAF50", // Positive green (success, progress)

    backgroundColor: "#0A0A0A", // Deep dark base (keeps Brancha premium)
    secondaryBackground: "#1C1F26", // Dark surface / sections
    lightBackground: "#E4E7EC", // Clean light sections
    navbarBgColor: "#FFFFFF", // White navbar for default theme
    footerBgColor: "#FAF9F7", // Light background for footer

    textPrimary: "#F2F2F2", // Text on dark
    textSecondary: "#9CA3AF", // Muted supporting text

    navLinks: [
      { name: "Home", path: "/education" },
      { name: "About", path: "/education/about" },
      { name: "Services", path: "/education/services" },
      { name: "Process", path: "/education/process" },
      { name: "Portfolio", path: "/education/portfolio" },
      { name: "Blog", path: "/education/blog" },
      { name: "Contact", path: "/education/contact" },
    ],
    footerDescription:
      "Brancha Education builds centralized student and operations systems covering admissions, records, communication, and workflows—designed for schools, coaching institutes, and colleges.",
    tagline: "Where Education Grows",
    ctaText: "Book Demo",
    contactInfo: {
      whatsapp: "+919219917186",
      phone: "+919825883015",
      email: "support@brancha.in",
      partnershipEmail: "workwithbrancha@gmail.com",
      location: "Vadodara, Gujarat, India",
    },
    socialLinks: {
      instagram: "https://instagram.com/branchaforeducation",
      linkedin: "https://www.linkedin.com/company/brancha-education-department/",
      facebook: "https://www.facebook.com/profile.php?id=61587831657178",
      youtube: "https://youtube.com/@branchaforeducation",
      twitter: "https://x.com/growwithbrancha",
      threads: "https://threads.net/@growwithbrancha",
    },
    policyLinks: {
      privacy: "/privacy-policy",
      terms: "/terms-of-service",
      cookies: "/cookie-policy",
    },
    footerLinks: {
      "Education Services": [
        { name: "Admission Systems", path: "/education/services#admissions" },
        { name: "Student Records", path: "/education/services#records" },
        {
          name: "Communication Tools",
          path: "/education/services#communication",
        },
        { name: "Attendance Tracking", path: "/education/services#attendance" },
      ],
      "Institution Types": [
        { name: "Schools", path: "/education/portfolio#schools" },
        { name: "Coaching Classes", path: "/education/portfolio#coaching" },
        { name: "Colleges", path: "/education/portfolio#colleges" },
        { name: "Training Centers", path: "/education/portfolio#training" },
      ],
      Company: [
        { name: "About Us", path: "/education/about" },
        { name: "Our Process", path: "/education/process" },
        { name: "Portfolio", path: "/education/portfolio" },
        { name: "Contact", path: "/education/contact" },
      ],
      Resources: [
        { name: "Blog", path: "/education/blog" },
        { name: "Case Studies", path: "/education/portfolio" },
        { name: "Free Demo", path: "/education/contact" },
      ],
    },
  },
};

// Helper function to get current theme based on path
export const getCurrentTheme = (pathname) => {
  if (pathname.startsWith("/gym")) {
    return departmentThemes.gym;
  }
  if (pathname.startsWith("/real-estate")) {
    return departmentThemes.realestate;
  }
  if (pathname.startsWith("/healthcare")) {
    return departmentThemes.healthcare;
  }
  if (pathname.startsWith("/education")) {
    return departmentThemes.education;
  }

  return departmentThemes.default;
};
