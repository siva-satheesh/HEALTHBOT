export const empathyReplies = [
  "I'm sorry you're not feeling well. I understand how uncomfortable this can be.",
  "I'm sorry to hear that you're experiencing this. Let me help you step by step.",
  "That sounds unpleasant — I'm sorry you're going through this. Let's look at what you can do.",
  "I'm really sorry you're feeling unwell. I'll guide you on what this might mean.",
  "I'm sorry you're dealing with this health concern. Here's some helpful information."
];

export function getEmpathyReply() {
  const index = Math.floor(Math.random() * empathyReplies.length);
  return empathyReplies[index];
}
