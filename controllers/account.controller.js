const db = require('../db')

class AccountController {
    async createAccount (req, res) {
        try {
            const { user_id, gender_id } = req.body;
            const candidate = await db.query("SELECT * FROM accounts WHERE user_id = $1", [user_id]);
            if (candidate.rows.length !== 0) {
                res.json({
                    'message': 'У вас уже есть анкета',
                    'account': candidate.rows[0]
                });
            } else {
                const defaultID = 1;
                const user =  await db.query("INSERT INTO accounts (user_id, gender_id, city_id, eye_color_id, hair_color_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [user_id, gender_id, defaultID, defaultID, defaultID]);

                res.json({
                    'message': 'Анкета создана успешно',
                    'account': user.rows[0]
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async activateAccount (req, res) {
        try {
            const user_id = req.session.user_id;
            const user = await db.query("SELECT * FROM accounts WHERE user_id = $1", [user_id]);

            console.log('user', user.rows[0]);

            if (user.rows[0].nickname === null || user.rows[0].birth_date === null) {
                return res.json({
                    'result': 1,
                    'message': `Поля "Моё имя" и "Дата рождения" обязательны для заполнения.`
                });
            }

            await db.query("UPDATE accounts SET account_is_active = true WHERE user_id = $1 RETURNING *", [user_id]);
            res.json({
                'result': 0,
                'message': 'Анкета опубликована'
            });
        } catch (e) {
            console.log(e)
        }
    }

    async deactivateAccount (req, res) {
        try {
            const user_id = req.session.user_id;
            await db.query("UPDATE accounts SET account_is_active = false WHERE user_id = $1 RETURNING *", [user_id]);
            res.json({
                'result': 0,
                'message': 'Анкета снята с публикации'
            });
        } catch (e) {
            console.log(e)
        }
    }

    async setInvisible (req, res) {
        try {
            const invisibility = req.body.invisibility;
            const user_id = req.session.user_id;
            let is_invisible = await db.query("UPDATE accounts SET is_invisible = $1 WHERE user_id = $2 RETURNING *", [invisibility, user_id]);

            const plan = await db.query("SELECT plan_id FROM users WHERE id = $1", [user_id]);

            if (plan.rows[0]["plan_id"] < 3 ) {
                return res.json({
                    'result': 1,
                    'message': 'Невидимка доступна только для тарифа VIP!'
                });
            }

            res.json({
                'result': 0,
                'message': 'Режим невидимки изменен',
                is_invisible: !!is_invisible.rows[0]["is_invisible"]
            });
        } catch (e) {
            console.log(e)
        }
    }

    async resetInvisible (req, res) {
        try {
            await db.query("UPDATE accounts SET is_invisible = false WHERE is_invisible = true", []);
            res.json({
                result: 0
            })
        } catch (e) {
            console.log(e);
        }
    }

    async getMyAccount (req, res) {
        try {
            const user_id = req.session.user_id;

            const candidate = await db.query("SELECT * FROM accounts WHERE user_id = $1", [user_id]);
            let account_data = [];
            if (candidate.rows.length !== 0) {
                const account = await db.query("" +
                    "SELECT *, accounts.id as account_id FROM accounts " +
                    "JOIN genders g ON (g.id = accounts.gender_id AND accounts.gender_id IS NOT NULL) " +
                    "JOIN cities c ON (c.id = accounts.city_id) " +
                    "JOIN eye_colors ec ON (ec.id = accounts.eye_color_id) " +
                    "LEFT JOIN hair_colors hc ON (hc.id = accounts.hair_color_id) " +
                    "WHERE user_id = $1", [user_id]);

                account_data = account.rows[0];

                const images = await db.query("SELECT * FROM accounts_images WHERE account_id = $1", [account_data.account_id]);
                account_data["images"] = images.rows

                res.json({
                    result: 0,
                    account: account_data
                });
            } else {
                res.json({'result': 1});
            }

        } catch (e) {
            console.log(e)
        }
    }

    async deleteGalleryItem (req, res) {
        try {
            const {image_id} = req.body

            await db.query("DELETE FROM accounts_images WHERE image_id = $1", [image_id]);

            res.json({
                'result': 0,
                image_id
            });
        } catch (e) {
            console.log(e);
        }
    }

    async updateAccount (req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async updateCity (req, res) {
        try {
            const { city_id } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET city_id = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [city_id, user_id]);

            await res.json({
                'result': 0,
                'message': 'Город изменен',
                'nickname': account.rows[0].city_id
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateAge (req, res) {
        try {
            const { age } = req.body
            const user_id = req.session.user_id

            const sqlQuery = "UPDATE accounts SET birth_date = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [age, user_id]);

            await res.json({
                'result': 0,
                'message': 'Дата рождения изменена',
                'age': account.rows[0].birth_date
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateNickname (req, res) {
        try {
            const { nickname } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET nickname = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [nickname, user_id]);

            await res.json({
                'result': 0,
                'message': 'Имя сохранено',
                'nickname': account.rows[0].nickname
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateDescription (req, res) {
        try {
            const { description } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET description = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [description, user_id]);

            await res.json({
                'result': 0,
                'message': 'Описание сохранено',
                'description': account.rows[0].description
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateHeight (req, res) {
        try {
            const { height } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET height = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [height, user_id]);

            await res.json({
                'result': 0,
                'message': 'Рост сохранен',
                'height': account.rows[0].height
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateWeight (req, res) {
        try {
            const { weight } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET weight = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [weight, user_id]);

            await res.json({
                'result': 0,
                'message': 'Вес сохранен',
                'weight': account.rows[0].weight
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateEyeColor (req, res) {
        try {
            const { eye_color_id } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET eye_color_id = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [eye_color_id, user_id]);

            await res.json({
                'result': 0,
                'message': 'Цвет глаз изменен',
                'eye_color_id': account.rows[0].eye_color_id
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateHairColor (req, res) {
        try {
            const { hair_color_id } = req.body
            const user_id = req.session.user_id
            const sqlQuery = "UPDATE accounts SET hair_color_id = $1 WHERE user_id = $2 RETURNING *"
            const account = await db.query(sqlQuery, [hair_color_id, user_id]);

            await res.json({
                'result': 0,
                'message': 'Цвет волос изменен',
                'hair_color_id': account.rows[0].hair_color_id
            });
        } catch (e) {
            console.log(e)
        }
    }

    async updateGoal (req, res) {
        try {
            const { goal, value } = req.body
            const user_id = req.session.user_id
            const sqlQuery = `UPDATE accounts SET ${goal} = $1 WHERE user_id = $2 RETURNING *`
            const account = await db.query(sqlQuery, [value, user_id]);

            await res.json({
                'result': 0,
                'message': 'Цели знакомства обновлены',
                'hair_color_id': account.rows[0].hair_color_id
            });
        } catch (e) {
            console.log(e)
        }
    }

    async getNewMessagesCount (req, res) {
        try {
            const user_id = req.body.user_id;

            const messages = await db.query("SELECT * FROM dialogs JOIN messages m on dialogs.id = m.dialog_id WHERE (user_1_id = $1 OR user_2_id = $1) AND m.is_read = false AND m.author_id != $1", [user_id]);

            await res.json({
                'result': 0,
                messages_count: messages.rowCount
            });
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AccountController()
