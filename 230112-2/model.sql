-- user 테이블 만들기
CREATE TABLE `user` (
    userid VARCHAR(30) PRIMARY KEY,
    userpw VARCHAR(64) NOT NULL,
    username VARCHAR(20)
)

-- Board 테이블 만들기
CREATE TABLE `Board` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    register_data datetime default now()
    hit INT default 0 
)

-- 테이블 안에 있는 제약사항 확인하기
SELECT * FROM information_schema.table_constraints
-- WHERE절을 이용하여 범위를 정해줄 수 있다.
WHERE TABLE_SCHEMA = 'samples'
AND TABLE_NAME = 'Board'


-- fk 설정하기
ALTER TABLE `Board` 
    ADD CONSTRAINT fk_board_userid -- fk를 지울 떄 사용한다.
    FOREIGN KEY() 
    REFERENCES User(userid);

-- fk 삭제하기
ALTER TABLE `Board` DROP CONSTRAINT fk_board_userid;


