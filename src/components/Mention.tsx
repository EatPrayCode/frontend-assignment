import { useState } from "react";

export interface Mention {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  // Add other necessary fields...
}

interface MentionComponentProps {
  value: string; // Current input value
  onChange: (value: string) => void; // Handle input change
  options: Mention[]; // Available mention options
  setOptions: React.Dispatch<React.SetStateAction<Mention[]>>; // Set mention options
}

export const MentionComponent: React.FC<MentionComponentProps> = ({ value, onChange, options, setOptions }) => {
  const [inputText, setInputText] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  console.log(selectedOption);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (e.target.value.endsWith('@')) setShowOptions(true);
    else setShowOptions(false);
    onChange(e.target.value);
  };

  const handleSelectOption = (selectedOption: string) => {
    setInputText((prevText) => {
      const mentionStartIndex = prevText.lastIndexOf('@');
      const updatedText = prevText.slice(0, mentionStartIndex + 1) + selectedOption + ' ';
      return updatedText;
    });

    setSelectedOption(selectedOption);
    setShowOptions(false);
    onChange(inputText);

    const updatedOptions = options.filter(option => `${option.first_name} ${option.last_name}` !== selectedOption);
    setOptions(updatedOptions);
  };

  const filteredOptions = inputText.includes('@')
    ? options.filter((option) =>
        `${option.first_name} ${option.last_name}`.toLowerCase().includes(inputText.toLowerCase().split('@').pop()!)
      )
    : [];

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      {showOptions && (
        <div className="select-box">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelectOption(`${option.first_name} ${option.last_name}`)}
              className="option"
            >
              {`${option.first_name} ${option.last_name}`}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
