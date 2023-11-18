import type { Form } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Form = () => {
  const [form, setForm] = useState<Form | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = api.forms.getById.useQuery({
    id: typeof id === "string" ? id : "",
  });

  useEffect(() => {
    if (!isLoading && data) {
      setForm(data);
    }
  }, [isLoading, data]);

  return (
    <>
      <div>{id}</div>
      <div>{form?.id}</div>
      <div>{form?.name}</div>
    </>
  );
};

export default Form;
