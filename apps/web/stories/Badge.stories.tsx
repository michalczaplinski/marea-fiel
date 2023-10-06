import type { Meta, StoryObj } from "@storybook/react";

import { Badge, BadgeProps } from "@ui/components";

const meta = {
  title: "Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<{ label: string; status: BadgeProps["status"] }>;

export const Default: Story = {
  argTypes: {
    status: {
      options: ["success", "info", "error", "warning"],
      control: {
        type: "select",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    status: "success",
    label: "Badge",
  },
  render: ({ status, label }) => {
    return <Badge status={status}>{label}</Badge>;
  },
};
