-- Run with `sqlcmd -f 65001 -i seed.sql ...` (UTF-8 input codepage) —
-- without it, sqlcmd misreads the non-ASCII em dashes below and corrupts
-- them on insert.
USE zaoga_db;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.announcements)
BEGIN
    INSERT INTO dbo.announcements (title, body, is_urgent) VALUES
    (N'District Prayer Conference — Registration Now Open', N'Join us for three days of powerful prayer and worship as we seek God together as a district. Register at the welcome desk or online.', 1),
    (N'New Members Class Starting This Sunday', N'If you are new to ZAOGA FIF Mabelreign Kingdom District, join our New Members Class right after the main service.', 0),
    (N'Cell Group Leaders Meeting', N'All cell group leaders are required to attend the monthly leaders meeting at the district office.', 0);
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.sermons)
BEGIN
    INSERT INTO dbo.sermons (title, speaker, sermon_date, category, duration, type, description) VALUES
    (N'Walking in Kingdom Authority', N'Pastor T. Makuyana', '2026-09-14', N'Sunday Service', N'58 min', N'video', N'Discover what it means to walk in the authority Christ has given every believer.'),
    (N'The Power of Consistent Prayer', N'Pastor A. Kativhu', '2026-09-07', N'Midweek Service', N'42 min', N'audio', N'A practical teaching on building a lasting prayer life that transforms your walk with God.'),
    (N'Faith That Moves Mountains', N'Pastor T. Makuyana', '2026-08-31', N'Sunday Service', N'61 min', N'video', N'Understanding biblical faith and how to apply it to the mountains in your life.'),
    (N'Discipleship in the Modern Age', N'Elder R. Chuma', '2026-08-24', N'Men''s Fellowship', N'35 min', N'audio', N'How to make and be a disciple of Christ in a fast-changing digital world.'),
    (N'Living a Life of Thanksgiving', N'Pastor A. Kativhu', '2026-08-17', N'Sunday Service', N'54 min', N'video', N'A grateful heart unlocks the fullness of what God has for you.'),
    (N'Raising Godly Families', N'Pastor''s Wife M. Makuyana', '2026-08-10', N'Women''s Fellowship', N'47 min', N'audio', N'Biblical principles for building a strong, Christ-centered home.');
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.events)
BEGIN
    INSERT INTO dbo.events (title, event_date, event_time, location, category, description) VALUES
    (N'District Prayer Conference', '2026-10-02', N'18:00', N'Mabelreign Kingdom Centre', N'Conference', N'Three days of united prayer and worship across the district.'),
    (N'Sunday Combined Service', '2026-09-21', N'09:00', N'Main Auditorium', N'Service', N'All district branches gather for a combined celebration service.'),
    (N'Youth Fire Night', '2026-09-26', N'19:00', N'Mabelreign Kingdom Centre', N'Youth', N'A night of worship, testimony, and the Word for the youth ministry.'),
    (N'Cell Group Leaders Training', '2026-09-24', N'17:30', N'District Office', N'Training', N'Equipping cell leaders for effective discipleship and outreach.');
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.prayer_requests)
BEGIN
    INSERT INTO dbo.prayer_requests (name, request, prayed_count) VALUES
    (N'Anonymous Member', N'Please pray for healing and complete restoration of health for my mother.', 24),
    (N'Grace M.', N'Praying for direction and favour as I start a new job next month.', 18),
    (N'Anonymous Member', N'Please stand with my family in prayer for unity and breakthrough.', 31);
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.testimonies)
BEGIN
    INSERT INTO dbo.testimonies (name, title, story, likes) VALUES
    (N'Tendai C.', N'Healed After Months of Illness', N'After the district prayed for me during the midweek service, I was completely healed. God is faithful!', 42),
    (N'Rudo K.', N'Provision in a Season of Need', N'God provided for my family in a way we never expected. Thank you to everyone who prayed with us.', 37),
    (N'Tapiwa N.', N'Restored Relationship', N'Through prayer and counsel from the leadership, my marriage was restored. God is a restorer!', 55);
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.devotions)
BEGIN
    INSERT INTO dbo.devotions (devotion_date, title, verse, reflection) VALUES
    ('2026-09-17', N'Strength for Today', N'"The Lord is my strength and my shield; my heart trusts in him, and he helps me." — Psalm 28:7', N'Whatever you are facing today, remember that your strength does not come from your own ability but from the Lord who upholds you. Lean on Him and watch Him carry you through.'),
    ('2026-09-16', N'A New Mercy', N'"His mercies are new every morning; great is your faithfulness." — Lamentations 3:23', N'No matter how yesterday ended, today is a fresh start. God''s mercy meets you exactly where you are.');
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.media)
BEGIN
    INSERT INTO dbo.media (title, type, event_name) VALUES
    (N'District Prayer Conference 2026', N'photo', N'Prayer Conference'),
    (N'Youth Fire Night Highlights', N'video', N'Youth Fire Night'),
    (N'Combined Sunday Service', N'photo', N'Sunday Service'),
    (N'Women''s Fellowship Retreat', N'photo', N'Women''s Fellowship'),
    (N'Baptism Sunday', N'video', N'Baptism'),
    (N'Men''s Breakfast Meeting', N'photo', N'Men''s Fellowship');
END
GO
