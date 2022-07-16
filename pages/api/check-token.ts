import { tokenValidApi } from "@helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query as Record<string, string>;
  const response = await tokenValidApi(token);
  if (response) {
    res.status(200);
    res.send(true);
  } else {
    res.status(500);
    res.send({ status: 500, msg: "Token invalid" });
  }
};
