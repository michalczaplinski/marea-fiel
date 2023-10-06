import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components";

const meta = {
  title: "Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/340px-Steve_Jobs_Headshot_2010-CROP2.jpg"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <AvatarFallback className="bg-primary/10 text-primary">
          SJ
        </AvatarFallback>
      </Avatar>
    );
  },
};
