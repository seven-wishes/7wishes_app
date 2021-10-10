const db = require('../db');
const countAge = require('../utils/users');
const nodemailer = require("nodemailer");

class ArticlesController {
    async getArticles (req, res) {
        try {
            const articles = await db.query("SELECT * FROM articles JOIN accounts a on a.id =" +
                " articles.account_id" +
                " JOIN cities c on c.id = a.city_id WHERE is_active = true AND articles.created_at  >= NOW() -" +
                " INTERVAL '24 HOURS' AND a.account_is_active = true ORDER BY articles.created_at DESC");

            const articlesData = articles.rows

            const articles_list = articlesData.map(item => {
                const date_of_birth = {
                    year: item.birth_date.getFullYear(),
                    month: item.birth_date.getMonth(),
                    day: item.birth_date.getDate()
                }

                return {
                    id: item.id,
                    date: item.created_at,
                    account_id: item.account_id,
                    body: item.body,
                    nickname: item.nickname || 'Аноним',
                    avatar_url: item.avatar_url || '',
                    city: item.city_title,
                    age: countAge(date_of_birth.year, date_of_birth.month, date_of_birth.day)
                }
            })

            res.json({
                result: 0,
                articles: articles_list
            });
        } catch (e) {
            console.error(e);
        }
    }

    async createArticle (req, res) {
        try {
            const {text} = req.body
            const user_id = req.session.user_id

            if (!text || text.length === 0) {
                return res.json({
                    result: 1,
                    message: "Вы не написали сообщение"
                })
            }

            const candidate = await db.query("SELECT * FROM accounts WHERE user_id = $1", [user_id]);

            if (!candidate) {
                return res.json({
                    result: 2
                })
            }

            const data = await db.query("INSERT INTO articles (body, account_id) VALUES" +
                " ($1, $2) RETURNING *", [text, candidate.rows[0].id]);

            const row = data.rows[0];
            const user = candidate.rows[0];

            const date_of_birth = {
                year: user.birth_date.getFullYear(),
                month: user.birth_date.getMonth(),
                day: user.birth_date.getDate()
            }

            const article = {
                id: row.id,
                date: row.created_at,
                account_id: row.account_id,
                body: row.body,
                nickname: user.nickname,
                avatar_url: user.avatar_url,
                city: user.city_title,
                age: countAge(date_of_birth.year, date_of_birth.month, date_of_birth.day) || null
            }

            res.json({
                result: 0,
                article
            })

        } catch (e) {
            console.error(e);
        }
    }

    async answerArticle (req, res) {
        try {
            const {text, account_id} = req.body
            const author_id = req.session.user_id

            const author = await db.query("SELECT login FROM users WHERE id = $1", [author_id]);

            const user = await db.query("SELECT user_id FROM accounts WHERE id = $1", [account_id]);
            const user_data = await db.query("SELECT login FROM users WHERE id = $1", [user.rows[0].user_id]);
            const user_email = user_data.rows[0].login

            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.yandex.ru",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "info@7wishes.club", // generated ethereal user
                        pass: "a1s2d3", // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"7 желаний." <info@7wishes.club>', // sender address
                    to: user_email, // list of receivers
                    subject: "Вам новое сообщение", // Subject line
                    text: `Вам сообщение: <br/>${text} <br/><br/>Автор: <a href="http://7-wishes.ru/user/${author_id}">http://7-wishes.ru/user/${author_id}</a>`, // plain text
                    // body
                    html: `Вам сообщение: <br/>${text} <br/><br/>Автор: <a href="http://7-wishes.ru/user/${author_id}">http://7-wishes.ru/user/${author_id}</a>`, // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }

            main().catch(console.error);

            res.json({
                'result': 0,
                message: 'Ваше сообщение отправлено!'
            })
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = new ArticlesController()
