import { loginApi } from "@helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.query as Record<string, string>;
  const response = await loginApi(username, password);
  if (response) {
    res.status(200);
    res.send(response);
  } else {
    res.status(500);
    res.send({ status: 500, msg: "User not found" });
  }
};
