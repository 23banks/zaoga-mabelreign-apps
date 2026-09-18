// Sample content for the ZAOGA FIF Mabelreign Kingdom District webapp.
// Replace with real API calls (see lib/api.js) once the backend is connected.

export const announcements = [
  {
    id: 1,
    title: 'District Prayer Conference — Registration Now Open',
    date: '2026-09-20',
    body: 'Join us for three days of powerful prayer and worship as we seek God together as a district. Register at the welcome desk or online.',
    urgent: true,
  },
  {
    id: 2,
    title: 'New Members Class Starting This Sunday',
    date: '2026-09-21',
    body: 'If you are new to ZAOGA FIF Mabelreign Kingdom District, join our New Members Class right after the main service.',
    urgent: false,
  },
  {
    id: 3,
    title: 'Cell Group Leaders Meeting',
    date: '2026-09-24',
    body: 'All cell group leaders are required to attend the monthly leaders meeting at the district office.',
    urgent: false,
  },
];

export const sermons = [
  {
    id: 1,
    title: 'Walking in Kingdom Authority',
    speaker: 'Pastor T. Makuyana',
    date: '2026-09-14',
    category: 'Sunday Service',
    duration: '58 min',
    type: 'video',
    thumbnail: '🎥',
    description: 'Discover what it means to walk in the authority Christ has given every believer.',
  },
  {
    id: 2,
    title: 'The Power of Consistent Prayer',
    speaker: 'Pastor A. Kativhu',
    date: '2026-09-07',
    category: 'Midweek Service',
    duration: '42 min',
    type: 'audio',
    thumbnail: '🎙️',
    description: 'A practical teaching on building a lasting prayer life that transforms your walk with God.',
  },
  {
    id: 3,
    title: 'Faith That Moves Mountains',
    speaker: 'Pastor T. Makuyana',
    date: '2026-08-31',
    category: 'Sunday Service',
    duration: '61 min',
    type: 'video',
    thumbnail: '🎥',
    description: 'Understanding biblical faith and how to apply it to the mountains in your life.',
  },
  {
    id: 4,
    title: 'Discipleship in the Modern Age',
    speaker: 'Elder R. Chuma',
    date: '2026-08-24',
    category: "Men's Fellowship",
    duration: '35 min',
    type: 'audio',
    thumbnail: '🎙️',
    description: 'How to make and be a disciple of Christ in a fast-changing digital world.',
  },
  {
    id: 5,
    title: 'Living a Life of Thanksgiving',
    speaker: 'Pastor A. Kativhu',
    date: '2026-08-17',
    category: 'Sunday Service',
    duration: '54 min',
    type: 'video',
    thumbnail: '🎥',
    description: 'A grateful heart unlocks the fullness of what God has for you.',
  },
  {
    id: 6,
    title: "Raising Godly Families",
    speaker: "Pastor's Wife M. Makuyana",
    date: '2026-08-10',
    category: "Women's Fellowship",
    duration: '47 min',
    type: 'audio',
    thumbnail: '🎙️',
    description: 'Biblical principles for building a strong, Christ-centered home.',
  },
];

export const events = [
  {
    id: 1,
    title: 'District Prayer Conference',
    date: '2026-10-02',
    time: '18:00',
    location: 'Mabelreign Kingdom Centre',
    category: 'Conference',
    description: 'Three days of united prayer and worship across the district.',
  },
  {
    id: 2,
    title: 'Sunday Combined Service',
    date: '2026-09-21',
    time: '09:00',
    location: 'Main Auditorium',
    category: 'Service',
    description: 'All district branches gather for a combined celebration service.',
  },
  {
    id: 3,
    title: "Youth Fire Night",
    date: '2026-09-26',
    time: '19:00',
    location: 'Mabelreign Kingdom Centre',
    category: 'Youth',
    description: 'A night of worship, testimony, and the Word for the youth ministry.',
  },
  {
    id: 4,
    title: 'Cell Group Leaders Training',
    date: '2026-09-24',
    time: '17:30',
    location: 'District Office',
    category: 'Training',
    description: 'Equipping cell leaders for effective discipleship and outreach.',
  },
];

export const prayerRequests = [
  {
    id: 1,
    name: 'Anonymous Member',
    request: 'Please pray for healing and complete restoration of health for my mother.',
    date: '2026-09-15',
    prayedFor: 24,
    status: 'open',
  },
  {
    id: 2,
    name: 'Grace M.',
    request: 'Praying for direction and favour as I start a new job next month.',
    date: '2026-09-14',
    prayedFor: 18,
    status: 'open',
  },
  {
    id: 3,
    name: 'Anonymous Member',
    request: 'Please stand with my family in prayer for unity and breakthrough.',
    date: '2026-09-12',
    prayedFor: 31,
    status: 'open',
  },
];

export const testimonies = [
  {
    id: 1,
    name: 'Tendai C.',
    title: 'Healed After Months of Illness',
    story: 'After the district prayed for me during the midweek service, I was completely healed. God is faithful!',
    date: '2026-09-10',
    likes: 42,
  },
  {
    id: 2,
    name: 'Rudo K.',
    title: 'Provision in a Season of Need',
    story: 'God provided for my family in a way we never expected. Thank you to everyone who prayed with us.',
    date: '2026-09-05',
    likes: 37,
  },
  {
    id: 3,
    name: 'Tapiwa N.',
    title: 'Restored Relationship',
    story: 'Through prayer and counsel from the leadership, my marriage was restored. God is a restorer!',
    date: '2026-08-29',
    likes: 55,
  },
];

export const devotions = [
  {
    id: 1,
    date: '2026-09-17',
    title: 'Strength for Today',
    verse: '"The Lord is my strength and my shield; my heart trusts in him, and he helps me." — Psalm 28:7',
    reflection:
      'Whatever you are facing today, remember that your strength does not come from your own ability but from the Lord who upholds you. Lean on Him and watch Him carry you through.',
  },
  {
    id: 2,
    date: '2026-09-16',
    title: 'A New Mercy',
    verse: '"His mercies are new every morning; great is your faithfulness." — Lamentations 3:23',
    reflection:
      'No matter how yesterday ended, today is a fresh start. God\'s mercy meets you exactly where you are.',
  },
];

export const mediaGallery = [
  { id: 1, title: 'District Prayer Conference 2026', type: 'photo', emoji: '📸', event: 'Prayer Conference' },
  { id: 2, title: 'Youth Fire Night Highlights', type: 'video', emoji: '🎬', event: 'Youth Fire Night' },
  { id: 3, title: 'Combined Sunday Service', type: 'photo', emoji: '📸', event: 'Sunday Service' },
  { id: 4, title: "Women's Fellowship Retreat", type: 'photo', emoji: '📸', event: "Women's Fellowship" },
  { id: 5, title: 'Baptism Sunday', type: 'video', emoji: '🎬', event: 'Baptism' },
  { id: 6, title: "Men's Breakfast Meeting", type: 'photo', emoji: '📸', event: "Men's Fellowship" },
];
