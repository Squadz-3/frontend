import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const id = req.query.id;

  const response = await db.collection("_squadz").find({ _id: id }).toArray();

  res.status(200).send(response);
}
