import { btoa } from "abab";
import { COLLECTIONS, DB_NAME, mongoClient } from "@server";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@type/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password: pass } = req.query as Record<string, string>;

  const password = btoa(pass);

  const conn = await mongoClient.connect();
  const { password: _, ...data } =
    (await conn
      .db(DB_NAME)
      .collection(COLLECTIONS.USER)
      .findOne<User>({ username, password })) ?? {} as User;
  conn.close();

  if (data?._id) res.status(200).send(data);
  else res.status(500).send({ msg: "User not found" });
};
