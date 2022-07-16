import { btoa } from "abab";
import { COLLECTIONS, DB_NAME, mongoClient } from "@helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password: pass } = req.query as Record<string, string>;

  const password = btoa(pass);

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection(COLLECTIONS.USER)
    .findOne({ username, password });
  conn.close();

  if (data) {
    res.status(200);
    res.send(data);
  } else {
    res.status(500);
    res.send({ status: 500, msg: "User not found" });
  }
};
