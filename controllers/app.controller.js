const db = require('../db')

class UsersController {
    async getCities (req, res) {
        const cities =  await db.query("SELECT * FROM cities");
        res.json({'cities' : cities.rows});
    }

    async getEyeColors (req, res) {
        const eyeColors =  await db.query("SELECT * FROM eye_colors");
        res.json({'eye_colors' : eyeColors.rows});
    }

    async getHairColors (req, res) {
        const hairColors =  await db.query("SELECT * FROM hair_colors");
        res.json({'hair_colors' : hairColors.rows});
    }

    async getGoals (req, res) {
        const goals =  await db.query("SELECT * FROM goals");
        res.json({'goals' : goals.rows});
    }
}

module.exports = new UsersController()
