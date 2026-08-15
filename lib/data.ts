// All entries below are drawn from documented public record. Where a
// specific external source URL was verifiable at build time it is
// included; otherwise the record names the type of public record it
// rests on (parliamentary record, court record, wire-service reporting)
// rather than inventing a URL. Every civic-movement entry, including the
// 2026 one, is a *closed* event with a confirmed outcome — nothing here
// is presented as live, breaking, or unverified.

export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  source: string;
  sourceUrl?: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "1947",
    title: "Independence",
    body: "At midnight on 15 August, India becomes a sovereign nation after nearly two centuries of British colonial rule. Partition, the same year, displaces an estimated 10–15 million people across the new India–Pakistan border.",
    source: "National Archives of India; Partition Museum, Amritsar",
  },
  {
    year: "1950",
    title: "The Constitution",
    body: "The Constitution of India comes into force on 26 January, drafted over nearly three years under the chairmanship of Dr. B. R. Ambedkar. India becomes a sovereign, democratic republic.",
    source: "Constituent Assembly records; Digital Sansad",
    sourceUrl: "https://sansad.in/ls/about/introduction",
  },
  {
    year: "1951–52",
    title: "First general election",
    body: "India holds its first general election under universal adult suffrage — the largest exercise of democratic franchise attempted anywhere in the world up to that point, with roughly 176 million eligible voters.",
    source: "Election Commission of India, historical records",
  },
  {
    year: "1966–70s",
    title: "Green Revolution",
    body: "High-yield seed varieties, irrigation and fertiliser investment transform Punjab, Haryana and western Uttar Pradesh from food-deficit to food-surplus regions, reshaping India's agrarian economy — and its regional politics.",
    source: "Indian Council of Agricultural Research, historical record",
  },
  {
    year: "1975–77",
    title: "The Emergency",
    body: "A 21-month state of emergency suspends elections and key civil liberties; press censorship is imposed and opposition leaders are detained. It remains the most-cited case study in Indian civics on the fragility of democratic guardrails.",
    source: "Shah Commission of Inquiry report, 1978",
  },
  {
    year: "1991",
    title: "Economic liberalisation",
    body: "Facing a balance-of-payments crisis, the government opens the economy — dismantling licensing controls, welcoming foreign investment and devaluing the rupee. It marks the start of three decades of accelerated growth alongside widening inequality.",
    source: "Reserve Bank of India, historical record",
  },
  {
    year: "2000s",
    title: "The IT decade",
    body: "Bengaluru, Hyderabad and Pune become global technology-services hubs. Mobile telephony expands faster than fixed-line infrastructure ever had, reaching hundreds of millions of first-time phone owners.",
    source: "Ministry of Electronics & IT, historical record",
  },
  {
    year: "2016",
    title: "UPI launches",
    body: "The Unified Payments Interface goes live, eventually making India home to one of the largest real-time digital payment systems in the world — reshaping commerce from street vendors to e-commerce.",
    source: "National Payments Corporation of India",
  },
  {
    year: "2019–20",
    title: "CAA–NRC protests",
    body: "The Citizenship Amendment Act triggers nationwide protests and sit-ins — most visibly the women-led Shaheen Bagh sit-in in Delhi — over concerns about religious criteria in citizenship law. Documented in the civic chapter below.",
    source: "Wire-service and national press reporting, Dec 2019 – Mar 2020",
  },
  {
    year: "2020",
    title: "COVID-19 lockdown",
    body: "A nationwide lockdown beginning 25 March triggers one of the largest internal migrations in independent India's history, as tens of millions of informal-sector workers walk or travel home from cities.",
    source: "Ministry of Home Affairs orders, March 2020",
  },
  {
    year: "2020–21",
    title: "Farmers' protests",
    body: "Farmer unions, concentrated in Punjab and Haryana, camp for over a year at Delhi's borders opposing three farm laws. The laws are repealed by Parliament in November–December 2021. Documented in the civic chapter below.",
    source: "PRS Legislative Research; Wikipedia, '2020–2021 Indian farmers' protest'",
    sourceUrl: "https://prsindia.org/billtrack/the-farm-laws-repeal-bill-2021",
  },
  {
    year: "2023",
    title: "Chandrayaan-3",
    body: "India's lander touches down near the lunar south pole on 23 August, making it the first country to land near that region of the Moon.",
    source: "ISRO; NASA Science mission page",
    sourceUrl: "https://science.nasa.gov/mission/chandrayaan-3/",
  },
  {
    year: "2026",
    title: "The 'Cockroach' protests",
    body: "A Gen Z-led movement over exam-system failures ends with a minister's resignation. Documented in full in the civic chapter below.",
    source: "Al Jazeera; NPR; CNN; Britannica",
    sourceUrl: "https://www.britannica.com/topic/Indias-2026-Gen-Z-Protests-Explained",
  },
  {
    year: "2026",
    title: "India at 80",
    body: "80 years since independence. The story is not finished — it is still being written by 1.4 billion people, in Parliament, in courtrooms, on farms, on phones, and in the streets.",
    source: "—",
  },
];

