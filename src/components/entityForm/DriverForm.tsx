import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Driver, FormPage } from "@types";
import { isDriverData, isOverAge } from "@utils";
import { fetchAddressByZipCode } from "@services";
import { FormInput, FormSelect, NewForm } from "@components";
import { useEntityCrud, useModalContext, useNotificationContext } from "@hooks";
import { ADDRESS_STATES, MARITAL_STATUS, LICENSE_CATEGORIES } from "@constants";

const driverSchema = z.object({
  identification: z.object({
    id: z.string(),
    fullName: z.string().min(1, "Nome é obrigatório"),
    identification: z.string().min(1, "RG é obrigatório"),
    identificationState: z.string().min(1, "UF Emissor é obrigatório"),
    cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
    birthdate: z
      .string()
      .min(1, "Data Nascimento é obrigatório")
      .refine((v) => isOverAge(v, 18), { message: "Condutor é menor de 18 anos" }),
    maritalStatus: z.string().min(1, "Estado Civil é obrigatório"),
    profession: z.string(),
  }),
  address: z.object({
    zipCode: z.string().regex(/^\d{8}$/, "CEP deve conter 8 dígitos"),
    houseNumber: z.string().min(1, "Número é obrigatório"),
    street: z.string().min(1, "Rua é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    complement: z.string(),
    city: z.string().min(1, "Cidade é obrigatório"),
    state: z.string().min(1, "Estado é obrigatório"),
  }),
  license: z.object({
    licenseNumber: z.string().min(1, "CNH é obrigatório"),
    category: z.string().min(1, "Categoria é obrigatório"),
    governmentPassword: z.string().min(1, "Senha Acesso GOV é obrigatório"),
  }),
  contact: z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    phoneNumber: z.string().regex(/^0?[1-9]{2}[0-9]{8,9}$/, "Celular inválido"),
  }),
});

type FieldsSchema = z.infer<typeof driverSchema>;

const initialValues: FieldsSchema = {
  identification: {
    id: "",
    fullName: "",
    identification: "",
    identificationState: "",
    cpf: "",
    birthdate: "",
    maritalStatus: "",
    profession: "",
  },
  address: {
    zipCode: "",
    houseNumber: "",
    street: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
  },
  license: {
    licenseNumber: "",
    category: "",
    governmentPassword: "",
  },
  contact: {
    email: "",
    phoneNumber: "",
  },
};

interface DriverFormProps {
  initialDriver: Driver | null;
}

