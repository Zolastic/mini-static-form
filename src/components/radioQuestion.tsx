import React from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

type Props = {
  response: string;
  onChangeResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioQuestion = ({ response, onChangeResponse }: Props) => {
  const handleChange = (value: string) => {
    onChangeResponse({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

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
      </RadioGroup>
    </>
  );
};

export default RadioQuestion;
