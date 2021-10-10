const db = require('../db')

class PaymentController {
    async paymentInit (req, res) {
        try {
            const { user_id, amount, plan_id, plan_title } = req.body;

            if (user_id === null) {
                return res.json({
                    result: 1,
                    message: "Вы не авторизованы"
                })
            }
            const payment_new = await db.query("INSERT INTO payments (user_id, amount, plan_id)  VALUES ($1, $2, $3) RETURNING *", [user_id, amount, plan_id]);

            const payment = payment_new.rows[0]
            payment.description = `Оплата по тарифу ${plan_title}.`
            res.json({
                result: 0,
                payment: payment
            })
        } catch (e) {
            console.log(e);
        }
    }

    async paymentUpInit (req, res) {
        try {
            const { user_id, amount, plan_id } = req.body;

            if (user_id === null) {
                return res.json({
                    result: 1,
                    message: "Вы не авторизованы"
                })
            }

            console.log(new Date())
            const now = new Date();
            const payment_new = await db.query("INSERT INTO payments (user_id, amount, plan_id)  VALUES ($1, $2, $3) RETURNING *", [user_id, amount, plan_id]);
            await db.query("UPDATE accounts SET actual_date = $1 WHERE user_id = $2 RETURNING *", [now, user_id]);

            const payment = payment_new.rows[0]
            payment.description = `Оплата за поднятие страницы.`
            res.json({
                result: 0,
                payment: payment
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new PaymentController()
