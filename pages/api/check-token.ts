import { mongoClient, COLLECTIONS, DB_NAME } from "@server";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query as Record<string, string>;

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection(COLLECTIONS.TOKEN)
    .findOne({ token, registered: false });
  conn.close();

  if (data) res.status(200).send(true);
  else res.status(500).send({ msg: "Token invalid" });
};
