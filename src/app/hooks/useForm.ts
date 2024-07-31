import { useEffect, useMemo, useState } from "react";

interface FormValidations {
    [key: string]: [(value: any) => boolean, string];
}

export const useForm = <T extends object>(inicialForm: T = {} as T, formValidations: FormValidations = {}) => {
    const [formState, setFormState] = useState<T>(inicialForm);
    const [formValidation, setFormValidation] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(inicialForm);
    }, [inicialForm]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onResetForm = () => {
        setFormState(inicialForm);
    };

    const createValidators = () => {
        const formCheckedValues: { [key: string]: string | null } = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField as keyof T]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    };
};
