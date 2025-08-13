
const db = require("../db/connection");

exports.getJobs = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM jobs");
  res.json(rows);
};

exports.createJob = async (req, res) => {
  const { title, company, salary_usd } = req.body;
  const [result] = await db.query(
    "INSERT INTO jobs (title, company, salary_usd) VALUES (?, ?, ?)",
    [title, company, salary_usd]
  );
  res.status(201).json({ id: result.insertId });
};
