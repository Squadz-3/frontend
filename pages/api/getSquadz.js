import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const user = req.query.user;
  const response = await db
    .collection("_users")
    .find({ _id: user }, { communityList: 1 })
    .toArray();
  const communityList = response[0].communityList;
  if (communityList) {
    const result = await db
      .collection("_squadz")
      .find(
        { _id: { $in: communityList } },
        { name: true, description: true, profile: true }
      )
      .toArray();
    res.status(200).send(result);
  } else {
    res.status(201).send();
  }
}
