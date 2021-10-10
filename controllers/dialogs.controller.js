const db = require('../db')

class DialogsController {
    async createDialog (req, res) {
        try {
            const user_id = req.body.user_id;
            const author_id = req.session.user_id;

            if (user_id === author_id) {
                return res.json({
                    'result' : 1,
                    'message' : `Вы не можете писать себе!`,
                });
            }

            const candidate = await db.query("SELECT * FROM dialogs WHERE user_1_id = $1 AND user_2_id = $2 OR (user_2_id = $1 AND user_1_id = $2)", [user_id, author_id])

            if (candidate.rows.length !== 0) {
                return res.json({
                    'result' : 1,
                    'dialog_id' : candidate.rows[0].id
                });
            }

            const dialog =  await db.query("INSERT INTO dialogs (user_1_id, user_2_id) VALUES ($1, $2) RETURNING *", [author_id, user_id]);

            res.json({
                'result' : 0,
                'dialog_id' : dialog.rows[0].id
            });
        } catch (e) {
            console.log(e);
        }
    }

    async checkDialog (req, res) {
        try {
            const user_id = req.body.user_id;
            const author_id = req.session.user_id;

            const candidate = await db.query("SELECT * FROM dialogs WHERE user_1_id = $1 AND user_2_id = $2 OR (user_2_id = $1 AND user_1_id = $2)", [user_id, author_id])

            if (candidate.rows.length !== 0) {
                return res.json({
                    'result' : 1,
                    dialog_exists : true,
                    dialog_id: candidate.rows[0].id
                });
            }

            res.json({
                'result' : 0,
                'message' : `Диалога нет`
            });
        } catch (e) {
            console.log(e);
        }
    }

    async createMessage (req, res) {
        try {
            const {dialog_id, message_text} = req.body;
            const user_id = req.session.user_id;

            if (!message_text) {
                return res.json({
                    'result' : 1,
                    'message' : `Вы не написали сообщение`
                });
            }

            const message_row = await db.query("INSERT INTO messages (message_text, author_id, dialog_id) VALUES ($1, $2, $3) RETURNING *", [message_text, user_id, dialog_id]);
            const user_nickname = await db.query("SELECT nickname FROM accounts WHERE user_id = $1", [user_id]);

            message_row.rows[0].user_nickname = user_nickname.rows[0].nickname;
            res.json({
                'result' : 0,
                'message' : `Сообщение отправлено`,
                'message_row' : message_row.rows[0]
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getDialogs (req, res) {
        try {
            const user_id = req.session.user_id;
            const dialogs = await db.query("SELECT * FROM dialogs WHERE user_1_id = $1 OR user_2_id = $1", [user_id]);

            console.log('dialogs', dialogs)
            for (let row in dialogs.rows) {
                if (!dialogs.rows.hasOwnProperty(row)) continue;

                console.log('row', dialogs.rows[row])
                const uid = user_id !== dialogs.rows[row].user_1_id ? dialogs.rows[row].user_1_id : dialogs.rows[row].user_2_id;
                const nickname = await db.query("SELECT nickname FROM accounts WHERE user_id = $1", [uid]);

                console.log('uid', uid)
                console.log('nickname', nickname)
                dialogs.rows[row].user_nickname = nickname.rows[0].nickname;

                const messages = await db.query("SELECT id FROM messages WHERE dialog_id = $1", [dialogs.rows[row].id])
                const messages_exists = messages.rows.length !== 0;
                dialogs.rows[row].messages_exists = messages_exists;
            }

            if (dialogs.rows.length === 0) {
                return res.json({
                    'result' : 1,
                });
            }
            console.log(dialogs.rows)

            // const messages_exists = await db.query("SELECT id FROM messages WHERE dialog_id = $1", [dialogs.rows[0].id])
            // console.log(messages_exists.rows)

            res.json({
                'result' : 0,
                'dialogs' : dialogs.rows
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getDialog (req, res) {
        try {
            const dialog_id = req.params.dialog_id;
            const dialog = await db.query("SELECT * FROM messages WHERE dialog_id = $1", [dialog_id]);

            for (let row in dialog.rows) {
                if (!dialog.rows.hasOwnProperty(row)) continue;
                const user_id = dialog.rows[row].author_id;
                const nickname = await db.query("SELECT nickname FROM accounts WHERE user_id = $1", [user_id]);
                dialog.rows[row].user_nickname = nickname.rows[0].nickname;
            }

            if (dialog.rows.length === 0) {
                return res.json({
                    result: 1,
                    dialog_error: true
                })
            }

            res.json({
                result: 0,
                dialog: dialog.rows,
                dialog_id: dialog.rows[0].dialog_id,
                dialog_error: false
            })
        } catch (e) {
            console.log(e);
        }
    }

    async deleteMessage (req, res) {
        try {
            const { message_id } = req.body;
            await db.query("DELETE FROM messages WHERE id = $1 RETURNING *", [message_id])
            res.json({
                result: 0
            })
        } catch (e) {
            console.log(e);
        }
    }

    async deleteDialog (req, res) {
        try {
            const { dialog_id } = req.body;
            const plan_id = await db.query("SELECT plan_id FROM users WHERE id = $1", [req.session.user_id]);

            const access = plan_id.rows[0].plan_id >= 3;
            if (!access) {
                return res.json({
                    result: 1,
                    message: "Только пользователи с тарифом Gold и выше могут очищать переписку!"
                })
            }

            await db.query("DELETE FROM messages WHERE dialog_id = $1 RETURNING *", [dialog_id]);
            await db.query("DELETE FROM dialogs WHERE id = $1 RETURNING *", [dialog_id]);

            res.json({
                result: 0
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new DialogsController()
