function processRequest(err, data, res) {
  if (err) return res.status(400).json(err.message);

  if (!data) return res.status(404).json({ message: "No data found" });
  if (data.isDeleted) return res.sendStatus(404);
  return res.status(200).json(data);
}
function deleteRequest(err, data, res) {
  if (err) return res.status(400).json(err.message);

  if (!data) return res.status(404).json({ message: "No data found" });
  if (data?.isDeleted) return res.sendStatus(204);
  else return res.sendStatus(500);
}
function catchFunc(error,res) {
   return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
module.exports = {
  processRequest,
  deleteRequest,
  catchFunc,
};