const DriverForm = ({ initialDriver = null }: DriverFormProps) => {
  const isUpdate = !!initialDriver && isDriverData(initialDriver);
  const { closeModal } = useModalContext();
  const { createDriver, updateDriver } = useEntityCrud();
  const { showNotification } = useNotificationContext();
  const {
    register,
    getValues,
    getFieldState,
    setValue,
    setError,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldsSchema>({
    resolver: zodResolver(driverSchema),
    defaultValues: !initialDriver
      ? initialValues
      : {
          identification: {
            id: initialDriver.id,
            fullName: initialDriver.fullName,
            cpf: initialDriver.cpf,
            identification: initialDriver.identification,
            identificationState: initialDriver.identificationState,
            birthdate: initialDriver.birthdate,
            maritalStatus: initialDriver.maritalStatus,
            profession: initialDriver.profession,
          },
          address: initialDriver.address,
          contact: initialDriver.contact,
          license: initialDriver.license,
        },
  });

  const handleZipCodeOnBlur = async () => {
    try {
      await trigger("address.zipCode");
      const zipCodeFieldState = getFieldState("address.zipCode");
      const zipCodeValue = getValues("address.zipCode");
      setValue("address", { ...initialValues.address, zipCode: zipCodeValue });

      if (zipCodeFieldState.invalid) return;
      const address = await fetchAddressByZipCode(zipCodeValue);
      if (address) {
        setValue("address", address);
      } else {
        setError("address.zipCode", { type: "validate", message: "CEP não encontrado" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDriverSubmit = async (data: FieldsSchema) => {
    try {
      const { identification, address, license, contact } = data;
      const driver = { ...identification, address, license, contact };
      if (!isDriverData(driver)) throw new Error("Invalid driver data");

      isUpdate ? await updateDriver(driver) : await createDriver(driver);
      closeModal(); // TODO: fix, run only on success update/create
    } catch (error) {
      console.error(error);
      showNotification({
        message: "Ocorreu um erro durante esta operação. Por favor, tente novamente mais tarde.",
        variant: "danger",
      });
    }
  };

  const formPages: FormPage[] = [
    {
      title: "Identificação",
      validationFn: async () => await trigger(["identification"]),
      fields: [
        <div className="col-span-full">
          <FormInput
            className="col-span-full"
            key="identification.fullName"
            label="Nome completo"
            error={errors.identification?.fullName}
            {...register("identification.fullName")}
            maxLength={50}
          />
        </div>,
        <FormInput
          key="identification.cpf"
          label="CPF"
          error={errors.identification?.cpf}
          {...register("identification.cpf")}
          placeholder="Somente números"
          disabled={isUpdate}
          maxLength={11}
        />,
        <FormInput
          key="identification.birthdate"
          label="Data Nascimento"
          error={errors.identification?.birthdate}
          {...register("identification.birthdate")}
          type="date"
        />,
        <FormInput
          key="identification.identification"
          label="RG"
          error={errors.identification?.identification}
          {...register("identification.identification")}
          maxLength={10}
        />,
        <FormSelect
          key="identification.identificationState"
          label="UF Emissor"
          error={errors.identification?.identificationState}
          {...register("identification.identificationState")}
          options={ADDRESS_STATES.map((state) => ({ value: state.uf, label: state.uf }))}
        />,
        <FormSelect
          key="identification.maritalStatus"
          label="Estado Civil"
          error={errors.identification?.maritalStatus}
          {...register("identification.maritalStatus")}
          options={MARITAL_STATUS.map((status) => ({ value: status.name, label: status.name }))}
        />,
        <FormInput
          key="identification.profession"
          label="Profissão"
          error={errors.identification?.profession}
          {...register("identification.profession")}
          isOpcional
          maxLength={50}
        />,
      ],
    },
    {
      title: "Endereço",
      validationFn: async () => await trigger(["address"]),
      fields: [
        <FormInput
          key="address.zipCode"
          label="CEP"
          error={errors.address?.zipCode}
          {...register("address.zipCode", { onBlur: handleZipCodeOnBlur })}
          maxLength={8}
        />,
        <FormInput
          key="address.houseNumber"
          label="Número"
          error={errors.address?.houseNumber}
          {...register("address.houseNumber")}
          maxLength={5}
        />,
        <div className="col-span-full">
          <FormInput
            key="address.street"
            label="Logradouro"
            error={errors.address?.street}
            {...register("address.street")}
            maxLength={50}
          />
        </div>,
        <FormInput
          key="address.neighborhood"
          label="Bairro"
          error={errors.address?.neighborhood}
          {...register("address.neighborhood")}
          maxLength={30}
        />,
        <FormInput
          key="address.complement"
          label="Complemento"
          error={errors.address?.complement}
          {...register("address.complement")}
          isOpcional
          maxLength={20}
        />,
        <FormInput
          key="address.city"
          label="Cidade"
          error={errors.address?.city}
          {...register("address.city")}
          maxLength={50}
        />,
        <FormSelect
          key="address.state"
          label="Estado"
          error={errors.address?.state}
          {...register("address.state")}
          options={ADDRESS_STATES.map((state) => ({ value: state.name, label: state.name }))}
        />,
      ],
    },
    {
      title: "Habilitação",
      validationFn: async () => await trigger(["license"]),
      fields: [
        <FormInput
          key="license.licenseNumber"
          label="CNH"
          error={errors.license?.licenseNumber}
          {...register("license.licenseNumber")}
          maxLength={12}
        />,
        <FormSelect
          key="license.category"
          label="Categoria"
          error={errors.license?.category}
          {...register("license.category")}
          options={LICENSE_CATEGORIES.map((category) => ({ value: category.name, label: category.name }))}
        />,
        <FormInput
          key="license.governmentPassword"
          label="Senha Acesso GOV"
          error={errors.license?.governmentPassword}
          {...register("license.governmentPassword")}
          type="password"
          maxLength={20}
        />,
      ],
    },
    {
      title: "Contato",
      validationFn: async () => await trigger(["contact"]),
      fields: [
        <FormInput
          key="contact.email"
          label="Email"
          error={errors.contact?.email}
          {...register("contact.email")}
          type="email"
          maxLength={50}
        />,
        <FormInput
          key="contact.phoneNumber"
          label="Celular"
          error={errors.contact?.phoneNumber}
          {...register("contact.phoneNumber")}
          type="tel"
          placeholder="DDD999999999"
          maxLength={12}
        />,
      ],
    },
  ];

  return (
    <NewForm
      title={isUpdate ? "Editar condutor" : "Novo condutor"}
      formPages={formPages}
      isUpdate={isUpdate}
      isSubmitting={isSubmitting}
      submitCallback={handleSubmit(handleDriverSubmit)}
    />
  );
};

export default DriverForm;
