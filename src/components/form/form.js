import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";

export const FormConfirm = ({ onSubmit, confirmHandler }) => {
  const { register, handleSubmit, errors } = useForm();

  const renderInput = inputName => {
    return (
      <>
        <label htmlFor={`input${inputName}`}>{inputName}</label>
        <input
          type="text"
          className="form-control"
          id={`input${inputName}`}
          placeholder={inputName}
          name={inputName}
          onChange={confirmHandler}
          ref={register({ required: true })}
        />
        
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-3">Confirm your order</h2>
      <div className="form-row">
        <div className="form-group col-md-6">{renderInput("City")}</div>
        <div className="form-group col-md-6">{renderInput("Name")}</div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-3">{renderInput("Street")}</div>
        <div className="form-group col-md-3">{renderInput("Building")}</div>
        <div className="form-group col-md-2">{renderInput("Zip")}</div>
        <div className="form-group col-md-4">{renderInput("Phone")}</div>
        {errors["Name"] && (
          <Alert variant="info">
            U should fill all fields
          </Alert>
        )}
      </div>
      
      <button type="submit" className="btn btn-info float-left">
        <Link
          to="/shoppingCart"
          className="nav-link text-decoration-none text-reset"
        >
          Back to the Shopping Cart
        </Link>
      </button>
      <input
        type="submit"
        placeholder="Submit"
        className="btn btn-secondary btn-lg float-right"
        value="Submit"
      />
    </form>
  );
};
