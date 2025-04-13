const multer = require("multer");

// Simple setup: multer will auto-generate random filenames
const upload = multer({ dest: 'public/data/uploads/' });

module.exports = upload;