export type CivicMovement = {
  id: string;
  location: string;
  dateRange: string;
  issue: string;
  participants: string;
  demands: string;
  response: string;
  status: "Documented / closed";
  sources: { label: string; url?: string }[];
  mapPosition: { x: number; y: number }; // percentage within India map viewBox
  quote?: { text: string; attribution: string };
};

export const civicMovements: CivicMovement[] = [
  {
    id: "emergency-1975",
    location: "Nationwide",
    dateRange: "25 June 1975 – 21 March 1977",
    issue:
      "A national Emergency is declared; press censorship is imposed and thousands, including opposition leaders, are detained without trial.",
    participants:
      "Opposition parties, press bodies, student groups, and later the broad electorate at the 1977 general election.",
    demands:
      "Restoration of press freedom, civil liberties and free elections.",
    response:
      "The Emergency is lifted in March 1977; the incumbent government loses the subsequent general election.",
    status: "Documented / closed",
    sources: [{ label: "Shah Commission of Inquiry report, 1978" }],
    mapPosition: { x: 50, y: 46 },
  },
  {
    id: "anti-corruption-2011",
    location: "New Delhi (Jantar Mantar / Ramlila Maidan) and other cities",
    dateRange: "April – December 2011",
    issue:
      "Nationwide demonstrations demanding a strong anti-corruption ombudsman law (the Jan Lokpal Bill), led by activist Anna Hazare's public fasts.",
    participants: "Civil-society volunteers, students, and a broad urban middle-class base, organised as India Against Corruption.",
    demands: "Passage of an independent Lokpal (ombudsman) with powers to investigate public officials.",
    response:
      "Parliament passes the Lokpal and Lokayuktas Act in 2013, though implementation and appointments were delayed for years afterward.",
    status: "Documented / closed",
    sources: [{ label: "Parliamentary record, Lokpal and Lokayuktas Act, 2013" }],
    mapPosition: { x: 48, y: 43 },
  },
  {
    id: "nirbhaya-2012",
    location: "New Delhi",
    dateRange: "December 2012 – early 2013",
    issue:
      "The fatal gang rape of a young woman on a Delhi bus triggers sustained protests over women's safety and the criminal justice system's handling of sexual violence.",
    participants: "Students and citizens nationwide, most visibly in Delhi.",
    demands: "Faster, tougher legal response to sexual violence and better police accountability.",
    response:
      "Parliament passes the Criminal Law (Amendment) Act, 2013, broadening the legal definition of sexual offences and stiffening penalties, following the Justice Verma Committee report.",
    status: "Documented / closed",
    sources: [{ label: "Justice Verma Committee report, Jan 2013" }],
    mapPosition: { x: 48, y: 43 },
  },
  {
    id: "caa-2019",
    location: "Delhi (Shaheen Bagh), Assam, and university campuses nationwide",
    dateRange: "December 2019 – March 2020",
    issue:
      "Protests against the Citizenship Amendment Act, which fast-tracks citizenship for non-Muslim migrants from three neighbouring countries — critics say it uses religion as a citizenship criterion for the first time.",
    participants:
      "A women-led, months-long sit-in at Shaheen Bagh; student bodies at Jamia Millia Islamia and Jawaharlal Nehru University; parallel protests in Assam over different, demographic concerns.",
    demands: "Withdrawal of the Act; for Assam protesters, protection of local demographic and cultural safeguards under a separate set of concerns.",
    response:
      "The government maintained the law was not intended to strip citizenship from any existing Indian citizen. The Shaheen Bagh sit-in was cleared in March 2020 as COVID-19 restrictions began.",
    status: "Documented / closed",
    sources: [{ label: "National and international wire-service reporting, Dec 2019 – Mar 2020" }],
    mapPosition: { x: 48.5, y: 43.5 },
  },
  {
    id: "farmers-2020",
    location: "Delhi border points — Singhu, Tikri, Ghazipur",
    dateRange: "9 August 2020 – 11 December 2021",
    issue:
      "Farmer unions, concentrated in Punjab and Haryana, oppose three new farm laws they say would weaken guaranteed minimum support prices and expose them to unregulated corporate buyers.",
    participants: "Farmer unions under the Samyukt Kisan Morcha umbrella, concentrated in Punjab, Haryana and western Uttar Pradesh.",
    demands: "Full repeal of the three farm laws; a legal guarantee for minimum support prices.",
    response:
      "The Supreme Court stayed implementation of the laws in January 2021. In November 2021 the Prime Minister announced repeal; Parliament formally withdrew all three laws that December.",
    status: "Documented / closed",
    sources: [
      { label: "PRS Legislative Research, 'The Farm Laws Repeal Bill, 2021'", url: "https://prsindia.org/billtrack/the-farm-laws-repeal-bill-2021" },
      { label: "Wikipedia, '2020–2021 Indian farmers' protest'", url: "https://en.wikipedia.org/wiki/2020%E2%80%932021_Indian_farmers%27_protest" },
    ],
    mapPosition: { x: 47, y: 40 },
  },
  {
    id: "cjp-2026",
    location: "New Delhi (Jantar Mantar), with parallel protests in West Bengal, Telangana, Karnataka and Tamil Nadu",
    dateRange: "6 June – 25 July 2026",
    issue:
      "An alleged leak of questions for NEET, India's national medical-college entrance exam, and the decision to scrap the results. What began as an exam-integrity dispute widened into a youth movement over accountability in India's exam system, led by the group Cockroach Janta Party (CJP) — its name drawn from a dismissive remark about unemployed youth. Educator and activist Sonam Wangchuk joined as a prominent supporter and began a hunger strike in solidarity.",
    participants:
      "Students and youth nationwide organised under CJP; the movement grew sharply after police forcibly removed Wangchuk from the protest site in July, and after a police baton charge and tear-gas response injured protesters marching toward Parliament.",
    demands:
      "Resignation of Union Education Minister Dharmendra Pradhan; reform of the exam system; compensation for the families of students who died by suicide after the exam results were scrapped.",
    response:
      "Pradhan resigned on 25 July 2026 — the first cabinet resignation of Prime Minister Narendra Modi's twelve years in office — and was succeeded by Pralhad Joshi. The government agreed to compensate the affected families. In his resignation letter, posted to X, Pradhan said he was stepping down so students' anger could not be 'exploited by anti-national forces.' CJP ended its nationwide protests once the resignation was confirmed.",
    status: "Documented / closed",
    sources: [
      { label: "Al Jazeera, 'India's Cockroach youth call off protests after education minister quits'", url: "https://www.aljazeera.com/news/2026/7/25/indias-education-minister-resigns-after-weeks-of-cockroach-protests" },
      { label: "NPR, 'India's Cockroach movement ousts education minister'", url: "https://www.npr.org/2026/07/25/g-s1-135483/india-cockroach-movement" },
      { label: "CNN, 'India's education minister resigns after days of Cockroach youth protests'", url: "https://www.cnn.com/2026/07/25/india/india-education-minister-resignation-intl" },
      { label: "Britannica, 'India's 2026 Gen Z Protests Explained'", url: "https://www.britannica.com/topic/Indias-2026-Gen-Z-Protests-Explained" },
    ],
    mapPosition: { x: 48.5, y: 43 },
    quote: {
      text: "Young generation is here. This is a win for the constitution.",
      attribution: "Tluanga Ralte, protester, quoted by Al Jazeera",
    },
  },
];

