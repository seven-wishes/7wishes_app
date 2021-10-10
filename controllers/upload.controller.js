const path = require('path');
const db = require('../db');
const multer  = require('multer');
const convert = require('heic-convert');
const { promisify } = require('util');

const uploadURL = './frontend/public/uploads/';
const staticURL = '/uploads/';
const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|gif|png|heic/

    if(fileTypes.test(file.mimetype)) {
        return cb(null, true)
    } else {
        return cb('Images only')
    }
};

class UploadController {
    async uploadPhoto (req, res) {
        try {
            const user_id = req.session.user_id;
            const userPath = uploadURL + user_id + '/';

            const storage = multer.diskStorage({
                destination: userPath,
                filename: function (req, file, cb) {
                    cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
                }
            });
            const upload = multer({
                storage: storage,
                limits: {fileSize: 5242880},
                fileFilter: function(req, file, cb) {
                    checkFileType(file, cb)
                }
            });

            await upload.fields([{name: 'avatar', maxCount: 1}, {name: 'gallery', maxCount: 4}])(req, res, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    const files = JSON.parse(JSON.stringify(req.files));
                    let file_key = ''

                    for (let key in files) {
                        file_key = key;
                    }

                    const avatar_url = path.join('/uploads', user_id.toString(), files["avatar"][0].filename);
                    db.query("UPDATE accounts SET avatar_url = $1 WHERE user_id = $2 RETURNING *", [avatar_url, user_id]);

                    res.json({
                        'result': 0,
                        'message': `Фото успешно загружено!`,
                        'file_url': avatar_url
                    });
                }
            });
        } catch (e) {
            console.log(e)
        }
    }

    async uploadGallery (req, res) {
        try {
            const user_id = req.session.user_id;
            const userPath = uploadURL + user_id + '/';

            const storage = multer.diskStorage({
                destination: userPath,
                filename: function (req, file, cb) {
                    cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
                }
            });
            const upload = multer({
                storage: storage,
                limits: {fileSize: 5242880},
                fileFilter: function(req, file, cb) {
                    checkFileType(file, cb)
                }
            });

            const user = await db.query("SELECT id FROM accounts WHERE user_id = $1", [user_id]);

            const account_id = user.rows[0].id;

            console.log(account_id)

            await upload.fields([{name: 'gallery', maxCount: 1}]) (req, res, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    const files = JSON.parse(JSON.stringify(req.files));
                    let file_key = ''

                    for (let key in files) {
                        file_key = key;
                    }

                    const url = path.join('/uploads', user_id.toString(), files["gallery"][0].filename);

                    const newGalleryImage = async (account_id, url) => {
                        const image = await db.query("INSERT INTO accounts_images (account_id, url) VALUES ($1, $2) RETURNING *", [account_id, url]);

                        res.json({
                            result: 0,
                            message: `Фото успешно загружено!`,
                            image: image.rows[0]
                        });
                    }
                    newGalleryImage(account_id, url);
                }
            });
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UploadController()
