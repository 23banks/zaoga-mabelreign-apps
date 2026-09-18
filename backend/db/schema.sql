-- ZAOGA FIF Mabelreign Kingdom District — database schema

IF DB_ID('zaoga_db') IS NULL
BEGIN
    CREATE DATABASE zaoga_db;
END
GO

USE zaoga_db;
GO

-- Login + user for the backend app (SQL auth)
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'zaoga_app')
BEGIN
    CREATE LOGIN zaoga_app WITH PASSWORD = 'Zaoga#App_2026!', CHECK_POLICY = ON;
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'zaoga_app')
BEGIN
    CREATE USER zaoga_app FOR LOGIN zaoga_app;
    ALTER ROLE db_owner ADD MEMBER zaoga_app;
END
GO

IF OBJECT_ID('dbo.users', 'U') IS NULL
CREATE TABLE dbo.users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL,
    role NVARCHAR(20) NOT NULL DEFAULT 'member',
    status NVARCHAR(20) NOT NULL DEFAULT 'active',
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.announcements', 'U') IS NULL
CREATE TABLE dbo.announcements (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title NVARCHAR(255) NOT NULL,
    body NVARCHAR(MAX) NOT NULL,
    is_urgent BIT NOT NULL DEFAULT 0,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.sermons', 'U') IS NULL
CREATE TABLE dbo.sermons (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title NVARCHAR(255) NOT NULL,
    speaker NVARCHAR(150) NOT NULL,
    sermon_date DATE NOT NULL,
    category NVARCHAR(100) NOT NULL,
    duration NVARCHAR(20) NOT NULL,
    type NVARCHAR(10) NOT NULL, -- video | audio
    description NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.events', 'U') IS NULL
CREATE TABLE dbo.events (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title NVARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time NVARCHAR(10) NOT NULL,
    location NVARCHAR(255) NOT NULL,
    category NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.prayer_requests', 'U') IS NULL
CREATE TABLE dbo.prayer_requests (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NULL REFERENCES dbo.users(id),
    name NVARCHAR(150) NOT NULL DEFAULT 'Anonymous Member',
    request NVARCHAR(MAX) NOT NULL,
    prayed_count INT NOT NULL DEFAULT 0,
    status NVARCHAR(20) NOT NULL DEFAULT 'open',
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.testimonies', 'U') IS NULL
CREATE TABLE dbo.testimonies (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NULL REFERENCES dbo.users(id),
    name NVARCHAR(150) NOT NULL DEFAULT 'Anonymous Member',
    title NVARCHAR(255) NOT NULL,
    story NVARCHAR(MAX) NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.devotions', 'U') IS NULL
CREATE TABLE dbo.devotions (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    devotion_date DATE NOT NULL UNIQUE,
    title NVARCHAR(255) NOT NULL,
    verse NVARCHAR(500) NOT NULL,
    reflection NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.media', 'U') IS NULL
CREATE TABLE dbo.media (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title NVARCHAR(255) NOT NULL,
    type NVARCHAR(10) NOT NULL, -- photo | video
    event_name NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
