require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Job = require('../models/Job');
const Application = require('../models/Application');

const jobsSeed = [
    {
        title: 'Senior Frontend Engineer',
        company: 'QuickHire Labs',
        location: 'Remote',
        category: 'Technology',
        description:
            'Build scalable frontend features with React and Next.js, collaborate with product and design teams, and improve performance across the hiring platform.',
        salary: '$95,000 - $130,000',
        jobType: 'Full-time',
        requirements: [
            '3+ years of React experience',
            'Strong JavaScript and TypeScript knowledge',
            'Experience with REST APIs and state management',
        ],
        responsibilities: [
            'Implement new user-facing features',
            'Optimize page speed and accessibility',
            'Work closely with backend and product teams',
        ],
        companyDescription: 'QuickHire Labs is building modern hiring workflows for fast-growing teams.',
        postedDate: '2 days ago',
    },
    {
        title: 'Product Designer',
        company: 'PixelCraft Studio',
        location: 'Berlin, Germany',
        category: 'Design',
        description:
            'Design intuitive hiring experiences, create prototypes, and collaborate with engineers to ship polished UI for job seekers and employers.',
        salary: '$70,000 - $95,000',
        jobType: 'Full-time',
        requirements: [
            'Portfolio with web app UX work',
            'Strong Figma skills',
            'Ability to run user feedback loops',
        ],
        responsibilities: [
            'Create wireframes and high-fidelity UI',
            'Maintain design consistency across the product',
            'Partner with PM and engineering in sprint cycles',
        ],
        companyDescription: 'PixelCraft Studio creates digital product experiences for global startups.',
        postedDate: '4 days ago',
    },
    {
        title: 'Growth Marketing Specialist',
        company: 'LaunchWave',
        location: 'Austin, TX',
        category: 'Marketing',
        description:
            'Drive acquisition campaigns for employer signups, run performance experiments, and optimize conversion across channels.',
        salary: '$60,000 - $85,000',
        jobType: 'Full-time',
        requirements: [
            'Hands-on paid ads experience',
            'Comfort with analytics dashboards',
            'Strong copywriting for conversion',
        ],
        responsibilities: [
            'Launch and optimize ad campaigns',
            'Build campaign reports and insights',
            'Coordinate with product on growth initiatives',
        ],
        companyDescription: 'LaunchWave helps B2B teams scale growth through data-driven execution.',
        postedDate: '1 day ago',
    },
    {
        title: 'Data Analyst',
        company: 'InsightGrid',
        location: 'Toronto, Canada',
        category: 'Technology',
        description:
            'Analyze hiring funnel metrics, build dashboards, and support decision making across recruiting and product teams.',
        salary: '$65,000 - $90,000',
        jobType: 'Contract',
        requirements: [
            'SQL proficiency',
            'Experience with BI tools',
            'Strong communication of insights',
        ],
        responsibilities: [
            'Create KPI dashboards',
            'Monitor conversion and drop-off trends',
            'Provide weekly data recommendations',
        ],
        companyDescription: 'InsightGrid transforms raw data into actionable business intelligence.',
        postedDate: 'Today',
    },
    {
        title: 'HR Operations Associate',
        company: 'PeopleFirst Co.',
        location: 'London, UK',
        category: 'Human Resources',
        description:
            'Support recruiting operations, coordinate interviews, and maintain candidate records across multiple roles.',
        salary: '$45,000 - $62,000',
        jobType: 'Part-time',
        requirements: [
            'Experience in HR coordination',
            'Excellent organizational skills',
            'Strong communication with candidates',
        ],
        responsibilities: [
            'Schedule interviews with candidates',
            'Maintain accurate recruiting records',
            'Support hiring manager workflows',
        ],
        companyDescription: 'PeopleFirst Co. focuses on human-centered hiring operations and culture.',
        postedDate: '3 days ago',
    },
    {
        title: 'Junior Backend Developer',
        company: 'APIForge',
        location: 'Dhaka, Bangladesh',
        category: 'Technology',
        description:
            'Implement backend endpoints, integrate MongoDB models, and help maintain a stable API used by frontend applications.',
        salary: '$35,000 - $50,000',
        jobType: 'Internship',
        requirements: [
            'Basic Node.js and Express knowledge',
            'Familiarity with MongoDB',
            'Understanding of REST APIs',
        ],
        responsibilities: [
            'Build and test API endpoints',
            'Write clean and maintainable server code',
            'Fix bugs and improve backend reliability',
        ],
        companyDescription: 'APIForge builds robust backend systems for modern web applications.',
        postedDate: '5 days ago',
    },
    {
        title: 'Sales Executive',
        company: 'VenturePlus',
        location: 'New York, NY',
        category: 'Sales',
        description:
            'Drive revenue growth by prospecting and closing deals with enterprise clients. Build relationships and exceed quarterly targets.',
        salary: '$50,000 - $75,000 + Commission',
        jobType: 'Full-time',
        requirements: [
            '2+ years in enterprise sales',
            'Strong negotiation skills',
            'CRM software experience',
        ],
        responsibilities: [
            'Develop new business opportunities',
            'Manage sales pipeline and forecasting',
            'Close deals and exceed quota targets',
        ],
        companyDescription: 'VenturePlus provides B2B solutions for growing startups and enterprises.',
        postedDate: '6 days ago',
    },
    {
        title: 'Financial Analyst',
        company: 'FinanceHub',
        location: 'San Francisco, CA',
        category: 'Finance',
        description:
            'Analyze financial statements, build models, and provide insights to support strategic business decisions.',
        salary: '$70,000 - $100,000',
        jobType: 'Full-time',
        requirements: [
            'Strong Excel and modeling skills',
            'Knowledge of financial statements',
            'Attention to detail',
        ],
        responsibilities: [
            'Build financial models and forecasts',
            'Analyze company performance metrics',
            'Prepare reports for leadership review',
        ],
        companyDescription: 'FinanceHub delivers financial intelligence solutions to Fortune 500 companies.',
        postedDate: '4 days ago',
    },
    {
        title: 'Business Development Manager',
        company: 'GrowthCo',
        location: 'Singapore',
        category: 'Business',
        description:
            'Identify and evaluate new business opportunities, manage partnerships, and drive expansion into new markets.',
        salary: '$65,000 - $95,000',
        jobType: 'Full-time',
        requirements: [
            '3+ years of business development experience',
            'Strong analytical and negotiation skills',
            'Experience with market analysis',
        ],
        responsibilities: [
            'Identify growth opportunities',
            'Negotiate and manage partnerships',
            'Monitor market trends and competitor activity',
        ],
        companyDescription: 'GrowthCo accelerates business expansion through strategic partnerships and market insights.',
        postedDate: '2 days ago',
    },
    {
        title: 'Systems Engineer',
        company: 'TechCore Solutions',
        location: 'Seattle, WA',
        category: 'Engineering',
        description:
            'Design and maintain scalable infrastructure, ensure system reliability, and collaborate with development teams.',
        salary: '$85,000 - $120,000',
        jobType: 'Full-time',
        requirements: [
            '5+ years of systems or infrastructure experience',
            'Cloud platform expertise (AWS/Azure)',
            'Strong Linux and networking knowledge',
        ],
        responsibilities: [
            'Design and deploy system architectures',
            'Optimize system performance and reliability',
            'Implement monitoring and automation solutions',
        ],
        companyDescription: 'TechCore Solutions provides enterprise infrastructure and cloud solutions.',
        postedDate: '3 days ago',
    },
];

