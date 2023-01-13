CREATE TABLE `user` (
    userid VARCHAR(30) PRIMARY KEY,
    userpw VARCHAR(64) NOT NULL,
    username VARCHAR(20)
)


CREATE TABLE `Board` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    register_data datetime default now()
    hit INT default 0 
)