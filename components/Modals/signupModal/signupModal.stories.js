import TestSignupModal from "./testSignupModal";
import { mockSignupModalProps } from "./signupModal.mocks";

const component = {
  title: "Modals/signupModal",
  component: TestSignupModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ASignupModal = (args) => <TestSignupModal {...args} />;

export const Base = ASignupModal.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSignupModalProps.base,
};
