export const governanceData = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    description: "Income support of ₹6,000 per year to all landholding farmer families across the country in three equal installments.",
    benefits: [
      "₹6,000 per year assistance",
      "Direct Bank Transfer (DBT)",
      "No middlemen involvement"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 100,
      occupation: ["Farmer"],
      incomeLimit: 10000000, 
      gender: ["Male", "Female", "Other"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Must own cultivable land"
    },
    documents: [
      "Aadhaar Card",
      "Landholding papers (Khasra/Khatauni)",
      "Bank Passbook"
    ],
    link: "https://pmkisan.gov.in/"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PMJAY",
    category: "Health",
    ministry: "Ministry of Health and Family Welfare",
    description: "World's largest health insurance scheme providing coverage of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.",
    benefits: [
      "₹5 Lakh health cover/year",
      "Cashless hospitalization",
      "Covers 3 days pre & 15 days post hospitalization"
    ],
    eligibility: {
      minAge: 0,
      maxAge: 100,
      occupation: ["Unemployed", "Worker", "Laborer"],
      incomeLimit: 250000, // Approximate for SECC
      gender: ["Male", "Female", "Other"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Family listed in SECC 2011 database or holding Ration Card"
    },
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "Ayushman Golden Card (if issued)"
    ],
    link: "https://pmjay.gov.in/"
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    category: "Child Welfare",
    ministry: "Ministry of Women and Child Development",
    description: "A small deposit scheme for the girl child launched as a part of the 'Beti Bachao Beti Padhao' campaign.",
    benefits: [
      "High interest rate (currently ~8%)",
      "Tax benefits under 80C",
      "Maturity on age 21 of girl"
    ],
    eligibility: {
      minAge: 0,
      maxAge: 10,
      occupation: ["Student", "Unemployed"],
      incomeLimit: 10000000,
      gender: ["Female"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Account needs to be opened before girl turns 10"
    },
    documents: [
      "Birth Certificate of Girl Child",
      "Address Proof of Guardian",
      "ID Proof of Guardian"
    ],
    link: "https://www.nsiindia.gov.in/"
  },
  {
    id: "pmay-urban",
    name: "Pradhan Mantri Awas Yojana (Urban)",
    category: "Housing",
    ministry: "Ministry of Housing and Urban Affairs",
    description: "Ensures pucca house to all eligible urban households by 2024-25. Interest subsidy on home loans.",
    benefits: [
      "Interest subsidy up to 6.5%",
      "Assistance for new construction or enhancement",
      "Housing for All"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 70,
      occupation: ["Salaried", "Self-Employed", "Worker"],
      incomeLimit: 1800000, // CLSS EWS/LIG/MIG
      gender: ["Male", "Female", "Other"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Family should not own a pucca house in India"
    },
    documents: [
      "Aadhaar Card",
      "Income Certificate",
      "Affidavit of no pucca house"
    ],
    link: "https://pmaymis.gov.in/"
  },
  {
    id: "mudra-loans",
    name: "PM Mudra Yojana",
    category: "Business",
    ministry: "Ministry of Finance",
    description: "Loans up to ₹10 Lakh to non-corporate, non-farm small/micro enterprises.",
    benefits: [
      "Loans up to ₹10 Lakh",
      "No collateral required",
      "Three categories: Shishu, Kishore, Tarun"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      occupation: ["Entrepreneur", "Self-Employed"],
      incomeLimit: 10000000,
      gender: ["Male", "Female", "Other"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Small business plan required"
    },
    documents: [
      "Business Plan",
      "ID Proof",
      "Address Proof",
      "Business License (if any)"
    ],
    link: "https://www.mudra.org.in/"
  },
  {
    id: "nsap-pension",
    name: "National Old Age Pension Scheme",
    category: "Pension",
    ministry: "Ministry of Rural Development",
    description: "Monthly pension for elderly living below poverty line.",
    benefits: [
      "Monthly pension (amount varies by state)",
      "Social security"
    ],
    eligibility: {
      minAge: 60,
      maxAge: 100,
      occupation: ["Unemployed", "Retired"],
      incomeLimit: 60000, // BPL proxy
      gender: ["Male", "Female", "Other"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Must be Below Poverty Line (BPL)"
    },
    documents: [
      "BPL Card",
      "Age Proof",
      "Bank Account"
    ],
    link: "https://nsap.nic.in/"
  },
  {
    id: "post-matric-sc",
    name: "Post Matric Scholarship for SC",
    category: "Education",
    ministry: "Ministry of Social Justice",
    description: "Financial assistance to Scheduled Caste students studying at post-matriculation or post-secondary stage.",
    benefits: [
      "Tuition fee waiver/reimbursement",
      "Maintenance allowance"
    ],
    eligibility: {
      minAge: 15,
      maxAge: 35,
      occupation: ["Student"],
      incomeLimit: 250000,
      gender: ["Male", "Female", "Other"],
      caste: ["SC"],
      specificCriteria: "Enrolled in recognized post-matric course"
    },
    documents: [
      "Caste Certificate",
      "Income Certificate",
      "Mark sheets"
    ],
    link: "https://scholarships.gov.in/"
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana",
    category: "Pension",
    ministry: "Ministry of Finance",
    description: "Pension scheme for unorganized sector workers.",
    benefits: [
      "Guaranteed pension of ₹1000-₹5000/month after 60",
      "Government co-contribution for eligible subscribers"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      occupation: ["Worker", "Driver", "Maid", "Laborer", "Self-Employed"],
      incomeLimit: 500000, // Taxpayer status often excludes
      gender: ["Male", "Female", "Other"],
      caste: ["General", "OBC", "SC", "ST"],
      specificCriteria: "Should not be an income tax payer"
    },
    documents: [
      "Aadhaar",
      "Savings Bank Account"
    ],
    link: "https://www.npscra.nsdl.co.in/"
  },
  {
    id: "standup-india",
    name: "Stand Up India",
    category: "Business",
    ministry: "Ministry of Finance",
    description: "Facilitate bank loans between ₹10 lakh and ₹1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch.",
    benefits: [
      "High value loans for greenfield enterprises",
      "Support for women and SC/ST entrepreneurs"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      occupation: ["Entrepreneur"],
      incomeLimit: 10000000,
      gender: ["Female"], // Or SC/ST male
      caste: ["SC", "ST", "General", "OBC"], // General/OBC valid only if Female
      specificCriteria: "Greenfield project only"
    },
    documents: [
      "Project Report",
      "Identity Proof",
      "Caste Certificate (if applicable)"
    ],
    link: "https://www.standupmitra.in/"
  }
];
