const router = require("express").Router();
const db = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req,res) => {
    try {
        const user = await db.query("SELECT user_email, user_name, admin FROM users WHERE user_id = ($1)", [req.user])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});


module.exports = router;