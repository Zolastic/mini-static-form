import type { Form, Response } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const Form = () => {
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);

  const router = useRouter();
  const { id } = router.query;

  const { data: formFormDb, isLoading: isLoadingFormFromDb } =
    api.forms.getById.useQuery({
      id: typeof id === "string" ? id : "",
    });

  const { data: responsesFromDb, isLoading: isLoadingResponsesFromDb } =
    api.responses.getByFormId.useQuery({
      formId: typeof id === "string" ? id : "",
    });

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
    };

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
              />
            </CardTitle>
            <CardDescription>
              <Input
                value={form?.description ?? ""}
                placeholder="Form description"
                className="text-sm"
              />
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Questions */}

      {/* Question 1 */}
      <div className="mx-96 mt-5">
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
    </>
  );
};

export default Form;
