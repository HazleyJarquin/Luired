import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface Props {
  option: string;
  selectedCheckbox: string | null; // Recibe el checkbox seleccionado actual desde el componente padre
  onChange: (newSelection: string) => void; // Función para cambiar la selección
}

export const CheckboxGroup = ({
  option,
  selectedCheckbox,
  onChange,
}: Props) => {
  const handleChange = () => {
    onChange(option); // Llama a la función de cambio de selección con el nuevo valor
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedCheckbox === option}
            onChange={handleChange} // Maneja el cambio
            name={option}
          />
        }
        label={option}
      />
    </FormGroup>
  );
};
