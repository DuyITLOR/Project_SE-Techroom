
import multer from 'multer';
import path from 'path';

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Lưu file vào thư mục public
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    const fileName = file.originalname.replace(/\.[^/.]+$/, ""); // bỏ đuôi
    cb(null, fileName + '-' + uniqueSuffix); // Ví dụ: 16915834123.pdf
  }
});

const upload = multer({ storage });

export default upload;