export type FutureEra = {
  decade: string;
  headline: string;
  items: string[];
  prompt: string;
};

export const futureEras: FutureEra[] = [
  {
    decade: "2030",
    headline: "A better everyday India.",
    items: ["Cleaner cities.", "Reliable public transport.", "Homes people can actually afford.", "Digital services that just work."],
    prompt: "What if progress meant making everyday life easier?",
  },
  {
    decade: "2040",
    headline: "A healthier India.",
    items: ["Clean air.", "Enough water.", "Quality healthcare closer to home.", "AI that gives people more time — not less."],
    prompt: "What if technology finally gave us time back?",
  },
  {
    decade: "2050",
    headline: "An India that powers itself.",
    items: ["Solar rooftops.", "Electric mobility.", "Clean energy.", "Less dependence on the world."],
    prompt: "What would true energy independence feel like?",
  },
  {
    decade: "2060",
    headline: "An India that doesn't leave anyone behind.",
    items: ["Farmers adapting to a changing climate.", "Cities built for people.", "Villages connected to opportunity.", "Every state growing in its own way."],
    prompt: "Can a billion dreams still move forward together?",
  },
  {
    decade: "2070",
    headline: "An India worth inheriting.",
    items: ["Every child educated.", "Rivers alive.", "Forests protected.", "Factories that don't cost us the planet."],
    prompt: "What will we leave for the people who come after us?",
  },
  {
    decade: "2080",
    headline: "A life we haven't imagined yet.",
    items: ["Longer, healthier lives.", "Almost nothing wasted.", "New discoveries.", "An India helping shape the world beyond Earth."],
    prompt: "What will our grandchildren call ordinary?",
  },
];

export const regions = [
  { name: "North", note: "Himalayan foothills, the Indo-Gangetic plain, and the seat of the national capital." },
  { name: "South", note: "Four classical language traditions, coastline on two seas, and India's technology corridor." },
  { name: "East", note: "The Ganges delta, colonial-era port cities, and some of the country's oldest universities." },
  { name: "West", note: "Financial capital, arid Thar desert, and a long Arabian Sea coastline." },
  { name: "Northeast", note: "Eight states, over 200 languages, and landscapes closer to Southeast Asia than the plains." },
  { name: "Central India", note: "Forested plateau, tribal belts, and some of the country's mineral wealth." },
  { name: "Islands", note: "Andaman & Nicobar and Lakshadweep — India's most remote, ecologically distinct territories." },
];
