import type { Form, Response } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

import CheckBoxQuestion from "~/components/checkboxQuestion";

const Form = () => {
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);

  const router = useRouter();
  const { id } = router.query;

  // #region TRPC
  const { data: formFormDb, isLoading: isLoadingFormFromDb } =
    api.forms.getById.useQuery({
      id: typeof id === "string" ? id : "",
    });

  const { data: responsesFromDb, isLoading: isLoadingResponsesFromDb } =
    api.responses.getByFormId.useQuery({
      formId: typeof id === "string" ? id : "",
    });

  const { mutate: mutateResponses } = api.responses.update.useMutation();

  const { mutate: mutateFormName } = api.forms.updateName.useMutation();

  const { mutate: mutateFormDescription } =
    api.forms.updateDescription.useMutation();

  // #endregion

  // #region functions
  const onChangeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => {
      if (prevForm) {
        return {
          ...prevForm,
          name: e.target.value,
        };
      }
      return prevForm;
    });

    mutateFormName({
      id: typeof id === "string" ? id : "",
      name: e.target.value,
    });
  };

  const onChangeFormDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => {
      if (prevForm) {
        return {
          ...prevForm,
          description: e.target.value,
        };
      }
      return prevForm;
    });

    mutateFormDescription({
      id: typeof id === "string" ? id : "",
      description: e.target.value,
    });
  };

  const onChangeResponse =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setResponses((prevResponses) => {
        const updatedResponses = prevResponses.map((response, idx) => {
          if (idx === index && response.id) {
            return {
              ...response,
              response: e.target.value,
            };
          }
          return response;
        });
        return updatedResponses;
      });

      mutateResponses({
        id: responses[index]?.id ?? "",
        response: e.target.value,
      });
    };
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (!isLoadingFormFromDb && formFormDb) {
      setForm(formFormDb);
    }
  }, [isLoadingFormFromDb, formFormDb]);

  useEffect(() => {
    if (!isLoadingResponsesFromDb && responsesFromDb) {
      console.log("responsesFromDb:", responsesFromDb);
      setResponses(responsesFromDb);
    }
  }, [isLoadingResponsesFromDb, responsesFromDb]);

  useEffect(() => {
    console.log("responses:", responses);
  }, [responses]);
  // #endregion

  return (
    <>
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-t-[10px] border-slate-900">
          <CardHeader>
            <CardTitle>
              <Input
                value={form?.name ?? ""}
                placeholder="Untitled form"
                className="text-2xl font-bold"
                onChange={onChangeFormName}
              />
            </CardTitle>
            <CardDescription>
              <Input
                value={form?.description ?? ""}
                placeholder="Form description"
                className="text-sm"
                onChange={onChangeFormDescription}
              />
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Questions */}

      {/* Question 1 */}
      <div className="mx-96 mt-10">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>What is your name?</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={responses[0]?.response ?? ""}
              placeholder="Your answer"
              onChange={onChangeResponse(0)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Question 2 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>What school are you from?</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={responses[1]?.response ?? ""}
              placeholder="Your answer"
              onChange={onChangeResponse(1)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Question 3 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>Do you like to do any of these?</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckBoxQuestion
              response={responses[2]?.response ?? ""}
              onChangeResponse={onChangeResponse(2)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Form;