const candidatePool = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        resumeLink: 'https://example.com/resume/sarah-johnson',
        coverNote: 'I bring strong product thinking and execution experience and would love to contribute to your team.',
        status: 'Pending',
    },
    {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        resumeLink: 'https://example.com/resume/michael-chen',
        coverNote: 'I have hands-on experience building and scaling web apps and I am excited about this opportunity.',
        status: 'Reviewed',
    },
    {
        name: 'Emma Williams',
        email: 'emma.williams@example.com',
        resumeLink: 'https://example.com/resume/emma-williams',
        coverNote: 'My background aligns with the role requirements and I am confident I can add immediate value.',
        status: 'Accepted',
    },
    {
        name: 'Arif Rahman',
        email: 'arif.rahman@example.com',
        resumeLink: 'https://example.com/resume/arif-rahman',
        coverNote: 'I am eager to contribute my technical and collaborative skills to your hiring team goals.',
        status: 'Rejected',
    },
    {
        name: 'Nina Patel',
        email: 'nina.patel@example.com',
        resumeLink: 'https://example.com/resume/nina-patel',
        coverNote: 'I am passionate about this domain and would be excited to grow with your organization.',
        status: 'Pending',
    },
    {
        name: 'Daniel Kim',
        email: 'daniel.kim@example.com',
        resumeLink: 'https://example.com/resume/daniel-kim',
        coverNote: 'I have delivered similar projects before and can contribute quickly from day one.',
        status: 'Reviewed',
    },
    {
        name: 'Fatima Noor',
        email: 'fatima.noor@example.com',
        resumeLink: 'https://example.com/resume/fatima-noor',
        coverNote: 'I am detail-oriented and committed to delivering quality outcomes for this role.',
        status: 'Pending',
    },
    {
        name: 'Leo Martin',
        email: 'leo.martin@example.com',
        resumeLink: 'https://example.com/resume/leo-martin',
        coverNote: 'This role is an excellent match with my experience and long-term career goals.',
        status: 'Reviewed',
    },
    {
        name: 'Ayesha Khan',
        email: 'ayesha.khan@example.com',
        resumeLink: 'https://example.com/resume/ayesha-khan',
        coverNote: 'I enjoy working in fast-paced teams and solving practical problems with measurable impact.',
        status: 'Pending',
    },
    {
        name: 'Tom Becker',
        email: 'tom.becker@example.com',
        resumeLink: 'https://example.com/resume/tom-becker',
        coverNote: 'I am motivated by meaningful work and would appreciate the chance to interview for this role.',
        status: 'Accepted',
    },
    {
        name: 'Mariam Hossain',
        email: 'mariam.hossain@example.com',
        resumeLink: 'https://example.com/resume/mariam-hossain',
        coverNote: 'I combine strong execution with communication and would bring immediate support to the team.',
        status: 'Pending',
    },
    {
        name: 'Chris Evans',
        email: 'chris.evans@example.com',
        resumeLink: 'https://example.com/resume/chris-evans',
        coverNote: 'I have worked on similar responsibilities and I am excited to help your team succeed.',
        status: 'Reviewed',
    },
];

