import { Container } from "@components";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DataPelajar = () => {
  const { query } = useRouter();

  useEffect(() => {
    console.log(query.id);
  }, [query]);

  return <Container></Container>;
};

export default DataPelajar;
