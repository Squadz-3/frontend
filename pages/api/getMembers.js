import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const members = JSON.parse(req.body).members;
  const result = await db
    .collection("_users")
    .find(
      { _id: { $in: members } },
      { name: true, description: true, profile: true }
    )
    .toArray();

  res.status(200).send(result);
}
