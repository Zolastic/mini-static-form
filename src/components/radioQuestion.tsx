import React, { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "./ui/use-toast";
import { LoadingSpinner } from "./loading";

type Props = {
  response: string;
  onChangeResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioQuestion = ({ response, onChangeResponse }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (value: string) => {
    onChangeResponse({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleOthersClick = () => {
    toast({
      variant: "destructive",
      title: "ONLY 2 GENDERS!!! 🤬",
      description: "HAHAHAHAH L",
      duration: 5000,
    });
  };

  useEffect(() => {
    if (response) {
      setIsLoading(false);
    }
  }, [response]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <RadioGroup defaultValue={response} onValueChange={handleChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={handleOthersClick}
        >
          <RadioGroupItem value="others" id="others" disabled />
          <Label htmlFor="others">Others</Label>
        </div>
      </RadioGroup>
    </>
  );
};

export default RadioQuestion;
