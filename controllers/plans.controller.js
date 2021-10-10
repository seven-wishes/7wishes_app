const db = require('../db')

class PlansController {
    async getPlans (req, res) {
        try {
            const plans = await db.query("SELECT * FROM plans WHERE id != 1 ORDER BY id");

            for (let row in plans.rows) {
                if (!plans.rows.hasOwnProperty(row)) continue;
                const values = await db.query("SELECT * FROM plans_values WHERE plan_id = $1", [plans.rows[row].id]);

                plans.rows[row].values = values.rows;
            }

            res.json({
                result: 0,
                plans: plans.rows
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new PlansController()
