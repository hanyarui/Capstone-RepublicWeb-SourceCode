import "../../App.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  password: yup.string().min(8).required("Password minimal 8 karakter"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password tidak sama"),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setSubmitted(true);

    // Simulasikan API reset password
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form setelah password berhasil diubah
    reset();
  };

  return (
    <div className="container mx-auto max-w-sm px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className="mb-4">
          <Label for="password" className="block mb-2 text-sm font-medium">
            Password Baru
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            {...register("password")}
            invalid={!!errors.password}
            className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <div className="text-red-500 mt-2">{errors.password?.message}</div>
        </FormGroup>
        <FormGroup className="mb-4">
          <Label
            for="confirmPassword"
            className="block mb-2 text-sm font-medium"
          >
            Konfirmasi Password
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword")}
            invalid={!!errors.confirmPassword}
            className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          <div className="text-red-500 mt-2">
            {errors.confirmPassword?.message}
          </div>
        </FormGroup>
        <Button
          type="submit"
          disabled={submitted}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Reset Password
        </Button>
        {submitted && (
          <p className="mt-2 text-green-500">
            Password berhasil diubah. Silakan login dengan password baru.
          </p>
        )}
        <Link
          to="/login"
          className="text-sm text-blue-500 hover:text-blue-600 mt-2"
        >
          Kembali ke Login
        </Link>
      </Form>
    </div>
  );
};

export default ResetPassword;
