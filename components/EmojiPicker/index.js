import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});
export default function EmojiPicker(props) {
  if (props.show == "none") {
    return;
  }
  return (
    <Picker
      Theme="dark"
      lazyLoadEmojis={true}
      onEmojiClick={(event) => props.addEmoji(event)}
    ></Picker>
  );
}
