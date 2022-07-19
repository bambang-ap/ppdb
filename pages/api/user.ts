import { mongoClient, COLLECTIONS, DB_NAME, METHODS } from "@server";
import { User, USER_ROLES } from "@type/User";
import { btoa } from "abab";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === METHODS.GET) getUser(req, res);
  else if (method === METHODS.PUT) updateUser(req, res);
  else if (method === METHODS.POST) createUser(req, res);
  else res.status(405).send({ msg: "Method not allowed" });
};

const getUser = async (_: NextApiRequest, res: NextApiResponse) => {
  const conn = await mongoClient.connect();
  const users = await conn
    .db(DB_NAME)
    .collection<User>(COLLECTIONS.USER)
    .find()
    .toArray();
  conn.close();

  const data = users.sort((obj1, obj2) => {
    if (obj1.role > obj2.role) return 1;
    if (obj1.role < obj2.role) return -1;
    return 0;
  });

  if (data.length > 0) res.status(200).send(data);
  else res.status(500).send({ msg: "Data not found" });
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, ...user } = req.body as User;
  const _id = v4();

  const userInit = {
    _id,
    image: "",
    role: USER_ROLES.ADMIN,
  } as User;

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection<User>(COLLECTIONS.USER)
    .insertOne({
      ...userInit,
      ...user,
      password: btoa(password) ?? "",
    });
  conn.close();

  if (data.acknowledged) res.status(200).send({ msg: "Data inserted" });
  else res.status(500).send({ msg: "Data not inserted" });
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
