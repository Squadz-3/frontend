import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();
  const data = req.body;
  const { user, id } = data;

  try {
    await db
      .collection("_squadz")
      .updateOne({ _id: id }, { $pull: { members: user } });
    const result = await db
      .collection("_users")
      .updateOne({ _id: user }, { $pull: { communityList: id } });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send("An error occured while trying to leave this Squad.");
  }
}
