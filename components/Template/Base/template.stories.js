import TestTemplate from "./testTemplate";
import { mockTemplateProps } from "./template.mocks";

const component = {
  title: "Template/Base",
  component: TestTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ATemplate = (args) => <TestTemplate {...args} />;

export const Base = ATemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTemplateProps.base,
};
