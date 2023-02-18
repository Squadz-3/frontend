import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();
  const data = req.body;
  const { id } = data;

  try {
    const response = await db.collection("_squadz").find({ _id: id }).toArray();

    const members = response[0].members;

    members.forEach(async (element) => {
      const data = {
        user: element,
        id: id,
      };
      await fetch("/api/leaveSquad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    });

    await db
      .collection("_squadz")
      .deleteOne({ _id: id }, function (err, result) {
        if (err) console.log(err);
        console.log(`Deleted ${result.deletedCount} squadz(s)`);
      });
    await db.collection(id).drop(function (err) {
      if (err) console.log(err);
    });

    return res.status(200).send("Deleted");
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send("An error occured while trying to leave this Squad.");
  }
}
