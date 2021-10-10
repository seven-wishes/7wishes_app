const bcrypt = require('bcryptjs')
const db = require('../db')
const countAge = require('../utils/users');

class UsersController {
    async getAccounts (req, res) {
        try {
            const page_size = 12;
            const { gender_id, page } = req.params;
            const page_offset = (page - 1) * page_size;

            const total_users_count = await db.query(`
                SELECT count(*) FROM accounts 
                WHERE gender_id = $1 AND account_is_active = true AND avatar_url IS NOT NULL
            `, [gender_id]);

            const accounts = await db.query(`
                SELECT accounts.id, nickname, description, user_id, height, weight, birth_date, city_id, accounts.gender_id, 
                       eye_color_id, hair_color_id, avatar_url, account_is_active, account_is_online, 
                       spouse, paramour, performer, mlfa, assistant, housemaid, friend, accounts.created_at, is_invisible, 
                       actual_date, accounts.demo, demo_start_at, city_title, u.plan_id, u.plan_active_date_to
                FROM accounts
                JOIN cities c ON (c.id = accounts.city_id AND accounts.city_id IS NOT NULL)
                JOIN users u on u.id = accounts.user_id
                WHERE accounts.gender_id = $1 AND account_is_active = true AND avatar_url IS NOT NULL
                ORDER BY actual_date DESC, created_at DESC LIMIT $2 OFFSET $3
            `, [gender_id, page_size, page_offset]);

            const userData = accounts.rows;

            // console.log(userData)
            for (let user in userData) {
                if (!userData.hasOwnProperty(user)) continue
                const date_of_birth = userData[user].birth_date !== null ?  {
                    year: userData[user].birth_date.getFullYear(),
                    month: userData[user].birth_date.getMonth(),
                    day: userData[user].birth_date.getDate()
                } : '';

                userData[user].age = userData[user].birth_date !== null
                    ? countAge(date_of_birth.year, date_of_birth.month, date_of_birth.day)
                    : '';
            }

            res.json({
                'result': 0,
                users_list: userData,
                total_users_count: Number(total_users_count.rows[0].count)
            });
        } catch (e) {
            console.error(e)
        }
    }

    async setMultipleFilters(req, res) {
        try {
            const {gender_id, filter} = req.body
            const {goals, age, weight, height} = filter

            let query = ''

            const goals_query = []
            const goals_filtered = goals.filter(item => item.active === true)
            if (goals_filtered.length) {
                goals.forEach((item, index) => {
                    console.log(item.id)
                    if (item.active) goals_query.push(`(${item.id} = true)`)
                })
            } else {
                goals_query.push(`(accounts.id IS NOT NULL)`)
            }

            const weight_query = []
            const weight_filtered = weight.filter(item => item.active === true)
            if (weight_filtered.length) {
                weight.forEach((item, index) => {
                    if (item.active) weight_query.push(`(weight BETWEEN ${item.from} AND ${item.to})`)
                })
            } else {
                weight_query.push(`(weight BETWEEN 0 AND 1000)`)
            }

            let height_query = []
            const height_filtered = height.filter(item => item.active === true)
            if (height_filtered.length) {
                height_filtered.forEach((item, index) => {
                    if (item.active) height_query.push(`(height BETWEEN ${item.from} AND ${item.to})`)
                })
            } else {
                height_query.push(`(height BETWEEN 0 AND 1000)`)
            }

            const query_select = `
                SELECT accounts.id, nickname, description, user_id, height, weight, birth_date, city_id, accounts.gender_id, 
                       eye_color_id, hair_color_id, avatar_url, account_is_active, account_is_online, 
                       spouse, paramour, performer, mlfa, assistant, housemaid, friend, accounts.created_at, is_invisible, 
                       actual_date, accounts.demo, demo_start_at, city_title, u.plan_id, u.plan_active_date_to
            `

            const query_alt = `
                FROM accounts 
                JOIN cities c ON (c.id = accounts.city_id AND accounts.city_id IS NOT NULL)
                JOIN users u on u.id = accounts.user_id
                WHERE account_is_active = true AND accounts.gender_id = ${gender_id}
                AND account_is_active = true AND avatar_url IS NOT NULL
            `

            query = `${query_select} ${query_alt} AND ${weight_query.join(' OR ')} AND ${height_query.join(' OR ')} AND ${goals_query.join(' OR')}`

            const users = await db.query(query)

            let usersData = users.rows

            const age_filtered = age.filter(item => item.active === true)
            if (age_filtered.length) {
                const result = []

                for (let user in usersData) {
                    if (!usersData.hasOwnProperty(user)) continue
                    let date_of_birth

                    if (usersData[user].birth_date !== null) {
                        date_of_birth = {
                            year: usersData[user].birth_date.getFullYear(),
                            month: usersData[user].birth_date.getMonth(),
                            day: usersData[user].birth_date.getDate()
                        }

                        age_filtered.forEach(item => {
                            if (countAge(date_of_birth.year, date_of_birth.month, date_of_birth.day) > item.from && countAge(date_of_birth.year, date_of_birth.month, date_of_birth.day) < item.to) {
                                result.push(usersData[user])
                            }
                        })
                    }
                }

                usersData = result
            }

            res.json({
                result: 0,
                users_list: usersData.filter(item => item.gender_id === gender_id),
                total_users_count: +usersData.filter(item => item.gender_id === gender_id).length
            })
        } catch (e) {
            console.error(e)
        }
    }

    async getUser (req, res) {
        const user_id = req.params.id;
        const user = await db.query("" +
            "SELECT * FROM accounts " +
            "JOIN cities c ON (c.id = accounts.city_id AND accounts.city_id IS NOT NULL) " +
            "JOIN eye_colors ec ON (ec.id = accounts.eye_color_id AND accounts.eye_color_id IS NOT NULL) " +
            "JOIN hair_colors hc ON (hc.id = accounts.hair_color_id AND accounts.hair_color_id IS NOT NULL) " +
            "WHERE user_id = $1", [user_id]);

        const userData = user.rows[0];
        const date_of_birth = {
            year: userData.birth_date.getFullYear(),
            month: userData.birth_date.getMonth(),
            day: userData.birth_date.getDate()
        }

        userData.age = await countAge(date_of_birth.year, date_of_birth.month, date_of_birth.day)

        res.json({
            result: 0,
            user: userData
        });
    }

    async createUser (req, res) {
        const { email, password, gender } = req.body;
        const candidate = await db.query("SELECT login FROM users WHERE login = $1", [email.toLowerCase()]);

        if(candidate.rows[0]) {
            res.json({
                'message': `Пользователь с электронной почтой ${email} уже существует!`,
            });
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            let plan_id = gender.toString() === "0" ? 2 : 1;

            const user =  await db.query("INSERT INTO users (login, hash, gender_id, plan_id) VALUES ($1, $2, $3, $4) RETURNING *", [email.toLowerCase(), hashPassword, gender, plan_id]);

            req.session.user_id = user.rows[0].id
            req.session.gender_id = user.rows[0].gender_id
            req.session.auth = true

            res.json({
                'result': 0,
                'message': `Пользователь с логином ${email} успешно создан`,
                'user': user.rows[0],
                'user_id': req.session.user_id,
                'gender_id': req.session.gender_id
            });
        }
    }

    async updateUser (req, res) {
        const { id, email } = req.body;
        const user = await db.query("UPDATE users SET login = $1 WHERE id = $2 RETURNING *", [email, id]);
        res.json(user.rows[0]);
    }

    async deleteUser (req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UsersController()
