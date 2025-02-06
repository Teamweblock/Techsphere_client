import React from "react";
import { Formik } from "formik";
import emailimg from "../../src/images/contact-form.png";

const Contact = () => {

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-700 to-blue-500">
      <div className="flex items-center bg-white  mt-24 bg-opacity-20 p-5 rounded-lg shadow-lg backdrop-blur-md">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={emailimg}
            alt="Contact Form Illustration"
            className="w-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-5 bg-white bg-opacity-70 rounded-lg shadow-md">
          <div className="grid text-center gap-2 ">
            <h1 className="text-3xl font-bold bg-gradient-to-r to-cyan-700 from-blue-500 bg-clip-text text-transparent">
              Drop us a mail
            </h1>
            <p className="bg-gradient-to-r to-cyan-700 from-blue-500 bg-clip-text text-transparent">Our Team will contact you soon</p>
          </div>
          <hr className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 border-0 my-4" />
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              contactNumber: "",
              enquiryType: "",
              website: "",
              message: "",
            }}
            validate={(values) => {
              const errors = {};

              // Full Name Validation
              if (!values.fullName) {
                errors.fullName = "Full Name is required";
              }

              // Email Validation
              if (!values.email) {
                errors.email = "Enter valid email";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              // Contact Number Validation
              if (!values.contactNumber) {
                errors.contactNumber = "Contact number is required";
              } else if (!/^\d{10}$/.test(values.contactNumber)) {
                errors.contactNumber =
                  "Please enter a valid 10-digit contact number";
              }

              // Enquiry Type Validation
              if (!values.enquiryType) {
                errors.enquiryType = "Please select an enquiry type";
              }

              // Website Validation
              if (
                values.website &&
                !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(values.website)
              ) {
                errors.website = "Invalid website URL";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Fulll Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    className={`border p-2 w-full rounded ${
                      errors.fullName && touched.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`border p-2 w-full rounded ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block font-medium">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Your Contact Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactNumber}
                    className={`border p-2 w-full rounded ${
                      errors.contactNumber && touched.contactNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.contactNumber && touched.contactNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block font-medium">Enquiry Type</label>
                  <select
                    name="enquiryType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.enquiryType}
                    className={`border p-2 w-full rounded ${
                      errors.enquiryType && touched.enquiryType
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Enquiry Type</option>
                    <option value="general">General</option>
                    <option value="technical">Technical</option>
                    <option value="sales">Sales</option>
                  </select>
                  {errors.enquiryType && touched.enquiryType && (
                    <p className="text-red-500 text-sm">{errors.enquiryType}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="block font-medium">
                    Website (Optional)
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="Your Website URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website}
                    className="border p-2 w-full rounded"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-medium">Message</label>
                  <textarea
                    name="message"
                    placeholder="Your Message..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    rows="4"
                    className="border p-2 w-full rounded resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-cyan-700 to-blue-500 hover:scale-105 hover:from-cyan-600 hover:to-blue-400 transition-all duration-300 ease-in-out  text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;
