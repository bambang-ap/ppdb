import { DataSiswa, OrangTua, Siswa } from "@type/Student";
import { studentsApi } from "@helpers";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as Record<string, string>;
  const response = await studentsApi(id);

  const resp = response.map((data) => {
    const dataObject = Object.entries(data);
    return dataObject.reduce(
      (ret, [key, value]) => {
        const lowerKey = key.toLowerCase();
        if (lowerKey.match(/ayah|ibu|wali/)) {
          const newKey = key.replace(/ayah|ibu|wali/i, "") as keyof OrangTua;
          if (lowerKey.includes("ayah")) ret.ayah[newKey] = value;
          if (lowerKey.includes("ibu")) ret.ibu[newKey] = value;
          if (lowerKey.includes("wali")) ret.wali[newKey] = value;
        } else {
          const newKey = key as keyof Siswa;
          if (newKey.match(/checked|kebutuhanKhusus|punyaKip/))
            // @ts-ignore
            value = value === "true";
          if (newKey === "pilihanJurusan") value = JSON.parse(value);
          // @ts-ignore
          ret.siswa[newKey] = value;
        }
        return ret;
      },
      { siswa: {}, ayah: {}, ibu: {}, wali: {} } as DataSiswa
    );
  });

  if (id) res.send(resp[0]);
  else res.send(resp);
};
