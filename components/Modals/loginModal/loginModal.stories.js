import TestLoginModal from "./testLoginModal";
import { mockLoginModalProps } from "./loginModal.mocks";

const component = {
  title: "Modals/loginModal",
  component: TestLoginModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
export default component;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ALoginModal = (args) => <TestLoginModal {...args} />;

export const Base = ALoginModal.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLoginModalProps.base,
};
