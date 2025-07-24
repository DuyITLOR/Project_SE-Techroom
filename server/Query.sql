    CREATE TABLE admin(
        ID INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255)
    )


    INSERT INTO admin(username, password) VALUES 
    ('admin', '12345'),
    ('admin1', '123456'),
    ('admin2', '123456')


    SELECT * FROM admin