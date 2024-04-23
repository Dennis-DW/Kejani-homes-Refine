import React from "react";
import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/form";

const CreateProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsDataURL(readFile);
      });

    reader(file)
      .then((result: string) =>
        setPropertyImage({ name: file?.name, url: result })
      )
      .catch((error) => {
        console.error("Error reading file:", error);
        // Handle the error appropriately, e.g., show an error message to the user
      });
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) {
      alert("Please upload an image");
      return;
    }

    try {
      await onFinish({ ...data, photo: propertyImage.url, email: user?.email });
      // Optionally, clear the form or show a success message after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <Form
      type="Create"
      onFinish={onFinish}
      formLoading={formLoading}
      register={register}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
