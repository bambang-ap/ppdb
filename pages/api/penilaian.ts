import { mongoClient, COLLECTIONS, DB_NAME, METHODS } from "@server";
import { User, USER_ROLES } from "@type/User";
import { btoa } from "abab";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === METHODS.GET) getPenilaian(req, res);
  else if (method === METHODS.PUT) updatePenilaian(req, res);
  else res.status(405).send({ msg: "Method not allowed" });
};

const getPenilaian = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection<{ _id: string } & MyObject>(COLLECTIONS.HASIL_TEST)
    .findOne({ _id: id });
  conn.close();

  const { _id, ...rest } = data ?? ({} as MyObject);
  const resp = Object.entries(rest);

  if (resp.length > 0) res.status(200).send(resp);
  else res.status(500).send({ msg: "Data not found" });
};

const updatePenilaian = async (req: NextApiRequest, res: NextApiResponse) => {
  const { forms, id } = req.body as { id: string; forms: [string, string][] };

  const _id = id;

  if (forms.length === 0) {
    return res.status(500).send({ msg: "Nothing to insert" });
  }

  const $set = forms.reduce<MyObject>(
    (ret, [key, value]) => {
      return { ...ret, [key]: value };
    },
    { _id }
  );

  const conn = await mongoClient.connect();
  const result = await conn
    .db(DB_NAME)
    .collection(COLLECTIONS.HASIL_TEST)
    .updateOne({ _id }, { $set }, { upsert: true });
  conn.close();

  res.send(result);

  // if (data.ok) res.status(200).send($set);
  // else res.status(500).send({ msg: "Data not updated" });
};
