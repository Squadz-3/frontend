import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();
  const data = req.body;
  const { id, squad } = data;

  try {
    const filter = { _id: id };
    const updateDoc = {
      $addToSet: {
        communityList: squad,
      },
    };

    const squadFilter = { _id: squad };
    const squadUpdateDoc = {
      $addToSet: {
        members: id,
      },
    };

    const result = db.collection("_users").updateOne(filter, updateDoc);
    const squadResult = db
      .collection("_squadz")
      .updateOne(squadFilter, squadUpdateDoc);
    return res.status(200).send(squadResult);
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send("An error occured while trying to update this user's data.");
  }
}
