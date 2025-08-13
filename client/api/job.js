app.post('/api/apply', async (req, res) => {
  const { job_id, name, email, cover_letter } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO applications (job_id, name, email, cover_letter)
       VALUES (?, ?, ?, ?)`,
      [job_id, name, email, cover_letter]
    );
    res.json({ success: true, message: 'Application submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error submitting application' });
  }
});
