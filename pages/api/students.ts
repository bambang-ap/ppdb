import { NextApiRequest, NextApiResponse } from "next";
import { COLLECTIONS, DB_NAME, mongoClient } from "@server";

const { AYAH, IBU, SISWA, WALI } = COLLECTIONS;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as Record<string, string>;
  const joiner = [AYAH, IBU, WALI].map((coll) => {
    return {
      $lookup: {
        from: coll,
        localField: "_id",
        foreignField: "_id",
        as: coll,
      },
    };
  });

  const aggregations = id ? [{ $match: { _id: id } }, ...joiner] : joiner;

  const conn = await mongoClient.connect();
  const data = await conn
    .db(DB_NAME)
    .collection(SISWA)
    .aggregate(aggregations)
    .toArray();
  conn.close();

  if (!id) {
    res.status(200);
    res.send(data);
  } else if (id && data.length === 1) {
    res.status(200);
    res.send(data[0]);
  } else {
    res.status(500);
    res.send({ status: 500, msg: "Student not found" });
  }
};
