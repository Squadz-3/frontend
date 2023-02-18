import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const body = req.body;
  const { id } = body;
  try {
    db.collection("_users")
      .find({ _id: id })
      .toArray(function (err, result) {
        if (err)
          return res
            .status(409)
            .send("An error occured while trying to log in this user.");
        if (result[0]) {
          return res.status(200).send(result[0]);
        } else {
          return res.status(409).send("User account has not yet signed up");
        }
      });
  } catch (error) {
    return res
      .status(409)
      .send("An error occured while trying to log in this user.");
  }
}
