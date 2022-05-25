import { useEffect, useRef, useState } from "react";

const useForm = (props: FormProps) => {
  const fields = useRef<any>({
    valid: false,
    invalidFields: [],
  });
  const [values, setValues] = useState<Map<string, string>>(new Map());

  const submit = () => props.onSubmit(fields.current);
  const isValid = (field: InternalField) => {
    if (
      field.required &&
      (!field.value || field.value === "" || field.value === 0)
    )
      return false;
    return true;
  };
  const invalidate = (field: InternalField) => {
    field.valid = false;
    fields.current.invalidFields.push(field.id);
    fields.current.valid = false;
  };

  const validate = (field: InternalField) => {
    field.valid = true;
    fields.current.invalidFields = fields.current.invalidFields.filter(
      (f: string) => f !== field.id
    );
    if (fields.current.invalidFields.length <= 0) fields.current.valid = true;
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id, value },
    } = event;
    const field: InternalField = fields.current[id];
    field.value = value;
    if (!isValid(field)) {
      invalidate(field);
    } else {
      validate(field);
    }
    setValues((map) => new Map(map.set(id, value)));
  };

  const reset = () => {
    for (let field of props.fields) {
      fields.current[field.id] = {
        ...field,
        value: "",
        valid: true,
      };
      fields.current.invalidFields.push(field.id);
      fields.current.valid = false;
    }
    setValues(new Map());
  };

  useEffect(() => {
    for (let field of props.fields) {
      fields.current[field.id] = {
        ...field,
        value: "",
        valid: true,
        onChange: handleChange,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      field.required ? fields.current.invalidFields.push(field.id) : null;
      values.set(field.id, "");
    }
    setValues(new Map(values));
  }, []);

  return {
    ...fields.current,
    submit,
    handleChange,
    reset,
    valid: fields.current.valid,
  };
};

interface Field {
  id: string;
  required: boolean;
  type: string;
  placeholder?: string;
}

interface InternalField extends Field {
  value: string | number;
  valid: boolean;
  onChange: () => any;
}

interface FormProps {
  onSubmit: (input: any) => any;
  fields: Field[];
}

export default useForm;
