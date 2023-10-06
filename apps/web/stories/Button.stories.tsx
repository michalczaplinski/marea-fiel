import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@ui/components";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    disabled: false,
  },
  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
};
