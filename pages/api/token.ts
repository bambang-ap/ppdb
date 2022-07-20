import { mongoClient, COLLECTIONS, DB_NAME, METHODS } from "@server";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === METHODS.GET) checkToken(req, res);
  else if (method === METHODS.POST) createToken(req, res);
  else res.status(405).send({ msg: "Method not allowed" });
};

const checkToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query as MyObject;

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection(COLLECTIONS.TOKEN)
    .findOne({ token, registered: false });
  conn.close();

  if (data) res.status(200).send(true);
  else res.status(500).send({ msg: "Token invalid" });
};

const createToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { reporterId } = req.body as MyObject;

  if (!reporterId) {
    return res.status(500).send({ msg: "Unknown reporter" });
  }

  const dataToken = { _id: v4(), token: v4(), registered: false, reporterId };

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection<Token>(COLLECTIONS.TOKEN)
    .insertOne(dataToken);
  conn.close();

  if (data.acknowledged) {
    res.status(200).send({ msg: "Token created", token: dataToken.token });
  } else res.status(500).send({ msg: "Token not created" });
};
