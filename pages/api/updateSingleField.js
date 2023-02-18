import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();
  const data = req.body;
  const { collection, id, field, value } = data;

  try {
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        [field]: value,
      },
    };

    const result = db.collection(collection).updateOne(filter, updateDoc);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send("An error occured while trying to update this user's data.");
  }
}