async function seedDatabase() {
    try {
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI is missing in backend/.env');
            process.exit(1);
        }

        await connectDB();

        console.log('🧹 Clearing existing demo data...');
        await Application.deleteMany({});
        await Job.deleteMany({});

        console.log('🌱 Inserting jobs...');
        const createdJobs = await Job.insertMany(
            jobsSeed.map((job) => ({
                ...job,
                applicants: 0,
            }))
        );

        console.log('🌱 Inserting applications...');
        const applicationsToInsert = [];

        createdJobs.forEach((job, index) => {
            const candidatesForJob = candidatePool.slice(index * 2, index * 2 + 2);

            candidatesForJob.forEach((candidate) => {
                applicationsToInsert.push({
                    jobId: job._id,
                    name: candidate.name,
                    email: candidate.email,
                    resumeLink: candidate.resumeLink,
                    coverNote: candidate.coverNote,
                    status: candidate.status,
                });
            });
        });

        const createdApplications = await Application.insertMany(applicationsToInsert);

        // Update applicants count per job
        const applicantCounts = applicationsToInsert.reduce((acc, app) => {
            const key = app.jobId.toString();
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        await Promise.all(
            createdJobs.map((job) =>
                Job.findByIdAndUpdate(job._id, {
                    applicants: applicantCounts[job._id.toString()] || 0,
                })
            )
        );

        console.log('✅ Seed complete');
        console.log(`   Jobs inserted: ${createdJobs.length}`);
        console.log(`   Applications inserted: ${createdApplications.length}`);
        console.log('🚀 You can now test full frontend/backend flow');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seedDatabase();
