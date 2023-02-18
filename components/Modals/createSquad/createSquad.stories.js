import TestCreateSquadDeso from "./testCreateSquad";
import { mockCreateSquadProps } from "./loginDeso.mocks";

const component = {
  title: "Modals/createSquad",
  component: TestCreateSquadDeso,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ACreateSquad = (args) => <TestCreateSquadDeso {...args} />;

export const Base = ACreateSquad.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCreateSquadProps.base,
};
