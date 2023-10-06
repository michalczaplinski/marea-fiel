import type { Meta, StoryObj } from "@storybook/react";

import { Alert, AlertDescription, AlertTitle, Icon } from "@ui/components";

const meta = {
  title: "Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "success",
  },
  argTypes: {
    variant: {
      options: ["success", "primary", "error", "default"],
      control: {
        type: "select",
      },
    },
  },
  render: ({ variant }) => {
    return (
      <Alert variant={variant}>
        <Icon.success className="h-4 w-4" />
        <AlertTitle>My alert</AlertTitle>
        <AlertDescription>This is the text of the alert.</AlertDescription>
      </Alert>
    );
  },
};
