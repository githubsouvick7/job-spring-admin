"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { ComboboxDemo } from "@/components/cities";
import SkillComponents from "@/components/skillcomponents";
import { CheckIcon } from "lucide-react";
import { fetcher } from "@/lib/fetcher";

const jobSchema = z.object({
  title: z.string().min(3, "Job title is required"),
  description: z
    .array(z.string().min(3, "Description must be at least 3 characters"))
    .min(1, "At least one description is required"),
  location: z.object({
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
  }),
  salary: z.object({
    ammount: z.object({
      to: z.string().optional(),
      form: z.string().optional(),
    }),
    salaryType: z.string().optional(),
  }),
  internship: z
    .object({
      duration: z
        .string()
        .min(1, "Duration is required")
        .max(12, "Max 12 months"),
      workType: z.enum(["work-form-home", "work-form-office", "hybrid"]),
      stipend: z.object({
        ammount: z.object({
          to: z.string().optional(),
          form: z.string().optional(),
        }),
      }),
    })
    .optional(),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"]),
  companyName: z.string().min(2, "Company name is required"),
  skills: z.array(z.string().min(2, "At least one skill is required")).min(1),
});

const initialValues = {
  title: "",
  location: { city: "", state: "" },
  description: [""],
  points: [{ key: "", value: [""] }],
  salary: {
    ammount: { to: "", form: "" },
    salaryType: "",
  },
  internship: {
    duration: "",
    workType: "",
    stipend: { ammount: { to: "", form: "" } },
  },
  jobType: "full-time",
  companyName: "",
  exprience: "",
  skills: [""],
  batch: [""],
  image: "",
  link: "",
  mailId: "",
};

const JobForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [cities, setCities] = useState(null);

  const handleSubmit = async (values) => {
    values.location.city = cities.label.city;
    values.location.state = cities.label.state;
    values.skills = selectedItems;
    values.batch = selectedBatch;

    try {
      // const data = await fetcher("/jobs", "POST", values);
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold mb-6">Post a New Job</h2>
        </CardHeader>
        <CardContent>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({
              isSubmitting,
              getFieldProps,
              setFieldValue,
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="w-40 block text-sm font-medium text-gray-700">
                      Title
                    </Label>
                    <Input
                      {...getFieldProps("title")}
                      name="title"
                      type="text"
                      placeholder="Enter job title"
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-40 block text-sm font-medium text-gray-700">
                      Company Name
                    </Label>
                    <Input
                      placeholder="Enter company name"
                      type="text"
                      {...getFieldProps("companyName")}
                    />
                    <ErrorMessage
                      name="companyName"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="w-40 block text-sm font-medium text-gray-700">
                      location
                    </Label>
                    <ComboboxDemo setData={setCities} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label className="w-40 block text-sm font-medium text-gray-700">
                    Company logo
                  </Label>
                  <Input
                    placeholder="Enter company logo"
                    type="text"
                    {...getFieldProps("image")}
                  />
                  <ErrorMessage
                    name="image"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <FieldArray name="points">
                  {({ remove, push }) => (
                    <div className="flex flex-col gap-4">
                      {values.points.map((_, index) => (
                        <div key={index} className="p-4 border rounded-lg mb-4">
                          <Label
                            className="block mb-2 font-medium"
                            htmlFor={`points.${index}.key`}
                          >
                            Key
                          </Label>
                          <Field
                            name={`points.${index}.key`}
                            className="p-2 border rounded-md w-full mb-2"
                            placeholder="Enter key"
                          />

                          <FieldArray name={`points.${index}.value`}>
                            {({ remove, push }) => (
                              <div>
                                <Label className="block mt-4 mb-2 font-medium">
                                  Values
                                </Label>
                                {values.points[index].value.map(
                                  (_, valueIndex) => (
                                    <div
                                      key={valueIndex}
                                      className="flex items-center mb-2"
                                    >
                                      <Field
                                        name={`points.${index}.value.${valueIndex}`}
                                        className="p-2 border rounded-md w-full mr-2"
                                        placeholder="Enter value"
                                      />
                                      <Button
                                        variant="destructive"
                                        type="button"
                                        onClick={() => remove(valueIndex)}
                                      >
                                        <MdDelete />
                                      </Button>
                                    </div>
                                  )
                                )}
                                <Button type="button" onClick={() => push("")}>
                                  Add Value
                                </Button>
                              </div>
                            )}
                          </FieldArray>

                          <div className="flex justify-end">
                            <Button
                              variant="destructive"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove Point
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => push({ key: "", value: [""] })}
                        >
                          Add Point
                        </Button>
                      </div>
                    </div>
                  )}
                </FieldArray>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Select
                      onValueChange={(value) => setFieldValue("jobType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="full-time">Full-Time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="part-time">Part-Time</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {values.jobType !== "internship" && (
                    <>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="text"
                          {...getFieldProps("salary.ammount.form")}
                          placeholder="Enter salary start"
                        />

                        <Input
                          type="text"
                          {...getFieldProps("salary.ammount.to")}
                          placeholder="Enter salary end"
                        />
                        {touched.salary && errors.salary && (
                          <div className="text-red-500 text-sm">
                            {errors.salary}
                          </div>
                        )}
                      </div>

                      <div>
                        <Select
                          onValueChange={(value) =>
                            setFieldValue("salary.salaryType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Salary Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="month">Month</SelectItem>
                              <SelectItem value="year">Year</SelectItem>
                              <SelectItem value="industry-standard">
                                industry standard
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {values.jobType === "internship" && (
                    <>
                      <div>
                        <Input
                          type="text"
                          {...getFieldProps("internship.duration")}
                          placeholder="Enter internship duration in months"
                        />
                        <ErrorMessage
                          name="internship.duration"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          {...getFieldProps("internship.stipend.ammount.to")}
                          placeholder="Enter stipend amount"
                        />
                        <ErrorMessage
                          name="internship.stipend.ammount.to"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex md:flex-row flex-col items-start gap-4">
                  <SkillComponents
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                  />

                  <BatchComponents
                    setSelectedItems={setSelectedBatch}
                    selectedItems={selectedBatch}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="text"
                    {...getFieldProps("exprience")}
                    placeholder="Enter required exprience..."
                  />
                  <Input
                    type="text"
                    {...getFieldProps("link")}
                    placeholder="Enter job link"
                  />
                  <Input
                    type="text"
                    {...getFieldProps("mailId")}
                    placeholder="Enter mail id"
                  />
                </div>

                <div>
                  <Button type="submit" /* disabled={isSubmitting} */>
                    Post Job
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobForm;

const BatchComponents = ({ selectedItems, setSelectedItems }) => {
  const searchList = [
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
  ];

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  // Handles selection of items from the list
  const handleSelect = (item) => {
    if (!selectedItems?.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setOpen(false); // Close the popover after selection
  };

  // Handles removal of selected items
  const handleRemove = (item) => {
    setSelectedItems(selectedItems?.filter((i) => i !== item));
  };

  // Reset active index on search term change
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm]);

  return (
    <div>
      <div className="flex md:flex-row flex-col md:items-center gap-4 w-full">
        <Label className="md:w-40 block text-sm font-medium text-gray-700">
          Batch
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="md:w-[400px] p-2 w-[300px] border min-h-10 flex justify-between items-center rounded-md"
            >
              {selectedItems.length > 0 ? (
                <>
                  <div className="md:grid-cols-3 grid-cols-2 gap-2 grid">
                    {selectedItems?.map((item) => (
                      <div
                        key={item}
                        className="justify-between gap-2 w-auto bg-emerald-600 flex items-center px-2 py-1 rounded-full"
                      >
                        <span className="text-xs font-semibold text-white">
                          {item}
                        </span>
                        <button onClick={() => handleRemove(item)}>
                          <BsXCircle
                            size={16}
                            className="text-white hover:text-red-500 font-bold"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cursor-pointer w-10 border-l-2 flex justify-center items-center">
                    <FaChevronDown />
                  </div>
                </>
              ) : (
                <div className="text-xs">Add batch</div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="md:w-[400px] w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search batch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No batch found.</CommandEmpty>
                <CommandGroup>
                  {searchList
                    .filter((batch) => batch.includes(searchTerm))
                    .map((batch) => (
                      <CommandItem
                        key={batch}
                        onSelect={() => handleSelect(batch)}
                      >
                        {batch}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedItems.includes(batch)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
