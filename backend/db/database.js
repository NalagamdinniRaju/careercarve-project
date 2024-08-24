
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./careercarve.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      area_of_interest TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating students table:', err);
      } else {
        console.log('Students table ready');
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      areas_of_expertise TEXT NOT NULL,
      is_premium BOOLEAN NOT NULL,
      bio TEXT,
      image_url TEXT,
      rating REAL
    )`, (err) => {
      if (err) {
        console.error('Error creating mentors table:', err);
      } else {
        console.log('Mentors table ready');
        clearAndInsertSampleMentors();
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      mentor_id INTEGER,
      duration INTEGER NOT NULL,
      date_time TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students (id),
      FOREIGN KEY (mentor_id) REFERENCES mentors (id)
    )`, (err) => {
      if (err) {
        console.error('Error creating bookings table:', err);
      } else {
        console.log('Bookings table ready');
      }
    });
  }
});

function clearAndInsertSampleMentors() {
    // Delete existing mentor entries
    db.run("DELETE FROM mentors", (err) => {
        if (err) {
            console.error('Error deleting existing mentors:', err);
        } else {
            console.log('Existing mentors deleted');
            insertSampleMentors();
        }
    });
}



function insertSampleMentors() {
    const sampleMentors = [
        {
            name: "John Doe",
            areas_of_expertise: "FMCG Sales, Digital Marketing",
            is_premium: true,
            bio: "10+ years in FMCG sales",
            image_url: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 4.7
        },
        {
            name: "Jane Smith",
            areas_of_expertise: "Equity Research, Financial Analysis",
            is_premium: true,
            bio: "Senior analyst at top investment bank",
            image_url: "https://randomuser.me/api/portraits/women/1.jpg",
            rating: 4.9
        },
        {
            name: "Mike Johnson",
            areas_of_expertise: "E-Commerce, Supply Chain Management",
            is_premium: false,
            bio: "Operations manager at Amazon",
            image_url: "https://randomuser.me/api/portraits/men/2.jpg",
            rating: 4.5
        },
        {
            name: "Sarah Williams",
            areas_of_expertise: "Human Resources, Organizational Behavior",
            is_premium: false,
            bio: "HR director with multinational experience",
            image_url: "https://randomuser.me/api/portraits/women/2.jpg",
            rating: 4.6
        },
        {
            name: "David Brown",
            areas_of_expertise: "Business Strategy, Consulting",
            is_premium: true,
            bio: "Former McKinsey consultant",
            image_url: "https://randomuser.me/api/portraits/men/3.jpg",
            rating: 4.8
        },
        {
            name: "Emily Davis",
            areas_of_expertise: "Marketing Analytics, Brand Management",
            is_premium: false,
            bio: "CMO of a fast-growing startup",
            image_url: "https://randomuser.me/api/portraits/women/3.jpg",
            rating: 4.4
        },
        {
            name: "Robert Wilson",
            areas_of_expertise: "Investment Banking, Private Equity",
            is_premium: true,
            bio: "20 years in investment banking",
            image_url: "https://randomuser.me/api/portraits/men/4.jpg",
            rating: 4.9
        },
        {
            name: "Lisa Anderson",
            areas_of_expertise: "Product Management, Agile Methodologies",
            is_premium: false,
            bio: "Senior PM at Google",
            image_url: "https://randomuser.me/api/portraits/women/4.jpg",
            rating: 4.7
        },
        {
            name: "Thomas Lee",
            areas_of_expertise: "Data Science, Business Intelligence",
            is_premium: true,
            bio: "Data scientist with PhD in Statistics",
            image_url: "https://randomuser.me/api/portraits/men/5.jpg",
            rating: 4.8
        },
        {
            name: "Anna Martinez",
            areas_of_expertise: "International Business, Cross-cultural Management",
            is_premium: false,
            bio: "Experienced in Asian and European markets",
            image_url: "https://randomuser.me/api/portraits/women/5.jpg",
            rating: 4.5
        },
        {
            name: "Chris Taylor",
            areas_of_expertise: "Entrepreneurship, Venture Capital",
            is_premium: true,
            bio: "Serial entrepreneur and angel investor",
            image_url: "https://randomuser.me/api/portraits/men/6.jpg",
            rating: 4.9
        },
        {
            name: "Michelle Wong",
            areas_of_expertise: "Corporate Finance, Mergers & Acquisitions",
            is_premium: false,
            bio: "CFO of a Fortune 500 company",
            image_url: "https://randomuser.me/api/portraits/women/6.jpg",
            rating: 4.7
        },
        {
            name: "Kevin Patel",
            areas_of_expertise: "Digital Transformation, IT Strategy",
            is_premium: true,
            bio: "CIO with experience in multiple industries",
            image_url: "https://randomuser.me/api/portraits/men/7.jpg",
            rating: 4.8
        },
        {
            name: "Olivia Green",
            areas_of_expertise: "Sustainability, Corporate Social Responsibility",
            is_premium: false,
            bio: "Sustainability consultant for global brands",
            image_url: "https://randomuser.me/api/portraits/women/7.jpg",
            rating: 4.6
        },
        {
            name: "Daniel Kim",
            areas_of_expertise: "Operations Management, Lean Six Sigma",
            is_premium: true,
            bio: "Operations excellence leader at Toyota",
            image_url: "https://randomuser.me/api/portraits/men/8.jpg",
            rating: 4.9
        },
        {
            name: "Sophia Chen",
            areas_of_expertise: "Fintech, Blockchain",
            is_premium: false,
            bio: "Founder of a successful fintech startup",
            image_url: "https://randomuser.me/api/portraits/women/8.jpg",
            rating: 4.7
        },
        {
            name: "Alex Johnson",
            areas_of_expertise: "Healthcare Management, Biotech",
            is_premium: true,
            bio: "Former hospital CEO, now in biotech",
            image_url: "https://randomuser.me/api/portraits/men/9.jpg",
            rating: 4.8
        },
        {
            name: "Natalie Brown",
            areas_of_expertise: "Retail Management, Customer Experience",
            is_premium: false,
            bio: "Head of retail operations at a luxury brand",
            image_url: "https://randomuser.me/api/portraits/women/9.jpg",
            rating: 4.5
        },
        {
            name: "Ryan Murphy",
            areas_of_expertise: "Sports Management, Entertainment Business",
            is_premium: true,
            bio: "Sports agent for top athletes",
            image_url: "https://randomuser.me/api/portraits/men/10.jpg",
            rating: 4.9
        },
        {
            name: "Isabel Torres",
            areas_of_expertise: "Non-profit Management, Social Entrepreneurship",
            is_premium: false,
            bio: "Founder of multiple successful NGOs",
            image_url: "https://randomuser.me/api/portraits/women/10.jpg",
            rating: 4.7
        },
        {
            name: "Emma Watson",
            areas_of_expertise: "Sustainable Fashion, Brand Management",
            is_premium: true,
            bio: "Ethical fashion advocate and brand strategist",
            image_url: "https://randomuser.me/api/portraits/women/11.jpg",
            rating: 4.8
        },
        {
            name: "Raj Patel",
            areas_of_expertise: "AI in Business, Machine Learning",
            is_premium: false,
            bio: "AI researcher and consultant for Fortune 500 companies",
            image_url: "https://randomuser.me/api/portraits/men/11.jpg",
            rating: 4.5
        },
        {
            name: "Lila Rodriguez",
            areas_of_expertise: "UX Design, User Research",
            is_premium: true,
            bio: "Lead UX designer at a major tech company",
            image_url: "https://randomuser.me/api/portraits/women/12.jpg",
            rating: 4.7
        },
        {
            name: "Ethan Foster",
            areas_of_expertise: "Cybersecurity, Information Systems",
            is_premium: false,
            bio: "Cybersecurity expert with government experience",
            image_url: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 4.6
        },
        {
            name: "Zoe Campbell",
            areas_of_expertise: "Digital Marketing, Social Media Strategy",
            is_premium: true,
            bio: "Digital marketing guru for global brands",
            image_url: "https://randomuser.me/api/portraits/women/13.jpg",
            rating: 4.9
        },
        {
            name: "Hassan Ali",
            areas_of_expertise: "International Trade, Logistics",
            is_premium: false,
            bio: "Expert in global supply chain management",
            image_url: "https://randomuser.me/api/portraits/men/13.jpg",
            rating: 4.5
        },
        {
            name: "Yuki Tanaka",
            areas_of_expertise: "Robotics, Automation",
            is_premium: true,
            bio: "Robotics engineer with multiple patents",
            image_url: "https://randomuser.me/api/portraits/women/14.jpg",
            rating: 4.8
        },
        {
            name: "Gabriel Santos",
            areas_of_expertise: "Renewable Energy, Environmental Policy",
            is_premium: false,
            bio: "Advisor on sustainable energy projects",
            image_url: "https://randomuser.me/api/portraits/men/14.jpg",
            rating: 4.6
        },
        {
            name: "Amelia Clark",
            areas_of_expertise: "Neuroscience, Psychology",
            is_premium: true,
            bio: "Researcher bridging neuroscience and business",
            image_url: "https://randomuser.me/api/portraits/women/15.jpg",
            rating: 4.9
        },
        {
            name: "Leo Nguyen",
            areas_of_expertise: "Mobile App Development, iOS/Android",
            is_premium: false,
            bio: "Mobile app developer with multiple successful apps",
            image_url: "https://randomuser.me/api/portraits/men/15.jpg",
            rating: 4.7
        },
        {
            name: "Sofia Rossi",
            areas_of_expertise: "Fashion Design, Textile Innovation",
            is_premium: true,
            bio: "Innovative fashion designer using eco-friendly materials",
            image_url: "https://randomuser.me/api/portraits/women/16.jpg",
            rating: 4.8
        },
        {
            name: "Jamal Edwards",
            areas_of_expertise: "Music Production, Entertainment Law",
            is_premium: false,
            bio: "Music producer and entertainment lawyer",
            image_url: "https://randomuser.me/api/portraits/men/16.jpg",
            rating: 4.5
        },
        {
            name: "Aria Zhang",
            areas_of_expertise: "Quantum Computing, Physics",
            is_premium: true,
            bio: "Quantum physicist working on next-gen computing",
            image_url: "https://randomuser.me/api/portraits/women/17.jpg",
            rating: 4.9
        },
        {
            name: "Lucas Fernandez",
            areas_of_expertise: "Urban Planning, Sustainable Architecture",
            is_premium: false,
            bio: "Architect specializing in sustainable urban development",
            image_url: "https://randomuser.me/api/portraits/men/17.jpg",
            rating: 4.6
        },
        {
            name: "Nora Olsen",
            areas_of_expertise: "Bioinformatics, Genomics",
            is_premium: true,
            bio: "Lead scientist at a cutting-edge biotech firm",
            image_url: "https://randomuser.me/api/portraits/women/18.jpg",
            rating: 4.8
        },
        {
            name: "Aiden Patel",
            areas_of_expertise: "Virtual Reality, Game Development",
            is_premium: false,
            bio: "VR pioneer and game developer",
            image_url: "https://randomuser.me/api/portraits/men/18.jpg",
            rating: 4.7
        },
        {
            name: "Zara Malik",
            areas_of_expertise: "Space Technology, Aerospace Engineering",
            is_premium: true,
            bio: "Aerospace engineer working on Mars missions",
            image_url: "https://randomuser.me/api/portraits/women/19.jpg",
            rating: 4.9
        },
        {
            name: "Felix Kowalski",
            areas_of_expertise: "Culinary Arts, Food Science",
            is_premium: false,
            bio: "Michelin-starred chef and food scientist",
            image_url: "https://randomuser.me/api/portraits/men/19.jpg",
            rating: 4.6
        },
        {
            name: "Maya Singh",
            areas_of_expertise: "Artificial Intelligence Ethics, Philosophy",
            is_premium: true,
            bio: "AI ethicist advising tech companies and governments",
            image_url: "https://randomuser.me/api/portraits/women/20.jpg",
            rating: 4.8
        },
        {
            name: "Liam O'Connor",
            areas_of_expertise: "Cryptocurrency, Blockchain Development",
            is_premium: false,
            bio: "Blockchain developer and crypto expert",
            image_url: "https://randomuser.me/api/portraits/men/20.jpg",
            rating: 4.7
        }
    ];
    
    const insertMentor = db.prepare("INSERT INTO mentors (name, areas_of_expertise, is_premium, bio, image_url, rating) VALUES (?, ?, ?, ?, ?, ?)");
    
    sampleMentors.forEach(mentor => {
        insertMentor.run(mentor.name, mentor.areas_of_expertise, mentor.is_premium, mentor.bio, mentor.image_url, mentor.rating, (err) => {
            if (err) {
                console.error('Error inserting mentor:', err);
            }
        });
    });
    
    insertMentor.finalize((err) => {
        if (err) {
            console.error('Error finalizing mentor insertion:', err);
        } else {
            console.log('Sample mentors inserted successfully');
        }
    });
}




module.exports = db;