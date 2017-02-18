module.exports = (router, sequelize) => {
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log("Starting appointments call...");
        next();
    });

    router.get('/totals-by-month-gender', (req, res, next) => {
        var params = {
            replacements : {},
            type : sequelize.QueryTypes.SELECT
        };
        var sql = `SELECT
                month,
                gender,
                sum(case when status = 1 then 1 else 0 end) as showedUp,
                sum(case when status = 1 then 0 else 1 end) as noShowUp
                FROM appointments `

        if (req.query.weekday) {
            sql += " WHERE week_day = :weekday";
            params.replacements.weekday = req.query.weekday;
        }

        sql += ' GROUP BY month, gender ORDER BY month, gender';
        sequelize.query(sql, params).then((result) => {
            res.json(result);
        });
    });

    router.get('/total-show-up-no-show-up', (req, res, next) => {
        var params = {
            replacements : {},
            type : sequelize.QueryTypes.SELECT
        };
        var sql = `SELECT
                sum(case when status = 1 then 1 else 0 end) as showedUp,
                sum(case when status = 1 then 0 else 1 end) as noShowUp
                FROM appointments `

        if (req.query.weekday) {
            sql += " WHERE week_day = :weekday";
            params.replacements.weekday = req.query.weekday;
        }

        sequelize.query(sql, params).then((result) => {
            res.json(result[0]);
        });
    });

    router.get('/totals-gender', (req, res, next) => {
        var params = {
            replacements : {},
            type : sequelize.QueryTypes.SELECT
        };
        var sql = `SELECT
                gender,
                count(id) as total
                FROM appointments `

        if (req.query.weekday) {
            sql += " WHERE week_day = :weekday";
            params.replacements.weekday = req.query.weekday;
        }

        sql += ' GROUP BY gender';
        sequelize.query(sql, params).then((result) => {
            res.json(result);
        });
    });

    return router;
};

