import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();

  try {
    const data = req.body;

    db.collection("_users").insertOne(data, function (error, result) {
      if (error) {
        let errorMessage;
        if (error.code == 11000) {
          errorMessage =
            "This user already exists. If you meant to login click login instead.";
        } else {
          errorMessage = "An error occured while trying to create this user.";
        }

        return res.status(409).send(errorMessage);
      }

      return res.status(201).send(result);
    });
  } catch (error) {
    return res
      .status(409)
      .send("An error occured while trying to create this user.");
  }
}
