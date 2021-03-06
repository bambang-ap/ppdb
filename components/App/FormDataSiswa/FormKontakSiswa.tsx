import { FormCheckbox, FormInput, Text, BoxSpace } from "@components";
import { useDataSiswa } from "@hooks";
import { DataSiswa } from "@type/Student";
import { FormDataSiswaProps } from "@appComponent";

const FormKontakSiswa = ({ editable }: FormDataSiswaProps) => {
  const { data, setDataSiswa } = useDataSiswa();

  const { noHp, telpRumah, hpAyah, hpIbu, hpWali, socmed, info } = data ?? {};

  const socmedAndInfo = [
    {
      name: "Sosial Media",
      variable: socmed,
      key: "socmed",
      keys: ["Facebook", "Instagram", "Twitter", "Youtube", "Tik Tok"],
    },
    {
      name: "Anda memperoleh PPDB SMK Dewantara 2 dari mana",
      variable: info,
      key: "info",
      keys: [
        "Facebook",
        "Instagram",
        "Twitter",
        "Youtube",
        "Teman",
        "Guru BK",
        "Guru SMK",
        "Lain-lain",
      ],
    },
  ];

  return (
    <>
      <Text alignCenter>Kontak Yang Bisa Dihubungi</Text>
      <BoxSpace b />
      <FormInput
        disabled={!editable}
        onChangeText={(telpRumah) => setDataSiswa({ telpRumah })}
        value={telpRumah}
        type="number"
        title="Nomor Telepon Rumah"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(hpAyah) => setDataSiswa({ hpAyah })}
        value={hpAyah}
        type="number"
        title="Nomor HP Ayah Kandung"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(hpIbu) => setDataSiswa({ hpIbu })}
        value={hpIbu}
        type="number"
        title="Nomor HP Ibu Kandung"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(hpWali) => setDataSiswa({ hpWali })}
        value={hpWali}
        type="number"
        title="Nomor HP Wali (Jika Ada)"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(noHp) => setDataSiswa({ noHp })}
        value={noHp}
        type="number"
        title="Nomor HP Peserta Didik"
      />

      {socmedAndInfo.map((dt) => {
        return (
          <>
            <FormCheckbox
              // @ts-ignore
              value={dt.variable}
              title={dt.name}
              onChange={({ value }, index) => {
                if (!editable) return;

                const dataSocmed = (dt.variable?.slice?.() ??
                  Array.from({ length: 5 })) as DataSiswa["socmed"];
                dataSocmed[index] =
                  // @ts-ignore
                  value === "" || dataSocmed?.[index]?.length > 0
                    ? undefined
                    : "";
                setDataSiswa({ [dt.key]: dataSocmed });
              }}
              data={dt.keys.map((name, index) => {
                return { name, value: dt.variable?.[index] ?? "{[]}" };
              })}
            />
            {dt.keys.map((val, index) => {
              const value = dt.variable?.[index];
              if (value === undefined) return null;
              return (
                <FormInput
                  title={val}
                  value={value}
                  disabled={!editable}
                  onChangeText={(value) => {
                    const dataSocmed =
                      dt.variable?.slice?.() as DataSiswa["socmed"];
                    dataSocmed[index] = value;
                    setDataSiswa({ [dt.key]: dataSocmed });
                  }}
                />
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default FormKontakSiswa;
