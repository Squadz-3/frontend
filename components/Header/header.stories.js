import TestHeader from "./testHeader";
import { mockHeaderProps } from "./header.mocks";

const component = {
  title: "Header",
  component: TestHeader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default component;

// More on component headers: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const AHeader = (args) => <TestHeader {...args} />;

export const Base = AHeader.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHeaderProps.base,
};
