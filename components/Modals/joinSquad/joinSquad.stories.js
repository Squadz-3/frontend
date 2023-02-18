import TestJoinSquad from "./testJoinSquad";
import { mockJoinSquadProps } from "./joinSquad.mocks";

const component = {
  title: "Modals/joinSquad",
  component: TestJoinSquad,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const AJoinSquad = (args) => <TestJoinSquad {...args} />;

export const Base = AJoinSquad.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockJoinSquadProps.base,
};
