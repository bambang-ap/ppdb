import { NextApiRequest, NextApiResponse } from "next";
import { COLLECTIONS, DB_NAME, METHODS, mongoClient } from "@server";
import {
  DataSiswa,
  OrangTua,
  ShortStudentData,
  StudentData,
} from "@type/Student";
import { v4 } from "uuid";
import { User, USER_ROLES } from "@type/User";
import { btoa } from "abab";

const { AYAH, IBU, SISWA, WALI, USER, TOKEN } = COLLECTIONS;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === METHODS.GET) getData(req, res);
  else if (method === METHODS.POST) insertData(req, res);
  else if (method === METHODS.PUT) updateData(req, res);
  else res.status(405).send({ msg: "Method not allowed" });
};

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as Record<string, string>;
  const joiner = [AYAH, IBU, WALI].map((coll) => {
    return {
      $lookup: { as: coll, from: coll, localField: "_id", foreignField: "_id" },
    };
  });

  const aggregations = id ? [{ $match: { _id: id } }, ...joiner] : joiner;

  const connection = await mongoClient.connect();
  const collection = connection.db(DB_NAME).collection<ShortStudentData>(SISWA);

  if (!id) {
    const data = await collection.find().toArray();
    connection.close();

    const shortData = data.map((siswa) => {
      const { _id, namaLengkap, nisn, asalSekolah, noHp, alamat } = siswa;
      return { _id, namaLengkap, nisn, asalSekolah, noHp, alamat };
    });

    return res.status(200).send(shortData);
  }

  const data = await collection.aggregate<DataSiswa>(aggregations).toArray();
  connection.close();

  if (id && data.length === 1) res.status(200).send(data[0]);
  else res.status(500).send({ msg: "Student not found" });
};

const insertData = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    _id: ____,
    token,
    ayah: [{ _id: _, ...ayah }] = [{} as OrangTua],
    wali: [{ _id: __, ...ibu }] = [{} as OrangTua],
    ibu: [{ _id: ___, ...wali }] = [{} as OrangTua],
    ...siswa
  }: DataSiswa = req.body;
  const _id = v4();
  const { nisn, namaLengkap } = siswa ?? {};

  if (!token) return res.status(500).send({ msg: "Token not included" });
  if (!nisn) return res.status(500).send({ msg: "NISN not included" });

  const connection = await mongoClient.connect();
  const database = connection.db(DB_NAME);
  const session = connection.startSession();

  try {
    await session.withTransaction(
      async () => {
        const dataToken = await database
          .collection<Token>(TOKEN)
          .findOne({ token });

        const dataSiswa: StudentData = { ...siswa, token, _id, checked: false };
        const tokenData = { ...(dataToken ?? ({} as Token)), registered: true };
        return await Promise.all([
          database.collection<OrangTua>(AYAH).insertOne({ ...ayah, _id }),
          database.collection<OrangTua>(IBU).insertOne({ ...ibu, _id }),
          database.collection<OrangTua>(WALI).insertOne({ ...wali, _id }),
          database.collection<StudentData>(SISWA).insertOne(dataSiswa),
          database
            .collection<Token>(TOKEN)
            .updateOne({ token }, { $set: tokenData }, { upsert: true }),
          database.collection<User>(USER).insertOne({
            _id,
            image: "",
            username: nisn,
            name: namaLengkap,
            password: btoa(nisn) ?? "",
            role: USER_ROLES.SISWA,
          }),
        ]);
      },
      { readConcern: { level: "majority" }, writeConcern: { w: "majority" } }
    );

    await session.commitTransaction();
    connection.close();

    res
      .status(200)
      .send({
        msg: "Data inserted - Silahkan login dengan username dan password menggunakan NISN",
      });
  } catch (err) {
    res.status(500).send({ msg: "Data not inserted" });
  }
};

const updateData = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    _id,
    ayah: [{ ...ayah }] = [{} as OrangTua],
    wali: [{ ...ibu }] = [{} as OrangTua],
    ibu: [{ ...wali }] = [{} as OrangTua],
    ...siswa
  }: DataSiswa = req.body;

  const connection = await mongoClient.connect();
  const database = connection.db(DB_NAME);
  const session = connection.startSession();

  try {
    await session.withTransaction(
      async () => {
        const dataSiswa: StudentData = { ...siswa, _id };
        return await Promise.all([
          database
            .collection<OrangTua>(AYAH)
            .findOneAndUpdate({ _id }, { $set: { ...ayah, _id } }),
          database
            .collection<OrangTua>(IBU)
            .findOneAndUpdate({ _id }, { $set: { ...ibu, _id } }),
          database
            .collection<OrangTua>(WALI)
            .findOneAndUpdate({ _id }, { $set: { ...wali, _id } }),
          database
            .collection<StudentData>(SISWA)
            // @ts-ignore
            .findOneAndUpdate({ _id }, { $set: dataSiswa }),
        ]);
      },
      { readConcern: { level: "majority" }, writeConcern: { w: "majority" } }
    );

    await session.commitTransaction();
    connection.close();

    res.status(200).send({ msg: "Data updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Data not updated" });
  }
};
