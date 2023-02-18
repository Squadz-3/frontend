import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { db } = await connectToDatabase();
  const data = req.body;
  const { id, name, channel, channels } = data;
  let search;

  channels.map(function (value, index) {
    if (value.name == channel) {
      search = index;
    }
  });

  channels[search].subchannels.push({
    name: name,
    description: "general",
    readOnly: false,
    restriction: "none",
    private: false,
  });

  const updateDoc = {
    $set: {
      channels: channels,
    },
  };

  try {
    const filter = { _id: id };

    const result = db.collection("_squadz").updateOne(filter, updateDoc);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send("An error occured while trying to update this user's data.");
  }
}
