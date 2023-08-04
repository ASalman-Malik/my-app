import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Test from "./test";
import Loader from "./loader";

const initialValues = {
  company: "",
  position: "",
  link: "",
  date: "",
  note: "",
};
function App() {
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (values.company.toLowerCase() === "undefined") {
      alert("Please enter a valid company name");
    } else if (values.company.toLowerCase() === "null") {
      alert("Please enter a valid company name");
    } else if (values.company === "") {
      alert("Please enter a company name");
    } else if (values.position === "") {
      alert("Please enter a position");
    } else if (values.date === "") {
      alert("Please enter a date");
    } else if (values.link === "") {
      alert("Please enter a link");
    } else if (values.note === "") {
      alert("Please enter a note");
    } else {
      console.log("Data-->", values);
    }
  };
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email format"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^(0|91)?[6-9][0-9]{9}$/, "Invalid mobile number"),
    gender: Yup.string().required("Please select a gender"),
    hobbies: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one hobby"),
    dropdown: Yup.string().min(1, "At least one option must be selected"),
    //Yup.mixed().required("File is required"),
    image: Yup.mixed()
      .nullable()
      .required("Image is required")
      .test("imageFormat", "Invalid image format", (value) => {
        if (!value) {
          return false;
        } else {
          // Define your image format conditions here
          const supportedFormats = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg",
          ];
          return supportedFormats.includes(value[0].type);
        }
      })
      .test("fileSize", "File size exceeds maximum limit", (value) => {
        console.log("Value", value);
        if (!value) {
          console.log("Value2", value);
          return false;
        } else {
          const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
          return value[0].size <= maxSizeInBytes;
        }
      }),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hobbies: [],
      image: null,
    },
  });
  const [name, setName] = useState("Initial Name");
  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   setName(name);
  //   console.log("Updated Name", name);
  // };
  console.log("Name Outside handleAdd", name);
  const [state, setState] = useState({ Name: "", Email: "" });
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  console.log("State--->", state);
  const addOne = (e) => {
    e.preventDefault();
    console.log("Click State--->", state);
  };
  const [loading, setLoading] = useState(true);
  return (
    <div className="App">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("name")} />
        {errors.name && (
          <span style={{ color: "crimson", fontSize: "12px" }}>
            {errors.name.message}
          </span>
        )}
        <input {...register("email")} />
        {errors.email && (
          <span style={{ color: "crimson", fontSize: "12px" }}>
            {errors.email.message}
          </span>
        )}
        <input {...register("mobile")} />
        {errors.mobile && (
          <span style={{ color: "crimson", fontSize: "12px" }}>
            {errors.mobile.message}
          </span>
        )}
        Male <input type="radio" value="male" {...register("gender")} />
        Female
        <input type="radio" value="female" {...register("gender")} />
        {errors.gender && (
          <span style={{ color: "crimson", fontSize: "12px" }}>
            {errors.gender.message}
          </span>
        )}
        Reading{" "}
        <input type="checkbox" value="reading" {...register("hobbies")} />
        Music <input type="checkbox" value="music" {...register("hobbies")} />
        Sports <input type="checkbox" value="sports" {...register("hobbies")} />
        {errors.hobbies && (
          <p style={{ color: "crimson", fontSize: "12px" }}>
            {errors.hobbies.message}
          </p>
        )}
        <select
          onClick={(e) => e.preventDefault()}
          {...register("dropdown", { required: true })}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        {errors.dropdown && (
          <p style={{ color: "crimson", fontSize: "12px" }}>
            {errors.dropdown.message}
          </p>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          {...register("image")}
        />
        {errors.image && (
          <p style={{ color: "crimson", fontSize: "12px" }}>
            {errors.image.message}
          </p>
        )}
        Accept Terms & Condition{" "}
        <input
          type="checkbox"
          name="termsAccepted"
          {...register("termsAccepted")}
        />
        {errors.termsAccepted && (
          <p style={{ color: "crimson", fontSize: "12px" }}>
            {errors.termsAccepted.message}
          </p>
        )}
        <input type="submit" />
      </form>

      <div>
        <form>
          <input
            value={values.company}
            onChange={handleInputChange}
            name="company"
            label="Company"
          />
          <input
            value={values.position}
            onChange={handleInputChange}
            name="position"
            label="Job Title"
          />
          <input
            value={values.date}
            onChange={handleInputChange}
            label="Date"
            name="date"
          />
          <input
            value={values.note}
            onChange={handleInputChange}
            label="Note"
            name="note"
          />
          <input
            value={values.link}
            onChange={handleInputChange}
            label="link"
            name="link"
          />
          <button onClick={handleSave}> Submit </button>
        </form>
      </div>

      <div>
        <h1> Jobs </h1>
        <input
          type="text"
          name="name"
          // value={name}
          // onChange={(e) => setName(e.target.value)}
        />
        {/* <button onClick={handleAdd}> Add </button> */}
      </div>
      <a
        href="http://www.facebook.com/sharer/sharer.php?s=100&p[url]=
https://ayushastra.com/ProductDescription?pId=7"
      >
        Share on Facebook
      </a>
      <form>
        <input name="email" type="email" onChange={handleInput} />
        <input name="password" type="password" onChange={handleInput} />
        <button onClick={addOne}>Submit</button>
      </form>
      {/* <Test /> */}
      {loading ? <Loader /> : "loading false"}
    </div>
  );
}

export default App;
