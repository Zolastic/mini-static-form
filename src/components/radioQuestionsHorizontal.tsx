import React, { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { LoadingSpinner } from "./loading";

type Props = {
  response: string;
  onChangeResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioQuestionHorizontal = ({ response, onChangeResponse }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (value: string) => {
    onChangeResponse({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);
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
      <RadioGroup
        defaultValue={response}
        onValueChange={handleChange}
        className="flex space-x-16"
      >
        <div className="flex flex-col items-center space-y-5">
          <Label htmlFor="1" className="text-lg">
            1
          </Label>
          <RadioGroupItem value="1" id="1" />
        </div>
        <div className="flex flex-col items-center space-y-5">
          <Label htmlFor="2" className="text-lg">
            2
          </Label>
          <RadioGroupItem value="2" id="2" />
        </div>
        <div className="flex flex-col items-center space-y-5">
          <Label htmlFor="3" className="text-lg">
            3
          </Label>
          <RadioGroupItem value="3" id="3" />
        </div>

        <div className="flex flex-col items-center space-y-5">
          <Label htmlFor="4" className="text-lg">
            4
          </Label>
          <RadioGroupItem value="4" id="4" />
        </div>

        <div className="flex flex-col items-center space-y-5">
          <Label htmlFor="5" className="text-lg">
            5
          </Label>
          <RadioGroupItem value="5" id="5" />
        </div>
      </RadioGroup>
    </>
  );
};

export default RadioQuestionHorizontal;
