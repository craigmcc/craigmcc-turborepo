/**
 * Inputs example component.
 */

// External Modules ----------------------------------------------------------

import {
  Field,
//  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
//  FieldSeparator,
  FieldSet,
//  FieldTitle,
} from "@repo/shadcn-ui/components/field";
import { Input } from "@repo/shadcn-ui/components/input";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Inputs() {
  return (
    <div className="grid grid-cols-2 gap-4 border border-base-content bg-base-100">

      <table className="table">
        <thead>
        <tr>
          <th className="text-center"><h1>Horizontal</h1></th>
        </tr>
        </thead>
        <tbody>
        {Array.from(HorizontalFieldProps).map((fieldProps, index) => (
          <tr key={index}>
            <td>
              <Fields {...fieldProps}/>
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      <table className="table">
        <thead>
        <tr>
          <th className="text-center"><h1>Vertical</h1></th>
        </tr>
        </thead>
        <tbody>
        {Array.from(VerticalFieldProps).map((fieldProps, index) => (
          <tr key={index}>
            <td>
              <Fields {...fieldProps}/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>
  );
}

// Private Objects -----------------------------------------------------------

interface Data {
  street: string;
  city: string;
  zip: string;
}

type Message = {
  // Field name
  name: string;
  // Error message text (for this field)
  message: string;
}

interface FieldsProps {
  // Data to be rendered in this FieldSet
  data: Data;
  // Error messages (if any)
  messages?: Message[];
  // Layout orientation (if any)
  orientation?: "horizontal" | "vertical" | "responsive";
}

const HorizontalFieldProps: FieldsProps[] = [
  {
    data: { street: "123 Main St", city: "Springfield", zip: "12345" },
    messages: [ { name: "street", message: "Invalid street" } ],
    orientation: "horizontal",
  },
  {
    data: { street: "123 Main St", city: "Springfield", zip: "12345" },
    messages: [ { name: "city", message: "Invalid city" } ],
    orientation: "horizontal",
  },
  {
    data: { street: "123 Main St", city: "Springfield", zip: "12345" },
    messages: [ { name: "zip", message: "Invalid zip" } ],
    orientation: "horizontal",
  },
];

const VerticalFieldProps: FieldsProps[] = [
  {
    data: { street: "123 Main St", city: "Springfield", zip: "12345" },
    messages: [ { name: "street", message: "Invalid street" } ],
    orientation: "vertical",
  },
  {
    data: { street: "123 Main St", city: "Springfield", zip: "12345" },
    messages: [ { name: "city", message: "Invalid city" } ],
    orientation: "vertical",
  },
  {
    data: { street: "123 Main St", city: "Springfield", zip: "12345" },
    messages: [ { name: "zip", message: "Invalid zip" } ],
    orientation: "vertical",
  },
];

function Fields({ data, messages, orientation }: FieldsProps) {

  const streetMessage = messages?.find((message) => message.name === "street");
  const cityMessage = messages?.find((message) => message.name === "city");
  const zipMessage = messages?.find((message) => message.name === "zip");

  return (
    <div className="bg-stone-100 m-2">
    <FieldSet className="p-4">
      <FieldLegend>Address Information</FieldLegend>
      <FieldDescription>
        We need your address to deliver your order.
      </FieldDescription>
      <FieldGroup>
        <Field orientation={orientation || "vertical"}>
          <FieldLabel htmlFor="street">Street Address</FieldLabel>
          <Input id="street" type="text" defaultValue={data.street}/>
          {streetMessage && <FieldError>{streetMessage.message}</FieldError>}
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field orientation={orientation || "vertical"}>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" type="text" defaultValue={data.city}/>
            {cityMessage && <FieldError>{cityMessage.message}</FieldError>}
          </Field>
          <Field orientation={orientation || "vertical"}>
            <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
            <Input id="zip" type="text" defaultValue={data.zip}/>
            {zipMessage && <FieldError>{zipMessage.message}</FieldError>}
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
    </div>
  );
}
