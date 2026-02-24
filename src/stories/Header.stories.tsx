import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { AppHeaderUI } from '@ui';

const meta = {
  title: 'Example/Header',
  component: AppHeaderUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof AppHeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    userName: 'John Doe',
    handleMenuClick: () => {},
    handleLogout: () => {}
  }
};

export const LoggedOut: Story = {
  args: {
    userName: undefined,
    handleMenuClick: () => {},
    handleLogout: () => {}
  }
};
