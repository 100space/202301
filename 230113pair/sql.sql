CREATE TABLE `board` (
  `boardid` integer PRIMARY KEY,
  `userid` varchar(255),
  `subject` varchar(255),
  `content` varchar(150),
  `register` date,
  `hit` varchar(255)
);

CREATE TABLE `comment` (
  `commentid` integer PRIMARY KEY,
  `userid` varchar(255),
  `boardid` integer,
  `content` text
);

CREATE TABLE `user` (
  `userid` varchar(255) PRIMARY KEY,
  `userpw` varchar(255),
  `username` varchar(255)
);

CREATE TABLE `like` (
  `likeid` integer PRIMARY KEY,
  `userid` varchar(255),
  `boardid` integer
);

CREATE TABLE `hashtag` (
  `boardid` integer,
  `tagname` varchar(255)
);

CREATE TABLE `hash` (
  `tagid` integer UNIQUE,
  `tagname` varchar(255) PRIMARY KEY
);

ALTER TABLE `hashtag` ADD FOREIGN KEY (`tagname`) REFERENCES `hash` (`tagname`);

ALTER TABLE `hashtag` ADD FOREIGN KEY (`boardid`) REFERENCES `board` (`boardid`);

ALTER TABLE `like` ADD FOREIGN KEY (`boardid`) REFERENCES `board` (`boardid`);

ALTER TABLE `comment` ADD FOREIGN KEY (`boardid`) REFERENCES `board` (`boardid`);

ALTER TABLE `like` ADD FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

ALTER TABLE `comment` ADD FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

ALTER TABLE `board` ADD FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);



