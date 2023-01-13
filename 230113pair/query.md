`SELECT
            A.boardid,
            A.userid,
            B.username,
            A.subject,
            A.createdAt,
            A.hit,
            COUNT(C.boardid) AS commentCount,
            COUNT(D.boardid) AS likeCount
            FROM Board AS A
            JOIN User AS B
            ON A.userid = B.userid
            LEFT JOIN Comment AS C
            ON A.boardid = C.boardid
            LEFT JOIN Likes AS D
            ON A.boardid = D.boardid
            GROUP BY A.boardid
            ORDER BY A.boardid DESC;
            `
