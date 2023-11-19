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
import RadioQuestion from "~/components/radioQuestion";
import DropDownQuestion from "~/components/dropdownQuestion";
import RadioQuestionHorizontal from "~/components/radioQuestionsHorizontal";
import FileUpload from "~/components/fileUpload";
import Image from "next/image";

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
      setResponses(responsesFromDb);
    }
  }, [isLoadingResponsesFromDb, responsesFromDb]);

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

      {/* Question 4 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>What is your gender?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioQuestion
              response={responses[3]?.response ?? ""}
              onChangeResponse={onChangeResponse(3)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Question 5 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>What is your favourite sport?</CardTitle>
          </CardHeader>
          <CardContent>
            <DropDownQuestion
              response={responses[4]?.response ?? ""}
              onChangeResponse={onChangeResponse(4)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Question 6 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>Upload cat pic 😊?</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-start space-x-5">
            <FileUpload
              response={responses[5]?.response ?? ""}
              onChangeResponse={onChangeResponse(5)}
            />
            {responses[5]?.response ? (
              <Image
                src={responses[5]?.response ?? ""}
                alt="cat pic"
                width={80}
                height={80}
                className="rounded-full bg-gray-300"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-300"></div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Question 7 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>Rate yourself from one to five</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-10 pt-5">
            <RadioQuestionHorizontal
              response={responses[6]?.response ?? ""}
              onChangeResponse={onChangeResponse(6)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Question 8 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>What is your birthday?</CardTitle>
            <CardDescription>Date</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={responses[7]?.response ?? ""}
              placeholder="Your answer"
              onChange={onChangeResponse(7)}
              className="w-[30%]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Question 9 */}
      <div className="mx-96 mt-5">
        <Card className="rounded border-0 border-l-[10px] border-muted-foreground">
          <CardHeader>
            <CardTitle>What time is it now?</CardTitle>
            <CardDescription>Time</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="time"
              value={responses[8]?.response ?? ""}
              placeholder="Your answer"
              onChange={onChangeResponse(8)}
              className="w-[30%]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mb-20"></div>
    </>
  );
};

export default Form;
