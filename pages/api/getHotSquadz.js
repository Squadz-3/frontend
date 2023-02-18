import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const query = [];
  let options = {};

  const body = req.body;

  if (body.searchTerm) {
    options = {
      $match: {
        name: { $regex: body.searchTerm, $options: "i" },
      },
    };
    query.push(options);
  }
  if (body.desc) {
    options = {
      $match: {
        description: { $regex: body.desc, $options: "i" },
      },
    };
    query.push(options);
  }
  if (body.gate) {
    options = {
      $match: {
        gatingDetails: { $regex: body.gate, $options: "i" },
      },
    };
    query.push(options);
  }

  query.push({
    $project: {
      name: 1,
      description: 1,
      profile: 1,
      banner: 1,
      ownerDeSo: 1,
      gatingDetails: 1,
      timestamp: 1,
      members: 1,
      channels: 1,
      hot: {
        $size: "$members",
      },
    },
  });
  if (body.sort == "latest") {
    query.push({ $sort: { timestamp: -1 } }, { $limit: 10 });
  } else {
    query.push({ $sort: { hot: -1, timestamp: -1 } }, { $limit: 10 });
  }

  const hot = await db.collection("_squadz").aggregate(query).toArray();

  const final = {
    hot: hot,
  };
  res.status(200).send(final);
}
