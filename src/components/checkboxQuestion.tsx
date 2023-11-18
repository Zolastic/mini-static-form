import React, { useEffect, useState } from "react";

import { Checkbox } from "~/components/ui/checkbox";

const options = [
  {
    id: "Sleeping",
    label: "Sleeping",
  },
  {
    id: "Breathing",
    label: "Breathing",
  },
  {
    id: "Running",
    label: "Running",
  },
  {
    id: "Cooking",
    label: "Cooking",
  },
  {
    id: "Studying",
    label: "Studying",
  },
  {
    id: "Eating",
    label: "Eating",
  },
] as const;

type Option = {
  id: string;
  label: string;
};

type Prop = {
  response: string;
  onChangeResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxQuestion = ({ response, onChangeResponse }: Prop) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  // Handle changes to the checkboxes
  const handleChange = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) => {
      let newSelectedOptions;
      if (
        prevSelectedOptions.some(
          (selectedOption) => selectedOption.id === option.id,
        )
      ) {
        // If the option is already selected, remove it from the selected options
        newSelectedOptions = prevSelectedOptions.filter(
          (selectedOption) => selectedOption.id !== option.id,
        );
      } else {
        // If the option is not selected, add it to the selected options
        newSelectedOptions = [...prevSelectedOptions, option];
      }

      // Update the response
      const newResponse = newSelectedOptions
        .map((option) => option.label)
        .join(", ");
      onChangeResponse({
        target: { value: newResponse },
      } as React.ChangeEvent<HTMLInputElement>);

      return newSelectedOptions;
    });
  };

  useEffect(() => {
    if (response && response !== "") {
      console.log("response:", response);
      const responseOptions = response.split(", ").map((optionLabel) => {
        return { id: optionLabel, label: optionLabel };
      });
      console.log("responseOptions:", responseOptions);
      setSelectedOptions(responseOptions);
    }
  }, [response]);

  useEffect(() => {
    console.log("selectedOptions:", selectedOptions);
  }, [selectedOptions]);

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <Checkbox
            checked={selectedOptions.some(
              (selectedOption) => selectedOption.id === option.id,
            )}
            onCheckedChange={() => handleChange(option)}
          />
          <label className="ml-1">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxQuestion;
