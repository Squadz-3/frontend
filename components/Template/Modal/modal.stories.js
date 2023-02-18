import TestModal from "./testModal";
import { mockModalProps } from "./modal.mocks";

const component = {
  title: "Template/Modal",
  component: TestModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const AModal = (args) => <TestModal {...args} />;

export const Base = AModal.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockModalProps.base,
};
