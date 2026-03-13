
import { NavItem, NewsItem, PillarItem, Executive, HistoryEvent, MembershipCategory, Event, Program, Partner, RegionalExecutive, TrustSignal, WelfarePaymentMethod, Document } from './types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'About', 
    href: '/about',
    submenu: [
      { label: 'Mission & Vision', href: '/about#mission' },
      { label: 'History', href: '/about#history' },
      { label: 'National Leadership', href: '/about#leadership' },
      { label: 'Regional Executives', href: '/about#regional' },
      { label: 'Partners', href: '/about#partners' },
    ]
  },
  { 
    label: 'Membership', 
    href: '/membership',
    submenu: [
      { label: 'Benefits', href: '/membership#benefits' },
      { label: 'Categories', href: '/membership#categories' },
      { label: 'Member Login', href: '/login' },
      { label: 'Members Directory', href: '/members-directory' },
    ]
  },
  { 
    label: 'Events', 
    href: '/events',
    submenu: [
      { label: 'All Events', href: '/events' },
      { label: 'Programs', href: '/programs' },
      { label: 'Conference Archive', href: '/events/conference-archive' },
    ]
  },
  { label: 'News', href: '/news' },
  { 
    label: 'Resources', 
    href: '/resources',
    submenu: [
      { label: 'All Resources', href: '/resources' },
      { label: 'Documents & Reports', href: '/documents' },
      { label: 'Forms & Policies', href: '/documents#forms' },
      { label: 'Welfare', href: '/welfare' },
    ]
  },
  { 
    label: 'Get Involved', 
    href: '/get-involved',
    submenu: [
      { label: 'Volunteer', href: '/get-involved/volunteer' },
      { label: 'Internship / Careers', href: '/get-involved/careers' },
      { label: 'Partnerships', href: '/get-involved/partnerships' },
      { label: 'Advocacy', href: '/advocacy' },
      { label: 'Donate', href: '/donate' },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

export const PILLARS: PillarItem[] = [
  {
    title: 'Advocacy',
    description: "Representing Physician Assistants in policy-making, legislative reforms, and workplace rights across Ghana's health sectors.",
    icon: 'gavel',
  },
  {
    title: 'Professional Development',
    description: "Providing world-class CPD programs, training workshops, and resources to ensure our members stay at the clinical forefront.",
    icon: 'school',
  },
  {
    title: 'Community Engagement',
    description: "Fostering a strong network of professionals through regional branches and national outreach initiatives.",
    icon: 'groups',
  },
];

export const NEWS: NewsItem[] = [
  {
    category: 'Policy Update',
    title: 'GPAA Advocates for PA Scope of Practice Expansion',
    description: 'National leadership presents comprehensive policy brief to Ministry of Health calling for legislative amendments to reflect current PA competencies and training advancements...',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
  },
  {
    category: 'Professional Development',
    title: 'New CPD Platform Launches for All Members',
    description: 'GPAA unveils state-of-the-art online learning hub offering accredited courses, webinars, and clinical case studies accessible nationwide...',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
  },
  {
    category: 'Community Impact',
    title: 'Record Health Outreach Serves 5,000 Patients in Upper Regions',
    description: 'GPAA-led medical mission provides free screenings, medications, and health education across underserved communities in Northern Ghana...',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
  },
];

export const EXECUTIVES: Executive[] = [
  {
    name: 'Peter Akudugu Ayamba',
    role: 'President',
    image: '/images/president.jpg',
    bio: 'Mr. Peter Akudugu Ayamba is a highly accomplished Physician Assistant and Public Health professional with over two decades of experience in clinical practice, health systems management, and community health development. He currently serves as the Diocesan Health Director of the Navrongo–Bolgatanga Catholic Health Service and the National President of the Ghana Physician Assistants Association (GPAA), providing strategic leadership and policy direction to improve healthcare delivery and the welfare of Physician Assistants across Ghana. Mr. Ayamba holds a Master of Philosophy (MPhil) in Community Health Development (Participatory Planning, Monitoring, and Evaluation), a Bachelor of Science in Public Health and an Advanced Diploma in Community Medicine and Health (Physician Assistantship). Additionally, he has also completed a Certificate in Leadership and Management in Health from the University of Washington, USA. A passionate advocate for equitable and quality healthcare, Mr. Ayamba has led and implemented several high-impact health projects, including the Strengthening Alliance for Responsive and Integrated Health (STAR) Project, the COVID-19 Emergency Response Project (CERP), and the Promoting Child Health Programme in partnership with international and national development agencies.',
  },
  {
    name: 'Emmanuel Kofi Nti Brantuo',
    role: 'Vice President',
    image: '/images/vice-president.jpg',
    bio: 'Born on the 16/05/1975 and is married with children. He holds a Master of Public Health degree, a BSc in Public Health, Adv. Diploma in Community Medicine and Health, and Diploma in Registered General Nursing.',
  },
  {
    name: 'Peter Eyram Kuenyefu',
    role: 'General Secretary/CEO',
    image: '/images/gen-secretary.jpg',
    bio: 'Born in 1980. He is a District Director of Health Service who holds a Master of Public Health Degree, BSc Physician Assistantship, Adv. Diploma in Community Medicine and Health and a Diploma in Registered General Nursing. He also Certificates in Leadership and Management in Health, and Monitoring and Evaluation in Global Health, all from the University of Washington, USA.',
  },
  {
    name: 'Kofi Adjei Ntiri',
    role: 'Vice General Secretary',
    image: '/images/vice-secretary.jpg',
    bio: 'Born in 1984 and married with children. Has Master of Public Health Degree, BSc Physician Assistantship, Adv. Diploma in Community Medicine and Health, and Diploma (General Nursing).',
  },
  {
    name: 'John Mbeibo Lalibe',
    role: 'National Financial Secretary',
    image: '/images/fin-secretary.jpg',
    bio: 'He is a Principal Physician Assistant, married with children and with MPhil in Epidemiology and Disease Control, BSc Physician Assistantship and BSc Nursing.',
  },
  {
    name: 'Balchisu Abukari',
    role: 'National Treasurer',
    image: '/images/treasurer.jpg',
    bio: 'Born on the 05/09/1967 and married with a child. She holds a BSc in Physician Assistantship, an Adv. Diploma in Community Health and Medicine and a Diploma in Registered General Nursing.',
  },
  {
    name: 'Zenobia Tsibuah',
    role: 'National Public Relationship Officer',
    image: '/images/pro.jpg',
    bio: 'She holds an M.Phil. in Public Health, BSc Physician Assistantship and Adv. Diploma in Community Medicine and Health.',
  },
];

export const HISTORY: HistoryEvent[] = [
  {
    year: '1969',
    title: 'Birth of the Profession',
    description: 'The first cohort of Medical Assistants graduated from Ghana\'s pioneer Medical Assistant Training School, establishing the foundation for mid-level healthcare professionals in the country.',
  },
  {
    year: '1980',
    title: 'Professional Association Established',
    description: 'The Ghana Medical Assistants Association (GMAA) was formally constituted to advocate for practitioners\' rights, welfare, and professional development across the nation.',
  },
  {
    year: '1999',
    title: 'Curriculum Modernization',
    description: 'Introduction of the enhanced 3-year Diploma program, expanding clinical competencies and aligning training with international standards for physician assistants.',
  },
  {
    year: '2010',
    title: 'Transition to Physician Assistants',
    description: 'Official rebranding from Medical Assistants to Physician Assistants (PA), reflecting expanded scope of practice and global alignment with the PA profession.',
  },
  {
    year: '2016',
    title: 'Degree Program Launch',
    description: 'First Bachelor of Science in Physician Assistantship Studies programs accredited, elevating the profession to degree-level training and enhanced clinical autonomy.',
  },
  {
    year: 'Today',
    title: 'Leading Primary Healthcare',
    description: 'GPAA represents over 6,000 practicing PAs nationwide, championing universal health coverage through CHPS zones, district hospitals, and specialized clinical services.',
  },
];

export const MEMBERSHIP_CATEGORIES: MembershipCategory[] = [
  {
    title: 'Professional Member',
    description: 'For licensed Physician Assistants working in public/government health facilities',
    fees: 'GH₵ 200/year',
    benefits: [
      'CPD credits and training programs',
      'Legal and professional support',
      'Advocacy representation',
      'Access to job opportunities',
      'Annual conference access',
      'Professional indemnity insurance support',
      'Welfare benefits'
    ],
    icon: 'badge'
  },
  {
    title: 'Private Member',
    description: 'For licensed Physician Assistants in private practice or privately employed',
    fees: 'GH₵ 250/year',
    benefits: [
      'CPD credits and training programs',
      'Legal and professional support',
      'Access to job opportunities',
      'Annual conference access',
      'Professional indemnity insurance support',
      'Networking opportunities'
    ],
    icon: 'business_center'
  },
  {
    title: 'Junior Physician Assistant',
    description: 'For newly graduated PAs within their first 3 years of practice',
    fees: 'GH₵ 100/year',
    benefits: [
      'Mentorship program access',
      'Discounted CPD programs',
      'Career development support',
      'Job placement assistance',
      'Reduced conference fees',
      'Networking events'
    ],
    icon: 'school'
  },
  {
    title: 'Retired',
    description: 'For retired Physician Assistants who wish to remain connected',
    fees: 'GH₵ 50/year',
    benefits: [
      'Stay connected with PA community',
      'Honorary member privileges',
      'Newsletter and updates',
      'Conference attendance (discounted)',
      'Advisory roles opportunities'
    ],
    icon: 'elderly'
  }
];

export const PROGRAMS: Program[] = [
  {
    title: 'Continuous Professional Development (CPD)',
    description: 'Regular training workshops, seminars, and online courses to keep members updated with latest medical practices and guidelines.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    icon: 'school',
    category: 'Education'
  },
  {
    title: 'Rural Health Initiative',
    description: 'Supporting PAs in underserved communities through resource allocation, incentive advocacy, and regular health outreaches.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
    icon: 'villa',
    category: 'Community'
  },
  {
    title: 'Research & Publication Support',
    description: 'Mentorship and funding opportunities for members to conduct and publish medical research in peer-reviewed journals.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    icon: 'science',
    category: 'Research'
  },
  {
    title: 'Mental Health & Wellness Program',
    description: 'Providing psychological support and wellness resources for PAs dealing with occupational stress and burnout.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    icon: 'psychology',
    category: 'Wellness'
  },
  {
    title: 'Legislative Advocacy',
    description: 'Active engagement with policymakers to improve PA working conditions, scope of practice, and professional recognition.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    icon: 'gavel',
    category: 'Advocacy'
  },
  {
    title: 'Youth Mentorship Program',
    description: 'Connecting practicing PAs with students and recent graduates for career guidance and professional development.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    icon: 'diversity_3',
    category: 'Mentorship'
  }
];

export const EVENTS: Event[] = [
  {
    title: 'Annual General Conference 2026 - Kumasi',
    date: 'August 15-17, 2026',
    location: 'Golden Tulip Hotel, Kumasi',
    description: 'Our flagship event bringing together PAs from across Ghana for networking, CPD, and celebrating excellence in healthcare delivery.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    type: 'upcoming'
  },
  {
    title: 'Regional CPD Workshop - Northern Zone',
    date: 'June 5-7, 2026',
    location: 'Tamale Teaching Hospital',
    description: 'Specialized training on emergency care protocols and tropical disease management for Northern region members.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
    type: 'upcoming'
  },
  {
    title: 'National Health Screening Outreach',
    date: 'May 20, 2026',
    location: 'Multiple locations nationwide',
    description: 'Free health screening initiative across 10 regions providing diabetes, hypertension, and general health checks to underserved communities.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800',
    type: 'upcoming'
  },
  {
    title: 'Leadership & Governance Summit',
    date: 'March 12-13, 2026',
    location: 'Accra International Conference Centre',
    description: 'Training for regional executives and aspiring leaders in healthcare administration and association governance.',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
    type: 'upcoming'
  },
  {
    title: '2025 Annual General Meeting',
    date: 'November 20-22, 2025',
    location: 'Labadi Beach Hotel, Accra',
    description: 'Successful completion of our 2025 AGM with record attendance, featuring elections, policy reviews, and strategic planning sessions.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    type: 'past'
  },
  {
    title: 'National CPD Training Series 2025',
    date: 'September 10-12, 2025',
    location: 'Multiple regional centers',
    description: 'Comprehensive continuing professional development workshops conducted across all regions, enhancing clinical skills and evidence-based practice.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    type: 'past'
  }
];

export const PARTNERS: Partner[] = [
  {
    name: 'Ministry of Health',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=MOH',
    description: 'Collaborative partner in health policy and workforce development'
  },
  {
    name: 'Ghana Health Service',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GHS',
    description: 'Primary employer and implementation partner'
  },
  {
    name: 'Christian Health Associations of Ghana',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=CHAG',
    description: 'Faith-based health service delivery partnership'
  },
  {
    name: 'Medical and Dental Council',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=MDC',
    description: 'Professional regulatory and licensing authority'
  },
  {
    name: 'Ghana Labour Commission',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GLC',
    description: 'Labour relations and workplace standards partner'
  },
  {
    name: 'Global Association of Physician Associates and Clinical Officers',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GAPCO',
    description: 'International professional networking and advocacy'
  },
  {
    name: 'Ghana Medical Association',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GMA',
    description: 'Multi-professional healthcare collaboration'
  },
  {
    name: 'Ghana Association of Certified Registered Anaesthetists',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GACRA',
    description: 'Allied health professional partnership'
  },
  {
    name: 'Ghana Registered Nurses and Midwives Association',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GRNMA',
    description: 'Nursing and midwifery collaboration'
  },
  {
    name: 'Medical Laboratory Professional Workers Union',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=MLPWU',
    description: 'Laboratory services professional partnership'
  },
  {
    name: 'Ghana Association of Medical Herbalists',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GAMH',
    description: 'Traditional and complementary medicine collaboration'
  },
  {
    name: 'Government and Hospital Pharmacists Association',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=GHOSPA',
    description: 'Pharmaceutical services partnership'
  },
  {
    name: 'Health Accounting Staff Association of Ghana',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=HASAG',
    description: 'Healthcare financial management collaboration'
  },
  {
    name: 'FORUM Federation',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=FORUM',
    description: 'Health sector federation partnership'
  },
  {
    name: 'Joint Health Sector Unions',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=JHSU',
    description: 'Unified health sector advocacy'
  },
  {
    name: 'Trade Union Congress',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=TUC',
    description: 'National labour movement affiliation'
  },
  {
    name: 'Organised Labour',
    logo: 'https://via.placeholder.com/200x100/C62828/white?text=OL',
    description: 'Broader labour movement collaboration'
  }
];

export const REGIONAL_EXECUTIVES: RegionalExecutive[] = [
  { name: 'Kwame Asante', role: 'Chairman', region: 'Greater Accra', email: 'accra.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Afia Mensah', role: 'Secretary', region: 'Greater Accra', email: 'accra.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Kofi Mensah', role: 'Chairman', region: 'Ashanti', email: 'ashanti.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Abena Osei', role: 'Secretary', region: 'Ashanti', email: 'ashanti.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Mohammed Abdul', role: 'Chairman', region: 'Northern', email: 'northern.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Fatima Ibrahim', role: 'Secretary', region: 'Northern', email: 'northern.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Emmanuel Tetteh', role: 'Chairman', region: 'Eastern', email: 'eastern.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Grace Adu', role: 'Secretary', region: 'Eastern', email: 'eastern.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Kwesi Yankson', role: 'Chairman', region: 'Central', email: 'central.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Ama Serwaa', role: 'Secretary', region: 'Central', email: 'central.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Samuel Owusu', role: 'Chairman', region: 'Western', email: 'western.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Akua Boakye', role: 'Secretary', region: 'Western', email: 'western.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Joseph Agyei', role: 'Chairman', region: 'Volta', email: 'volta.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Elikem Torgbor', role: 'Secretary', region: 'Volta', email: 'volta.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Richard Amoah', role: 'Chairman', region: 'Western North', email: 'westernnorth.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Mary Addo', role: 'Secretary', region: 'Western North', email: 'westernnorth.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Ibrahim Mahama', role: 'Chairman', region: 'Upper East', email: 'uppereast.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Ayisha Alhassan', role: 'Secretary', region: 'Upper East', email: 'uppereast.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Sulemana Iddrisu', role: 'Chairman', region: 'Upper West', email: 'upperwest.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Hawa Seidu', role: 'Secretary', region: 'Upper West', email: 'upperwest.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'David Kpogli', role: 'Chairman', region: 'Oti', email: 'oti.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Juliana Dzramado', role: 'Secretary', region: 'Oti', email: 'oti.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Patrick Ansah', role: 'Chairman', region: 'Bono', email: 'bono.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Charity Boateng', role: 'Secretary', region: 'Bono', email: 'bono.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Michael Acheampong', role: 'Chairman', region: 'Bono East', email: 'bonoeast.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Rebecca Frimpong', role: 'Secretary', region: 'Bono East', email: 'bonoeast.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Eric Agbeko', role: 'Chairman', region: 'Ahafo', email: 'ahafo.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Patience Asante', role: 'Secretary', region: 'Ahafo', email: 'ahafo.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Francis Quaye', role: 'Chairman', region: 'North East', email: 'northeast.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Amina Issahaku', role: 'Secretary', region: 'North East', email: 'northeast.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Isaac Amponsah', role: 'Chairman', region: 'Savannah', email: 'savannah.chair@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
  { name: 'Salima Musah', role: 'Secretary', region: 'Savannah', email: 'savannah.sec@gpaa.org.gh', phone: '+233 24 XXX XXXX' },
];

export const GHANA_REGIONS = [
  'Greater Accra', 'Ashanti', 'Northern', 'Eastern', 'Central', 'Western', 
  'Volta', 'Western North', 'Upper East', 'Upper West', 'Oti', 'Bono', 
  'Bono East', 'Ahafo', 'North East', 'Savannah'
];

export const EMPLOYER_CATEGORIES = [
  'Ghana Health Service',
  'Teaching Hospital',
  'Regional Hospital',
  'District Hospital', 
  'CHAG (Christian Health Association of Ghana)',
  'Ahmadiyya Mission',
  'Police Hospital',
  'Military Hospital',
  'Prison Service Hospital',
  'Private Hospital',
  'Private Clinic',
  'NGO Health Facility',
  'Self-Employed',
  'Other'
];

export const TRUST_SIGNALS: TrustSignal[] = [
  { icon: 'groups', stat: '6,000+', label: 'Active Members Nationwide' },
  { icon: 'event_available', stat: '40+', label: 'Years Serving Ghana' },
  { icon: 'location_city', stat: '16', label: 'Regional Branches' },
  { icon: 'verified', stat: '100%', label: 'MDC Accredited' },
  { icon: 'health_and_safety', stat: '500+', label: 'Annual CPD Programs' },
  { icon: 'volunteer_activism', stat: '10,000+', label: 'Lives Impacted Yearly' }
];

export const WELFARE_PAYMENT_METHODS: WelfarePaymentMethod[] = [
  {
    type: 'Mobile Money',
    name: 'MTN Mobile Money',
    number: '0XX XXX XXXX',
    details: 'GPAA Welfare Account'
  },
  {
    type: 'Mobile Money',
    name: 'Vodafone Cash',
    number: '0XX XXX XXXX',
    details: 'GPAA Welfare Account'
  },
  {
    type: 'Bank',
    name: 'GCB Bank',
    number: '1234567890',
    details: 'Account Name: GPAA Welfare Fund | Branch: Accra Main'
  },
  {
    type: 'Shortcode',
    name: 'Bank Network Shortcode',
    number: '*713*XXXX#',
    details: 'Quick payment via USSD'
  }
];

export const SAMPLE_DOCUMENTS: Document[] = [
  {
    title: '2025 Annual Financial Statement',
    description: 'Comprehensive financial report for the fiscal year 2025',
    category: 'Financial',
    fileUrl: '#',
    date: '2026-01-15',
    size: '2.4 MB'
  },
  {
    title: '2026 Calendar of Activities',
    description: 'Full schedule of events, meetings, and programs for 2026',
    category: 'Calendar',
    fileUrl: '#',
    date: '2026-01-01',
    size: '856 KB'
  },
  {
    title: '2025 Welfare Account Report',
    description: 'Detailed welfare fund utilization and member benefits report',
    category: 'Financial',
    fileUrl: '#',
    date: '2025-12-31',
    size: '1.8 MB'
  },
  {
    title: 'GPAA Constitution (Amended 2024)',
    description: 'Official association constitution with recent amendments',
    category: 'Policies',
    fileUrl: '#',
    date: '2024-11-20',
    size: '542 KB'
  },
  {
    title: 'Membership Registration Form',
    description: 'Official form for new member registration and renewal',
    category: 'Forms',
    fileUrl: '#',
    date: '2026-01-01',
    size: '124 KB'
  },
  {
    title: 'CPD Certificate Request Form',
    description: 'Application form for CPD credit certificate issuance',
    category: 'Forms',
    fileUrl: '#',
    date: '2026-01-01',
    size: '98 KB'
  },
  {
    title: '2025 External Auditors Report',
    description: 'Independent audit report on GPAA financial accounts',
    category: 'Reports',
    fileUrl: '#',
    date: '2025-12-15',
    size: '3.2 MB'
  },
  {
    title: 'Professional Indemnity Policy Guidelines',
    description: 'Guide to professional indemnity insurance for members',
    category: 'Policies',
    fileUrl: '#',
    date: '2025-10-01',
    size: '678 KB'
  }
];
