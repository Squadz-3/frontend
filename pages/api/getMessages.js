import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const id = req.query.id;
  const channel = req.query.channel;
  const sub = req.query.sub;
  const result = await db
    .collection(id)
    .aggregate([
      {
        $match: {
          channel: channel,
          sub: sub,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "_users",
          localField: "senderId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
    ])
    .toArray();
  res.status(200).send(result.reverse());
}
