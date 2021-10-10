const bcrypt = require('bcryptjs')
const db = require('../db')
const nodemailer = require("nodemailer")

class AuthController {
    async login (req, res) {
        try {
            const {email, password} = req.body;
            try {
                const user = await db.query("SELECT * FROM users WHERE login = $1", [email.toLowerCase()]);

                if (user.rows.length <= 0) {
                    res.json({
                        result: 1,
                        'message': 'Такого пользователя не существует.'
                    })
                } else {
                    const checkPassword = await bcrypt.compare(password, user.rows[0].hash);

                    if(!checkPassword) {
                        res.json({
                            result: 2,
                            message: 'Неверное имя пользователя или пароль.'
                        })
                    } else {
                        try {
                            req.session.user_id = user.rows[0].id
                            req.session.gender_id = user.rows[0].gender_id
                            req.session.auth = true

                            res.json({
                                result: 0,
                                message: 'Вы успешно авторизованы.',
                                'user_id': req.session.user_id,
                                'gender_id': req.session.gender_id,
                                'plan_id': user.rows[0].plan_id
                            })
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }

        } catch (e) {
            console.log(e);
        }
    }

    async checkAuthorization (req, res) {
        try {
            const date = new Date();
            if (req.session.auth) {
                const user = await db.query("SELECT * FROM users WHERE id = $1", [req.session.user_id]);
                let plan_id = 1;

                if (req.session.gender_id === 0) {
                    console.log('woman', user.rows[0].plan_id)
                    if (user.rows[0].plan_id > 2) {
                        plan_id = user.rows[0].plan_active_date_to > date ? user.rows[0].plan_id : 2;
                    } else {
                        plan_id = 2;
                    }
                } else {
                    plan_id = user.rows[0].plan_active_date_to > date ? user.rows[0].plan_id : 1;
                }

                const plan_title = await db.query("SELECT plan_title FROM plans WHERE id = $1", [plan_id]);

                const online = !!(req.session.auth && req.session.user_id);

                await db.query("UPDATE accounts SET account_is_online = $1 WHERE user_id = $2 RETURNING *", [online, req.session.user_id]);

                const demo = user.rows[0].demo_starts_at ? user.rows[0].demo : false

                console.log('demo', demo, user.rows[0].start_demo_at)

                await res.json({
                    result: 0,
                    'user_id': req.session.user_id,
                    'gender_id': req.session.gender_id,
                    'demo': demo,
                    'plan_id': plan_id,
                    'plan_title': plan_title.rows[0].plan_title
                })
            } else {
                await res.json({result: 1})
            }
        } catch (e) {
            console.log(e);
        }
    }

    async logout (req, res) {
        try {
            await db.query("UPDATE accounts SET account_is_online = $1 WHERE user_id = $2 RETURNING *", [false, req.session.user_id]);

            req.session.destroy(() => {
                res.json({
                    'result': 0,
                    'message': 'Вы вышли из аккаунта.'
                })
            })
        } catch (e) {
            console.log(e);
        }
    }

    async forgotPassword (req, res) {
        try {
            const {email} = req.body;
            const user = await db.query("SELECT * FROM users WHERE login = $1", [email.toLowerCase()]);

            if (user.rowCount === 0) {
                return res.json({
                    result: 1,
                    message: 'Такого пользователя не существует.'
                })
            }

            const random_password = (length = 5) => {
                const result = [];
                const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
                for ( let i = 0; i < length; i++ ) {
                    result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
                }
                return result.join("");
            }
            const new_password = random_password(6);
            const hash = await bcrypt.hash(new_password, 10);

            await db.query("UPDATE users SET hash = $1 WHERE login = $2 RETURNING *", [hash, email.toLowerCase()]);

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
                    from: '"7 желаний. Сервис выгодных знакомств." <info@7wishes.club>', // sender address
                    to: email, // list of receivers
                    subject: "Восстановление пароля", // Subject line
                    text: `Ваш новый пароль: <b>${new_password}</b>. Используйте его для входа в личный кабинет.`, // plain text body
                    html: `Ваш новый пароль: <b>${new_password}</b>. Используйте его для входа в личный кабинет.`, // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                console.log('New password', new_password);

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }

            main().catch(console.error);

            res.json({
                'result': 0,
                message: `Новый пароль отправлен на электронную почту ${email}.`,
                user: user.rows[0]
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController()
