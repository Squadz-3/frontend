import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();

  try {
    const data = req.body;

    db.collection("_squadz").insertOne(data, function (error, result) {
      if (error) {
        let errorMessage;

        errorMessage = "An error occured while trying to create this squad.";

        return res.status(409).send(errorMessage);
      }

      return res.status(201).send(result);
    });
  } catch (error) {
    return res
      .status(409)
      .send("An error occured while trying to create this squad.");
  }
}
