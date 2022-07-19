import { mongoClient, COLLECTIONS, DB_NAME, METHODS } from "@server";
import { User } from "@type/User";
import { btoa } from "abab";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === METHODS.PUT) updateUser(req, res);
  else res.status(405).send({ msg: "Method not allowed" });
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, password, ...user } = req.body as User;

  const conn = await mongoClient.connect();
  const db = conn.db(DB_NAME);
  const userData = await db.collection(COLLECTIONS.USER).findOne({ _id });
  const $set = { ...userData, ...user };
  const data = await db
    .collection(COLLECTIONS.USER)
    .findOneAndUpdate({ _id }, { $set: { ...$set, password: btoa(password) } });
  conn.close();

  if (data.ok) res.status(200).send($set);
  else res.status(500).send({ msg: "Data not updated" });
};
