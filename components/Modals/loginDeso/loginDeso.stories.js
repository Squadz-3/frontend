import TestLoginDeso from "./testLoginDeso";
import { mockLoginDesoProps } from "./loginDeso.mocks";

const component = {
  title: "Modals/loginDeso",
  component: TestLoginDeso,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ALoginDeso = (args) => <TestLoginDeso {...args} />;

export const Base = ALoginDeso.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLoginDesoProps.base,
};
