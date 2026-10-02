export const company = {
  name: "Blessenzo Holdings (Pty) Ltd",
  regNo: "2023/606209/07",
  taxNo: "9200639269",
  csdNo: "MAAA1328819",
  beeLevel: "Level 1 Contributor",
  beeRecognition: "135% Procurement Recognition",
  blackOwnership: "100%",
  salesPerson: "Sibusiso Sibanyoni",
  address: {
    physical: "Stand no 66, Dantjie Trust, Nelspruit / Mbombela, Mpumalanga, 1216",
    postal: "P O Box 2326, Sibuyile, Mbombela, 1216",
  },
  phones: {
    tel: "013 110 4832",
    fax: "013 110 4837",
    whatsapp: "067 549 8891",
    director: "083 219 7287",
  },
  emails: {
    sales: "sales@blessenzoholdingsict.co.za",
    support: "support@blessenzoholdingsict.co.za",
    admin: "admin@blessenzoholdingsict.co.za",
    director: "director@blessenzoholdingsict.co.za",
    alternative: "blessenzoholdingsict@gmail.com",
  },
  website: "https://www.blessenzoholdingsict.co.za",
  social: {
    x: "@blessenzopty",
    facebook: "@blessenzoholdings",
    instagram: "@blessenzoholdingspty",
    linkedin: "@blessenzoholdingsptyltd",
  },
  mission:
    "We equip organisations with reliable ICT hardware, software and support that keeps their operations running smoothly, securely and efficiently — every day.",
  vision:
    "To be the ICT partner South African businesses trust first: the one that delivers practical technology solutions which reduce downtime, protect data, and free teams to focus on what matters most.",
  values: [
    { title: "Clarity", description: "We speak plainly, set clear expectations, and deliver exactly what we promise — no jargon, no surprises." },
    { title: "Reliability", description: "Our equipment works. Our support answers. We measure ourselves by uptime and trust, not by sales volume alone." },
    { title: "Practical Expertise", description: "We recommend only what solves the real problem. If a simpler or more cost-effective option exists, we say so." },
    { title: "Partnership", description: "We stay long after the sale. Your success is the only measure of ours." },
    { title: "Continuous Improvement", description: "We invest in our people and our knowledge so that the solutions we provide today remain relevant tomorrow." },
    { title: "Respect", description: "For our clients' time, budgets and data. For our colleagues' ideas and effort. For the responsibility that comes with handling technology that businesses depend on." },
  ],
  banking: [
    {
      bank: "Capitec Business",
      accountName: "Blessenzo Holdings Pty. Ltd",
      accountNumber: "1053564830",
      branchCode: "450105",
      branchName: "Relationship Suite",
      accountType: "Business Account",
      swift: "CABLZAJJ",
    },
    {
      bank: "Standard Bank",
      accountName: "Blessenzo Holdings (Pty) Ltd",
      accountNumber: "10251050031",
      branchCode: "051001",
      branchName: "Kanyamazane Mall SC",
      accountType: "Current Account",
      swift: "SBZAZAJJ",
    },
  ],
  paymentTerms: {
    due: "Full payment is due within 7 to 30 days from the date of the invoice unless otherwise agreed in writing.",
    methods: "Electronic Funds Transfer (EFT), Credit/Debit Card (subject to a 2.5% processing fee), Direct Bank Deposit",
    cardSurchargePercent: 2.5,
    latePenalty: "A late fee of 1.5% of the outstanding balance will be applied for every 30-day period that payment is overdue.",
    quoteValidityDays: 90,
  },
  // PayFast – Blessenzo Holdings (pending verification)
  payfast: {
    // Keep sandbox true until PayFast shows account as verified/active
    sandbox: true,
    merchantId: "37331071",
    merchantKey: "90cusee5bemia",
    passphrase: "90Cusee5bemia",
    // When PayFast verification is complete:
    // set sandbox: false  → live card payments on www.blessenzoholdingsict.co.za
  },
  distributors: [
    "Tarsus Distribution",
    "Pinnacle Micro",
    "Axiz Pty Ltd",
    "Mustek Limited / Mecer",
    "Scoop Distribution",
    "Kolok SA",
    "Space Television",
  ],
  oems: [
    "HP", "Dell", "Lenovo", "Cisco", "Microsoft", "Huawei", "Acer", "Asus",
    "Apple", "Logitech", "Epson", "Brother", "Hikvision", "Veeam", "Acronis",
  ],
  tagline: "Turning Ideas and Thoughts into Reality",
};
