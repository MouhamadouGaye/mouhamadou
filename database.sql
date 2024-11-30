CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    media JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    pseudo VARCHAR(50),
    profile_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0,           -- Initialize likes with 0
    dislikes INT DEFAULT 0,        -- Initialize dislikes with 0
    shares INT DEFAULT 0,          -- Initialize shares with 0
    thumb_ups INT DEFAULT 0        -- Initialize thumb_ups with 0
);


CREATE TABLE likes (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE comments (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content VARCHAR(100)
);

INSERT INTO users (username, email, password_hash, name, pseudo, profile_photo)
VALUES
('hawamassina', 'hawa@example.com', 'hawad123', 'Hawa Massina', 'hawa', '1725834397275_image2.png'),
('bachirgaye', 'bachir@example.com', 'bachir123', 'Bachir Gaye', 'bachir', '1725834454564_image1.jpg');


-- Insert posts
UPDATE TABLE posts WHERE user_id = 1,
VALUES
(1, 'This is my first post!', 'images/image1.jpg'),
(2, 'Hello world! This is Bachir.','images/image2.jpg');

SELECT content, 'http://localhost:3005' || media AS image_url
FROM images;

-- Insert comments
INSERT INTO comments (post_id, user_id, content)
VALUES
(1, 2, 'Nice post, Bachir!'),
(2, 1, 'Thanks, Gaye!');


INSERT INTO likes (post_id, user_id)
VALUES
(1, 2), 
(2, 1); 


-- INSERT INTO posts (content, media) 
-- VALUES ('Je suis le grand bachir', 'bachir.jpg'),
-- ('Je suis la maman de Bachir', 'hawa.png');



UPDATE posts
SET content = CASE 
                WHEN user_id = 1 THEN 'This is my first post!'
                WHEN user_id = 2 THEN 'Hello world! This is Hawa.'
              END,
    media = CASE 
              WHEN user_id = 1 THEN 'images/image1.jpg'
              WHEN user_id = 2 THEN 'images/image2.jpg'
            END
WHERE user_id = 1 AND user_id IN (1, 2);
z
-- Adjusted Schema with Separate Interaction Tables:
-- Users table (same as before)

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),s
    pseudo VARCHAR(50),
    profile_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table (store only post data without interactions)
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table: A user can like a post only once
CREATE TABLE comments (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    post_id INT REFERENCES users(user_id)
    content VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
);

CREATE TABLE comments (
    post_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE;
    content VARCHAR(100)
    create_at TIMESTAMP NOT NULL DEFAUL CURRENT_TIMESTAMP
)


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);


-- Likes table: A user can like a post only once
CREATE TABLE likes (
    post_id INT,
    user_id INT,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Dislikes table: A user can dislike a post only once
CREATE TABLE dislikes (
    post_id INT,
    user_id INT,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Shares table: A user can share a post only once
CREATE TABLE shares (
    post_id INT,
    user_id INT,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Thumb-ups table: A user can thumb-up a post only once
CREATE TABLE thumb_ups (
    post_id INT,
    user_id INT,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE post_interactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    action VARCHAR(50) NOT NULL, -- like, dislike, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id, action) -- Ensures one interaction per action per user per post
);





--- EXPLANATION OF THIS CODE :
SELECT 
  comments.comment_id, 
  comments.content, 
  comments.created_at, 
  comments.user_id, 
  users.name AS author, 
  users.profile_photo
FROM 
  comments
JOIN 
  users ON comments.user_id = users.user_id
WHERE 
  comments.post_id = $1
ORDER BY 
  comments.created_at ASC;

--::1 - JOIN users ON comments.user_id = users.user_id: 
-- This links each comment to the user who made it.

--::2 - SELECT comments.* and users.profile_photo: 
-- Fetches all columns from comments and the profile_photo (or any other user-related information) from the users table.

--::3 - WHERE comments.post_id = $1: 
-- Filters comments to only those associated with the specified post.



-- To increase the size of the VARCHAR column content from 100 to 300 characters,
--  you can use the ALTER TABLE SQL command. Here's the specific command for your comments table:
ALTER TABLE comments
ALTER COLUMN content TYPE VARCHAR(300);


-- Why Use offset in Pagination?
-- When fetching paginated data from a database, you typically use SQL queries like:
SELECT * FROM posts LIMIT 10 OFFSET 20;
LIMIT 10: Fetch 10 items.
OFFSET 20: Skip the first 20 items.
This fetches the data for page = 3 when limit = 10.
