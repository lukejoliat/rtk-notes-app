import { useEffect, useRef, useState } from "react";

const useForm = (props: FormProps, editValuePresent?: boolean) => {
  const fields = useRef<Form>({
    valid: false,
    invalidFields: [],
    fields: {},
  });
  const [values, setValues] = useState<Map<string, string>>(new Map());

  const submit = () => props.onSubmit(fields.current);

  const initialize = () => {
    for (let field of props.fields) {
      fields.current.fields[field.id] = {
        ...field,
        value: field.value ? field.value : "",
        valid: true,
        onChange: handleChange,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      field.required ? fields.current.invalidFields.push(field.id) : null;
      values.set(field.id, "");
    }
    setValues(new Map(values));
  };

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
    const field: InternalField = fields.current.fields[id];
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
      fields.current.fields[field.id] = {
        ...field,
        value: "",
        valid: true,
        onChange: handleChange,
      };
      fields.current.invalidFields.push(field.id);
      fields.current.valid = false;
    }
    setValues(new Map());
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (editValuePresent === true) {
      fields.current.valid = true;
      initialize();
    }
  }, [editValuePresent, initialize]);

  return {
    ...fields.current.fields,
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
  value?: string | number;
}

interface InternalField extends Field {
  value: string | number;
  valid: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface FormProps {
  onSubmit: (input: any) => any;
  fields: Field[];
}

interface Form {
  valid: boolean;
  invalidFields: string[];
  fields: any;
}

export default useForm;
