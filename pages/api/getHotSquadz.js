import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const query = [];
  let options = {};

  const body = req.body;
  const { searchTerm, desc, gate, sort } = body;

  if (searchTerm) {
    options = {
      $match: {
        name: { $regex: body.searchTerm, $options: "i" },
      },
    };
    query.push(options);
  }
  if (desc) {
    options = {
      $match: {
        description: { $regex: desc, $options: "i" },
      },
    };
    query.push(options);
  }
  if (gate) {
    options = {
      $match: {
        gatingDetails: { $regex: gate, $options: "i" },
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
  if (sort == "latest") {
    query.push({ $sort: { timestamp: -1 } }, { $limit: 10 });
  } else {
    query.push({ $sort: { hot: -1, timestamp: -1 } }, { $limit: 10 });
  }
  try {
    const hot = await db.collection("_squadz").aggregate(query).toArray();

    if (hot) {
      const final = {
        hot: hot,
      };
      res.status(200).send(final);
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    res.status(200).send(error);
  }
}
