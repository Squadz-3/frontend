import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();

  try {
    const data = req.body;
    const squad = data.id;

    const message = {
      _id: Date.now(),
      message: data.message,
      image: data.image,
      channel: data.channel,
      sub: data.sub,
      timestamp: Date.now(),
      senderId: data.senderId,
    };

    db.collection(squad).insertOne(message, function (error, result) {
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
      .send("An error occured while trying to send this message.");
  }
}
